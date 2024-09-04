import { questions } from "@/data/questions"
import useEmblaCarousel from "embla-carousel-react"

export function EmblaCarousel({ slides, options = { axis: "y" } }) {
  const [emblaRef] = useEmblaCarousel(options)

  return (
    <div
      className="embla overflow-hidden h-full rounded-2xl"
      ref={emblaRef}
    >
      <div className="embla__container first:rounded-t-2xl last:rounded-b-2xl *:bg-neutral-100 dark:*:bg-neutral-900 grid auto-cols-fr h-full auto-rows-[100%] *:p-2 *:md:p-10">
        {questions?.map((question, i) => (
          <label
            key={i}
            className="embla__slide grid gap-4 grid-flow-row grid-rows-[max-content_max-content_minmax(0,_1fr)_max-content]"
          >
            <h2 className="leading-none variant-h2 rounded-full mt-4 md:mt-8 min-w-16 min-h-16 grid place-items-center justify-self-start border-4 border-current">
              {i + 1}
            </h2>
            <h3 className="variant-h3">{question}</h3>
            <textarea
              type="text"
              className="appearance-none font-semibold bg-inherit caret-current focus-visible:outline-none variant-h4 py-4"
            />
            <div className="flex gap-4 items-center">
              <button className="prev min-w-32 hover:bg-neutral-700 hover:dark:bg-neutral-300 transition-colors  px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-950 font-semibold variant-h6">
                Previous
              </button>
              <button className="ms-auto min-w-32 hover:bg-neutral-700 hover:dark:bg-neutral-300 transition-colors  next px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-950 font-semibold variant-h6">
                Next
              </button>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
