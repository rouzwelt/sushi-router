import { PublicClient } from "viem";
import { ChainId } from "../../chain";
import { LiquidityProviders } from "../LiquidityProvider";
import { UniswapV2BaseProvider } from "../UniswapV2Base";

export class DyorV2Provider extends UniswapV2BaseProvider {
  override fee = 0.003;
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BLAST]: "0xA1da7a7eB5A858da410dE8FBC5092c2079B58413",
      [ChainId.ZETACHAIN]: "0xA1da7a7eB5A858da410dE8FBC5092c2079B58413",
    } as const;
    const initCodeHash = {
      [ChainId.BLAST]: "0xda2f1a903916d7de88d9357d27d763f123502a5d48e3b229d5fa049b3ffdeeb5",
      [ChainId.ZETACHAIN]: "0xda2f1a903916d7de88d9357d27d763f123502a5d48e3b229d5fa049b3ffdeeb5",
    } as const;
    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.DyorV2;
  }
  getPoolProviderName(): string {
    return "DyorV2";
  }
}
