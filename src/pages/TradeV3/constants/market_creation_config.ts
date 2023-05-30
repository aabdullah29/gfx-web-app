import { BN } from "bn.js";
import { Fractional } from "../perps/dexterity/types";
import { PublicKey } from "@solana/web3.js";
import { MarketProductGroup } from "../perps/dexterity/accounts";

export const market_config_sample = {
  strike: new Fractional({m: new BN(1), exp: new BN(0)}),
  fullFundingPeriod: 3600,
  minimumFundingPeriod: 600,
  minBaseOrderSize: new BN(10),
  tickSize: new Fractional({
    m: new BN(100),
    exp: new BN(3)
  }),
  name: Buffer.from('BTC-PERP'),
  baseDecimals: new BN(0),
  oracleAddress: new PublicKey("HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J")
}

export const printAccounts = (mpg: MarketProductGroup): any => {
  console.log("ror: ", mpg.riskOutputRegister.toBase58())
}