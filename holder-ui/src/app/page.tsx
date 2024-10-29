// 'use client'

import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Tabs } from "@chakra-ui/react"
import { LuCheckSquare, LuFolder, LuUser } from "react-icons/lu"
import ProofRequestsPanel from "@/components/main/ProofRequestsPanel";
import HomePage from "@/components/main/HomePage";
// import { useState } from "react";

export default function Home() {
  // const [togglePage,setTogglePage]=useState(false)
  return (
    // <VStack px={{ 'base': '2rem', 'mdTo2xl': '3.5rem', "2xl": '5rem' }} minH={'calc(100dvh - 100px)'} w={'full'} justifyContent={'center'} alignItems={'center'} bg={'#09191F'}>
    //   <VStack minH={'50dvh'} w={'full'} maxW={'400px'} border={'1px solid #FDFDFD'} rounded={'md'} shadow={'md'} px={'2rem'} py={'1.5rem'} justifyContent={'start'} alignItems={'start'} gap={'2.5rem'} bg={'#FEF8DD'}>
    //   <Tabs.Root w={'full'} defaultValue={'credentials'}>
    //   <Tabs.List gap={'1.5rem'}>
    //     <Tabs.Trigger value="credentials">Credentials</Tabs.Trigger>
    //     <Tabs.Trigger value="proof requests">Proof Requests</Tabs.Trigger>
    //   </Tabs.List>

    //   <Tabs.Content  py={'1rem'} value="credentials">
    //     <Flex w={'full'} justifyContent={'start'} alignItems={'start'} flexWrap={'wrap'} gap={'1rem'}>
    //       {Array(5).fill(0).map((_,ind)=>{
    //         return(
    //           <Text color={'white'} px={'1rem'} bg={'blue.300'} py={'0.5rem'} rounded={'md'} key={ind}>
    //             Credential {ind+1}
    //           </Text>
    //         )
    //       })}
    //     </Flex>
    //   </Tabs.Content>

    //   <Tabs.Content py={'1rem'} value="proof requests">
    //     <ProofRequestsPanel/>
    //   </Tabs.Content>
    // </Tabs.Root>
    //   </VStack>
    // </VStack>
    // <Text>
    //   Hello World
    // </Text>
    <HomePage/>
  );
}
