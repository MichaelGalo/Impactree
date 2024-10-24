'use client'

import { NextUIProvider } from "@nextui-org/react"

export function NextUIAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}