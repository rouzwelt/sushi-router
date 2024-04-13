import path from 'path'
import fetch from 'node-fetch'
import { type Chain } from '../src/chain'
import { existsSync, writeFileSync } from 'fs'
import { ChainId } from '../src/chain/constants'

// get chains from chainlist
(async () => {
  const file = path.resolve('./src/chain/generated.ts')
  if (!existsSync(file)) {
    const chains = await fetch('https://chainid.network/chains.json').then(
      (data) => data.json() as Promise<Chain[]>,
    )
    writeFileSync(
      file,
      `export default ${JSON.stringify(
        chains
          .filter(({ chainId }) =>
            Object.values(ChainId).find((id) => id === chainId),
          )
          .map(
            ({
              chainId,
              explorers,
              nativeCurrency,
              name,
              shortName,
              parent,
            }) => ({
              chainId,
              explorers,
              nativeCurrency,
              name,
              shortName,
              parent,
            }),
          ),
        null,
        2,
      )} as const;\n`,
    )
  }
  process.exit(0)
})();