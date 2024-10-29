import { Injectable, Logger } from "@nestjs/common";
import {
  Agent,
  HttpOutboundTransport,
  WsOutboundTransport,
  InitConfig,
  OutOfBandRecord,
  ConnectionStateChangedEvent,
  ConnectionEventTypes,
  DidExchangeState,
  ConnectionsModule,
  DidsModule,
  CredentialsModule,
  V2CredentialProtocol,
  ConsoleLogger,
  LogLevel,
  DidKey,
  KeyDidCreateOptions,
  KeyType,
  TypedArrayEncoder,
  VerificationMethod,
  MediationRecipientModule,
  AutoAcceptCredential,
  ProofsModule,
  AutoAcceptProof,
  V2ProofProtocol,
} from "@credo-ts/core";
import { HttpInboundTransport, agentDependencies } from "@credo-ts/node";
import { AskarModule } from "@credo-ts/askar";
import { ariesAskar } from "@hyperledger/aries-askar-nodejs";
import {
  IndyVdrAnonCredsRegistry,
  IndyVdrIndyDidRegistrar,
  IndyVdrIndyDidResolver,
  IndyVdrModule,
} from "@credo-ts/indy-vdr";
import { indyVdr } from "@hyperledger/indy-vdr-nodejs";
import ledgers from "../config/ledgers/indy/index";
import { QrcodeService } from "src/qrcode/qrcode.service";
import type { IndyVdrPoolConfig } from "@credo-ts/indy-vdr";
import {
  AnonCredsCredentialFormatService,
  AnonCredsModule,
  AnonCredsProofFormatService,
  DataIntegrityCredentialFormatService,
  LegacyIndyCredentialFormatService,
  LegacyIndyProofFormatService,
  V1ProofProtocol,
} from "@credo-ts/anoncreds";
import { anoncreds } from "@hyperledger/anoncreds-nodejs";
import {
  OpenId4VcIssuerModule,
  OpenId4VcIssuerRecord,
  OpenId4VcVerifierModule,
  OpenId4VcVerifierRecord,
} from "@credo-ts/openid4vc";
import express from "express";
import { Router } from "express";
import {
  credentialRequestToCredentialMapper,
  credentialsSupported,
  // setupCredentialListener,
} from "src/common/utils/oid4vcSupport";
import {
  CheqdAnonCredsRegistry,
  CheqdDidRegistrar,
  CheqdDidResolver,
  CheqdModule,
  CheqdModuleConfig,
} from "@credo-ts/cheqd";
import { NearModule } from "src/near/NearModule";
@Injectable()
export class CredoService {
  private readonly logger = new Logger(CredoService.name);
  public agent: Agent;
  private config: InitConfig;
  private agents: Map<string, Agent> = new Map();
  public issuerRecord!: OpenId4VcIssuerRecord;
  public did!: string;
  public didKey!: DidKey;
  public kid!: string;
  public verificationMethod!: VerificationMethod;
  constructor(private readonly qrCodeService: QrcodeService) {}
  public verifierRecord!: OpenId4VcVerifierRecord;
  private app: any;
  private crededntialDefinationId: string = "";
  async createAgent(
    name: string,
    endpoint: string,
    port: number,
    oid4vcPort: number
  ) {
    if (this.agents.has(name)) {
      this.logger.log(`Agent ${name} is already initialized on port ${port}`);
      return this.agents.get(name);
    }
    this.app = express();

    // Agent configuration
    this.config = {
      label: name,
      walletConfig: {
        id: name,
        key: name,
      },
      endpoints: [`${endpoint}:${port}`],
      logger: new ConsoleLogger(LogLevel.info),
    };
    const verifierRouter = Router();
    const issuerRouter = Router();
    this.agent = new Agent({
      config: this.config,
      dependencies: agentDependencies,
      modules: {
        // Register the indyVdr module on the agent
        indyVdr: new IndyVdrModule({
          indyVdr,
          networks: ledgers as [IndyVdrPoolConfig],
        }),
        mediationRecipient: new MediationRecipientModule({
          mediatorInvitationUrl:
            "https://us-east2.public.mediator.indiciotech.io/message?oob=eyJAaWQiOiIyNzFmYTZiYS0xYmUxLTQ0ZDEtYjZlZi01ZmM2ODcyZTY4NmYiLCJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJoYW5kc2hha2VfcHJvdG9jb2xzIjpbImh0dHBzOi8vZGlkY29tbS5vcmcvZGlkZXhjaGFuZ2UvMS4wIl0sImFjY2VwdCI6WyJkaWRjb21tL2FpcDEiLCJkaWRjb21tL2FpcDI7ZW52PXJmYzE5Il0sImxhYmVsIjoiQ2xvdWQgTWVkaWF0b3IiLCJzZXJ2aWNlcyI6W3siaWQiOiIjaW5saW5lIiwidHlwZSI6ImRpZC1jb21tdW5pY2F0aW9uIiwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtnczZNd1lCM1lnVG9aWEd3a25xQzM1MmNiSHR4SnNpM3pYWmZGMXQyZk5rVCN6Nk1rZ3M2TXdZQjNZZ1RvWlhHd2tucUMzNTJjYkh0eEpzaTN6WFpmRjF0MmZOa1QiXSwic2VydmljZUVuZHBvaW50IjoiaHR0cHM6Ly91cy1lYXN0Mi5wdWJsaWMubWVkaWF0b3IuaW5kaWNpb3RlY2guaW8vbWVzc2FnZSJ9LHsiaWQiOiIjaW5saW5lIiwidHlwZSI6ImRpZC1jb21tdW5pY2F0aW9uIiwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtnczZNd1lCM1lnVG9aWEd3a25xQzM1MmNiSHR4SnNpM3pYWmZGMXQyZk5rVCN6Nk1rZ3M2TXdZQjNZZ1RvWlhHd2tucUMzNTJjYkh0eEpzaTN6WFpmRjF0MmZOa1QiXSwic2VydmljZUVuZHBvaW50Ijoid3NzOi8vd3MudXMtZWFzdDIucHVibGljLm1lZGlhdG9yLmluZGljaW90ZWNoLmlvL3dzIn1dfQ==",
        }),
        // Register the Askar module on the agent
        askar: new AskarModule({
          ariesAskar,
        }),
        connections: new ConnectionsModule({ autoAcceptConnections: true }),

        anoncreds: new AnonCredsModule({
          registries: [
            new IndyVdrAnonCredsRegistry(),
            new CheqdAnonCredsRegistry(),
          ],
          anoncreds,
        }),

        dids: new DidsModule({
          registrars: [new IndyVdrIndyDidRegistrar(), new CheqdDidRegistrar()],
          resolvers: [new IndyVdrIndyDidResolver(), new CheqdDidResolver()],
        }),
        openId4VcVerifier: new OpenId4VcVerifierModule({
          baseUrl: `http://${endpoint}:${oid4vcPort}/siop`, //"http://localhost:2000/siop",
          router: verifierRouter,
        }),
        cheqd: new CheqdModule(
          new CheqdModuleConfig({
            networks: [
              {
                network: "testnet",
                cosmosPayerSeed:
                  "sketch thunder cube rebuild museum option sketch robot leaf pond convince marble",
              },
            ],
          })
        ),
        // openId4VcIssuer: new OpenId4VcIssuerModule({
        //   baseUrl: `http://${endpoint}:${oid4vcPort}/oid4vci`,
        //   router: issuerRouter,

        //   endpoints: {
        //     credential: {
        //       credentialRequestToCredentialMapper:
        //         credentialRequestToCredentialMapper,
        //     },
        //   },
        // }),

        // to issue a credential
        credentials: new CredentialsModule({
          credentialProtocols: [
            new V2CredentialProtocol({
              credentialFormats: [
                new DataIntegrityCredentialFormatService(),
                new AnonCredsCredentialFormatService(),
              ],
            }),
          ],
        }),
        near: new NearModule({
          privateKey:
            "ed25519:2cNnkSr9sJjNTvhDFUsUghvjNgKdJCw3ESYWWTSyy9E6LPNXJf4PaerrxRUkHQXQeNyKZEnAv21eyYPqv4mwYcic",
        }),
        proofs: new ProofsModule({
          autoAcceptProofs: AutoAcceptProof.ContentApproved,
          proofProtocols: [
            new V1ProofProtocol({
              indyProofFormat: new LegacyIndyProofFormatService(),
            }),
            new V2ProofProtocol({
              proofFormats: [
                new LegacyIndyProofFormatService(),
                new AnonCredsProofFormatService(),
              ],
            }),
          ],
        }),
      },
    });

    // Register a simple `WebSocket` outbound transport
    this.agent.registerOutboundTransport(new WsOutboundTransport());
    // Register a simple `Http` outbound transport
    this.agent.registerOutboundTransport(new HttpOutboundTransport());
    // Register a simple `Http` inbound transport
    this.agent.registerInboundTransport(
      new HttpInboundTransport({ port: port })
    );

    // this.app.use("/siop", verifierRouter);
    // this.app.use("/oid4vci", issuerRouter);
    // this.app.listen(2000, () => {
    //   console.log("Oidc Server listening on port 3000");
    // });

    // Initialize the agent
    try {
      await this.agent.initialize();
      // const did = await this.agent.dids.create({
      //   method: "cheqd",
      //   secret: {
      //     verificationMethod: {
      //       id: "key-1",
      //       type: "Ed25519VerificationKey2020",
      //     },
      //   },
      //   // an optional methodSpecificIdAlgo parameter
      //   options: {
      //     network: "testnet",
      //     methodSpecificIdAlgo: "uuid",
      //   },
      // });

      // const schema = {
      //   name: "Fund",
      //   version: "1.0",
      //   attributes: [
      //     "Name",
      //     "Type",
      //     "Assets",
      //     "Strategy",
      //     "Material Changes",
      //     "Holdings",
      //     "Managers",
      //   ],
      // };

      // const schemaId = await this.agent.modules.anoncreds.registerSchema({
      //   schema: {
      //     name: schema.name,
      //     version: schema.version,
      //     issuerId: did.didState.did as string,
      //     attrNames: schema.attributes,
      //   },
      //   options: {
      //     network: "testnet",
      //     did: did.didState.did as string,
      //     methodSpecificIdAlgo: "uuid",
      //   },
      // });
      // const credentialDefination =
      //   await this.agent.modules.anoncreds.registerCredentialDefinition({
      //     credentialDefinition: {
      //       issuerId: did.didState.did as string,
      //       schemaId: schemaId.schemaState.schemaId as string,
      //       tag: "tag",
      //     },
      //     options: {
      //       supportRevocation: false,
      //     },
      //   });
      // // console.log("credentialDefination", credentialDefination);
      // const credentialDefinitionId = credentialDefination
      //   .credentialDefinitionState.credentialDefinitionId as string;
      // this.crededntialDefinationId = credentialDefinitionId;
      // console.log("credentialDefinitionId", credentialDefinitionId);
      // this.agent.events.on<ConnectionStateChangedEvent>(
      //   ConnectionEventTypes.ConnectionStateChanged,
      //   async ({ payload }) => {
      //     console.log("ConnectionStateChangedEvent", payload);
      //     // check if the connection is completed
      //     if (payload.connectionRecord.state === DidExchangeState.Completed) {
      //       console.log("Connection completed");
      //       this.issueCredentialCheqd(
      //         payload.connectionRecord.id,
      //         credentialDefinitionId,
      //         name
      //       );
      //     }
      //     // issueCredsential();
      //     // }
      //   }
      // );

      this.agents.set(name, this.agent);
      this.logger.log(
        `Agent ${name} initialized on endpoint ${endpoint}:${port}`
      );
    } catch (e) {
      this.logger.error(
        `Something went wrong while setting up the agent! Message: ${e}`
      );
      throw e;
    }
    return this.agent;
  }

