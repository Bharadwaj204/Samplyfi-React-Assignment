import React, { useState } from 'react';

interface User {
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
}

interface BasicUserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (userId: number) => void;
}

const BasicUserCard: React.FC<BasicUserCardProps> = ({ user, isFavorite, onToggleFavorite }) => {
  const [avatarError, setAvatarError] = useState(false);
  
  // Enhanced avatar system with multiple options
  const getAvatarUrl = () => {
    const avatarStyles = ['avataaars', 'personas', 'initials', 'bottts', 'identicon'];
    const randomStyle = avatarStyles[user.id % avatarStyles.length];
    return `https://avatars.dicebear.com/v2/${randomStyle}/${user.username}.svg?options[mood][]=happy`;
  };
  
  const avatarUrl = getAvatarUrl();
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=${user.id % 2 === 0 ? '4f46e5' : 'f59e0b'}&color=fff&size=80`;

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  return (
    <div className="card h-100 user-card">
      <div className="card-body text-center">
        {/* Favorite button */}
        <div className="favorite-btn-container">
          <button 
            className={`btn btn-sm favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={() => onToggleFavorite(user.id)}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <img 
          src={avatarError ? fallbackAvatar : avatarUrl}
          alt={`${user.name} avatar`} 
          className="rounded-circle mb-3 user-avatar"
          style={{ width: '80px', height: '80px' }}
          onError={handleAvatarError}
        />
        <h5 className="card-title">{user.name}</h5>
        <div className="card-text">
          <p className="mb-2">
            <strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> <a href={`tel:${user.phone}`}>{user.phone}</a>
          </p>
          <p className="mb-2">
            <strong>Website:</strong> 
            <a href={user.website.startsWith('http') ? user.website : `https://${user.website}`} target="_blank" rel="noopener noreferrer">
              {user.website}
            </a>
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city} - {user.address.zipcode}
          </p>
          <p className="mb-0">
            <strong>Company:</strong> {user.company.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicUserCard;