'use client'

import { VStack, Text, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

interface acceptProps {
    toggleBtn:()=>void
}

export default function AcceptPage({ toggleBtn}: acceptProps) {
    const [url,setUrl]=useState('')
    return (
        <VStack px={{ 'base': '2rem', 'mdTo2xl': '3.5rem', "2xl": '5rem' }} minH={'calc(100dvh - 70.5px)'} w={'full'} justifyContent={'center'} alignItems={'center'} bg={'#09191F'}>
            <VStack minH={'50dvh'} w={'full'} maxW={'400px'} border={'1px solid #FDFDFD'} rounded={'md'} shadow={'md'} px={'1rem'} py={'1.5rem'} justifyContent={'center'} alignItems={'center'} gap={'2.5rem'} bg={'#FEF8DD'}>
                <Text color={'#454545'} textAlign={'center'} fontSize={{ 'base': '20px', 'mdTo2xl': '26px', '2xl': '28px' }} fontWeight={'semibold'}>
                    Accept Invitation
                </Text>
                <VStack w={'full'} justifyContent={'center'} alignItems={'center'} gap={'1rem'}>
                    <Input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="Enter the url" fontSize={'14px'} fontWeight={''} w={'full'} maxW={'85%'} type="url" outline={'none'} px={'1.5rem'} py={'1rem'} rounded={'full'} border={'1px solid #CDCDCD'} />
                    <Button disabled={url==''} onClick={()=>toggleBtn()} px={'2rem'} py={'0.5rem'} rounded={'md'} bg={'blue.400'} type="button" variant={'plain'} color={'white'} fontSize={'14px'} border={'1px solid #60a5fa'} fontWeight={'bold'} _hover={{ bg: 'transparent', color: '#60a5fa' }}>
                        Accept
                    </Button>
                </VStack>
            </VStack>
        </VStack>
    )
}