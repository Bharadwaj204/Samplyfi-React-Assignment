import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Spin, message, Button, Result, Input, Switch, Space, Badge } from 'antd';
import { SearchOutlined, StarFilled, BulbOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';
import UserCard from './components/UserCard';
import EditUserModal from './components/EditUserModal';

const { Content } = Layout;
const { Title } = Typography;

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
  liked?: boolean;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        const usersWithLikes = userData.map((user: User) => ({
          ...user,
          liked: false
        }));
        setUsers(usersWithLikes);
        setFilteredUsers(usersWithLikes);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
        message.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('advanced-favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = users;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(user => favorites.includes(user.id));
    }
    
    setFilteredUsers(filtered);
  }, [searchTerm, users, showFavoritesOnly, favorites]);

  const toggleFavorite = (userId: number) => {
    const newFavorites = favorites.includes(userId)
      ? favorites.filter(id => id !== userId)
      : [...favorites, userId];
    setFavorites(newFavorites);
    localStorage.setItem('advanced-favorites', JSON.stringify(newFavorites));
    message.success(favorites.includes(userId) ? 'Removed from favorites' : 'Added to favorites');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    message.success(`${darkMode ? 'Light' : 'Dark'} mode activated`);
  };

  const handleLike = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, liked: !user.liked }
        : user
    ));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    message.success('User deleted successfully');
  };

  const handleSave = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
    message.success('User updated successfully');
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (error) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Result
            status="error"
            title="Failed to Load Users"
            subTitle={error}
            extra={[
              <Button type="primary" onClick={handleRetry} key="retry">
                Try Again
              </Button>
            ]}
          />
        </Content>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" tip="Loading users..." />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: darkMode ? '#141414' : '#f0f2f5' }}>
      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header with controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <Title level={1} style={{ textAlign: 'center', flex: 1, margin: 0 }}>
              User Profiles
            </Title>
            <Space>
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                checkedChildren={<BulbOutlined />}
                unCheckedChildren="🌙"
              />
              <Badge count={favorites.length} showZero>
                <Button
                  type={showFavoritesOnly ? 'primary' : 'default'}
                  icon={<StarFilled />}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                >
                  Favorites
                </Button>
              </Badge>
            </Space>
          </div>
          
          {/* Search bar */}
          <div style={{ marginBottom: 24 }}>
            <Input
              size="large"
              placeholder="🔍 Search by name, email, or company..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: 8 }}
            />
          </div>
          
          {/* Results info */}
          {(searchTerm || showFavoritesOnly) && (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <span style={{ color: '#666' }}>
                Showing {filteredUsers.length} of {users.length} users
                {showFavoritesOnly && ' (favorites only)'}
              </span>
            </div>
          )}
          
          {filteredUsers.length === 0 ? (
            <Result
              title={searchTerm ? 'No Search Results' : showFavoritesOnly ? 'No Favorites' : 'No Users Found'}
              subTitle={
                searchTerm 
                  ? `No users found matching "${searchTerm}"` 
                  : showFavoritesOnly 
                    ? 'You haven\'t added any favorites yet'
                    : 'There are currently no users to display.'
              }
              extra={
                searchTerm || showFavoritesOnly ? (
                  <Space>
                    {searchTerm && (
                      <Button onClick={() => setSearchTerm('')}>
                        Clear Search
                      </Button>
                    )}
                    {showFavoritesOnly && (
                      <Button onClick={() => setShowFavoritesOnly(false)}>
                        Show All Users
                      </Button>
                    )}
                  </Space>
                ) : null
              }
            />
          ) : (
            <Row gutter={[16, 16]}>
              {filteredUsers.map(user => (
                <Col 
                  key={user.id} 
                  xs={24} 
                  sm={12} 
                  md={8} 
                  lg={6}
                >
                  <UserCard
                    user={user}
                    onLike={handleLike}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isFavorite={favorites.includes(user.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Content>
      
      <EditUserModal
        user={editingUser}
        visible={!!editingUser}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </Layout>
  );
}

export default App;