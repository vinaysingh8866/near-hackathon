
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

interface AskForProofModalProps {
    openModal: boolean
    onClose: () => void
    children:ReactNode
}

export default function AskForProofModal({ openModal, onClose, children }: AskForProofModalProps) {

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
                    <DialogTitle fontSize={'18px'} fontWeight={'semibold'}>Proof Request</DialogTitle>
                    <DialogCloseTrigger onClick={onClose}/>
                </DialogHeader>
                <DialogBody mt={'1rem'}>
                    {children}
                </DialogBody>
                {/* <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button px={'1rem'} onClick={onClose} variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button>Save</Button>
                </DialogFooter> */}
            </DialogContent>
        </DialogRoot>
    )
}