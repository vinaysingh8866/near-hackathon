import anyTest from "ava";
import { Worker } from "near-workspaces";
import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first"); // temp fix for node >v17

/**
 *  @typedef {import('near-workspaces').NearAccount} NearAccount
 *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
 */
const test = anyTest;

test.beforeEach(async (t) => {
  // Create sandbox
  const worker = (t.context.worker = await Worker.init());

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount("test-account");

  // Get wasm file path from package.json test script in folder above
  await contract.deploy("build/DIDRegistry.wasm");

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});

// Test for registering a DID
test("registers a DID", async (t) => {
  const { root, contract } = t.context.accounts;

  // Register a new DID
  await root.call(contract, "registerDID", {
    did: "did:test:123",
    context: "Test Context",
    metadata: "Test Metadata",
  });

  // Retrieve the DID
  const did = await contract.view("getDID", { did: "did:test:123" });
  t.deepEqual(did, { context: "Test Context", metadata: "Test Metadata" });

  // Attempt to register the same DID again and expect a panic
  const error = await t.throwsAsync(() =>
    root.call(contract, "registerDID", {
      did: "did:test:123",
      context: "Test Context",
      metadata: "Test Metadata",
    })
  );
  const msg = JSON.stringify(error.message);
  // Assert that the error message contains the panic with byte array [1]
  t.true(msg.includes("Smart contract panicked:"));
});

test("getting a non-existent schema", async (t) => {
  const { contract } = t.context.accounts;

  // Attempt to get a non-existent schema and expect a panic
  const error = await t.throwsAsync(() =>
    contract.view("getSchema", { schemaId: "schema:nonexistent:123" })
  );
  const msg = JSON.stringify(error.message);
  // console.log(msg, 'msg');
  // console.log(msg, 'msg');
  // Assert that the error message contains the panic
  t.true(msg.includes("panic_msg"));
});

// Test for getting a DID
test("gets a DID", async (t) => {
  const { root, contract } = t.context.accounts;

  // Register a DID
  await root.call(contract, "registerDID", {
    did: "did:test:456",
    context: "Another Context",
    metadata: "Another Metadata",
  });

  // Retrieve the DID
  const did = await contract.view("getDID", { did: "did:test:456" });
  t.deepEqual(did, {
    context: "Another Context",
    metadata: "Another Metadata",
  });

  // Attempt to get a non-existent DID and expect a panic
  const error = await t.throwsAsync(() =>
    contract.view("getDID", { did: "did:nonexistent:789" })
  );
  // console.log(error);
  const msg = error.message.toString();
  // console.log(msg);
  // Assert that the error message contains the panic with byte array [1]
  t.true(msg.includes('DID does not exist'));
});

test("updating a DID", async (t) => {
  const { root, contract } = t.context.accounts;

  // Register a new DID
  await root.call(contract, "registerDID", {
    did: "did:test:123",
    context: "Test Context",
    metadata: "Test Metadata",
  });

  // Update the DID
  await root.call(contract, "updateDID", {
    did: "did:test:123",
    metadata: "Updated Metadata",
  });

  // Retrieve the updated DID
  const did = await contract.view("getDID", { did: "did:test:123" });
  t.deepEqual(did, {
    context: "Test Context",
    metadata: "Updated Metadata",
  });

  // Attempt to update a non-existent DID and expect a panic
  const error = await t.throwsAsync(() =>
    root.call(contract, "updateDID", {
      did: "did:nonexistent:123",
      metadata: "Updated Metadata",
    })
  );
  const msg = JSON.stringify(error.message);
  // Assert that the error message contains the panic
  t.true(msg.includes("DID does not exist"))
});

test("registers a schema", async (t) => {
  const { root, contract } = t.context.accounts;
  // console.log('root', root);
  // Register a new schema
  await root.call(contract, "registerSchema", {
    schemaId: "schema:test:123",
    details: "Test Schema Details",
  });

  // Retrieve the schema
  const schema = await contract.view("getSchema", {
    schemaId: "schema:test:123",
  });
  // console.log(schema, 'schema');
  t.deepEqual(schema, {
    schemaDetails: "Test Schema Details",
    approvedIssuers: [],
  });

  // Attempt to register the same schema again and expect a panic
  const error = await t.throwsAsync(() =>
    root.call(contract, "registerSchema", {
      schemaId: "schema:test:123",
      details: "Test Schema Details",
    })
  );
  const msg = JSON.stringify(error.message);
  // console.log(msg, 'msg');
  // Assert that the error message contains the panic
  t.true(msg.includes("Smart contract panicked:"));
});

