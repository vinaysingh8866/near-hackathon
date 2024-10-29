"use client";

import {
  VStack,
  HStack,
  Text,
  Button,
  Input,
  createListCollection,
} from "@chakra-ui/react";
import InvitationsTable from "../tables/InvitationsTable";
import { useState } from "react";
import { FaLessThan } from "react-icons/fa";
import SelectField from "./SelectField";

interface InvitationsPageProps {}

export enum InvitationSubPages {
  "Create Invitation",
  "Edit Invitation",
  "Home Invitation",
}

export default function InvitationsPage({}: InvitationsPageProps) {
  const [invitationSubPage, setInvitationSubPage] =
    useState<InvitationSubPages>(InvitationSubPages["Home Invitation"]);

  const [fieldValues, setFieldValues] = useState({
    name: "",
    type: "",
    assets: "",
    startegy: "",
    materialChanges: "",
    holdings: "",
    managers: "",
  });

  // const connectionList = createListCollection({
  //     items: [
  //         { label: "React.js", value: "react" },
  //         { label: "Vue.js", value: "vue" },
  //         { label: "Angular", value: "angular" },
  //         { label: "Svelte", value: "svelte" },
  //     ],
  // })
  return (
    <VStack w={"full"}>
      {invitationSubPage == InvitationSubPages["Home Invitation"] ? (
        <>
          <HStack
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"clamp(24px,5vw,30px)"} fontWeight={"400"}>
              Funds
            </Text>
            <Button
              onClick={() => {
                setInvitationSubPage(InvitationSubPages["Create Invitation"]);
              }}
              color={"white"}
              fontWeight={"semibold"}
              variant={"plain"}
              rounded={"md"}
              px={"1rem"}
              bg={"#FFA41DFA"}
              type="button"
            >
              Create Fund +
            </Button>
          </HStack>

          <InvitationsTable
            setFieldValues={setFieldValues}
            setInvitationSubPage={setInvitationSubPage}
          />
        </>
      ) : (
        <>
          {invitationSubPage == InvitationSubPages["Create Invitation"] ? (
            <>
              <VStack
                w={"full"}
                justifyContent={"center"}
                alignItems={"start"}
                gap={"2rem"}
              >
                <HStack
                  w={"full"}
                  justifyContent={"start"}
                  alignItems={"center"}
                  gap={"1rem"}
                >
                  <FaLessThan
                    onClick={() =>
                      setInvitationSubPage(
                        InvitationSubPages["Home Invitation"]
                      )
                    }
                    cursor={"pointer"}
                    fontSize={"clamp(24px,5vw,30px)"}
                  />
                  <Text fontWeight={"normal"} fontSize={"clamp(24px,5vw,30px)"}>
                    Create Invitation
                  </Text>
                </HStack>

                <VStack
                  w={"full"}
                  maxW={"463px"}
                  justifyContent={"center"}
                  gap={"1rem"}
                  alignItems={"start"}
                >
                  <Input
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Name"
                  />

                  <Input
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Type"
                  />

                  <Input
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Assets"
                  />

                  <Input
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Strategy"
                  />

                  <Input
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Material Changes"
                  />

                  <Input
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Holdings"
                  />

                  <Input
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Managers"
                  />

                  <Button
                    alignSelf={"flex-end"}
                    px={"1rem"}
                    bg={"#FFA41DFA"}
                    type="button"
                  >
                    Add
                  </Button>
                </VStack>
              </VStack>
            </>
          ) : (
            <>
              <VStack
                w={"full"}
                justifyContent={"center"}
                alignItems={"start"}
                gap={"2rem"}
              >
                <HStack
                  w={"full"}
                  justifyContent={"start"}
                  alignItems={"center"}
                  gap={"1rem"}
                >
                  <FaLessThan
                    onClick={() =>
                      setInvitationSubPage(
                        InvitationSubPages["Home Invitation"]
                      )
                    }
                    cursor={"pointer"}
                    fontSize={"clamp(24px,5vw,30px)"}
                  />
                  <Text fontWeight={"normal"} fontSize={"clamp(24px,5vw,30px)"}>
                    Edit Invitation
                  </Text>
                </HStack>

                <VStack
                  w={"full"}
                  maxW={"463px"}
                  justifyContent={"center"}
                  gap={"1rem"}
                  alignItems={"start"}
                >
                  <Input
                    value={fieldValues.name}
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Name"
                  />

                  <Input
                    value={fieldValues.type}
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Type"
                  />

                  <Input
                    value={fieldValues.assets}
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Assets"
                  />

                  <Input
                    value={fieldValues.startegy}
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Strategy"
                  />

                  <Input
                    value={fieldValues.materialChanges}
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Material Changes"
                  />

                  <Input
                    value={fieldValues.holdings}
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Holdings"
                  />

                  <Input
                    value={fieldValues.managers}
                    border={"1px solid #D3D3D3"}
                    w={"full"}
                    px={"1rem"}
                    py={"0.5rem"}
                    type="text"
                    placeholder="Managers"
                  />

                  <Button
                    alignSelf={"flex-end"}
                    px={"1rem"}
                    bg={"#FFA41DFA"}
                    type="button"
                    onClick={async () => {
                        // const request = 
                    }}
                  >
                    Update
                  </Button>
                </VStack>
              </VStack>
            </>
          )}
        </>
      )}
    </VStack>
  );
}
