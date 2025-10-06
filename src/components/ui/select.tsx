import React from "react";
import { cn } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const Select = ({ value, onValueChange, children, className }: SelectProps) => {
  return (
    <Listbox value={value} onChange={onValueChange}>
      <div className={cn("relative", className)}>
        {children}
      </div>
    </Listbox>
  );
};

interface SelectTriggerProps {
  className?: string;
  children: React.ReactNode;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Listbox.Button
        ref={ref}
        className={cn(
          "relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm",
          className
        )}
        {...props}
      >
        <span className="block truncate">{children}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps {
  placeholder?: string;
  children?: React.ReactNode;
}

const SelectValue = ({ placeholder, children }: SelectValueProps) => {
  return children || <span className="text-gray-500">{placeholder}</span>;
};

interface SelectContentProps {
  children: React.ReactNode;
}

const SelectContent = ({ children }: SelectContentProps) => {
  return (
    <Transition
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {children}
      </Listbox.Options>
    </Transition>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

const SelectItem = ({ value, children }: SelectItemProps) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        cn(
          active ? "bg-blue-100 text-blue-900" : "text-gray-900",
          "relative cursor-default select-none py-2 pl-8 pr-4"
        )
      }
      value={value}
    >
      {({ selected, active }) => (
        <>
          <span className={cn(selected ? "font-semibold" : "font-normal", "block truncate")}>
            {children}
          </span>
          {selected ? (
            <span
              className={cn(
                active ? "text-blue-600" : "text-blue-600",
                "absolute inset-y-0 left-0 flex items-center pl-1.5"
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };