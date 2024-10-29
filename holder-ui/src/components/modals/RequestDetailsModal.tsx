
import { Button } from "@/components/ui/button"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Text, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"

interface RequestDetailsModalProps {
    openModal: boolean
    onClose: () => void
    children:ReactNode
}

export default function RequestDetailsModal({ openModal, onClose, children }: RequestDetailsModalProps) {

    return (
        <DialogRoot placement={'center'} onInteractOutside={() => {
            onClose()
        }} open={openModal} size={'sm'}>
            {/* <DialogTrigger asChild>
                <Button variant="outline" >
                    Open
                </Button>
            </DialogTrigger> */}
            <DialogContent px={'1.5rem'} py={'1.5rem'}>
                <DialogHeader>
                    <DialogTitle fontSize={'18px'} fontWeight={'semibold'}>Request proof details</DialogTitle>
                    <DialogCloseTrigger onClick={onClose}/>
                </DialogHeader>
                <DialogBody mt={'1rem'}>
                    {children}
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button onClick={onClose} variant="plain" px={'1rem'} bg={'black'} rounded={'md'} border={'1px solid black'} color={'white'} _hover={{bg:'transparent',color:'black'}}>Cancel</Button>
                    </DialogActionTrigger>
                    {/* <Button>Save</Button> */}
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}