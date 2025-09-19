import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Spin, message, Button, Result, Input, Badge, Space } from 'antd';
import { SearchOutlined, StarFilled } from '@ant-design/icons';
import '../styles/AdvancedAssignment.css';
import AdvancedUserCard, { User } from '../components/AdvancedUserCard';
import EditUserModal from '../components/EditUserModal';

const { Content } = Layout;
const { Title } = Typography;

interface AdvancedAssignmentProps {
  darkMode: boolean;
}

const AdvancedAssignment: React.FC<AdvancedAssignmentProps> = ({ darkMode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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
      <div style={{ padding: '24px' }}>
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
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '70vh'
      }}>
        <Spin size="large" tip="Loading users..." />
      </div>
    );
  }

  return (
    <div className={`advanced-assignment ${darkMode ? 'dark-mode' : ''}`}>
      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={1}>Assignment 2 - Advanced User Profiles</Title>
            <p style={{ 
              fontSize: 16, 
              color: darkMode ? '#8b949e' : '#666',
              marginBottom: 24
            }}>
              TypeScript + Ant Design application with interactive features and professional UI
            </p>
          </div>
          
          {/* Controls */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div style={{ flex: 1, maxWidth: 500 }}>
              <Input
                size="large"
                placeholder="🔍 Search by name, email, or company..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: 8 }}
              />
            </div>
            
            <Badge count={favorites.length} showZero>
              <Button
                type={showFavoritesOnly ? 'primary' : 'default'}
                icon={<StarFilled />}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                size="large"
              >
                Favorites
              </Button>
            </Badge>
          </div>
          
          {/* Results info */}
          {(searchTerm || showFavoritesOnly) && (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <span style={{ color: darkMode ? '#8b949e' : '#666' }}>
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
                  <AdvancedUserCard
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
    </div>
  );
};

export default AdvancedAssignment;