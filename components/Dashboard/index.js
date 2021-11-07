
import { Table, Typography } from "antd";

const { Text } = Typography;

import styles from "styles/Dashboard.module.css";
import { dashboardColumns } from "constants";
import { intl } from "utils";

const Dashboard = ({ data }) => {
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

          data.forEach(({ soldNumber, boughtNumber, balanceNumber }) => {
            totalSold += soldNumber;
            totalBought += boughtNumber;
            totalBalance += balanceNumber;
          });

          return (
            <Table.Summary.Row>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>-</Table.Summary.Cell>
              <Table.Summary.Cell>-</Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{intl.format(totalSold)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{intl.format(totalBought)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>-</Table.Summary.Cell>
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