// Test for adding an approved issuer
test("adds an approved issuer", async (t) => {
  const { root, contract } = t.context.accounts;

  // Register a new schema
  await root.call(contract, "registerSchema", {
    schemaId: "schema:test:456",
    details: "Another Schema Details",
  });
  // console.log("registerSchema");

  // Add an approved issuer
  await root.call(contract, "addApprovedIssuer", {
    schemaId: "schema:test:456",
    issuer: "issuer.testnet",
  });
  // console.log("addApprovedIssuer");

  // Retrieve the schema and check the approved issuers
  const schema = await contract.view("getSchema", {
    schemaId: "schema:test:456",
  });
  // console.log(schema, "schema");
  t.deepEqual(schema, {
    schemaDetails: "Another Schema Details",
    approvedIssuers: ["issuer.testnet"],
  });
});

// Test that non-owner cannot add an approved issuer
test("non-owner cannot add an approved issuer", async (t) => {
  const { root, contract } = t.context.accounts;

  // Create a non-owner account
  const alice = await root.createSubAccount("alice");

  // Register a new schema
  await root.call(contract, "registerSchema", {
    schemaId: "schema:test:789",
    details: "Third Schema Details",
  });

  // Attempt to add an approved issuer as non-owner
  const error = await t.throwsAsync(() =>
    alice.call(contract, "addApprovedIssuer", {
      schemaId: "schema:test:789",
      issuer: "issuer.testnet",
    })
  );
  const msg = JSON.stringify(error.message);
  // console.log(msg, "msg");
  // Assert that the error message contains the panic
  // console.log(msg, "msg");
  t.true(msg.includes("Smart contract panicked:"));
});

test("registers a Credential Definition", async (t) => {
  const { root, contract } = t.context.accounts;

  // Register a new Credential Definition
  await root.call(contract, "registerCredentialDefinition", {
    credDefId: "credDef:test:123",
    schemaId: "schema:test:123",
    issuer: "issuer.testnet",
  });

  // Retrieve the Credential Definition
  const credentialDefinition = await contract.view("getCredentialDefinition", {
    credDefId: "credDef:test:123",
  });
  t.deepEqual(credentialDefinition, {
    schemaId: "schema:test:123",
    issuer: "issuer.testnet",
  });

  // Attempt to register the same Credential Definition again and expect a panic
  const error = await t.throwsAsync(() =>
    root.call(contract, "registerCredentialDefinition", {
      credDefId: "credDef:test:123",
      schemaId: "schema:test:123",
      issuer: "issuer.testnet",
    })
  );
  const msg = JSON.stringify(error.message);

  // Assert that the error message contains the panic
  t.true(msg.includes("Smart contract panicked:"));
});

// Test for getting a Credential Definition
test("gets a Credential Definition", async (t) => {
  const { root, contract } = t.context.accounts;

  // Register a Credential Definition
  await root.call(contract, "registerCredentialDefinition", {
    credDefId: "credDef:test:456",
    schemaId: "schema:test:456",
    issuer: "issuer2.testnet",
  });

  // Retrieve the Credential Definition
  const credentialDefinition = await contract.view("getCredentialDefinition", {
    credDefId: "credDef:test:456",
  });
  t.deepEqual(credentialDefinition, {
    schemaId: "schema:test:456",
    issuer: "issuer2.testnet",
  });

  // Attempt to get a non-existent Credential Definition and expect a panic
  const error = await t.throwsAsync(() =>
    contract.view("getCredentialDefinition", {
      credDefId: "credDef:nonexistent:789",
    })
  );
  const msg = error.message.toString();
  // console.log(msg);
  // Assert that the error message contains the panic
  t.true(msg.includes('Credential Definition does not exist'));
});
