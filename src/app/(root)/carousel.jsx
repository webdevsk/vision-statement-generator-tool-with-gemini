import { questions } from "@/data/questions"
import { useEmblaPrevNextButtons } from "@/hooks/use-embla-prev-next-button"
import useEmblaCarousel from "embla-carousel-react"

export function EmblaCarousel({ slides, options = { axis: "y" } }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = useEmblaPrevNextButtons(emblaApi)

  return (
    <div
      className="embla overflow-hidden h-full md:rounded-2xl"
      ref={emblaRef}
    >
      <div className="embla__container max-md:px-2 py-2 pe-2 gap-y-4 *:bg-neutral-50 dark:*:bg-neutral-900 grid auto-cols-fr h-full auto-rows-[100%] *:p-4 *:md:p-10">
        {questions?.map((question, i) => (
          <label
            key={i}
            className="embla__slide border border-current rounded-2xl md:rounded-xl grid gap-4 auto-cols-fr grid-rows-[max-content_max-content_minmax(0,_1fr)_max-content]"
          >
            <h2 className="leading-none variant-h2 rounded-full mt-4 md:mt-8 min-w-12 min-h-12 md:min-w-16 md:min-h-16 grid place-items-center justify-self-start border-4 border-current">
              {i + 1}
            </h2>
            <h3 className="variant-h3">{question}</h3>
            <div>
              <input
                type="text"
                placeholder="Answer"
                onKeyDown={e =>
                  e.key === "Enter" && !nextBtnDisabled && onNextButtonClick()
                }
                className="appearance-none font-semibold bg-inherit caret-current focus-visible:outline-none variant-h4 py-4"
              />
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className="prev min-w-32 disabled:opacity-60 disabled:pointer-events-none hover:bg-neutral-700 hover:dark:bg-neutral-300 transition-colors  px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-950 font-semibold variant-h6"
              >
                Previous
              </button>
              <button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className="ms-auto min-w-32 disabled:opacity-60 disabled:pointer-events-none hover:bg-neutral-700 hover:dark:bg-neutral-300 transition-colors  next px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-950 font-semibold variant-h6"
              >
                Next
              </button>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
