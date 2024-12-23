import * as React from "react"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"

interface DummyProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  showButton?: boolean
}

export function Dummy({
  title = "Dummy Component",
  description = "This is a placeholder component for testing purposes.",
  showButton = true,
  className,
  ...props
}: DummyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-300 p-6 text-center",
        className
      )}
      {...props}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {showButton && (
        <Button
          variant="outline"
          onClick={() => alert("Dummy button clicked!")}
        >
          Click Me
        </Button>
      )}
    </div>
  )
} 