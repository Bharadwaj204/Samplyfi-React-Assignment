import React from 'react';
import { Card, Row, Col, Typography, Button, Space, Divider, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  RocketOutlined, 
  StarOutlined, 
  UserOutlined, 
  CheckCircleOutlined,
  TrophyOutlined,
  CodeOutlined,
  BugOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Modern React Development',
      description: 'Built with React 19.1.1, TypeScript, and modern hooks',
      icon: <CodeOutlined style={{ fontSize: 24, color: '#1890ff' }} />
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first responsive design for all screen sizes',
      icon: <ThunderboltOutlined style={{ fontSize: 24, color: '#52c41a' }} />
    },
    {
      title: 'Advanced Features',
      description: 'Dark mode, search, favorites, animations, and more',
      icon: <StarOutlined style={{ fontSize: 24, color: '#faad14' }} />
    },
    {
      title: 'Production Ready',
      description: 'Error handling, loading states, and optimized performance',
      icon: <TrophyOutlined style={{ fontSize: 24, color: '#722ed1' }} />
    }
  ];

  const technicalHighlights = [
    'React Hooks (useState, useEffect) for state management',
    'TypeScript for type safety and better development experience',
    'Ant Design component library for professional UI',
    'Bootstrap 4.5.2 for responsive grid and styling',
    'RESTful API integration with JSONPlaceholder',
    'Dynamic avatar generation with DiceBear API',
    'SpinKit loading animations for better UX',
    'LocalStorage for data persistence',
    'CSS animations and transitions',
    'Error handling and retry mechanisms',
    'Dark/Light theme switching',
    'Search and filter functionality',
    'Favorites system with visual feedback'
  ];

  return (
    <div style={{ 
      padding: '24px',
      background: darkMode ? '#0d1117' : '#f0f2f5',
      minHeight: '100%'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <Card style={{ 
          marginBottom: 24,
          background: darkMode ? '#161b22' : '#fff',
          border: `1px solid ${darkMode ? '#30363d' : '#d9d9d9'}`,
          textAlign: 'center',
          backgroundImage: darkMode 
            ? 'linear-gradient(135deg, #161b22 0%, #21262d 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff'
        }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <RocketOutlined style={{ fontSize: 64, color: '#fff' }} />
            <Title level={1} style={{ color: '#fff', margin: 0 }}>
              ReactJS Frontend Developer Assignment
            </Title>
            <Paragraph style={{ 
              fontSize: 18, 
              color: '#fff', 
              opacity: 0.9,
              maxWidth: 600,
              margin: '0 auto'
            }}>
              A comprehensive showcase of React development skills featuring two complete applications
              with modern design patterns, advanced features, and production-ready code quality.
            </Paragraph>
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                icon={<UserOutlined />}
                onClick={() => navigate('/basic')}
                style={{ height: 48, fontSize: 16 }}
              >
                View Assignment 1 (Basic)
              </Button>
              <Button 
                size="large" 
                icon={<StarOutlined />}
                onClick={() => navigate('/advanced')}
                style={{ 
                  height: 48, 
                  fontSize: 16,
                  background: '#faad14',
                  borderColor: '#faad14',
                  color: '#fff'
                }}
              >
                View Assignment 2 (Advanced)
              </Button>
            </Space>
          </Space>
        </Card>

        {/* Features Grid */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  background: darkMode ? '#161b22' : '#fff',
                  border: `1px solid ${darkMode ? '#30363d' : '#d9d9d9'}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                  {feature.icon}
                  <Title level={4} style={{ 
                    margin: '8px 0',
                    color: darkMode ? '#f0f6fc' : '#262626'
                  }}>
                    {feature.title}
                  </Title>
                  <Text style={{ 
                    textAlign: 'center',
                    color: darkMode ? '#8b949e' : '#666'
                  }}>
                    {feature.description}
                  </Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Assignment Details */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card
              title={
                <Space>
                  <UserOutlined style={{ color: '#1890ff' }} />
                  <span>Assignment 1 - Basic Implementation</span>
                </Space>
              }
              extra={
                <Button type="primary" onClick={() => navigate('/basic')}>
                  View Demo
                </Button>
              }
              style={{
                height: '100%',
                background: darkMode ? '#161b22' : '#fff',
                border: `1px solid ${darkMode ? '#30363d' : '#d9d9d9'}`
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Paragraph style={{ color: darkMode ? '#8b949e' : '#666' }}>
                  A clean, responsive user profiles application built with React and Bootstrap,
                  demonstrating fundamental React concepts and modern development practices.
                </Paragraph>
                
                <Divider style={{ margin: '12px 0' }} />
                
                <List
                  size="small"
                  dataSource={[
                    'React functional components with hooks',
                    'Bootstrap 4.5.2 responsive design',
                    'API integration with JSONPlaceholder',
                    'Dynamic avatar generation',
                    'SpinKit loading animations',
                    'Search and filter functionality',
                    'Dark mode toggle',
                    'Favorites system with persistence'
                  ]}
                  renderItem={item => (
                    <List.Item style={{ padding: '4px 0', border: 'none' }}>
                      <Space>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        <Text style={{ color: darkMode ? '#f0f6fc' : '#262626' }}>
                          {item}
                        </Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              title={
                <Space>
                  <StarOutlined style={{ color: '#faad14' }} />
                  <span>Assignment 2 - Advanced Implementation</span>
                </Space>
              }
              extra={
                <Button 
                  style={{ 
                    background: '#faad14',
                    borderColor: '#faad14',
                    color: '#fff'
                  }}
                  onClick={() => navigate('/advanced')}
                >
                  View Demo
                </Button>
              }
              style={{
                height: '100%',
                background: darkMode ? '#161b22' : '#fff',
                border: `1px solid ${darkMode ? '#30363d' : '#d9d9d9'}`
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Paragraph style={{ color: darkMode ? '#8b949e' : '#666' }}>
                  A sophisticated user management application with TypeScript and Ant Design,
                  featuring advanced interactions, form handling, and professional UI components.
                </Paragraph>
                
                <Divider style={{ margin: '12px 0' }} />
                
                <List
                  size="small"
                  dataSource={[
                    'TypeScript for type safety',
                    'Ant Design component library',
                    'Interactive like/favorite system',
                    'Modal forms with validation',
                    'Real-time search and filtering',
                    'Professional dark theme',
                    'Advanced animations and transitions',
                    'Production-ready error handling'
                  ]}
                  renderItem={item => (
                    <List.Item style={{ padding: '4px 0', border: 'none' }}>
                      <Space>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        <Text style={{ color: darkMode ? '#f0f6fc' : '#262626' }}>
                          {item}
                        </Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Technical Highlights */}
        <Card
          title={
            <Space>
              <BugOutlined style={{ color: '#722ed1' }} />
              <span>Technical Implementation Highlights</span>
            </Space>
          }
          style={{
            marginTop: 24,
            background: darkMode ? '#161b22' : '#fff',
            border: `1px solid ${darkMode ? '#30363d' : '#d9d9d9'}`
          }}
        >
          <Row gutter={[16, 8]}>
            {technicalHighlights.map((highlight, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Space>
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  <Text style={{ color: darkMode ? '#f0f6fc' : '#262626' }}>
                    {highlight}
                  </Text>
                </Space>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;