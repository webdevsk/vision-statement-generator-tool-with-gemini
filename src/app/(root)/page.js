import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ClientApp = dynamic(() => import('./clientapp'), {
  ssr: false,
})

export default function HomePage() {
  return <section>
    <div className="container">
      <Suspense fallback={
        <div className="lg:rounded-2xl flex animate-pulse flex-col lg:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 h-dvh overflow-hidden lg:h-[min(80dvh,_56rem)] lg:mt-[10dvh] [--sidebar-color:theme(colors.neutral.200)] dark:[--sidebar-color:theme(colors.neutral.800)]"></div>
      }>
        <ClientApp />
      </Suspense>
    </div>
  </section>
}