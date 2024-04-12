import { PublicClient } from "viem";
import { ChainId } from "../../chain";
import { LiquidityProviders } from "../LiquidityProvider";
import { UniswapV2BaseProvider } from "../UniswapV2Base";

export class BaseSwapProvider extends UniswapV2BaseProvider {
  override fee = 0.0025;
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BASE]: "0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB",
    } as const;
    const initCodeHash = {
      [ChainId.BASE]: "0xb618a2730fae167f5f8ac7bd659dd8436d571872655bcb6fd11f2158c8a64a3b",
    } as const;
    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.BaseSwap;
  }
  getPoolProviderName(): string {
    return "BaseSwap";
  }
}
