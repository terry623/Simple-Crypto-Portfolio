export const calculateForDashboard = (doneOrders, prices) => {
  const values = [];

  doneOrders.forEach(({ symbol, orders }) => {
    const price = parseFloat(prices[symbol]).toFixed(2);

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
      }, 0);

    const sumOfHoldingsBuy = orders
      .filter((order) => order.side === "BUY")
      .reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.executedQty);
      }, 0);

    const holdings = (sumOfHoldingsBuy - sumOfHoldingsSell).toFixed(5);

    const value = (price * holdings).toFixed(2);

    values.push({
      key: symbol,
      price,
      crypto: symbol,
      sold: sumOfSold,
      bought: sumOfBought,
      holdings,
      value,
    });
  });

  return values;
};
