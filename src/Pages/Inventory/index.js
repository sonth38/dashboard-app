import { Avatar, Space, Table, Typography, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { getProducts } from '../../API';

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);

    getProducts().then(res => setDataSource(res.products));
    setLoading(false);
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Table
        columns={[
          {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            render: link => {
              return <Avatar src={link} />;
            },
          },
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
            title: 'Rating',
            dataIndex: 'rating',
            render: rate => {
              return <Rate allowHalf defaultValue={rate} disabled />;
            },
          },
          {
            title: 'Stock',
            dataIndex: 'stock',
          },
          {
            title: 'Brand',
            dataIndex: 'brand',
          },
          {
            title: 'Category',
            dataIndex: 'category',
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

export default Inventory;
