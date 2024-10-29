'use client'

import { currentPages } from "@/contexts/GlobalVariableContext";
import { Button, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface SidebarProps{
    setSidebarWidth:Dispatch<SetStateAction<number>>
    setCurrentPage:Dispatch<SetStateAction<currentPages>>
    currentPage:currentPages
}

export default function Sidebar({setSidebarWidth,setCurrentPage,currentPage}:SidebarProps ){
    const divRef=useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(divRef.current){
            setSidebarWidth(divRef.current.offsetWidth)
        }
    },[])
    return(
        <VStack ref={divRef} w={'full'} maxW={'200px'} minH={'calc(100dvh - 100px)'} h={'full'} position={'fixed'} left={0} top={100} bg={'#1B1B1B'} px={'1.5rem'} py={'2.5rem'}>
            <Button onClick={()=>setCurrentPage(currentPages.Credentials)} px={'1rem'} display={'block'} textAlign={'left'} color={'white'} bg={currentPage==currentPages.Credentials?'#3B3B3B':'none'} w={'full'} variant={'plain'} type="button">
            Credentials
            </Button>
            <Button onClick={()=>setCurrentPage(currentPages["Proof Requests"])} px={'1rem'} display={'block'} textAlign={'left'} color={'white'} bg={currentPage==currentPages["Proof Requests"]?'#3B3B3B':'none'} w={'full'} variant={'plain'} type="button">
                Proof Requests
            </Button>
        </VStack>
    )
}