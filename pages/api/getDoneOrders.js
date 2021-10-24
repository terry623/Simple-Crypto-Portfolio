import binance from "./binance";

import { ticker } from "../../constants";

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

export default async function index(req, res) {
  const cryptos = req.query.cryptos.split(",");

  const promises = [];
  cryptos.forEach((crypto) => {
    promises.push(getDoneOrders(crypto + ticker));
  });

  const result = await Promise.all(promises);
  res.status(200).json(result);
}
