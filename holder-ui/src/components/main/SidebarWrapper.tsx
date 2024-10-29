'use client'

import { Box } from "@chakra-ui/react"
import { ReactNode, useState } from "react"
import Sidebar from "./Sidebar"
import { useGlobalVariableContext } from "@/contexts/GlobalVariableContext"

interface SidebarWrapperProps{
    children:ReactNode
}

export default function SidebarWrapper({children}:SidebarWrapperProps ){
    const [sidebarWith,setSidebarWidth]=useState(0)
    const {currentPage,setCurrentPage}=useGlobalVariableContext()
    return(
        <Box >
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} setSidebarWidth={setSidebarWidth}/>
            { sidebarWith!==0 &&
                <Box ml={sidebarWith}>
                    {children}
                </Box>
            }
        </Box>
    )
}