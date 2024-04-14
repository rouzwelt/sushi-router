import path from 'path'
import fetch from 'node-fetch'
import { writeFileSync, mkdirSync } from 'fs'

const tinesUrl = 'https://raw.githubusercontent.com/sushiswap/sushiswap/5968f1b44e963aa9e0ca5747cefa5cd394004562/packages/sushi/src/tines/';
const tinesFiles = [
  'BridgeBento.ts',
  'BridgeBidirectionalUnlimited.ts',
  'BridgeStargateV04OneWay.ts',
  'CLPool.ts',
  'CurveMultitokenPool.ts',
  'CurveMultitokenPoolSingle.ts',
  'CurvePool.ts',
  'Graph.ts',
  'MultiRouter.ts',
  'PrimaryPools.ts',
  'RPool.ts',
  'StableSwapPool.ts',
  'StarGateFeesV04.ts',
  'UniV3Pool.ts',
  'Utils.ts',
  'index.ts',
  'constants/hybrid.ts',
  'constants/index.ts',
  'functions/computeHybridLiquidity.ts',
  'functions/convertTokenToBento.ts',
  'functions/getBentoChainId.ts',
  'functions/index.ts',
];

(async () => {
  mkdirSync("./src/tines", { recursive: true });
  mkdirSync("./src/tines/constants", { recursive: true });
  mkdirSync("./src/tines/functions", { recursive: true });

  // get files
  const promises: Promise<void>[] = [];
  for (const file of tinesFiles) {
    const filePath = path.resolve("./src/tines/" + file);
    promises.push(
      fetch(tinesUrl + file).then(async (data) => {
        let text = await data.text();
        text = text.replaceAll("/index.js", "")
        text = text.replaceAll(".js", "")
        text = text.replaceAll("../../math", "sushi/math")
        text = text.replaceAll("../math", "sushi/math")
        text = text.replaceAll("../../currency", "sushi/currency")
        writeFileSync(filePath, text)
      })
    );
  }
  await Promise.all(promises);

  process.exit(0)
})();