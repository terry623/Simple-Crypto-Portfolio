import binance from "./binance";

const getDoneOrders = (crypto) =>
  new Promise((resolve, reject) => {
    binance.allOrders(crypto, (error, orders, symbol) => {
      if (error) {
        reject(error);
      }
      orders = orders.filter((order) => order.status === "FILLED");
      resolve({ symbol, orders });
    });
  });

export default async function test(req, res) {
  const cryptos = req.query.cryptos.split(",");

  const promises = [];
  cryptos.forEach((crypto) => {
    promises.push(getDoneOrders(crypto));
  });

  const result = await Promise.all(promises);
  res.status(200).json(result);
}
