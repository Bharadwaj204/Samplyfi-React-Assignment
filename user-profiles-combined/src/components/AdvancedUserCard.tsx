import React, { useState } from 'react';
import { Card, Button, Space, Avatar, Typography, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, HomeOutlined, BankOutlined, StarOutlined, StarFilled, LikeOutlined, LikeFilled } from '@ant-design/icons';

const { Text, Title } = Typography;

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

interface UserCardProps {
  user: User;
  onLike: (userId: number) => void;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (userId: number) => void;
}

const AdvancedUserCard: React.FC<UserCardProps> = ({ user, onLike, onEdit, onDelete, isFavorite = false, onToggleFavorite }) => {
  const [avatarError, setAvatarError] = useState(false);
  
  // Enhanced avatar system with multiple styles
  const getAvatarUrl = () => {
    const avatarStyles = ['avataaars', 'personas', 'bottts', 'identicon', 'initials'];
    const randomStyle = avatarStyles[user.id % avatarStyles.length];
    const moods = ['happy', 'sad', 'surprised', 'neutral'];
    const randomMood = moods[user.id % moods.length];
    return `https://avatars.dicebear.com/v2/${randomStyle}/${user.username}.svg?options[mood][]=${randomMood}`;
  };
  
  const avatarUrl = getAvatarUrl();
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=${user.id % 3 === 0 ? '8b5cf6' : user.id % 3 === 1 ? '06b6d4' : 'f59e0b'}&color=fff&size=80`;

  const handleAvatarError = () => {
    setAvatarError(true);
    return false; // Return false to prevent default error handling
  };

  const handleLike = () => {
    onLike(user.id);
  };

  const handleEdit = () => {
    onEdit(user);
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        <div style={{ textAlign: 'center', padding: '20px 0 10px' }}>
          <Avatar
            size={80}
            src={avatarError ? fallbackAvatar : avatarUrl}
            alt={`${user.name} avatar`}
            onError={handleAvatarError}
          />
        </div>
      }
      actions={[
        onToggleFavorite && (
          <Button
            key="favorite"
            type="text"
            icon={isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
            onClick={() => onToggleFavorite(user.id)}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          />
        ),
        <Button
          key="like"
          type="text"
          icon={user.liked ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
          onClick={handleLike}
          title={user.liked ? 'Unlike' : 'Like'}
        />,
        <Button
          key="edit"
          type="text"
          icon={<EditOutlined />}
          onClick={handleEdit}
        />,
        <Popconfirm
          key="delete"
          title="Are you sure you want to delete this user?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
          />
        </Popconfirm>
      ].filter(Boolean)}
    >
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>{user.name}</Title>
        <Text type="secondary">@{user.username}</Text>
      </div>
      
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MailOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          <Text ellipsis={{ tooltip: user.email }} style={{ flex: 1 }}>
            {user.email}
          </Text>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PhoneOutlined style={{ marginRight: 8, color: '#52c41a' }} />
          <Text ellipsis={{ tooltip: user.phone }} style={{ flex: 1 }}>
            {user.phone}
          </Text>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GlobalOutlined style={{ marginRight: 8, color: '#722ed1' }} />
          <Text ellipsis={{ tooltip: user.website }} style={{ flex: 1 }}>
            {user.website}
          </Text>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <HomeOutlined style={{ marginRight: 8, color: '#fa8c16' }} />
          <Text ellipsis={{ tooltip: `${user.address.street}, ${user.address.suite}, ${user.address.city} - ${user.address.zipcode}` }} style={{ flex: 1 }}>
            {user.address.city}, {user.address.zipcode}
          </Text>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BankOutlined style={{ marginRight: 8, color: '#eb2f96' }} />
          <Text ellipsis={{ tooltip: user.company.name }} style={{ flex: 1 }}>
            {user.company.name}
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default AdvancedUserCard;