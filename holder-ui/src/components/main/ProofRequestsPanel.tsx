'use client'

import { Button, DialogTrigger, Flex, Text, VStack } from "@chakra-ui/react"
import RequestDetailsModal from "../modals/RequestDetailsModal"
import { useState } from "react"

interface ProofRequestsPanelProps {

}

export default function ProofRequestsPanel({ }: ProofRequestsPanelProps) {
    const [openModal,setOpenModal]=useState(false)
    const [requestDetails,setRequestDetails]=useState({
        name:''
    })
    return (
        <>
            <Flex w={'full'} justifyContent={'start'} alignItems={'start'} flexWrap={'wrap'} gap={'1rem'}>
                {Array(5).fill(0).map((_, ind) => {
                    return (
                        // <DialogTrigger>
                            <Button onClick={()=>{
                                setOpenModal(true)
                                setRequestDetails({name:`Request ${ind+1}`})
                                }} border={'1px solid #a3cfff'} variant={'plain'} type="button" color={'white'} px={'1rem'} bg={'blue.300'} py={'0.5rem'} rounded={'md'} key={ind} _hover={{ bg: 'transparent', color: '#a3cfff' }}>
                                Request {ind + 1}
                            </Button>
                        // </DialogTrigger>
                    )
                })}
            </Flex>

            <RequestDetailsModal onClose={()=>setOpenModal(false)} openModal={openModal}>
                <VStack>
                    <Text>
                        {requestDetails.name}
                    </Text>

                    <Text>
                        Other Details here...
                    </Text>
                </VStack>
            </RequestDetailsModal>
        </>
    )
}