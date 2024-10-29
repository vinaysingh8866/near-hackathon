import type { Module, AgentContext, DependencyManager } from "@credo-ts/core";

import { NearLedgerService
  
 } from "./ledger";
import {
  NearModuleConfig,
  KanonModuleConfigOptions
} from "./NearModuleConfig";

export class NearModule implements Module {
  public readonly config: NearModuleConfig;

  public constructor(configOptions: KanonModuleConfigOptions) {
    this.config = new NearModuleConfig(configOptions);
  }

  public register(dependencyManager: DependencyManager) {
    dependencyManager.registerInstance(NearModuleConfig, this.config);
    dependencyManager.registerSingleton(NearLedgerService);
  }

  public async initialize(agentContext: AgentContext): Promise<void> {
    const ethereumLedgerService = agentContext.dependencyManager.resolve(
      NearLedgerService
    );
    // await ethereumLedgerService.connect();
  }
}
