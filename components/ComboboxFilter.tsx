"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ComboboxFilterProps {
  options: string[]
  placeholder: string
  onSelect: (value: string) => void
  isMulti?: boolean
  selectedItems?: string[]
}

export function ComboboxFilter({
  options,
  placeholder,
  onSelect,
  isMulti = false,
  selectedItems = [],
}: ComboboxFilterProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between btn-black">
          {isMulti
            ? selectedItems.length === 0
              ? placeholder
              : `${selectedItems.length} seleccionados`
            : value || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 filter-content">
        <Command>
          <CommandInput placeholder={`Buscar...`} />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              {!isMulti && (
                <CommandItem
                  onSelect={() => {
                    setValue("")
                    onSelect("")
                    setOpen(false)
                  }}
                >
                  <Check className={!value ? "opacity-100 mr-2" : "opacity-0 mr-2"} size={16} />
                  Mostrar todos
                </CommandItem>
              )}
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    if (isMulti) {
                      onSelect(option)
                    } else {
                      setValue(option)
                      onSelect(option)
                      setOpen(false)
                    }
                  }}
                >
                  <Check
                    className={
                      isMulti
                        ? selectedItems.includes(option)
                          ? "opacity-100 mr-2"
                          : "opacity-0 mr-2"
                        : value === option
                          ? "opacity-100 mr-2"
                          : "opacity-0 mr-2"
                    }
                    size={16}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

