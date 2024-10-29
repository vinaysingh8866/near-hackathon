'use client'

import { VStack, Text, Button, Input, createListCollection, HStack } from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select"
import { useState } from "react";


interface issueProps {
    toggleBtn: () => void
}

export default function IssuePage({ toggleBtn }: issueProps) {
    const [currentConnection, setCurrentConnection] = useState('')
    const [connectionDetails,setConnectionDetails]=useState({
        name:'',
        age:''
    })
    const connectionList = createListCollection({
        items: [
            { label: "React.js", value: "react" },
            { label: "Vue.js", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
        ],
    })
    return (
        <VStack px={{ 'base': '2rem', 'mdTo2xl': '3.5rem', "2xl": '5rem' }} minH={'calc(100dvh - 70.5px)'} w={'full'} justifyContent={'center'} alignItems={'center'} bg={'#09191F'}>
            <VStack minH={'50dvh'} w={'full'} maxW={'400px'} border={'1px solid #FDFDFD'} rounded={'md'} shadow={'md'} px={'1rem'} py={'1.5rem'} justifyContent={'center'} alignItems={'center'} gap={'2.5rem'} bg={'#FEF8DD'}>
                <Text color={'#454545'} textAlign={'center'} fontSize={{ 'base': '20px', 'mdTo2xl': '26px', '2xl': '28px' }} fontWeight={'semibold'}>
                    Driver License
                </Text>
                <VStack w={'full'} justifyContent={'center'} alignItems={'center'} gap={'1rem'}>
                    {/* <Input placeholder="Enter the url" fontSize={'14px'} fontWeight={''} w={'full'} maxW={'85%'} type="text" outline={'none'} px={'1.5rem'} py={'1rem'} rounded={'full'} border={'1px solid #CDCDCD'} /> */}
                    <SelectRoot w={'full'} maxW={{'base':'full','md':'85%'}} collection={connectionList} value={[currentConnection]} onValueChange={(e) => {
                        console.log(e.value)
                        setCurrentConnection(e.value[0])
                    }}>
                        <SelectLabel fontSize={{'base':'14px','md':'18px'}} fontWeight={'semibold'}>Connection List</SelectLabel>
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

                    {/* Name and age for the connection */}
                    { currentConnection!==''&&
                        <VStack w={'full'}>
                            <HStack maxW={{'base':'full','md':'85%'}} w={'full'} justifyContent={'space-between'} alignItems={'center'} gap={'1rem'}>
                                <Text minW={'4rem'}>Name:</Text>
                                <Input value={connectionDetails.name} onChange={(e)=>setConnectionDetails({name:e.target.value,age:connectionDetails.age})} placeholder="Enter the name" fontSize={'14px'} fontWeight={''} w={'full'} type="text" outline={'none'} px={'1.5rem'} py={'1rem'} rounded={'full'} border={'1px solid #CDCDCD'} />
                            </HStack>
                            <HStack maxW={{'base':'full','md':'85%'}} w={'full'} justifyContent={'space-between'} alignItems={'center'} gap={'1rem'}>
                                <Text minW={'4rem'}>Age:</Text>
                                <Input value={connectionDetails.age} onChange={(e)=>setConnectionDetails({age:e.target.value,name:connectionDetails.name})} placeholder="Enter the age" fontSize={'14px'} fontWeight={''} w={'full'} type="number" outline={'none'} px={'1.5rem'} py={'1rem'} rounded={'full'} border={'1px solid #CDCDCD'} />
                            </HStack>
                        </VStack>
                    }

                    {/* <Text>
                        {currentConnection}
                    </Text> */}

                    <HStack>
                        <Button type="button" onClick={() => toggleBtn()} px={'2rem'} py={'0.5rem'} rounded={'md'} bg={'gray.400'} variant={'plain'} color={'blackAlpha.700'} fontSize={'14px'} border={'1px solid #a1a1aa'} fontWeight={'bold'} _hover={{ bg: 'transparent', color: '#a1a1aa' }}>
                            Back
                        </Button>

                        <Button disabled={Object.values(connectionDetails).includes('')} px={'2rem'} py={'0.5rem'} rounded={'md'} bg={'blue.400'} type="button" variant={'plain'} color={'white'} fontSize={'14px'} border={'1px solid #60a5fa'} fontWeight={'bold'} _hover={{ bg: 'transparent', color: '#60a5fa' }}>
                            Issue
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    )
}