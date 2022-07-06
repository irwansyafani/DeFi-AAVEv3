const query: string = `{
  reserves {
    id
    symbol
    name
    underlyingAsset
    supplyCap
    
    totalCurrentVariableDebt
    variableBorrowRate
    availableLiquidity
    stableBorrowRate
    
    liquidityIndex
    variableBorrowIndex
    liquidityRate
    variableBorrowRate
    stableBorrowRate

    totalATokenSupply
    utilizationRate
    totalSupplies
    
    eMode {
      ltv
      liquidationThreshold
    }
    price {
      priceInEth
      oracle {
        baseCurrencyUnit
      }
    }
    
    vToken {
      underlyingAssetDecimals
      rewards {
        rewardTokenDecimals
        emissionsPerSecond
      }
    }
    aToken {
      underlyingAssetDecimals
      rewards {
        rewardTokenDecimals
        emissionsPerSecond
      }
    }
    sToken {
      underlyingAssetDecimals
      rewards {
        rewardTokenDecimals
        emissionsPerSecond
      }
    }
  }
}`;

export const getGraphData = (async () => {
  const res = await fetch(`${process.env.REACT_APP_GRAPHQL_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: {} }),
  });
  const json = await res.json();
  if (json.errors) {
    console.log(json);
    throw new Error("Failed to fetch API");
  }
  return json.data;
})();
