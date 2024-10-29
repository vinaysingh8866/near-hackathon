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
//   const contract = await root.createSubAccount('schema-registry');

//   // Deploy the compiled WASM file (update the path if necessary)
//   await contract.deploy('build/SchemaRegistry.wasm');

//   // Save accounts for use in tests
//   t.context.accounts = { root, contract };
// });

// test.afterEach.always(async t => {
//   // Tear down the NEAR sandbox environment after each test
//   await t.context.worker.tearDown().catch(error => {
//     console.log('Failed to stop the Sandbox:', error);
//   });
// });

// // Test for registering a schema
// test('registers a schema', async t => {
//   const { root, contract } = t.context.accounts;
//   // console.log('root', root);
//   // Register a new schema
//   await root.call(
//     contract,
//     'registerSchema',
//     {
//       schemaId: 'schema:test:123',
//       details: 'Test Schema Details',
//     },
//   );

//   // Retrieve the schema
//   const schema = await contract.view('getSchema', { schemaId: 'schema:test:123' });
//   // console.log(schema, 'schema');
//   t.deepEqual(schema, { schemaDetails: 'Test Schema Details', approvedIssuers: [] });

//   // Attempt to register the same schema again and expect a panic
//   const error = await t.throwsAsync(
//     () => root.call(
//       contract,
//       'registerSchema',
//       {
//         schemaId: 'schema:test:123',
//         details: 'Test Schema Details',
//       },
//     ),
//   );
//   const msg = JSON.stringify(error.message);
//   // console.log(msg, 'msg');
//   // Assert that the error message contains the panic
//   t.true(msg.includes('Smart contract panicked:'));
// });

// // Test for adding an approved issuer
// test('adds an approved issuer', async t => {
//   const { root, contract } = t.context.accounts;

//   // Register a new schema
//   await root.call(
//     contract,
//     'registerSchema',
//     {
//       schemaId: 'schema:test:456',
//       details: 'Another Schema Details',
//     },
//   );
//   console.log('registerSchema');

//   // Add an approved issuer
//   await root.call(
//     contract,
//     'addApprovedIssuer',
//     {
//       schemaId: 'schema:test:456',
//       issuer: 'issuer.testnet',
//     },
//   );
//   console.log('addApprovedIssuer');

//   // Retrieve the schema and check the approved issuers
//   const schema = await contract.view('getSchema', { schemaId: 'schema:test:456' });
//   console.log(schema, 'schema');
//   t.deepEqual(schema, { schemaDetails: 'Another Schema Details', approvedIssuers: ['issuer.testnet'] });
// });

// // Test that non-owner cannot add an approved issuer
// test('non-owner cannot add an approved issuer', async t => {
//   const { root, contract } = t.context.accounts;

//   // Create a non-owner account
//   const alice = await root.createSubAccount('alice');

//   // Register a new schema
//   await root.call(
//     contract,
//     'registerSchema',
//     {
//       schemaId: 'schema:test:789',
//       details: 'Third Schema Details',
//     },
//   );

//   // Attempt to add an approved issuer as non-owner
//   const error = await t.throwsAsync(
//     () => alice.call(
//       contract,
//       'addApprovedIssuer',
//       {
//         schemaId: 'schema:test:789',
//         issuer: 'issuer.testnet',
//       },
//     ),
//   );
//   const msg = JSON.stringify(error.message);
//   console.log(msg, 'msg');
//   // Assert that the error message contains the panic
//   t.true(msg.includes('Smart contract panicked:'));
// });

// // Test for getting a schema that doesn't exist
// test('getting a non-existent schema', async t => {
//   const { contract } = t.context.accounts;

//   // Attempt to get a non-existent schema and expect a panic
//   const error = await t.throwsAsync(
//     () => contract.view('getSchema', { schemaId: 'schema:nonexistent:123' }),
//   );
//   const msg = JSON.stringify(error.message)
//   // console.log(msg, 'msg');
//   // console.log(msg, 'msg');
//   // Assert that the error message contains the panic
//   t.true(msg.includes('panic_msg'));
// });

