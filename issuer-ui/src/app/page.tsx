'use client'

import HomePage from "@/components/main/HomePage";
import AcceptPage from "@/components/modals/accept";
import IssuePage from "@/components/modals/issue";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [togglePage,setTogglePage]=useState(false)
  return (
    <>
      {/* {
        !togglePage?
        <AcceptPage toggleBtn={()=>{
          setTogglePage(!togglePage)
        }}/>:
        <IssuePage toggleBtn={()=>{
          setTogglePage(!togglePage)
        }}/>
      } */}
      <HomePage/>
    </>
  );
}
