import { Space, Table, Typography, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { getOrders } from '../../API';

function Order() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);

    getOrders().then(res => setDataSource(res.products));
    setLoading(false);
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Order</Typography.Title>
      <Table
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
          },
          {
            title: 'Price',
            dataIndex: 'price',
            render: value => {
              return <span>${value}</span>;
            },
          },
          {
            title: 'Discounted Price',
            dataIndex: 'discountedPrice',
            render: value => {
              return <span>${value}</span>;
            },
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
          },
          {
            title: 'Total',
            dataIndex: 'total',
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        loading={loading}
      ></Table>
    </Space>
  );
}

export default Order;
