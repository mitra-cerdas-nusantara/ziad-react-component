import * as React from "react"
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { Input } from "@/components/ui/Input"

export interface Option {
  id: string | number
  name: string
  [key: string]: any
}

interface SelectAsyncProps {
  value?: Option | null
  onChange: (value: Option | null) => void
  loadOptions: (query: string) => Promise<Option[]>
  placeholder?: string
  searchPlaceholder?: string
  loadingPlaceholder?: string
  noOptionsPlaceholder?: string
  debounceMs?: number
  className?: string
  contentClassName?: string
}

export function SelectAsync({
  value,
  onChange,
  loadOptions,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  loadingPlaceholder = "Loading...",
  noOptionsPlaceholder = "No options found.",
  debounceMs = 300,
  className,
  contentClassName,
}: SelectAsyncProps) {
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

  const handleSelect = (option: Option) => {
    onChange(option)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-10 px-3 py-2",
            "glass border-white/10 hover:bg-white/5 font-inter",
            className
          )}
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value ? value.name : placeholder}
          </span>
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
                const isSelected = value?.id === option.id
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
                    <div className="absolute left-2 flex h-4 w-4 items-center justify-center">
                      {isSelected && <Check className="h-4 w-4" />}
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
