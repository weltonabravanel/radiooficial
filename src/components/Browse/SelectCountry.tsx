import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CountrySelection } from "@/lib/types";

type SelectProps = {
  data: CountrySelection[];
  setSelectedCountry: React.Dispatch<React.SetStateAction<String | null>>;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<String | null>>;
  selectedCountry: String | null;
};

export function SelectCountry({
  data,
  setSelectedCountry,
  selectedCountry,
  setSelectedLanguage,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCountry
            ? value
              ? data.find((item) => item.name.toLowerCase() === value)?.name
              : `Selecionar País`
            : `Selecionar País`}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandInput placeholder={`Buscar por País`} />
          <CommandEmpty>{`Country not found!`}</CommandEmpty>
          <CommandGroup className="h-[300px] overflow-y-auto">
            {data.map((item, i) => (
              <CommandItem
                key={i}
                value={item.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setSelectedCountry(
                    currentValue === value ? null : item.iso_3166_1
                  );
                  setSelectedLanguage(null);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.name.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <div className="">
                  <h1 className="font-semibold ">{item.name}</h1>
                  <h1 className="text-xs">Stations: {item.stationcount}</h1>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
