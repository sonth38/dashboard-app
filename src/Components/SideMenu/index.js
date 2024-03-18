import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState('/');

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location]);

  const navigate = useNavigate();

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={item => {
          //item.id
          navigate(item.key);
        }}
        selectedKeys={selectedKeys}
        items={[
          { label: 'Dashboard', key: '/', icon: <AppstoreOutlined /> },
          { label: 'Inventory', key: '/inventory', icon: <ShopOutlined /> },
          { label: 'Order', key: '/order', icon: <ShoppingCartOutlined /> },
          { label: 'Customer', key: '/customer', icon: <UserOutlined /> },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