  async issueCredentialNear(connectionId: string, attributes: any) {
    const [connectionRecord] =
      await this.agent.connections.findAllByOutOfBandId(connectionId);

    if (!connectionRecord) {
      throw new Error(
        `ConnectionRecord: record with id ${connectionId} not found.`
      );
    }

    console.log(attributes, "attributesattributesattributes");
    const credentialExchangeRecord =
      await this.agent.credentials.offerCredential({
        connectionId: connectionRecord.id,
        credentialFormats: {
          anoncreds: {
            credentialDefinitionId: this.crededntialDefinationId,
            attributes,
          },
        },
        protocolVersion: "v2" as never,
      });

    return credentialExchangeRecord;
  }

  // This method will create an invitation using the legacy method according to 0160: Connection Protocol.
  async createLegacyInvitation(agentName: string) {
    const agent: Agent | undefined = this.getAgentByName(agentName);
    if (agent) {
      this.logger.log(`Creating legacy invitation for agent: ${agentName}`);
      try {
        // Creating a Legacy Invitation
        const { invitation } = await agent.oob.createLegacyInvitation();
        const invitationUrl = invitation.toUrl({
          domain: agent.config?.endpoints[0] ?? "https://example.org",
        });
        this.logger.log(`Legacy Invitation link created: ${invitationUrl}`);
        return { invitationUrl };
      } catch (error) {
        this.logger.error(`Error creating legacy invitation: ${error}`);
        throw error;
      }
    } else {
      this.logger.error(`Agent ${agentName} not found`);
    }
  }

