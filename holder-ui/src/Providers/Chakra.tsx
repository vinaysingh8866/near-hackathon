"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "@/components/ui/color-mode"
import { ReactNode } from "react"

export default function Chakra({children}: {children:ReactNode}) {
    return (
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider>{children}</ColorModeProvider>
        </ChakraProvider>
    )
}
