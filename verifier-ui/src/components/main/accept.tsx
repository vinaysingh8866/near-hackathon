'use client'

import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

interface acceptProps{
    toggleBtn:()=>void
}

export default function Accept({toggleBtn}:acceptProps ){
    const [url,setUrl]=useState('')
    return(
        <>
            <Text color={'#454545'} textAlign={'center'} fontSize={{ 'base': '20px', 'mdTo2xl': '26px', '2xl': '28px' }} fontWeight={'semibold'}>
                Accept Invitation
            </Text>
            <VStack w={'full'} justifyContent={'center'} alignItems={'center'} gap={'1rem'}>
                <Input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="Enter the url" fontSize={'14px'} fontWeight={''} w={'full'} maxW={'85%'} type="url" outline={'none'} px={'1.5rem'} py={'1rem'} rounded={'full'} border={'1px solid #CDCDCD'} />
                <Button disabled={url==''} onClick={()=>toggleBtn()} px={'2rem'} py={'0.5rem'} rounded={'md'} bg={'blue.400'} type="button" variant={'plain'} color={'white'} fontSize={'14px'} border={'1px solid #60a5fa'} fontWeight={'bold'} _hover={{ bg: 'transparent', color: '#60a5fa' }}>
                    Accept
                </Button>
            </VStack>
        </>
    )
}