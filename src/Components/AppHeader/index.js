import { Badge, Drawer, Image, List, Space, Typography } from 'antd';
import { MailOutlined, BellFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getComments, getOrders } from '../../API';

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const showDrawerComments = () => {
    setCommentsOpen(true);
  };

  const showDrawerNotifications = () => {
    setNotificationsOpen(true);
  };

  useEffect(() => {
    getComments().then(res => {
      setComments(res.comments);
    });

    getOrders().then(res => {
      setNotifications(res.products);
    });
  }, []);

  return (
    <div className="AppHeader">
      <Image width={40} src=""></Image>
      <Typography.Title>Marcus Dashboard</Typography.Title>
      <Space>
        <Badge count={comments.length} dot>
          <MailOutlined style={{ fontSize: 24 }} onClick={showDrawerComments} />
        </Badge>
        <Badge count={notifications.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={showDrawerNotifications}
          />
        </Badge>
        <Drawer
          title="Comments"
          onClose={() => {
            setCommentsOpen(false);
          }}
          open={commentsOpen}
        >
          <List
            dataSource={comments}
            renderItem={item => {
              return <List.Item>{item.body}</List.Item>;
            }}
          ></List>
        </Drawer>
        <Drawer
          title="Notifications"
          onClose={() => {
            setNotificationsOpen(false);
          }}
          open={notificationsOpen}
        >
          <List
            dataSource={notifications}
            renderItem={item => {
              return (
                <List.Item>
                  <Typography.Text strong>{item.title}</Typography.Text>-has
                  been ordered!
                </List.Item>
              );
            }}
          ></List>
        </Drawer>
      </Space>
    </div>
  );
}

export default AppHeader;
