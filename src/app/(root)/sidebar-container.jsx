"use client"
import { Sidebar, SidebarBody, SidebarButton } from "@/components/ui/sidebar"
import { questions } from "@/data/questions"
import { useEmblaPagination } from "@/hooks/use-embla-pagination"
import { cn } from "@/lib/utils"
import { IconAdjustmentsHorizontal, IconSparkles } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { useState } from "react"

export function SidebarContainer({ embla }) {
  const [open, setOpen] = useState(false)

  const [_, emblaApi] = embla
  const { selectedIndex, scrollSnaps, onButtonClick } =
    useEmblaPagination(emblaApi)

  return (
    <>
      <Sidebar
        open={open}
        setOpen={setOpen}
      >
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 px-4 overflow-y-auto overflow-x-hidden">
            <Logo
              open={open}
              onClick={() => onButtonClick(0)}
            />
            <div className="mt-8 flex flex-col">
              {questions.map((question, i) => (
                <SidebarButton
                  key={i}
                  label={question}
                  onClick={() => onButtonClick(i + 1)}
                  icon={
                    <div
                      className={cn(
                        "border-2 border-current rounded-full grid place-items-center variant-small min-w-6 aspect-square",
                        selectedIndex === i + 1 && "bg-current *:invert"
                      )}
                    >
                      <span>{i + 1}</span>
                    </div>
                  }
                />
              ))}
              <SidebarButton
                label="Config"
                onClick={() => onButtonClick(11)}
                icon={
                  <div
                    className={cn(
                      "border-2 border-current rounded-full grid place-items-center variant-small min-w-6 aspect-square",
                      selectedIndex === 11 && "bg-current *:invert"
                    )}
                  >
                    <IconAdjustmentsHorizontal size={16} />
                  </div>
                }
              />
              <SidebarButton
                label="Result"
                onClick={() => onButtonClick(12)}
                icon={
                  <div
                    className={cn(
                      "border-2 border-current rounded-full grid place-items-center variant-small min-w-6 aspect-square",
                      selectedIndex === 12 && "bg-current *:invert"
                    )}
                  >
                    <IconSparkles size={16} />
                  </div>
                }
              />
            </div>
          </div>
          <div>{/* Theme toggler */}</div>
        </SidebarBody>
      </Sidebar>
    </>
  )
}

export const Logo = ({ open, ...rest }) => {
  return (
    <button
      className="variant-small flex space-x-2 items-center text-current py-1 relative z-20"
      {...rest}
    >
      <div className="h-5 w-6 bg-current  rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="variant-h6 leading-none font-bold whitespace-pre"
        >
          Purpose Foundry
        </motion.span>
      )}
    </button>
  )
}
