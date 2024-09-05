import * as RadixSlider from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

export function Slider({
  value = [0],
  min,
  max,
  step = 1,
  onChange,
  disabled,
  containerClassName
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 w-full max-w-[16rem]",
        containerClassName
      )}
    >
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-1 grow h-5"
        value={value}
        onValueChange={onChange}
        max={max}
        min={min}
        step={step}
        disabled={disabled}
      >
        <RadixSlider.Track className="bg-neutral-950 dark:bg-neutral-50  relative grow rounded-full h-1">
          {/* <RadixSlider.Range className="absolute bg-neutral-50 rounded-full h-full" /> */}
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className="block w-3 h-3 bg-neutral-50 dark:bg-neutral-950 shadow-current rounded-[10px] hover:bg-neutral-200 focus:outline-none shadow-[0_0_0_4px] focus:bg-current"
          aria-label="Volume"
        />
      </RadixSlider.Root>
      <h5 className="variant-h5 min-w-12 text-end">{value[0]}</h5>
    </div>
  )
}
