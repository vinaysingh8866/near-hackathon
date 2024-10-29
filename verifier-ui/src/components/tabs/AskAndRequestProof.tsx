'use client'

import { Box, Button, createListCollection, Flex, Input, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Tabs } from "@chakra-ui/react"
import ProofRequestsTab from "../tabs-pannle/ProofRequestsTab";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import { useState } from "react";

interface AskAndRequestProofProps {

}

export default function AskAndRequestProof({ }: AskAndRequestProofProps) {

    const connectionList = createListCollection({
        items: [
            { label: "React.js", value: "react" },
            { label: "Vue.js", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
        ],
    })

    const [currentConnection,setCurrentConnection]=useState('')
    return (
        <>

            <Tabs.Root w={'full'} defaultValue={'ask for proof'}>
                <Tabs.List gap={'1.5rem'}>
                    <Tabs.Trigger value="ask for proof">Ask for proof</Tabs.Trigger>
                    <Tabs.Trigger value="proof requests">Proof Requests</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content py={'1rem'} value="ask for proof">
                    <SelectRoot w={'full'} maxW={{'base':'full','md':'100%'}} collection={connectionList} value={[currentConnection]} onValueChange={(e) => {
                        console.log(e.value)
                        setCurrentConnection(e.value[0])
                    }}>
                        <Text fontSize={'18px'} fontWeight={'semibold'}>
                            Ask proof requests
                        </Text>

                        <SelectLabel mt={'1rem'} fontSize={{'base':'14px','md':'16px'}} fontWeight={'semibold'}>Connection List</SelectLabel>
                        <SelectTrigger rounded={'full'}>
                            <SelectValueText fontSize={{'base':'14px','md':'16px'}} rounded={'full'} px={'1rem'} placeholder="Select Connection" />
                        </SelectTrigger>
                        <SelectContent >
                            {connectionList.items.map((movie) => (
                                <SelectItem px={'1rem'} py={'0.25rem'} item={movie} key={movie.value}>
                                    {movie.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>
                </Tabs.Content>

                <Tabs.Content py={'1rem'} value="proof requests">
                    <ProofRequestsTab />
                </Tabs.Content>
            </Tabs.Root>
        </>
    )
}