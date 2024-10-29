export interface KanonModuleConfigOptions {
  privateKey: string;
}

export interface NetworkConfig {
  privateKey: string;
}

export class NearModuleConfig {
  private options: KanonModuleConfigOptions;

  public constructor(options: KanonModuleConfigOptions) {
    this.options = options;
  }


  public get privateKey() {
    return this.options.privateKey;
  }
}
