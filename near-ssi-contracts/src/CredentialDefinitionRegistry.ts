import { NearBindgen, call, view, near, UnorderedMap } from "near-sdk-js";

class CredentialDefinition {
  schemaId: string;
  issuer: string;

  constructor({ schemaId, issuer }: { schemaId: string; issuer: string }) {
    this.schemaId = schemaId;
    this.issuer = issuer;
  }
}

@NearBindgen({})
class CredentialDefinitionRegistry {
  static schema = {
    credentialDefinitions: { class: UnorderedMap, value: { class: CredentialDefinition } },
  };

  credentialDefinitions: UnorderedMap<CredentialDefinition> = new UnorderedMap<CredentialDefinition>('credentialDefinitions');

  // Function to register a credential definition
  @call({})
  registerCredentialDefinition({
    credDefId,
    schemaId,
    issuer,
  }: {
    credDefId: string;
    schemaId: string;
    issuer: string;
  }): void {
    // Check if Credential Definition already exists
    if (this.credentialDefinitions.get(credDefId) !== null) {
        return near.panicUtf8(Uint8Array.from([1]));
    }
    // Store the Credential Definition
    this.credentialDefinitions.set(credDefId, new CredentialDefinition({ schemaId, issuer }));
  }

  // Function to get a credential definition
  @view({})
  getCredentialDefinition({ credDefId }: { credDefId: string }): CredentialDefinition {
    const record = this.credentialDefinitions.get(credDefId);
    if (record === null) {
        return near.panicUtf8(Uint8Array.from([1]));
    }
    return record;
  }
}
