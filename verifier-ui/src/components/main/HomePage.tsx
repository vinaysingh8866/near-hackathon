'use client'

import { currentPages, useGlobalVariableContext } from "@/contexts/GlobalVariableContext"
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react"
// import InvitationsTable from "../tables/InvitationsTable"
import ProofRequestsPage from "./ProofRequestsPage"
import AskForProofPage from "./AskForProofPage"

interface HomePageProps{
    
}

export default function HomePage({}:HomePageProps ){
    const {currentPage}=useGlobalVariableContext()
    return(
        <Box px={'2rem'} py={'2rem'} w={'full'}>
            {
                currentPage==currentPages["Ask For Proof"]?
                <>
                    <AskForProofPage/>
                </>
                :
                <>
                    <ProofRequestsPage/>
                </>
            }
        </Box>
    )
}