"use client";

import { VStack, HStack, Text, Button, Input } from "@chakra-ui/react";
import InvitationsTable from "../tables/InvitationsTable";
import ConnectionsTable from "../tables/ConnectionsTable";
import { useState } from "react";
import { FaLessThan } from "react-icons/fa";

interface ConnectionsPageProps {}

export enum ConnectionSubPages {
  "Create Connection",
  "Edit Connection",
  "Home Connection",
}

export default function ConnectionsPage({}: ConnectionsPageProps) {
  const [connectionSubPage, setConnectionSubPage] =
    useState<ConnectionSubPages>(ConnectionSubPages["Home Connection"]);

  const [fieldValues, setFieldValues] = useState({
    name: "",
    type: "",
  });
  return (
    <VStack w={"full"}>
      {connectionSubPage == ConnectionSubPages["Home Connection"] ? (
        <>
          <HStack
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"clamp(24px,5vw,30px)"} fontWeight={"400"}>
              Subscribers
            </Text>
            <Button
              onClick={() =>
                setConnectionSubPage(ConnectionSubPages["Create Connection"])
              }
              color={"white"}
              fontWeight={"semibold"}
              variant={"plain"}
              rounded={"md"}
              px={"1rem"}
              bg={"#FFA41DFA"}
              type="button"
            >
              Add Subscriber +
            </Button>
          </HStack>

          <ConnectionsTable
            setFieldValues={setFieldValues}
            setConnectionSubPage={setConnectionSubPage}
          />
        </>
      ) : (
        <>
          {connectionSubPage == ConnectionSubPages["Create Connection"] ? (
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
                      setConnectionSubPage(
                        ConnectionSubPages["Home Connection"]
                      )
                    }
                    cursor={"pointer"}
                    fontSize={"clamp(24px,5vw,30px)"}
                  />
                  <Text fontWeight={"normal"} fontSize={"clamp(24px,5vw,30px)"}>
                    Add Connection
                  </Text>
                </HStack>

                <VStack
                  w={"full"}
                  maxW={"463px"}
                  justifyContent={"center"}
                  gap={"1rem"}
                  alignItems={"start"}
                >
                  <HStack
                    gap={0}
                    w={"full"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Input
                      border={"1px solid #D3D3D3"}
                      w={"full"}
                      px={"1rem"}
                      py={"0.5rem"}
                      type="text"
                      placeholder="Name"
                    />

                    {/* <Input border={'1px solid #D3D3D3'} w={'full'} px={'1rem'} py={'0.5rem'}  type='text' placeholder="Type"/> */}

                    <Button
                      alignSelf={"flex-end"}
                      px={"1rem"}
                      bg={"#FFA41DFA"}
                      type="button"
                    >
                      Add
                    </Button>
                  </HStack>
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
                      setConnectionSubPage(
                        ConnectionSubPages["Home Connection"]
                      )
                    }
                    cursor={"pointer"}
                    fontSize={"clamp(24px,5vw,30px)"}
                  />
                  <Text fontWeight={"normal"} fontSize={"clamp(24px,5vw,30px)"}>
                    {fieldValues.name}
                  </Text>
                </HStack>

                <VStack
                  w={"full"}
                  maxW={"463px"}
                  justifyContent={"center"}
                  gap={"1rem"}
                  alignItems={"start"}
                >
                  <HStack
                    w={"full"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={0}
                  >
                    <Input
                      border={"1px solid #D3D3D3"}
                      w={"full"}
                      px={"1rem"}
                      py={"0.5rem"}
                      type="text"
                      placeholder="Name"
                    />

                    {/* <Input border={'1px solid #D3D3D3'} w={'full'} px={'1rem'} py={'0.5rem'}  type='text' placeholder="Type"/> */}

                    <Button
                      alignSelf={"flex-end"}
                      px={"1rem"}
                      bg={"#FFA41DFA"}
                      type="button"
                    >
                      Send
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </>
          )}
        </>
      )}
    </VStack>
  );
}
