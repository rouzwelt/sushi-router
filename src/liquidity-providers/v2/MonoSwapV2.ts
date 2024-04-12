import { PublicClient } from "viem";
import { ChainId } from "../../chain";
import { LiquidityProviders } from "../LiquidityProvider";
import { UniswapV2BaseProvider } from "../UniswapV2Base";

export class MonoswapV2Provider extends UniswapV2BaseProvider {
  override fee = 0.003;
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BLAST]: "0xE27cb06A15230A7480d02956a3521E78C5bFD2D0",
    } as const;
    const initCodeHash = {
      [ChainId.BLAST]: "0xd1a99f7339108abbcc2eaa6478ee4a0394e2a63f04de08793721fb2f3eff5a38",
    } as const;
    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.MonoswapV2;
  }
  getPoolProviderName(): string {
    return "MonoswapV2";
  }
}
