'use client'

import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import CredentialsTable from "../tables/CredentialsTable";
import ProofRequestsTable from "../tables/ProofRequestsTable";
import { useState } from "react";
import { FaLessThan } from "react-icons/fa";

interface ProofRequestsPageProps{
    
}

export default function ProofRequestsPage({}:ProofRequestsPageProps ){
    const [showProofRequestDetails,setShowProofRequestDetails]=useState(false)
    const [proofRequestValues,setProofRequestValues]=useState({
        name:'',type:'',assets:'',strategy:'',material_changes:'',holdings:'',managers:''
    })

    const proofRequestKeys=Object.keys(proofRequestValues)
    return(

        <>  {!showProofRequestDetails?
                <VStack w={'full'} justifyContent={'center'} alignItems={'start'} gap={'1.5rem'}>
                    <Text fontSize={'clamp(24px,5vw,30px)'}>
                        Proof Requests
                    </Text>

                    <ProofRequestsTable setProofRequestValues={setProofRequestValues} setShowProofRequestDetails={setShowProofRequestDetails}/>
                </VStack>
                :

                <>
                    <VStack w={'full'} justifyContent={'center'} alignItems={'start'} gap={'1.5rem'}>
                        <HStack w={'full'} justifyContent={'start'} alignItems={'center'} gap={'1rem'}>
                                <FaLessThan onClick={()=>setShowProofRequestDetails(false)} cursor={'pointer'} fontSize={'clamp(24px,5vw,30px)'}/>
                                <Text whiteSpace={'nowrap'} fontWeight={'normal'} fontSize={'clamp(24px,5vw,30px)'}>
                                    {
                                        proofRequestValues.name
                                    }
                                </Text>
                                <HStack w={'full'} justifyContent={'start'} alignItems={'center'} gap={'0.5rem'}>
                                    <Image src="/right-sign.svg" alt="Correct-Sign" width={5} height={5}/>
                                    <Text>
                                        This fund has been verified
                                    </Text>
                                </HStack>
                        </HStack>

                        <VStack w={'full'} maxW={'631px'} justifyContent={'center'} alignItems={'start'} boxShadow={'0px 4px 4px 0px #1B1B1B1A'} border={'1px solid #D3D3D3'} px={'1rem'} py={'1rem'} gap={'1rem'}>
                            {
                                Object.values(proofRequestValues).map((item,ind)=>{
                                    return(
                                        <HStack w={'full'} justifyContent={'start'} gap={'30%'} alignItems={'center'} key={item}>
                                            <Text minW={'150px'} fontWeight={'semibold'} textTransform={'capitalize'}>
                                                {proofRequestKeys[ind].replace('_',' ')}
                                            </Text>

                                            <Text>
                                                {item}
                                            </Text>
                                        </HStack>
                                    )
                                })
                            }
                        </VStack>
                    </VStack>
                </>
            }
        </>
    )
}