  async addMetadata(agentName: string, metadata: string, outOfBandId: string) {
    const agent = this.getAgentByName(agentName);
    if (!agent) {
      return;
    }
    try {
      const con = await agent.connections.findAllByOutOfBandId(outOfBandId);
      console.log("con", con);
      con[0].metadata.set(metadata, { value: "" });
    } catch {}
  }

  // This method will create an invitation using the legacy method according to 0434: Out-of-Band Protocol 1.1.
  async createNewInvitation(agentName: string) {
    const agent: Agent | undefined = this.getAgentByName(agentName);
    if (agent) {
      this.logger.log(`Creating new invitation for agent: ${agentName}`);
      try {
        const outOfBandRecord = await agent.oob.createInvitation({});
        const str = outOfBandRecord.outOfBandInvitation.generateId();
        // outOfBandRecord.metadata.set("key", { value: "xc" });
        const invitationUrl = outOfBandRecord.outOfBandInvitation.toUrl({
          domain: agent.config?.endpoints[0] ?? "https://example.org",
        });
        console.log("outOfBandRecord", outOfBandRecord);
        console.log("invitationUrl", invitationUrl);
        // Set additional metadata for the connection (optional)
        // const con = await agent.connections.findAllByOutOfBandId(outOfBandRecord.id);
        // set metada for con
        // const wait5sec = (ms: number) =>
        //   new Promise((resolve) => setTimeout(resolve, ms));
        // await wait5sec(5000);
        const con = await agent.connections.findByInvitationDid(str);
        console.log("con", con);
        // con[0].metadata.set("key", { value: "" });

        const connections = await agent.connections.getAll();
        for (const con of connections) {
          console.log(JSON.stringify(con.metadata));
        }
        console.log(connections);
        console.log("invitationUrl");
        this.addMetadata(agentName, "key", outOfBandRecord.id);
        const invitationUrlQRcode =
          await this.qrCodeService.generateQrCode(invitationUrl);
        this.logger.log(`New Invitation link created: ${invitationUrl}`);
        // Listener
        this.setupConnectionListener(agent, outOfBandRecord, () => {});

        return {
          invitationUrlQRcode,
        };
      } catch (error) {
        this.logger.error(`Error creating new invitation: ${error}`);
        throw error;
      }
    } else {
      this.logger.error(`Agent ${agentName} not found`);
    }
  }

