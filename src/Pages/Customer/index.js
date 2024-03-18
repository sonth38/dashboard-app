import { Avatar, Space, Table, Typography, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { getCustomer } from '../../API';

function Customer() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);

    getCustomer().then(res => setDataSource(res.users));
    setLoading(false);
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Table
        columns={[
          {
            title: 'Image',
            dataIndex: 'image',
            render: link => {
              return <Avatar src={link} />;
            },
          },
          {
            title: 'First Name',
            dataIndex: 'firstName',
          },
          {
            title: 'Last Name',
            dataIndex: 'lastName',
          },
          {
            title: 'Email',
            dataIndex: 'email',
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
          },
          {
            title: 'address',
            dataIndex: 'address',
            render: value => {
              return (
                <span>
                  {value.address},{value.city}
                </span>
              );
            },
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

export default Customer;
