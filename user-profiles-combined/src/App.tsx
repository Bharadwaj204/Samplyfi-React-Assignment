// Samplyfi React Assignment Portal - Combined Application
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Typography, Space } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  BulbOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import HomePage from './pages/HomePage';
import BasicAssignment from './pages/BasicAssignment';
import AdvancedAssignment from './pages/AdvancedAssignment';
import './App.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/basic',
      icon: <UserOutlined />,
      label: 'Basic Assignment',
    },
    {
      key: '/advanced',
      icon: <TeamOutlined />,
      label: 'Advanced Assignment',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }} className={darkMode ? 'dark-mode' : ''}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
        <div className="logo" style={{ padding: '16px', textAlign: 'center' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>
            {collapsed ? 'SP' : 'Samplyfi Portal'}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: darkMode ? '#1f1f1f' : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${darkMode ? '#434343' : '#f0f0f0'}`,
          }}
        >
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: darkMode ? '#fff' : '#000',
              }}
            />
            <Title level={4} style={{ margin: 0, color: darkMode ? '#fff' : '#000' }}>
              React Assignment Portal
            </Title>
          </Space>
          <Button
            type="primary"
            icon={<BulbOutlined />}
            onClick={toggleDarkMode}
            style={{
              backgroundColor: darkMode ? '#faad14' : '#1890ff',
              borderColor: darkMode ? '#faad14' : '#1890ff',
            }}
          >
            {darkMode ? 'Light' : 'Dark'} Mode
          </Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: darkMode ? '#0d1117' : '#fff',
            borderRadius: 8,
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage darkMode={darkMode} />} />
            <Route path="/basic" element={<BasicAssignment darkMode={darkMode} />} />
            <Route path="/advanced" element={<AdvancedAssignment darkMode={darkMode} />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;