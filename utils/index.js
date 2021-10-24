import { ticker } from "constants";

export const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  useGrouping: false,
});

export const calculateForDashboard = (doneOrders, prices) => {
  const values = [];
  prices = prices.reduce(function (acc, cur, i) {
    acc[Object.keys(cur)[0]] = Object.values(cur)[0];
    return acc;
  }, {});

  doneOrders.forEach(({ symbol, orders }) => {
    const price = parseFloat(prices[symbol]);

    const sumOfSold = orders
      .filter((order) => order.side === "SELL")
      .reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.cummulativeQuoteQty);
      }, 0);

    const sumOfBought = orders
      .filter((order) => order.side === "BUY")
      .reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.cummulativeQuoteQty);
      }, 0);

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

    const holdings = sumOfHoldingsBuy - sumOfHoldingsSell;

    const value = price * holdings;

    const balance = value + sumOfSold - sumOfBought;

    const roi = balance / sumOfBought;

    values.push({
      key: symbol,
      price: intl.format(price),
      crypto: symbol.replace(ticker, ""),
      sold: intl.format(sumOfSold),
      soldNumber: sumOfSold,
      bought: intl.format(sumOfBought),
      boughtNumber: sumOfBought,
      holdings: holdings.toFixed(5),
      value: intl.format(value),
      valueNumber: value,
      balance: intl.format(balance),
      balanceNumber: balance,
      roi: (roi * 100).toFixed(2),
    });
  });

  return values;
};

export const calculateForAssetPie = (data) =>
  data.map((d) => ({
    type: d.crypto,
    value: parseFloat(d.valueNumber.toFixed(2)),
  }));
