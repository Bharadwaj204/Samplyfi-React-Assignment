import React, { useState, useEffect } from 'react';
import '../styles/BasicAssignment.css';
import BasicUserCard from '../components/BasicUserCard';
import LoadingSpinner from '../components/LoadingSpinner';

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

interface BasicAssignmentProps {
  darkMode: boolean;
}

const BasicAssignment: React.FC<BasicAssignmentProps> = ({ darkMode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

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
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('basic-favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const toggleFavorite = (userId: number) => {
    const newFavorites = favorites.includes(userId)
      ? favorites.filter(id => id !== userId)
      : [...favorites, userId];
    setFavorites(newFavorites);
    localStorage.setItem('basic-favorites', JSON.stringify(newFavorites));
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Oops! Something went wrong</h4>
            <p>{error}</p>
            <hr />
            <button className="btn btn-primary" onClick={handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`basic-assignment ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container-fluid py-4">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="assignment-title">Assignment 1 - Basic User Profiles</h1>
            <p className="assignment-description">
              React application with Bootstrap styling, featuring user data from JSONPlaceholder API
            </p>
          </div>
          
          {/* Search controls */}
          <div className="row mb-4">
            <div className="col-md-8 offset-md-2">
              <div className="search-container">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="🔍 Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Results info */}
          {searchTerm && (
            <div className="text-center mb-3">
              <small className="text-muted">
                Showing {filteredUsers.length} of {users.length} users
              </small>
            </div>
          )}
          
          {filteredUsers.length === 0 ? (
            <div className="text-center">
              <div className="alert alert-info" role="alert">
                <h4 className="alert-heading">
                  {searchTerm ? 'No Search Results' : 'No Users Found'}
                </h4>
                <p>
                  {searchTerm 
                    ? `No users found matching "${searchTerm}"` 
                    : 'There are currently no users to display.'}
                </p>
                {searchTerm && (
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="row">
              {filteredUsers.map(user => (
                <div key={user.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">
                  <BasicUserCard 
                    user={user} 
                    isFavorite={favorites.includes(user.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicAssignment;