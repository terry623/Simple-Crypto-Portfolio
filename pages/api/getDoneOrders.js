import binance from "./binance";

const ticker = "USDT";

export default function getDoneOrders(req, res) {
  binance.allOrders(`${req.query.crypto}${ticker}`, (error, orders, symbol) => {
    orders = orders.filter((order) => order.status === "FILLED");
    res.status(200).json({ symbol, orders });
  });
}
