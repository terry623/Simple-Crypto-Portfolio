export const cryptos = [
  "BTCUSDT",
  "ETHUSDT",
  "FTTUSDT",
  "SOLUSDT",
  "AVAXUSDT",
  "FLOWUSDT",
];

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
    render: (text) => <>${text}</>,
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
    render: (text) => <>${text}</>,
  },
];
