"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface ItemsFilterProps {
  items: string[]
  selectedItems: string[]
  onSelectItems: (items: string[]) => void
}

export function ItemsFilter({ items, selectedItems, onSelectItems }: ItemsFilterProps) {
  const [open, setOpen] = React.useState(false)

  const toggleItem = (item: string) => {
    const newSelection = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item]
    onSelectItems(newSelection)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Filtrar por instalaciones</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between btn-black">
            {selectedItems.length === 0 ? "Seleccionar instalaciones" : `${selectedItems.length} seleccionados`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 filter-content">
          <Command>
            <CommandInput placeholder="Buscar instalación..." />
            <CommandList>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem key={item} onSelect={() => toggleItem(item)}>
                    <div className="flex items-center gap-2">
                      <Check className={selectedItems.includes(item) ? "opacity-100" : "opacity-0"} size={16} />
                      {item}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty>No se encontraron instalaciones.</CommandEmpty>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item) => (
            <Badge key={item} variant="secondary" className="cursor-pointer" onClick={() => toggleItem(item)}>
              {item}
              <span className="ml-1">×</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

