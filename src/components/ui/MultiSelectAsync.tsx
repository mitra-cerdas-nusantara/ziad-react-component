import * as React from "react"
import { Check, ChevronsUpDown, Loader2, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { Input } from "@/components/ui/Input"
import { type Option } from "./MultiSelect"

interface MultiSelectAsyncProps {
  value: Option[]
  onChange: (value: Option[]) => void
  loadOptions: (query: string) => Promise<Option[]>
  placeholder?: string
  searchPlaceholder?: string
  loadingPlaceholder?: string
  noOptionsPlaceholder?: string
  debounceMs?: number
  className?: string
  contentClassName?: string
}

export function MultiSelectAsync({
  value,
  onChange,
  loadOptions,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  loadingPlaceholder = "Loading...",
  noOptionsPlaceholder = "No options found.",
  debounceMs = 300,
  className,
  contentClassName,
}: MultiSelectAsyncProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [options, setOptions] = React.useState<Option[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const fetchOptions = React.useCallback(
    async (searchTerm: string) => {
      setIsLoading(true)
      try {
        const results = await loadOptions(searchTerm)
        setOptions(results)
      } catch (error) {
        console.error("Error loading options:", error)
        setOptions([])
      } finally {
        setIsLoading(false)
      }
    },
    [loadOptions]
  )

  React.useEffect(() => {
    if (open) {
      fetchOptions("")
    } else {
      setQuery("")
      setOptions([])
    }
  }, [open, fetchOptions])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      fetchOptions(newQuery)
    }, debounceMs)
  }

  const handleUnselect = (option: Option) => {
    onChange(value.filter((s) => s.id !== option.id))
  }

  const handleSelect = (option: Option) => {
    const isSelected = value.some((s) => s.id === option.id)
    if (isSelected) {
      onChange(value.filter((s) => s.id !== option.id))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-auto min-h-10 px-3 py-2",
            "glass border-white/10 hover:bg-white/5 font-inter",
            className
          )}
        >
          <div className="flex flex-wrap gap-1 items-center">
            {value.length > 0 ? (
              value.map((option) => (
                <Badge
                  variant="secondary"
                  key={option.id}
                  className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 text-[11px] font-medium px-2.5 py-0.5 rounded-lg transition-colors"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    handleUnselect(option)
                  }}
                >
                  {option.name}
                  <X className="ml-1 h-3 w-3 hover:text-destructive transition-colors" />
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn("w-[var(--radix-popover-trigger-width)] p-0", contentClassName)} 
        align="start"
      >
        <div className="flex flex-col h-full max-h-80">
          <div className="flex items-center border-b border-white/10 px-3 py-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              autoFocus
              placeholder={searchPlaceholder}
              value={query}
              onChange={handleSearch}
              className="h-8 border-none bg-transparent focus-visible:ring-0 px-0 shadow-none glass-none"
            />
          </div>
          <div className="flex-1 overflow-auto p-1 custom-scrollbar min-h-[50px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-6 text-sm text-muted-foreground gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingPlaceholder}
              </div>
            ) : options.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {noOptionsPlaceholder}
              </div>
            ) : (
              options.map((option) => {
                const isSelected = value.some((s) => s.id === option.id)
                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors",
                      "hover:bg-white/5",
                      isSelected && "bg-primary/10 text-primary"
                    )}
                  >
                    <div className={cn(
                      "absolute left-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                    )}>
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{option.name}</span>
                      {option.role && (
                        <span className="text-[10px] opacity-50 capitalize">{option.role}</span>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
