import path from 'path'
import fetch from 'node-fetch'
import { writeFileSync, mkdirSync } from 'fs'

(async () => {
  mkdirSync("./src/chain", { recursive: true });

  // get constants.ts
  const constantsFile = path.resolve('./src/chain/constants.ts')
  let constantsText = await fetch(
    'https://raw.githubusercontent.com/sushiswap/sushiswap/5968f1b44e963aa9e0ca5747cefa5cd394004562/packages/sushi/src/chain/constants.ts'
  ).then(
    (data) => data.text()
  );
  constantsText = constantsText.replace("// RONIN: 2020,", "FLARE: 14")
  constantsText = constantsText.replace("[ChainId.BLAST]: 'blast',", "[ChainId.BLAST]: 'blast',\n  [ChainId.FLARE]: 'flare',")
  writeFileSync(
    constantsFile,
    constantsText
  )

  // get index.ts
  const indexFile = path.resolve('./src/chain/index.ts')
  let indexText = await fetch(
    'https://raw.githubusercontent.com/sushiswap/sushiswap/5968f1b44e963aa9e0ca5747cefa5cd394004562/packages/sushi/src/chain/index.ts'
  ).then(
    (data) => data.text()
  );
  indexText = indexText.replaceAll(".js", "")
  writeFileSync(
    indexFile,
    indexText
  )

  // get chainlist chains
  const generatedFile = path.resolve('./src/chain/generated.ts')
  const chains = await fetch('https://chainid.network/chains.json').then(
    (data) => data.json(),
  )
  // @ts-ignore
  const constants = await import('../src/chain/constants');
  writeFileSync(
    generatedFile,
    `export default ${JSON.stringify(
      chains
        .filter(({ chainId }) =>
          Object.values(constants.ChainId).find((id) => id === chainId),
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

  process.exit(0)
})();