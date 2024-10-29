// import anyTest from 'ava';
// import { Worker } from 'near-workspaces';
// import { setDefaultResultOrder } from 'dns';
// setDefaultResultOrder('ipv4first'); // Temporary fix for Node.js versions >17

// /**
//  *  @typedef {import('near-workspaces').NearAccount} NearAccount
//  *  @type {import('ava').TestFn<{ worker: Worker; accounts: Record<string, NearAccount> }>}
//  */
// const test = anyTest;

// test.beforeEach(async t => {
//   // Create a NEAR sandbox environment
//   const worker = t.context.worker = await Worker.init();

//   // Deploy the contract
//   const root = worker.rootAccount;
//   const contract = await root.createSubAccount('credential-def-registry');

//   // Deploy the compiled WASM file (update the path if necessary)
//   await contract.deploy('build/CredentialDefinitionRegistry.wasm');

//   // Save accounts for use in tests
//   t.context.accounts = { root, contract };
// });

// test.afterEach.always(async t => {
//   // Tear down the NEAR sandbox environment after each test
//   await t.context.worker.tearDown().catch(error => {
//     console.log('Failed to stop the Sandbox:', error);
//   });
// });

// // Test for registering a Credential Definition
// test('registers a Credential Definition', async t => {
//   const { root, contract } = t.context.accounts;

//   // Register a new Credential Definition
//   await root.call(
//     contract,
//     'registerCredentialDefinition',
//     {
//       credDefId: 'credDef:test:123',
//       schemaId: 'schema:test:123',
//       issuer: 'issuer.testnet',
//     },
//   );

//   // Retrieve the Credential Definition
//   const credentialDefinition = await contract.view('getCredentialDefinition', { credDefId: 'credDef:test:123' });
//   t.deepEqual(credentialDefinition, { schemaId: 'schema:test:123', issuer: 'issuer.testnet' });

//   // Attempt to register the same Credential Definition again and expect a panic
//   const error = await t.throwsAsync(
//     () => root.call(
//       contract,
//       'registerCredentialDefinition',
//       {
//         credDefId: 'credDef:test:123',
//         schemaId: 'schema:test:123',
//         issuer: 'issuer.testnet',
//       },
//     ),
//   );
//   const msg = JSON.stringify(error.message);

//   // Assert that the error message contains the panic
//   t.true(msg.includes('Smart contract panicked:'));
// });

// // Test for getting a Credential Definition
// test('gets a Credential Definition', async t => {
//   const { root, contract } = t.context.accounts;

//   // Register a Credential Definition
//   await root.call(
//     contract,
//     'registerCredentialDefinition',
//     {
//       credDefId: 'credDef:test:456',
//       schemaId: 'schema:test:456',
//       issuer: 'issuer2.testnet',
//     },
//   );

//   // Retrieve the Credential Definition
//   const credentialDefinition = await contract.view('getCredentialDefinition', { credDefId: 'credDef:test:456' });
//   t.deepEqual(credentialDefinition, { schemaId: 'schema:test:456', issuer: 'issuer2.testnet' });

//   // Attempt to get a non-existent Credential Definition and expect a panic
//   const error = await t.throwsAsync(
//     () => contract.view('getCredentialDefinition', { credDefId: 'credDef:nonexistent:789' }),
//   );
//   const msg = error.message.toString();

//   // Assert that the error message contains the panic
//   t.true(msg.includes('panic_msg: "\\u{1}"'));
// });
