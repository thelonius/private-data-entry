import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

interface TooltipProps {
  children: React.ReactNode;
  id?: string;
}

const Tooltip = ({ children, id }: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  return (
    <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
      <div id={id}>{children}</div>
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const TooltipTrigger = ({ children, className }: TooltipTriggerProps) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger must be used within Tooltip");

  const { setOpen, triggerRef } = context;

  return (
    <div
      ref={triggerRef}
      className={cn("inline-block", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </div>
  );
};

interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

const TooltipContent = ({ children, className, side = "top" }: TooltipContentProps) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipContent must be used within Tooltip");

  const { open, triggerRef } = context;
  const [position, setPosition] = useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      
      switch (side) {
        case "top":
          setPosition({
            top: rect.top + scrollTop - 10,
            left: rect.left + scrollLeft + rect.width / 2
          });
          break;
        case "bottom":
          setPosition({
            top: rect.bottom + scrollTop + 10,
            left: rect.left + scrollLeft + rect.width / 2
          });
          break;
        case "left":
          setPosition({
            top: rect.top + scrollTop + rect.height / 2,
            left: rect.left + scrollLeft - 10
          });
          break;
        case "right":
          setPosition({
            top: rect.top + scrollTop + rect.height / 2,
            left: rect.right + scrollLeft + 10
          });
          break;
      }
    }
  }, [open, triggerRef, side]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg dark:bg-gray-700",
        className
      )}
      style={{
        top: position.top,
        left: position.left,
        transform: side === "top" || side === "bottom" 
          ? "translate(-50%, -100%)" 
          : "translate(-100%, -50%)"
      }}
    >
      {children}
      <div 
        className={cn(
          "absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45",
          side === "top" && "-bottom-1 left-1/2 -translate-x-1/2",
          side === "bottom" && "-top-1 left-1/2 -translate-x-1/2",
          side === "left" && "-right-1 top-1/2 -translate-y-1/2",
          side === "right" && "-left-1 top-1/2 -translate-y-1/2"
        )}
      />
    </div>
  );
};

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };