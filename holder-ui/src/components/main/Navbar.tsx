import { HStack, Text } from "@chakra-ui/react";
interface NavbarProps{
    
}

export default function Navbar({}:NavbarProps ){
    return(
        <HStack position={'fixed'} top={0} left={0} w={'full'} px={{'base':'2rem','mdTo2xl':'3.5rem',"2xl":'5rem'}} py={'2rem'} bg={'#31C63F'}>
            {/* <CurrentRoute heading={'Issuer'}/> */}
            <Text px={'1rem'} py={'0.5rem'} rounded={'md'} bg={'#00950E'} fontWeight={'bold'} fontSize={'16px'} color={'#FCFCFC'} textTransform={'capitalize'}>
                {/* {heading.replace('/','')} */}
                Holder
            </Text>
        </HStack>
    )
}