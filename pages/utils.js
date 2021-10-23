export const calculateForDashboard = (allCryptoData) => {
  const values = [];

  allCryptoData.forEach(({ symbol, orders }) => {
    const sumOfSold = orders
      .filter((order) => order.side === "SELL")
      .reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + parseFloat(currentValue.cummulativeQuoteQty);
      }, 0)
      .toFixed(2);

    const sumOfBought = orders
      .filter((order) => order.side === "BUY")
      .reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + parseFloat(currentValue.cummulativeQuoteQty);
      }, 0)
      .toFixed(2);

    values.push({
      key: symbol,
      crypto: symbol,
      sold: sumOfSold,
      bought: sumOfBought,
    });
  });

  return values;
};
