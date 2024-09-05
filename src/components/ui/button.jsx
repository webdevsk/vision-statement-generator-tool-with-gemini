import { cn } from "@/lib/utils"

export function Button({ children, className, ...attributes }) {
  return (
    <button
      {...attributes}
      className={cn(
        "min-w-32 disabled:opacity-60 disabled:pointer-events-none hover:bg-neutral-700 hover:dark:bg-neutral-300 transition-colors  px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-950 font-semibold variant-h6",
        className
      )}
    >
      {children}
    </button>
  )
}
