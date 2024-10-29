'use client'

import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Tabs } from "@chakra-ui/react"
import { LuCheckSquare, LuFolder, LuUser } from "react-icons/lu"
import ProofRequestsTab from "@/components/tabs-pannle/ProofRequestsTab";
import AskAndRequestProof from "@/components/tabs/AskAndRequestProof";
import { useState } from "react";
import Accept from "@/components/main/accept";
import HomePage from "@/components/main/HomePage";
// import { useState } from "react";

export default function Home() {
  const [togglePage, setTogglePage] = useState(false)
  return (
    // <VStack px={{ 'base': '2rem', 'mdTo2xl': '3.5rem', "2xl": '5rem' }} minH={'calc(100dvh - 70.5px)'} w={'full'} justifyContent={'center'} alignItems={'center'} bg={'#09191F'}>
    //   <VStack minH={'50dvh'} w={'full'} maxW={'400px'} border={'1px solid #FDFDFD'} rounded={'md'} shadow={'md'} px={'1rem'} py={'1.5rem'} justifyContent={!togglePage?'center':'start'} alignItems={!togglePage?'center':'start'} gap={'2.5rem'} bg={'#FEF8DD'}>
    //     {togglePage ?
    //       <AskAndRequestProof /> :

    //       <Accept toggleBtn={()=>setTogglePage(!togglePage)}/>

    //     }
    //   </VStack>
    // </VStack>
    // <Text>
    //   Hello World
    // </Text>
    <HomePage/>
  );
}
