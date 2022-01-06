export const cryptos = [
  { coin: "BTC", ticker: "USDT" },
  { coin: "ETH", ticker: "USDT" },
  { coin: "FTT", ticker: "USDT" },
  { coin: "SOL", ticker: "USDT" },
  { coin: "AVAX", ticker: "USDT" },
  { coin: "LUNA", ticker: "USDT" },
  { coin: "BNB", ticker: "BUSD" },
];

export const dashboardColumns = [
  {
    title: "Cypto",
    dataIndex: "crypto",
    key: "crypto",
  },
  {
    title: "Ticker",
    dataIndex: "ticker",
    key: "ticker",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Sold",
    dataIndex: "sold",
    key: "sold",
  },
  {
    title: "Bought",
    dataIndex: "bought",
    key: "bought",
  },
  {
    title: "Defi",
    dataIndex: "defi",
    key: "defi",
  },
  {
    title: "Holdings",
    dataIndex: "holdings",
    key: "holdings",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
  {
    title: "ROI",
    dataIndex: "roi",
    key: "roi",
    render: (text) => <>{text}%</>,
    sorter: {
      compare: (a, b) => a.roi - b.roi,
    },
  },
];
