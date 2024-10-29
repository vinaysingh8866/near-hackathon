import {
  NearBindgen,
  call,
  view,
  near,
  UnorderedMap,
  assert,
} from "near-sdk-js";

class Schema {
  schemaDetails: string;
  approvedIssuers: string[];

  constructor({
    schemaDetails,
    approvedIssuers,
  }: {
    schemaDetails: string;
    approvedIssuers: string[];
  }) {
    this.schemaDetails = schemaDetails;
    this.approvedIssuers = approvedIssuers;
  }
}
class DID {
  context: string;
  metadata: string;

  constructor({ context, metadata }: { context: string; metadata: string }) {
    this.context = context;
    this.metadata = metadata;
  }
}
class CredentialDefinition {
  schemaId: string;
  issuer: string;

  constructor({ schemaId, issuer }: { schemaId: string; issuer: string }) {
    this.schemaId = schemaId;
    this.issuer = issuer;
  }
}

class Credentials {}

@NearBindgen({})
class DIDRegistry {
  dids: UnorderedMap<DID> = new UnorderedMap<DID>("dids");
  owner: string;
  schemas: UnorderedMap<Schema>;
  credentialDefinitions: UnorderedMap<CredentialDefinition> =
    new UnorderedMap<CredentialDefinition>("credentialDefinitions");
  
  static schema = {
    dids: { class: UnorderedMap, value: { class: DID } },
    credentialDefinitions: {
      class: UnorderedMap,
      value: { class: CredentialDefinition },
    },
    schemas: { class: UnorderedMap, value: { class: Schema } },
  };
  constructor() {
    // Initialize the owner to an empty string; it will be set during initialization
    this.owner = near.currentAccountId();
    this.schemas = new UnorderedMap<Schema>("schemas");
  }

  // Function to register a DID
  @call({})
  registerDID({
    did,
    context,
    metadata,
  }: {
    did: string;
    context: string;
    metadata: string;
  }): void {
    // near.log('registerDID');
    // near.log(did, context, metadata);
    // Check if DID already exists
    if (this.dids.get(did) !== null) {
      assert(false, "DID already exists");
    }
    // Store the DID
    this.dids.set(did, new DID({ context, metadata }));
  }

  // Function to get a DID
  @view({})
  getDID({ did }: { did: string }): DID {
    const record = this.dids.get(did);
    if (record === null) {
      assert(false, "DID does not exist");
    }
    return record;
  }

  @call({})
  updateDID({ did, metadata }: { did: string; metadata: string }): void {
    const record = this.dids.get(did);
    if (record === null) {
      assert(false, "DID does not exist");
    }
    record.metadata = metadata;
    this.dids.set(did, record);
  }

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
      assert(false, "Credential Definition already exists");
    }
    // Store the Credential Definition
    this.credentialDefinitions.set(
      credDefId,
      new CredentialDefinition({ schemaId, issuer })
    );
  }

  // Function to get a credential definition
  @view({})
  getCredentialDefinition({
    credDefId,
  }: {
    credDefId: string;
  }): CredentialDefinition {
    const record = this.credentialDefinitions.get(credDefId);
    if (record === null) {
      assert(false, "Credential Definition does not exist");
    }
    return record;
  }
  @call({})
  registerSchema({
    schemaId,
    details,
  }: {
    schemaId: string;
    details: string;
  }): void {
    if (this.schemas.get(schemaId) !== null) {
      assert(false, "Schema already exists");
    }
    const newSchema = new Schema({
      schemaDetails: details,
      approvedIssuers: [],
    });
    this.schemas.set(schemaId, newSchema);
  }

  // Function to add an approved issuer to a schema
  @call({})
  addApprovedIssuer({
    schemaId,
    issuer,
  }: {
    schemaId: string;
    issuer: string;
  }): void {
    // near.log("checking owner");
    // near.log("schemaId: " + schemaId);
    const schema = this.schemas.get(schemaId);
    // near.log("schemaId: " + schemaId);
    if (schema === null) {
      // near.log("null schema");
      assert(false, "Schema does not exist");
    }
    if (!schema.approvedIssuers.includes(issuer)) {
      // near.log("adding issuer");
      schema.approvedIssuers.push(issuer);
      this.schemas.set(schemaId, schema);
    }
  }

  // View function to retrieve a schema's details and approved issuers
  @view({})
  getSchema({ schemaId }: { schemaId: string }): Schema {
    const schema = this.schemas.get(schemaId);
    // near.log("schemaId: " + schemaId);
    if (schema === null) {
      near.panicUtf8(Uint8Array.from([1]));
    }
    return schema;
  }

  // @call({})
}
