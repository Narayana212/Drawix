import { cn } from "@/lib/utils"

/**
 * Creates a skeleton loading component with a pulsing animation.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props to be spread on the div element.
 * @param {string} [props.className] - Additional CSS classes to apply to the skeleton component.
 * @returns {JSX.Element} A div element with skeleton loading styles and animation.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
