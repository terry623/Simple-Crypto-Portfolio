export const cryptos = ["BTC", "ETH", "FTT", "SOL", "AVAX", "FLOW"];

export const ticker = "USDT";

export const dashboardColumns = [
  {
    title: "Cypto",
    dataIndex: "crypto",
    key: "crypto",
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
