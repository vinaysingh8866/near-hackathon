"use client";

import { Table } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { InvitationSubPages } from "../main/InvitationsPage";

export default function InvitationsTable({
  setInvitationSubPage,
  setFieldValues,
}: {
  setInvitationSubPage: Dispatch<SetStateAction<InvitationSubPages>>;
  setFieldValues: Dispatch<
    SetStateAction<{
      name: string;
      type: string;
      assets: string;
      startegy: string;
      materialChanges: string;
      holdings: string;
      managers: string;
    }>
  >;
}) {
  return (
    // <Table.ScrollArea borderWidth="1px" maxW="xl">
    <Table.Root
      unstyled={true}
      size="lg"
      w={"full"}
      border={"1px solid #D3D3D3"}
      box-shadow="0px 4px 4px 0px #1B1B1B1A"
    >
      <Table.Header
        bg={"#F8F8F8"}
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Table.Row fontSize={"16px"} fontWeight={"semibold"}>
          <Table.ColumnHeader ps={"1.5rem"} py={"0.5rem"} textAlign={"left"}>
            Name
          </Table.ColumnHeader>
          <Table.ColumnHeader ps={"1.5rem"} py={"0.5rem"} textAlign={"left"}>
            Type
          </Table.ColumnHeader>
          <Table.ColumnHeader ps={"1.5rem"} py={"0.5rem"} textAlign={"left"}>
            Assets
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body w={"full"}>
        {items.map((item) => (
          <Table.Row
            onClick={() => {
              setInvitationSubPage(InvitationSubPages["Edit Invitation"]);
              setFieldValues({
                name: item.name,
                assets: item.assets.toString(),
                holdings: "-",
                managers: "-",
                materialChanges: "-",
                startegy: "-",
                type: item.type,
              });
            }}
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
            key={item.id}
            cursor={"pointer"}
            _hover={{ bg: "#F8F8F8", color: "black" }}
          >
            <Table.Cell ps={"1.5rem"} py={"0.5rem"} textAlign={"left"}>
              {item.name}
            </Table.Cell>
            <Table.Cell ps={"1.5rem"} py={"0.5rem"} textAlign={"left"}>
              {item.type}
            </Table.Cell>
            <Table.Cell ps={"1.5rem"} py={"0.5rem"} textAlign="left">
              {item.assets}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    // </Table.ScrollArea>
  );
}

const items = [{ id: 1, name: "Growth", type: "Mutual", assets: "100M" }];
