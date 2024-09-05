import { useCallback, useEffect, useState } from "react"

export const useEmblaPrevNextButtons = emblaApi => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(
    jump => {
      if (!emblaApi) return
      emblaApi.scrollPrev(jump)
    },
    [emblaApi]
  )

  const onNextButtonClick = useCallback(
    jump => {
      if (!emblaApi) return
      emblaApi.scrollNext(jump)
    },
    [emblaApi]
  )

  const onSelect = useCallback(emblaApi => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}
