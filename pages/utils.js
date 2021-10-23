export const calculateForDashboard = (allCryptoData) => {
  const values = [];

  allCryptoData.forEach(({ symbol, orders }) => {
    const sumOfSold = orders
      .filter((order) => order.side === "SELL")
      .reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.cummulativeQuoteQty);
      }, 0)
      .toFixed(2);

    const sumOfBought = orders
      .filter((order) => order.side === "BUY")
      .reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.cummulativeQuoteQty);
      }, 0)
      .toFixed(2);

    const sumOfHoldingsSell = orders
      .filter((order) => order.side === "SELL")
      .reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.executedQty);
      }, 0)
      .toFixed(5);

    const sumOfHoldingsBuy = orders
      .filter((order) => order.side === "BUY")
      .reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.executedQty);
      }, 0)
      .toFixed(5);

    values.push({
      key: symbol,
      crypto: symbol,
      sold: sumOfSold,
      bought: sumOfBought,
      holdings: sumOfHoldingsBuy - sumOfHoldingsSell,
    });
  });

  return values;
};