  async receiveInvitation(agentName: string, invitationUrl: string) {
    const agent: Agent | undefined = this.getAgentByName(agentName);
    if (agent) {
      try {
        const { outOfBandRecord } =
          await agent.oob.receiveInvitationFromUrl(invitationUrl);
        this.logger.log(`Received invitation for agent ${agentName}`);
        this.logger.log(
          `OutOfBandRecord received: ${JSON.stringify(outOfBandRecord)}`
        );
      } catch (error) {
        this.logger.error(
          `Error receiving invitation for agent ${agentName}: ${error}`
        );
        throw error;
      }
    } else {
      this.logger.error(`Agent ${agentName} not found`);
    }
  }

  setupConnectionListener(
    agent: Agent,
    outOfBandRecord: OutOfBandRecord,
    cb: (...args: any) => void
  ) {
    agent.events.on<ConnectionStateChangedEvent>(
      ConnectionEventTypes.ConnectionStateChanged,
      ({ payload }) => {
        if (payload.connectionRecord.outOfBandId !== outOfBandRecord.id) return;
        if (payload.connectionRecord.state === DidExchangeState.Completed) {
          // the connection is now ready for usage in other protocols!
          this.logger.log(
            `Connection for out-of-band id ${outOfBandRecord.id} completed.`
          );

          // Custom business logic can be included here
          // In this example we can send a basic message to the connection, but
          // anything is possible
          cb();

          // Set up credential listener
          console.log("setupCredentialListener");
          // setupCredentialListener(agent);

          // We exit the flow
          // process.exit(0);
        }
      }
    );
  }

  getAgentByName(name: string) {
    return this.agents.get(name);
  }

  getOutOfBandRecordById(id: string): Promise<OutOfBandRecord | null> {
    return this.agent.oob.findById(id);
  }

  async issueCredential(
    connectionId: string,
    credentialDefinitionId: string,
    attributes: any
  ) {
    const [connectionRecord] =
      await this.agent.connections.findAllByOutOfBandId(connectionId);

    if (!connectionRecord) {
      throw new Error(
        `ConnectionRecord: record with id ${connectionId} not found.`
      );
    }

    console.log(attributes, "attributesattributesattributes");
    const credentialExchangeRecord =
      await this.agent.credentials.offerCredential({
        connectionId: connectionRecord.id,
        credentialFormats: {
          anoncreds: {
            credentialDefinitionId,
            attributes,
          },
        },
        protocolVersion: "v2" as never,
      });

    return credentialExchangeRecord;
  }
}
