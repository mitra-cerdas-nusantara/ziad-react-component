import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"

export interface Option {
  id: string | number
  name: string
  [key: string]: any
}

interface MultiSelectProps {
  options: Option[]
  selected: Option[]
  onChange: (selected: Option[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (option: Option) => {
    onChange(selected.filter((s) => s.id !== option.id))
  }

  const handleSelect = (option: Option) => {
    const isSelected = selected.some((s) => s.id === option.id)
    if (isSelected) {
      onChange(selected.filter((s) => s.id !== option.id))
    } else {
      onChange([...selected, option])
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
            {selected.length > 0 ? (
              selected.map((option) => (
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
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <div className="max-h-64 overflow-auto p-1 custom-scrollbar">
          {options.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No options found.
            </div>
          )}
          {options.map((option) => {
            const isSelected = selected.some((s) => s.id === option.id)
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
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
