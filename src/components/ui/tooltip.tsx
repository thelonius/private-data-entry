import React from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const Tooltip = ({ children, content, className }: TooltipProps) => {
  return (
    <Popover className="relative">
      <PopoverButton as="div" className="inline-block">
        {children}
      </PopoverButton>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <PopoverPanel
          className={cn(
            "absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700",
            className
          )}
        >
          {content}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export { Tooltip };