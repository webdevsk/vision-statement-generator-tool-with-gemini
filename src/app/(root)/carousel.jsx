"use client"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { questions } from "@/data/questions"
import { useEmblaPrevNextButtons } from "@/hooks/use-embla-prev-next-button"
import { cn } from "@/lib/utils"
import { IconAdjustmentsHorizontal, IconSparkles } from "@tabler/icons-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getGeminiResponse } from "@/actions/get-gemini-response"
import { generatedPrompt } from "@/lib/generated-prompts"
import { toast } from "sonner"
import useLocalStorage from "@/hooks/use-local-storage"

export function EmblaCarousel({ embla }) {
  // Creating a tuple with questions and answers
  const initialPromptData = useMemo(
    () => questions.map(q => [q, ""]),
    [questions]
  )
  const initialConfig = { "Character Limit": 1000, "Line Limit": 100 }

  const [emblaRef, emblaApi] = embla
  const [promptData, setPromptData] = useLocalStorage(
    "promptData",
    initialPromptData
  )
  const [config, setConfig] = useLocalStorage("config", initialConfig)
  const [response, setResponse] = useLocalStorage("response", "")
  const [loading, setLoading] = useState(false)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = useEmblaPrevNextButtons(emblaApi)

  function newSession() {
    setPromptData(initialPromptData)
    setConfig(initialConfig)
    setResponse("")
    onNextButtonClick()
  }

  const getResponse = useCallback(async () => {
    try {
      if (!promptData[0][1] || !promptData[1][1])
        throw new Error("First 2 questions are mendatory")
      setLoading(true)
      toast("Generating Vision Statement...", {
        id: "gemini-promise",
        duration: 3000
      })
      const { data, message } = await getGeminiResponse(
        generatedPrompt(promptData, config)
      )
      if (!data) throw new Error(message)
      setResponse(data)
      toast.success("Vision Statement generated successfully")
      onNextButtonClick()
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
      toast.dismiss("gemini-promise")
    }
  })

  //handle Enter and Tab key press to move over to the next slide
  function handleKeyDown(e) {
    if (e.key !== "Enter" && e.key !== "Tab") return
    e.preventDefault()
    onNextButtonClick()
  }

  useEffect(() => {
    if (!emblaApi) return
    function logSlidesInView(emblaApi) {
      // Auto focus input element in current slide for seamless operations
      // scrolling has finished. Depends on "inViewThreshold"
      emblaApi.slidesInView().length == 1 &&
        emblaApi
          .slideNodes()
          [emblaApi.selectedScrollSnap()]?.querySelector(
            "textarea:not([tabIndex='-1'])"
          )
          ?.focus()
    }
    emblaApi.on("slidesInView", logSlidesInView)
    return () => {
      emblaApi.off("slidesInView", logSlidesInView)
    }
  }, [emblaApi])

  return (
    <div
      className="embla overflow-hidden h-full py-2 lg:rounded-2xl"
      ref={emblaRef}
    >
      <div className="embla__container max-lg:px-2 pe-2 gap-y-4 *:bg-neutral-50 dark:*:bg-neutral-900 grid auto-cols-fr h-full auto-rows-[100%] *:p-4 *:lg:p-10">
        {/* Start page */}
        <EmblaSlide className="text-center">
          <h1 className="variant-h1 mt-12">Purpose Foundry</h1>
          <h4 className="variant-h4 font-semibold">
            Generate vision statement for your business using Gemini Ai
          </h4>
          <h5 className="mt-24 variant-h5 max-w-xl lg:mx-auto">
            This App will ask you some basic questions regarding your business.
            Upon submission of your information we will use Gemini to generate a
            Vision Statement.
          </h5>
          <div className="flex gap-4 items-center">
            <Button
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="mx-auto"
            >
              Load Previous
            </Button>
            <Button
              onClick={newSession}
              disabled={nextBtnDisabled}
              className="mx-auto"
            >
              Get Started
            </Button>
          </div>
        </EmblaSlide>

        {/* Questions */}
        {questions?.map((question, i) => (
          <EmblaSlide
            TagName="label"
            key={i}
          >
            <h2 className="leading-none variant-h2 rounded-full mt-4 lg:mt-8 min-w-12 min-h-12 lg:min-w-16 lg:min-h-16 grid place-items-center justify-self-start border-4 border-current">
              {i + 1}
            </h2>
            <h3 className="variant-h3">{question}</h3>
            <div>
              <textarea
                placeholder="Answer"
                onKeyDown={handleKeyDown}
                rows={2}
                maxLength={200}
                value={promptData[i][1]}
                onChange={e =>
                  setPromptData(prevState =>
                    prevState.map((t, index) =>
                      index !== i ? t : [t[0], e.target.value]
                    )
                  )
                }
                className="appearance-none min-w-0 w-full font-semibold bg-inherit resize-none caret-current focus-visible:outline-none variant-h4 my-4"
              />
            </div>
            <div className="flex gap-4 justify-between items-center">
              <Button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                title="Previous"
              >
                Previous
              </Button>
              <Button
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                title={promptData[i][1] ? "Next" : "Skip"}
              >
                {promptData[i][1] ? "Next" : "Skip"}
              </Button>
            </div>
          </EmblaSlide>
        ))}

        {/* Config Page */}
        <EmblaSlide>
          <h2 className="leading-none variant-h2 rounded-full mt-4 lg:mt-8 min-w-12 min-h-12 lg:min-w-16 lg:min-h-16 grid place-items-center justify-self-start border-4 border-current">
            <IconAdjustmentsHorizontal size={56} />
          </h2>
          <h3 className="variant-h3">Config</h3>
          <div className="my-4 flex flex-col gap-x-3 gap-y-6 *:grid lg:*:grid-cols-2 *:auto-rows-max *:gap-2">
            <div>
              <h5 className="variant-h5">Character Limit:</h5>
              <Slider
                min={500}
                max={1000}
                step={50}
                value={[config["Character Limit"]]}
                onChange={value =>
                  setConfig(prevState => ({
                    ...prevState,
                    "Character Limit": value[0]
                  }))
                }
              />
            </div>
            <div>
              <h5 className="variant-h5">Line Limit:</h5>
              <Slider
                min={1}
                max={100}
                value={[config["Line Limit"]]}
                onChange={value =>
                  setConfig(prevState => ({
                    ...prevState,
                    "Line Limit": value[0]
                  }))
                }
              />
            </div>
            <div>
              <h5 className="variant-h5">Additional Instructions:</h5>
              <textarea
                rows={3}
                maxLength={200}
                tabIndex={-1}
                value={config["Additional Instructions"]}
                onChange={e =>
                  setConfig(prevState => ({
                    ...prevState,
                    "Additional Instructions": e.target.value
                  }))
                }
                className="border-2 resize-none focus-visible:outline-none p-2 variant-p bg-inherit border-current"
              ></textarea>
            </div>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <Button
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              title="Previous"
            >
              Previous
            </Button>
            <Button
              onClick={getResponse}
              disabled={loading}
              title="Generate"
            >
              <div className="flex gap-2 items-center">
                <IconSparkles />
                <span>Generate</span>
              </div>
            </Button>
          </div>
        </EmblaSlide>

        {/* Generation Page */}
        <EmblaSlide>
          <div className="h-full overflow-y-auto row-span-full flex flex-col gap-4 justify-between">
            {!response && (
              <h4 className="variant-h4 opacity-50 font-bold text-center mt-8">
                Vision Statement will be generated here
              </h4>
            )}
            <div
              className="vision-statement"
              dangerouslySetInnerHTML={{ __html: response }}
            ></div>

            <div className="flex gap-4 justify-between items-center">
              <Button
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                title="Previous"
              >
                Previous
              </Button>
              <Button
                onClick={getResponse}
                disabled={loading}
                title="Regenerate"
              >
                <div className="flex gap-2 items-center">
                  <IconSparkles />
                  <span>Regenerate</span>
                </div>
              </Button>
            </div>
          </div>
        </EmblaSlide>
      </div>
    </div>
  )
}

function EmblaSlide({ TagName = "div", className, children, ...rest }) {
  return (
    <TagName
      className={cn(
        "embla__slide border border-current rounded-2xl lg:rounded-xl gap-4 grid auto-cols-fr grid-rows-[max-content_max-content_minmax(0,_1fr)_max-content]",
        className
      )}
      {...rest}
    >
      {children}
    </TagName>
  )
}
