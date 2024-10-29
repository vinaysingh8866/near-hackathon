import { NearBindgen, call, view, near, UnorderedMap, assert } from "near-sdk-js";

@NearBindgen({})
class Schema {
  schemaDetails: string;
  approvedIssuers: string[];

  constructor({ schemaDetails, approvedIssuers }: { schemaDetails: string; approvedIssuers: string[] }) {
    this.schemaDetails = schemaDetails;
    this.approvedIssuers = approvedIssuers;
  }
}

@NearBindgen({})
class SchemaRegistry {
  owner: string;
  schemas: UnorderedMap<Schema>;

  // Define the schema for serialization
  static schema = {
    schemas: { class: UnorderedMap, value: { class: Schema } },
  };

  constructor() {
    // Initialize the owner to an empty string; it will be set during initialization
    this.owner = near.currentAccountId();
    this.schemas = new UnorderedMap<Schema>("schemas");
  }

  // Initialization function to set the contract owner
  @call({})
  init(): void {
    if (this.owner !== "") {
        assert(false, "Already initialized");
    }
    this.owner = near.currentAccountId();
  }

  // Internal method to ensure only the owner can call certain functions
  private onlyOwner(): void {
    near.log()
    if(this.owner !== near.currentAccountId()) {
      near.panicUtf8(Uint8Array.from([1]));
    }
  }

  // Function to register a new schema
  @call({})
  registerSchema({ schemaId, details }: { schemaId: string; details: string }): void {
    if (this.schemas.get(schemaId) !== null) {
        assert(false, "Schema already exists");
    }
    const newSchema = new Schema({ schemaDetails: details, approvedIssuers: [] });
    this.schemas.set(schemaId, newSchema);
  }

  // Function to add an approved issuer to a schema
  @call({})
  addApprovedIssuer({ schemaId, issuer }: { schemaId: string; issuer: string }): void {
    near.log("checking owner");
    this.onlyOwner();
    near.log("schemaId: " + schemaId);
    const schema = this.schemas.get(schemaId);
    near.log("schemaId: " + schemaId);
    if (schema === null) {
        near.log("null schema")
        assert(false, "Schema does not exist");
    }
    if (!schema.approvedIssuers.includes(issuer)) {
        near.log("adding issuer")
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
}
