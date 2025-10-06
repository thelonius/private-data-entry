import React from "react";
import { cn } from "@/lib/utils";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  id?: string;
}

const Dialog = ({ open, onOpenChange, children, id }: DialogProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onOpenChange} id={id}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

const DialogContent = ({ children, className }: DialogContentProps) => {
  return (
    <div className={cn("rounded-lg bg-white p-6 shadow-lg", className)}>
      {children}
    </div>
  );
};

interface DialogHeaderProps {
  children: React.ReactNode;
}

const DialogHeader = ({ children }: DialogHeaderProps) => {
  return <div className="mb-4">{children}</div>;
};

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle = ({ children, className }: DialogTitleProps) => {
  return (
    <HeadlessDialog.Title
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    >
      {children}
    </HeadlessDialog.Title>
  );
};

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const DialogDescription = ({ children, className }: DialogDescriptionProps) => {
  return (
    <HeadlessDialog.Description
      className={cn("text-sm text-gray-500", className)}
    >
      {children}
    </HeadlessDialog.Description>
  );
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription };