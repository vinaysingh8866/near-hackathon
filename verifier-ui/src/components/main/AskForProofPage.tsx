'use client'

import { Button, Text, VStack } from "@chakra-ui/react";
import AskForProofTable from "../tables/AskForProofTable";
import AskForProofModal from "../modals/AskForProofModal";
import { useState } from "react";

interface AskForProofPageProps{
    
}

export default function AskForProofPage({}:AskForProofPageProps ){
    const [showModal,setShowModal]=useState(false)
    const [connectionDetails,setConnectionDetails]=useState({name:''})
    return(
        <>
            <VStack w={'full'} justifyContent={'center'} alignItems={'start'} gap={'1.5rem'}>
                <Text fontSize={'clamp(24px,5vw,30px)'}>
                    Connection List
                </Text>

                <AskForProofTable setConnectionDetails={setConnectionDetails} setShowModal={setShowModal}/>
            </VStack>

            <AskForProofModal onClose={()=>setShowModal(false)} openModal={showModal}>
                <VStack w={'full'} justifyContent={'center'} alignItems={'start'} gap={'1rem'}>
                    <Text>
                        {connectionDetails.name}
                    </Text>

                    <Button cursor={'pointer'} border={'1px solid #cacaca'} fontWeight={'semibold'} unstyled px={'1rem'} py={'0.5rem'} rounded={'md'} bg={'#cacaca'} alignSelf={'self-end'} type="button">
                        Issue
                    </Button>
                </VStack>
            </AskForProofModal>
        </>
    )
}