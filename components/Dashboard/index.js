import { useEffect } from "react";
import axios from "axios";
import { Table, Typography } from "antd";

const { Text } = Typography;

import styles from "styles/Dashboard.module.css";
import { cryptos, dashboardColumns } from "constants";
import { calculateForDashboard, intl } from "utils";

const Dashboard = ({ data, setData }) => {
  useEffect(() => {
    const fetchData = async () => {
      const doneOrders = await axios
        .get(`/api/getDoneOrders?cryptos=${cryptos}`)
        .then((res) => res.data);

      const prices = await axios
        .get(`/api/getPrices?cryptos=${cryptos}`)
        .then((res) => res.data);

      setData(calculateForDashboard(doneOrders, prices));
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Table
        columns={dashboardColumns}
        dataSource={data}
        pagination={false}
        bordered
        summary={() => {
          let totalSold = 0;
          let totalBought = 0;
          let totalBalance = 0;

          data.forEach(
            ({ soldNumber, boughtNumber, valueNumber, balanceNumber }) => {
              totalSold += soldNumber;
              totalBought += boughtNumber;
              totalBalance += balanceNumber;
            }
          );

          return (
            <Table.Summary.Row fixed>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>-</Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{intl.format(totalSold)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{intl.format(totalBought)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>-</Table.Summary.Cell>
              <Table.Summary.Cell>-</Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{intl.format(totalBalance)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>-</Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

export default Dashboard;
