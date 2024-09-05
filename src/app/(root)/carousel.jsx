import { questions } from "@/data/questions"
import { useEmblaPrevNextButtons } from "@/hooks/use-embla-prev-next-button"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

export function EmblaCarousel({ slides, options = { axis: "y" } }) {
  // Creating a tuple with questions and answers
  const [promptData, setPromptData] = useState(questions.map(q => [q, ""]))
  // init embla
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = useEmblaPrevNextButtons(emblaApi)

  // setter function to set answers
  function setAnswer(index, value) {
    setPromptData(prevState =>
      prevState.map((t, i) => (i !== index ? t : [t[0], value]))
    )
  }

  // Auto focus input element in current slide for seamless operations
  useEffect(() => {
    if (!emblaApi) return
    function logSlidesInView(emblaApi) {
      const inView = emblaApi.slidesInView()
      inView.length === 1 &&
        emblaApi.slideNodes()[inView[0]]?.querySelector("input")?.focus()
    }
    emblaApi.on("slidesInView", logSlidesInView)
    return () => {
      emblaApi.off("slidesInView", logSlidesInView)
    }
  }, [emblaApi])

  //handle Enter and Tab key press to move over to the next slide
  function handleKeyDown(e) {
    if (e.key !== "Enter" && e.key !== "Tab") return
    e.preventDefault()
    onNextButtonClick()
  }

  return (
    <div
      className="embla overflow-hidden h-full md:rounded-2xl"
      ref={emblaRef}
    >
      <div className="embla__container max-md:px-2 py-2 pe-2 gap-y-4 *:bg-neutral-50 dark:*:bg-neutral-900 grid auto-cols-fr h-full auto-rows-[100%] *:p-4 *:md:p-10">
        <div className="embla__slide border border-current rounded-2xl md:rounded-xl gap-4 grid auto-cols-fr grid-rows-[max-content_max-content_minmax(0,_1fr)_max-content] text-center">
          <h1 className="variant-h1 mt-12">Purpose Foundry</h1>
          <h4 className="variant-h4 font-semibold">
            Generate vision statement for your business using Gemini Ai
          </h4>
          <h5 className="mt-24 variant-h5 max-w-xl md:mx-auto">
            This App will ask you some basic questions regarding your business.
            Upon submission of your information we will use Gemini to generate a
            Vision Statement.
          </h5>
          <div className="flex gap-4 items-center">
            <button
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="mx-auto min-w-32 disabled:opacity-60 disabled:pointer-events-none hover:bg-neutral-700 hover:dark:bg-neutral-300 transition-colors  next px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-950 font-semibold variant-h6"
            >
              Get Started
            </button>
          </div>
        </div>
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
                data-question-index={i}
                onKeyDown={handleKeyDown}
                value={promptData[i][1]}
                onChange={e => setAnswer(i, e.currentTarget.value)}
                className="appearance-none font-semibold bg-inherit caret-current focus-visible:outline-none variant-h4 py-4"
              />
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                title="Previous"
                className="prev min-w-32 disabled:opacity-60 disabled:pointer-events-none hover:bg-neutral-700 hover:dark:bg-neutral-300 transition-colors  px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-950 font-semibold variant-h6"
              >
                Previous
              </button>
              <button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                title={promptData[i][1] ? "Next" : "Skip"}
                className="ms-auto min-w-32 disabled:opacity-60 disabled:pointer-events-none hover:bg-neutral-700 hover:dark:bg-neutral-300 transition-colors  next px-3 py-2 bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-950 font-semibold variant-h6"
              >
                {promptData[i][1] ? "Next" : "Skip"}
              </button>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
