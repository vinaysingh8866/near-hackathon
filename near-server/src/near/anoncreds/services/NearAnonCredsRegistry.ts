import {
  AnonCredsRegistry,
  GetCredentialDefinitionReturn,
  GetRevocationRegistryDefinitionReturn,
  GetRevocationStatusListReturn,
  GetSchemaReturn,
  RegisterCredentialDefinitionOptions,
  RegisterCredentialDefinitionReturn,
  RegisterRevocationRegistryDefinitionOptions,
  RegisterRevocationRegistryDefinitionReturn,
  RegisterRevocationStatusListOptions,
  RegisterRevocationStatusListReturn,
  RegisterSchemaOptions,
  RegisterSchemaReturn,
} from "@credo-ts/anoncreds";
import { AgentContext } from "@credo-ts/core";
import {
  nearSdkAnonCredsRegistryIdentifierRegex,
  parsenearDid,
} from "../../utils/identifiers";
import { NearDIDResolver } from "../../dids";
import {
  KanonCreateResourceOptions,
  NearDIDRegistrar,
} from "../../dids/NearDidRegistrar";
import { uuidV4 } from "ethers";
import { uuid } from "@credo-ts/core/build/utils/uuid";
import { NearLedgerService } from "../../ledger";

export class NearAnonCredsRegistry implements AnonCredsRegistry {
  public supportedIdentifier: RegExp = new RegExp(".*");

  public methodName = "did";
  public async getSchema(
    agentContext: AgentContext,
    schemaId: string
  ): Promise<GetSchemaReturn> {
    try {
      const kanonDidResolver =
        agentContext.dependencyManager.resolve(NearDIDResolver);
      console.log(schemaId);
      const parsedDid = parsenearDid(schemaId);
      console.log(parsedDid);
      //   if (!parsedDid) {
      //     throw new Error(`Invalid schemaId: ${schemaId}`);
      //   }
      const response = await kanonDidResolver.resolveResource(
        agentContext,
        schemaId
      );
      console.log(response, "responsesdlkjd");
      return {
        schema: {
          attrNames: response.didDocument.schema.attrNames,
          name: response.didDocument.schema.name,
          version: response.didDocument.schema.version,
          issuerId: response.didDocument.schema.issuerId,
        },
        schemaId,
        resolutionMetadata: {},
        schemaMetadata: {},
      };
    } catch (error: any) {
      console.log(error);
      agentContext.config.logger.error(
        `Error retrieving schema '${schemaId}'`,
        {
          error,
          schemaId,
        }
      );

      return {
        schemaId,
        resolutionMetadata: {
          error: "notFound",
          message: `unable to resolve schema: ${error.message}`,
        },
        schemaMetadata: {},
      };
    }
  }
  public async registerSchema(
    agentContext: AgentContext,
    options: RegisterSchemaOptions
  ): Promise<RegisterSchemaReturn> {
    console.log(options);
    try {
      const kanonDisRegistrar =
        agentContext.dependencyManager.resolve(NearDIDRegistrar);
      const schema = options.schema;
      const schemaResource = {
        id: uuid(),
        name: `${schema.name}-Schema`,
        resourceType: "anonCredsSchema",
        data: {
          name: schema.name,
          version: schema.version,
          attrNames: schema.attrNames,
          issuerId: schema.issuerId,
        },
        version: schema.version,
      } as KanonCreateResourceOptions;

      console.log(schema, "schemadsfgdsf");
      const response = await kanonDisRegistrar.createResource(
        agentContext,
        `${schema.issuerId}/resources/${schemaResource.id}`,
        schemaResource
      );
      console.log(JSON.stringify(response), "response");

      return {
        schemaState: {
          state: "finished",
          schema,
          schemaId: `${schema.issuerId}/resources/${schemaResource.id}`,
        },
        registrationMetadata: {},
        schemaMetadata: {},
      };
    } catch (error: any) {
      console.log(error, "error");
      agentContext.config.logger.debug(
        `Error registering schema for did '${options.schema.issuerId}'`,
        {
          error,
          did: options.schema.issuerId,
          schema: options,
        }
      );

      return {
        schemaMetadata: {},
        registrationMetadata: {},
        schemaState: {
          state: "failed",
          schema: options.schema,
          reason: `unknownError: ${error.message}`,
        },
      };
    }
  }
  public async getCredentialDefinition(
    agentContext: AgentContext,
    credentialDefinitionId: string
  ): Promise<GetCredentialDefinitionReturn> {
    // throw new Error("Method not implemented.");
    const ledgerService = agentContext.dependencyManager.resolve(
      NearLedgerService
    );
    const credentialDefinition = await ledgerService.getCredentialDefinition(
      credentialDefinitionId
    );
    console.log(credentialDefinition, "credentialDefinition");
    return {
      credentialDefinition: {
        issuerId: credentialDefinition.issuer ,
        schemaId: credentialDefinition.schemaId,
        tag: credentialDefinition.credDefId,
        type: "credentialDefinition.credDefId" as any,
        value: "credentialDefinition.credDefId" as any,
      },
      credentialDefinitionId,
      credentialDefinitionMetadata: {},
      resolutionMetadata: {},
    };
  }
  public async registerCredentialDefinition(
    agentContext: AgentContext,
    options: RegisterCredentialDefinitionOptions
  ): Promise<RegisterCredentialDefinitionReturn> {
    const kanonDisRegistrar =
      agentContext.dependencyManager.resolve(NearDIDRegistrar);

    const credentialDefinition = options.credentialDefinition;
    const credentialDefinitionResource = {
      id: uuid(),
      name: `${credentialDefinition.tag}-CredentialDefinition`,
      resourceType: "anonCredsCredentialDefinition",
      data: {
        schemaId: credentialDefinition.schemaId,
        issuerId: credentialDefinition.issuerId,
        tag: credentialDefinition.tag,
      },
      version: uuid(),
    } as KanonCreateResourceOptions;

    const response = await kanonDisRegistrar.createCredentialDefinition(
      agentContext,
      credentialDefinitionResource.id!,
      credentialDefinitionResource
    );

    return {
      credentialDefinitionState: {
        state: "finished",
        credentialDefinition,
        credentialDefinitionId: `${credentialDefinition.issuerId}/resources/${credentialDefinitionResource.id}`,
      },
      registrationMetadata: {},
      credentialDefinitionMetadata: {},
    };
  }
  getRevocationRegistryDefinition(
    agentContext: AgentContext,
    revocationRegistryDefinitionId: string
  ): Promise<GetRevocationRegistryDefinitionReturn> {
    throw new Error("Method not implemented.");
  }
  registerRevocationRegistryDefinition(
    agentContext: AgentContext,
    options: RegisterRevocationRegistryDefinitionOptions
  ): Promise<RegisterRevocationRegistryDefinitionReturn> {
    throw new Error("Method not implemented.");
  }
  getRevocationStatusList(
    agentContext: AgentContext,
    revocationRegistryId: string,
    timestamp: number
  ): Promise<GetRevocationStatusListReturn> {
    throw new Error("Method not implemented.");
  }
  registerRevocationStatusList(
    agentContext: AgentContext,
    options: RegisterRevocationStatusListOptions
  ): Promise<RegisterRevocationStatusListReturn> {
    throw new Error("Method not implemented.");
  }
}
