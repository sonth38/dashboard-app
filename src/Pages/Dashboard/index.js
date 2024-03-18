import {
  DollarOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Typography, Space, Card, Statistic, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getOrders, getRevenue, getProducts, getCustomer } from '../../API';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then(res => setOrders(res.total));
    getProducts().then(res => setInventory(res.total));
    getCustomer().then(res => setCustomer(res.total));
    getRevenue().then(res => setRevenue(res.total));
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: 'green',
                backgroundColor: 'rgba(0,255,0,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Orders"
          value={orders}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: 'blue',
                backgroundColor: 'rgba(0,0,255,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Inventory"
          value={inventory}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: 'purple',
                backgroundColor: 'rgba(0,255,355,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Customer"
          value={customer}
        />
        <DashboardCard
          icon={
            <DollarOutlined
              style={{
                color: 'red',
                backgroundColor: 'rgba(255,0,0,0.25)',
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title="Revenue  "
          value={revenue}
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ icon, title, value }) {
  return (
    <Card>
      <Space direction="hozizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then(res => {
      setDataSource(res.products.slice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
          },
          {
            title: 'DiscountedPrice',
            dataIndex: 'discountedPrice',
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueDate] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then(res => {
      const labels = res.carts.map(cart => {
        return `User-${cart.userId}`;
      });

      const data = res.carts.map(cart => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: data,
            backgroundColor: 'rgba(255, 0, 0, 1)',
          },
        ],
      };

      setRevenueDate(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
  };

  return (
    <Card style={{ width: 600, height: 350 }}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}

export default Dashboard;
