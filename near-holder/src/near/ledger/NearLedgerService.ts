import { ethers } from "ethers";
import { DidDocument, inject, injectable, Logger } from "@credo-ts/core";
import { NearModuleConfig } from "../NearModuleConfig";
import { Schema } from "@hyperledger/anoncreds-nodejs";
import { Account, connect, Contract, KeyPair, keyStores } from "near-api-js";
import { KeyStore } from "near-api-js/lib/key_stores";
export interface INearLedgerConfig {
  // network: string;
  // providerUrl: string;
  privateKey: string;
}

@injectable()
export class NearLedgerService {
  private networks: INearLedgerConfig;
  private contractAddress: string = "ajnainc.testnet";
  // private abi: any[] = [

  // ];

  public constructor(config: NearModuleConfig) {
    this.networks = { privateKey: config.privateKey };
  }

  private async getProviderAndSigner(
    networkName: string
  ): Promise<{ Account: Account; SSIContract: Contract }> {
    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(this.networks.privateKey as any);
    await keyStore.setKey("testnet", this.contractAddress, keyPair);
    // const connectionConfig =
    const connectionConfig = {
      networkId: networkName,
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account("ajnainc.testnet");
    const contractId = "ajnainc.testnet";

    const contract = new Contract(account, contractId, {
      changeMethods: [],
      useLocalViewExecution: false,
    
      viewMethods: [
        "getSchema",
        "registerSchema",
        "registerDID",
        "getDID",
        "updateDID",
        "registerCredentialDefinition",
        "getCredentialDefinition",
        "addApprovedIssuer",
      ],
    });
    return { Account: account, SSIContract: contract };
  }

  public async executeDIDOperation(
    operation: "create" | "update" | "deactivate",
    identifier: string,
    networkName: string,
    didDoc: string,
    metadata?: string
  ) {
    const keyStore = new keyStores.InMemoryKeyStore();
    console.log(this.networks.privateKey, "this.networks.privateKey");
    const keyPair = KeyPair.fromString(this.networks.privateKey as any);
    console.log(keyPair, "keyPair");
    await keyStore.setKey("testnet", this.contractAddress, keyPair);
    // const connectionConfig =
    const connectionConfig = {
      networkId: "testnet",
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account("ajnainc.testnet");
    // const contractId = "ajnainc.testnet";
    console.log(account)
    // const contract = new Contract(account, contractId, {
    //   changeMethods: [],
    //   useLocalViewExecution: false,
    
    //   viewMethods: [
    //     "getSchema",
    //     "registerSchema",
    //     "registerDID",
    //     "getDID",
    //     "updateDID",
    //     "registerCredentialDefinition",
    //     "getCredentialDefinition",
    //     "addApprovedIssuer",
    //   ],
    // });

    let transactionResponse;

    switch (operation) {
      case "create":
        console.log("Creating DID", identifier, didDoc, metadata);
        // const data = await account.functionCall({
        //   contractId,
        //   methodName: "registerSchema",
        //   args: {
        //     schemaId: "schema:test123",
        //     details: "Test Context",
        //   },
        // });
        // console.log(data);

        // const view = await account.viewFunction({
        //   contractId,
        //   methodName: "getSchema",
        //   args: {
        //     schemaId: "schema:test123",
        //   },
        // });
        // transactionResponse = await contract.registerDID(
        //   identifier,
        //   didDoc,
        //   metadata || ""
        // );

        transactionResponse = await account.functionCall({
          contractId: "ajnainc.testnet",
          methodName: "registerDID",
          args: {
            did: identifier,
            context: didDoc,
            metadata: metadata || "",
          },
        });

        break;
      case "update":
        transactionResponse = await account.functionCall({
          contractId: this.contractAddress,
          methodName: "updateDID",
          args: {
            did: identifier,
            context: didDoc,
            metadata: metadata || "",
          },
        });
        // transactionResponse = await contract.updateDID(
        //   identifier,
        //   didDoc,
        //   metadata || ""
        // );
        break;
      case "deactivate":
        //@TODO
        // transactionResponse = await contract.deactivateDID(identifier);
        break;
      default:
        throw new Error(`Invalid operation: ${operation}`);
    }
    return transactionResponse?.receipts_outcome;
    // return transactionResponse.wait(); // wait for the transaction to be mined
  }

  async getDIDDocument(
    did: string,
    networkName: string = "testnet"
  ): Promise<DidDocument | undefined> {
    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(this.networks.privateKey as any);
    await keyStore.setKey("testnet", this.contractAddress, keyPair);
    // const connectionConfig =
    const connectionConfig = {
      networkId: networkName,
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account("ajnainc.testnet");
    const contractId = "ajnainc.testnet";

    const contract = new Contract(account, contractId, {
      changeMethods: [],
      useLocalViewExecution: false,
    
      viewMethods: [
        "getSchema",
        "registerSchema",
        "registerDID",
        "getDID",
        "updateDID",
        "registerCredentialDefinition",
        "getCredentialDefinition",
        "addApprovedIssuer",
      ],
    });

    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // const document = await contract.getDID(did);
    // if (!document) {
    //   return undefined;
    // }
    // console.log(document);
    // const didDoc = document[0];
    // const metadata = document[1];
    // let didDocument: DidDocument;
    // if (didDoc) {
    //   const json = JSON.parse(didDoc);
    //   didDocument = new DidDocument({
    //     id: did,
    //     context: json.context,
    //     service: json.service,
    //   });
    // } else {
    //   didDocument = new DidDocument({
    //     id: did,
    //     context: "",
    //     service: [],
    //   });
    // }
    // if (metadata !== "") {
    // }
    // return didDocument;
    const document = await account.viewFunction({
      contractId: this.contractAddress,
      methodName: "getDID",
      args: {
        did: did,
      },
    });
    console.log(document, "document");
    if (!document) {
      return undefined;
    }
    console.log(document, "document");
    const didDoc = document[0];
    const metadata = document[1];
    let didDocument: DidDocument;
    if (didDoc) {
      const json = JSON.parse(didDoc);
      didDocument = new DidDocument({
        id: did,
        context: json.context,
        service: json.service,
      });
    } else {
      didDocument = new DidDocument({
        id: did,
        context: "",
        service: [],
      });
    }
  }

  async getSchema(schemaId: string, networkName: string = "testnet") {
    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(this.networks.privateKey as any);
    await keyStore.setKey("testnet", this.contractAddress, keyPair);
    // const connectionConfig =
    const connectionConfig = {
      networkId: networkName,
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account("ajnainc.testnet");
    const contractId = "ajnainc.testnet";

    const contract = new Contract(account, contractId, {
      changeMethods: [],
      useLocalViewExecution: false,
    
      viewMethods: [
        "getSchema",
        "registerSchema",
        "registerDID",
        "getDID",
        "updateDID",
        "registerCredentialDefinition",
        "getCredentialDefinition",
        "addApprovedIssuer",
      ],
    });
    const response = await account.viewFunction({
      contractId: this.contractAddress,
      methodName: "getSchema",
      args: {
        schemaId: schemaId,
      },
    });
    console.log(response, "response");
    console.log(JSON.parse(response['schemaDetails']))
    try {
      const Json = JSON.parse(response['schemaDetails']);
      return {
        schema: {
          attrNames: Json.data.attrNames,
          name: Json.name,
          version: Json.data.version,
          issuerId: Json.data.issuerId,
        },
        schemaId,
        resolutionMetadata: {},
        schemaMetadata: {},
      };
    } catch (e) {
      return {
        schema: {
          attrNames: [],
          name: "",
          version: "",
          issuerId: "",
        },
        schemaId,
        resolutionMetadata: {},
        schemaMetadata: {},
      };
    }
  }

  async registerSchema(
    schemaId: string,
    details: string,
    networkName: string = "testnet"
  ) {
    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // console.log("Registering schema", schemaId, details);
    // const tx = await contract.registerSchema(schemaId, details);
    // await tx.wait();
    // return tx;

    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(this.networks.privateKey as any);
    await keyStore.setKey("testnet", this.contractAddress, keyPair);
    // const connectionConfig =
    const connectionConfig = {
      networkId: networkName,
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account("ajnainc.testnet");
    const contractId = "ajnainc.testnet";

    const contract = new Contract(account, contractId, {
      changeMethods: [],
      useLocalViewExecution: false,
    
      viewMethods: [
        "getSchema",
        "registerSchema",
        "registerDID",
        "getDID",
        "updateDID",
        "registerCredentialDefinition",
        "getCredentialDefinition",
        "addApprovedIssuer",
      ],
    });
    const data = await account.functionCall({
      contractId: this.contractAddress,
      methodName: "registerSchema",
      args: {
        schemaId: schemaId,
        details: details,
      },
    });
    return data;
  }

  async addApprovedIssuer(
    schemaId: string,
    issuer: string,
    networkName: string = "testnet"
  ) {
    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // return await contract.addApprovedIssuer(schemaId, issuer);

    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(this.networks.privateKey as any);
    await keyStore.setKey("testnet", this.contractAddress, keyPair);
    // const connectionConfig =
    const connectionConfig = {
      networkId: networkName,
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account("ajnainc.testnet");
    const contractId = "ajnainc.testnet";

    const contract = new Contract(account, contractId, {
      changeMethods: [],
      useLocalViewExecution: false,
    
      viewMethods: [
        "getSchema",
        "registerSchema",
        "registerDID",
        "getDID",
        "updateDID",
        "registerCredentialDefinition",
        "getCredentialDefinition",
        "addApprovedIssuer",
      ],
    });
    const data = await account.functionCall({
      contractId: this.contractAddress,
      methodName: "addApprovedIssuer",
      args: {
        schemaId: schemaId,
        issuer: issuer,
      },
    });
    return data;
  }

  async registerCredentialDefinition(
    credDefId: string,
    schemaId: string,
    issuer: string,
    networkName: string = "testnet"
  ) {
    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // const tx = await contract.registerCredentialDefinition(
    //   credDefId,
    //   schemaId,
    //   issuer
    // );
    // await tx.wait();
    // return tx;

    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(this.networks.privateKey as any);
    await keyStore.setKey("testnet", this.contractAddress, keyPair);
    // const connectionConfig =
    const connectionConfig = {
      networkId: networkName,
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account("ajnainc.testnet");
    const contractId = "ajnainc.testnet";

    const contract = new Contract(account, contractId, {
      changeMethods: [],
      useLocalViewExecution: false,
    
      viewMethods: [
        "getSchema",
        "registerSchema",
        "registerDID",
        "getDID",
        "updateDID",
        "registerCredentialDefinition",
        "getCredentialDefinition",
        "addApprovedIssuer",
      ],
    });

    const data = await account.functionCall({
      contractId: this.contractAddress,
      methodName: "registerCredentialDefinition",
      args: {
        credDefId: credDefId,
        schemaId: schemaId,
        issuer: issuer,
      },
    });
    return data;
  }

  async getCredentialDefinition(
    credDefId: string,
    networkName: string = "testnet"
  ) {
    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // return contract.getCredentialDefinition(credDefId);

    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(this.networks.privateKey as any);
    await keyStore.setKey("testnet", this.contractAddress, keyPair);
    // const connectionConfig =
    const connectionConfig = {
      networkId: networkName,
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account("ajnainc.testnet");
    const contractId = "ajnainc.testnet";

    const contract = new Contract(account, contractId, {
      changeMethods: [],
      useLocalViewExecution: false,
    
      viewMethods: [
        "getSchema",
        "registerSchema",
        "registerDID",
        "getDID",
        "updateDID",
        "registerCredentialDefinition",
        "getCredentialDefinition",
        "addApprovedIssuer",
      ],
    });
    const response = await account.viewFunction({
      contractId: this.contractAddress,
      methodName: "getCredentialDefinition",
      args: {
        credDefId: credDefId,
      },
    });
    try {
      const Json = JSON.parse(response[0]);
      return {
        schemaId: Json.schemaId,
        issuer: Json.issuer,
        credDefId: credDefId,
      };
    } catch (e) {
      return {
        schemaId: "",
        issuer: "",
        credDefId: credDefId,
      };
    }
  }

  async issueCredential(
    credId: string,
    credDefId: string,
    issuer: string,
    subject: string,
    issuanceDate: string,
    expiryDate: string,
    metadata: string,
    networkName: string = "testnet"
  ) {
    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // return contract.issueCredential(
    //   credId,
    //   credDefId,
    //   issuer,
    //   subject,
    //   issuanceDate,
    //   expiryDate,
    //   metadata
    // );
  }

  async revokeCredential(credId: string, networkName: string = "testnet") {
    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // return contract.revokeCredential(credId);
  }

  async isCredentialRevoked(credId: string, networkName: string = "testnet") {
    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // return contract.isCredentialRevoked(credId);
  }

  async getDID(did: string, networkName: string = "testnet") {
    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // return contract.getDID(did);

    const { Account, SSIContract } = await this.getProviderAndSigner(
      networkName
    );
    const document = await Account.viewFunction({
      contractId: this.contractAddress,
      methodName: "getDID",
      args: {
        did: did,
      },
    });
    console.log(document, "document");
    if (!document) {
      return undefined;
    }
  }

  async registerDID(
    did: string,
    context: string,
    metadata: string,
    networkName: string = "testnet"
  ) {
    // const { signer } = await this.getProviderAndSigner(networkName);
    // const contract = new ethers.Contract(
    //   this.contractAddress,
    //   this.abi,
    //   signer
    // );
    // return contract.registerDID(did, context, metadata);

    const keyStore = new keyStores.InMemoryKeyStore();
    const keyPair = KeyPair.fromString(this.networks.privateKey as any);
    await keyStore.setKey("testnet", this.contractAddress, keyPair);
    // const connectionConfig =
    const connectionConfig = {
      networkId: networkName,
      keyStore: keyStore, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);
    const account = await nearConnection.account("ajnainc.testnet");
    const contractId = "ajnainc.testnet";

    const contract = new Contract(account, contractId, {
      changeMethods: [],
      useLocalViewExecution: false,
    
      viewMethods: [
        "getSchema",
        "registerSchema",
        "registerDID",
        "getDID",
        "updateDID",
        "registerCredentialDefinition",
        "getCredentialDefinition",
        "addApprovedIssuer",
      ],
    });

    const data = await account.functionCall({
      contractId: this.contractAddress,
      methodName: "registerDID",
      args: {
        did: did,
        context: context,
        metadata: metadata,
      },
    });

    return data;
  }
}
