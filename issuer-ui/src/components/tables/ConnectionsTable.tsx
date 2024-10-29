"use client";

import { Table } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { ConnectionSubPages } from "../main/ConnectionsPage";

interface ConnectionsTableProps {
  setConnectionSubPage: Dispatch<SetStateAction<ConnectionSubPages>>;
  setFieldValues: Dispatch<SetStateAction<{ name: string; type: string }>>;
}

export default function ConnectionsTable({
  setConnectionSubPage,
  setFieldValues,
}: ConnectionsTableProps) {
  return (
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
            cursor={"pointer"}
            _hover={{ bg: "#F8F8F8", color: "black" }}
            onClick={() => {
              setFieldValues({ name: item.name, type: item.type });

              setConnectionSubPage(ConnectionSubPages["Edit Connection"]);
            }}
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
            key={item.id}
          >
            <Table.Cell ps={"1.5rem"} py={"0.5rem"} textAlign={"left"}>
              {item.name}
            </Table.Cell>
            <Table.Cell ps={"1.5rem"} py={"0.5rem"} textAlign={"left"}>
              {item.type}
            </Table.Cell>
            {/* <Table.Cell ps={'1.5rem'} py={'0.5rem'} textAlign="left">{item.assets}</Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

const items = [
  { id: 1, name: "ABC Dealer", type: "Dealer", assets: 999.99 },
  { id: 2, name: "Regulator", type: "Regulator", assets: 49.99 },
];
