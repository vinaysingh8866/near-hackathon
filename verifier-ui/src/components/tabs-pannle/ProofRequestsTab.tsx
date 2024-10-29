'use client'

import { Button, DialogTrigger, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import RequestDetailsModal from "../modals/AskForProofModal"
import { useState } from "react"

interface ProofRequestsTabProps {

}

export default function ProofRequestsTab({ }: ProofRequestsTabProps) {
    const [openModal,setOpenModal]=useState(false)
    const [requestDetails,setRequestDetails]=useState({
        name:''
    })
    return (
        <>
            <Text fontSize={'18px'} fontWeight={'semibold'}>
                Verified Proofs
            </Text>
            <Flex mt={'1rem'} w={'full'} justifyContent={'start'} alignItems={'start'} flexWrap={'wrap'} gap={'1rem'}>
                {Array(5).fill(0).map((_, ind) => {
                    return (
                        // <DialogTrigger>
                            <Button onClick={()=>{
                                setOpenModal(true)
                                setRequestDetails({name:`Proof ${ind+1}`})

                                }} border={'1px solid #a3cfff'} variant={'plain'} type="button" color={'white'} px={'1rem'} bg={'blue.300'} py={'0.5rem'} rounded={'md'} key={ind} _hover={{ bg: 'transparent', color: '#a3cfff' }}>
                                Proof {ind + 1}
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

                    <HStack w={'full'} justifyContent={'end'} alignItems={'center'} gap={'1rem'}>
                        <Button onClick={()=>setOpenModal(false)} border={'1px solid black'} color={'white'} bg={'black'} rounded={'md'} variant={'plain'} px={'1rem'} _hover={{bg:'transparent',color:'black'}} type="button">
                            Cancel
                        </Button>

                        <Button border={'1px solid #60a5fa'}  bg={'blue.400'} color={'white'} variant={'plain'} px={'1rem'} _hover={{bg:'transparent',color:'#60a5fa'}} type="button">
                            Issue
                        </Button>
                    </HStack>
                </VStack>
            </RequestDetailsModal>
        </>
    )
}