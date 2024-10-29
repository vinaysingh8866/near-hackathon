'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface GlobalVariableContextProps{
    children:ReactNode
}

export enum currentPages{
    'Invitations','Connections'
}

type GlobalVariableContextType={
    currentPage:currentPages
    setCurrentPage:Dispatch<SetStateAction<currentPages>>
}

const CreateGlobalVariableContext=createContext<GlobalVariableContextType | null>(null)

export const useGlobalVariableContext=()=>{
    const context=useContext(CreateGlobalVariableContext)

    if(!context){
        throw Error('You rendering it out of context!')
    }
    return context
}

export default function GlobalVariableContext({children}:GlobalVariableContextProps ){
    const [currentPage,setCurrentPage]=useState<currentPages>(currentPages.Invitations)
    return(
        <CreateGlobalVariableContext.Provider value={{currentPage,setCurrentPage}}>
            {children}
        </CreateGlobalVariableContext.Provider>
    )
}