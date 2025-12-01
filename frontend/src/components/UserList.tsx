import { useEffect, useState } from 'react';
import { User } from '../types';
import { userApi } from '../services/api';
import { UserCard } from './UserCard';
import { UserForm } from './UserForm';
import './UserList.css';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await userApi.delete(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingUser) {
        const updated = await userApi.update(editingUser.id, data);
        setUsers(users.map(u => u.id === updated.id ? updated : u));
      } else {
        const created = await userApi.create(data);
        setUsers([...users, created]);
      }
      setShowForm(false);
      setEditingUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save user');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="user-list-container">
      <div className="users-header">
        <h1>Users</h1>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
        >
          + Add User
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm ? (
        <UserForm
          user={editingUser || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <p>No users found</p>
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                Create your first user
              </button>
            </div>
          ) : (
            <div className="users-grid">
              {users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

