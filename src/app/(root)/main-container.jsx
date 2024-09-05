export function MainContainer({ children }) {
  return (
    <>
      <div className="flex max-lg:h-1 grow">
        <div className="dark:border-neutral-800 bg-[--sidebar-color] flex flex-col gap-2 flex-1 w-full h-full">
          {/* Main content here */}
          {children}
        </div>
      </div>
    </>
  )
}
