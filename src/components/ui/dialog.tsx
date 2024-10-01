"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
/**
 * Creates a dialog overlay component using DialogPrimitive.Overlay
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional CSS class names for the overlay
 * @param {React.Ref} ref - Ref object for the overlay element
 * @returns {JSX.Element} A DialogPrimitive.Overlay component with applied styles and animations
 */
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  /**
   * Renders a dialog component with a portal, overlay, and content.
   * @param {Object} props - The component props.
   * @param {string} props.className - Additional CSS class names for the dialog content.
   * @param {React.ReactNode} props.children - The child elements to be rendered inside the dialog content.
   * @param {React.Ref} ref - The ref to be forwarded to the dialog content.
   * @returns {React.ReactElement} A dialog component with animated enter/exit transitions and a close button.
   */
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

```
/**
 * Renders a header component for a dialog or modal
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props to be spread on the div element
 * @param {string} [props.className] - Additional CSS classes to be applied to the component
 * @returns {JSX.Element} A div element with flexbox styling for dialog header content
 */
```
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

/**
 * Renders a dialog footer component with responsive layout
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props to be spread on the div element, including className
 * @returns {JSX.Element} A div element styled as a dialog footer
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
/**
 * A React component that renders a dialog title using DialogPrimitive.Title
 * @param {Object} props - The props object
 * @param {string} [props.className] - Additional CSS class names to apply to the title
 * @param {React.Ref} ref - Ref object for the DialogPrimitive.Title component
 * @returns {React.ReactElement} A styled DialogPrimitive.Title component
 */
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  /**
   * A React component that renders a description for a dialog using DialogPrimitive.Description
   * @param {Object} props - The props object
   * @param {string} [props.className] - Additional CSS class names to apply to the description
   * @param {React.Ref} ref - A ref to be forwarded to the underlying DialogPrimitive.Description component
   * @returns {JSX.Element} A DialogPrimitive.Description component with applied styles and props
   */
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
