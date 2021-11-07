import binance from "./binance";

const getPrices = (crypto) =>
  new Promise((resolve, reject) => {
    binance.prices(crypto, (error, price) => {
      if (error) {
        reject(error);
      }
      resolve(price);
    });
  });

export default async function index(req, res) {
  const cryptos = req.query.cryptos.split(",");

  const promises = [];
  cryptos.forEach((crypto) => {
    promises.push(getPrices(crypto));
  });

  try {
    const result = await Promise.all(promises);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
