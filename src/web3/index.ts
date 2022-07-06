import {
  ChainId,
  ReservesData,
  ReservesDataHumanized,
  UiIncentiveDataProvider,
  UiPoolDataProvider,
} from "@aave/contract-helpers";
import { ethers } from "ethers";

const chainENV: any = process.env.REACT_APP_CHAIN || 43114;
// ========================================================
// ======================================== P R O V I D E R
// ========================================================
let provider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_MORALIS_DAPP_URL
);

provider = new ethers.providers.StaticJsonRpcProvider(
  process.env.REACT_APP_MORALIS_DAPP_URL,
  ChainId[chainENV]
);

// ========================================================
// ================================================ P O O L
// ========================================================

// =================================== T E S T N E T
// const uiPoolDataProviderAddress: string =
// "0x1D01f7d8B42Ec47837966732f831E1D6321df499".toLowerCase();
// const uiIncentiveDataProviderAddress: string =
// "0x036dDd300B57F6a8A6A55e2ede8b50b517A5094f".toLowerCase();
// const lendingPoolAddressProvider: string =
// "0x1775ECC8362dB6CaB0c7A9C0957cF656A5276c29".toLowerCase();

// =================================== M A I N N E T
const uiPoolDataProviderAddress: string =
  "0xdBbFaFC45983B4659E368a3025b81f69Ab6E5093".toLowerCase();
const uiIncentiveDataProviderAddress: string =
  "0x270f51cf3F681010B46f5c4Ee2aD5120Db33026F".toLowerCase();
const lendingPoolAddressProvider: string =
  "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb".toLowerCase();

// =============================== C O N T R A C T s
const poolDataProviderContract: UiPoolDataProvider = new UiPoolDataProvider({
  provider,
  uiPoolDataProviderAddress,
  chainId: +ChainId[chainENV],
});

const incentiveDataProviderContract: UiIncentiveDataProvider =
  new UiIncentiveDataProvider({
    provider,
    uiIncentiveDataProviderAddress,
    chainId: +ChainId[chainENV],
  });

// ================================== G E T T  E R s
const allToken: Promise<ReservesDataHumanized> =
  poolDataProviderContract.getReservesHumanized({
    lendingPoolAddressProvider,
  });

// incentive
const explore: Promise<ReservesData> = poolDataProviderContract.getReservesData(
  {
    lendingPoolAddressProvider,
  }
);

// NOTES: CLONE VARIABLE
// === poolDataProviderContract.getReservesHumanized
// supplyCap
// max ltv: baseLTVasCollateral
// Liquidation threshold: reserveLiquidationThreshold
// emod - Max LTV: eModeLtv
// emod - Liquidation threshold: eModeLiquidationThreshold

// Liquidation penalty
// Reserve Size
// Available liquidity
// Utilization Rate
// Oracle price
// Total supplied 1
// Total supplied 2
// Supply - APY
// Supply Rewards - APY

// Total borrowed
// APY, variable
// APY, stable

// emod - Liquidation penalty

export { allToken, explore };
