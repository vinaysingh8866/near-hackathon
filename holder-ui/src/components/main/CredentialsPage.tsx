import { Text, VStack } from "@chakra-ui/react";
import CredentialsTable from "../tables/CredentialsTable";

interface CredentialsPageProps{
    
}

export default function CredentialsPage({}:CredentialsPageProps ){
    return(
        <VStack w={'full'} justifyContent={'center'} alignItems={'start'} gap={'1.5rem'}>
            <Text fontSize={'clamp(24px,5vw,30px)'}>
                Credentials
            </Text>

            <CredentialsTable/>
        </VStack>
    )
}