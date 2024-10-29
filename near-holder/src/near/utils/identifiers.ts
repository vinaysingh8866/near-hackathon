import type { ParsedDid } from "@credo-ts/core";

import { TypedArrayEncoder, utils } from "@credo-ts/core";
import { isBase58 } from "class-validator";

const ID_CHAR = "([a-z,A-Z,0-9,-])";
const NETWORK = "(testnet|mainnet)";
const IDENTIFIER = `((?:${ID_CHAR}*:)*(${ID_CHAR}+))`;
const PATH = `(/[^#?]*)?`;
const QUERY = `([?][^#]*)?`;
const VERSION_ID = `(.*?)`;
const FRAGMENT = `([#].*)?`;

export const nearSdkAnonCredsRegistryIdentifierRegex = new RegExp(
  `^did:near:${NETWORK}:${IDENTIFIER}${PATH}${QUERY}${FRAGMENT}$`
);

export const nearDidRegex = new RegExp(
  `^did:near:${NETWORK}:${IDENTIFIER}${QUERY}${FRAGMENT}$`
);
export const nearDidVersionRegex = new RegExp(
  `^did:near:${NETWORK}:${IDENTIFIER}/version/${VERSION_ID}${QUERY}${FRAGMENT}$`
);
export const nearDidVersionsRegex = new RegExp(
  `^did:near:${NETWORK}:${IDENTIFIER}/versions${QUERY}${FRAGMENT}$`
);
export const nearDidMetadataRegex = new RegExp(
  `^did:near:${NETWORK}:${IDENTIFIER}/metadata${QUERY}${FRAGMENT}$`
);
export const nearResourceRegex = new RegExp(
  `^did:near:${NETWORK}:${IDENTIFIER}/resources/${IDENTIFIER}${QUERY}${FRAGMENT}$`
);
export const nearResourceMetadataRegex = new RegExp(
  `^did:near:${NETWORK}:${IDENTIFIER}/resources/${IDENTIFIER}/metadata${QUERY}${FRAGMENT}`
);

export type ParsednearDid = ParsedDid & { network: string };
export function parsenearDid(didUrl: string): ParsednearDid | null {
  if (didUrl === "" || !didUrl) return null;
  const sections = didUrl.match(nearSdkAnonCredsRegistryIdentifierRegex);
  if (sections) {
    if (
      !(
        utils.isValidUuid(sections[2]) ||
        (isBase58(sections[2]) &&
          TypedArrayEncoder.fromBase58(sections[2]).length == 16)
      )
    ) {
      return null;
    }
    const parts: ParsednearDid = {
      did: `did:near:${sections[1]}:${sections[2]}`,
      method: "near",
      network: sections[1],
      id: sections[2],
      didUrl,
    };
    if (sections[7]) {
      const params = sections[7].slice(1).split("&");
      parts.params = {};
      for (const p of params) {
        const kv = p.split("=");
        parts.params[kv[0]] = kv[1];
      }
    }
    if (sections[6]) parts.path = sections[6];
    if (sections[8]) parts.fragment = sections[8].slice(1);
    return parts;
  }
  return null;
}
