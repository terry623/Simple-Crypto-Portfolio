import binance from "./binance";

const getPrices = (crypto) =>
  new Promise((resolve, reject) => {
    binance.prices(crypto, (error, ticker) => {
      if (error) {
        reject(error);
      }
      resolve(ticker);
    });
  });

export default async function index(req, res) {
  const cryptos = req.query.cryptos.split(",");

  const promises = [];
  cryptos.forEach((crypto) => {
    promises.push(getPrices(crypto));
  });

  const result = await Promise.all(promises);
  res.status(200).json(result);
}
