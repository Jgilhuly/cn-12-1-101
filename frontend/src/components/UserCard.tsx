import { User } from '../types';
import './UserCard.css';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const createdDate = new Date(user.created_at).toLocaleDateString();

  return (
    <div className="user-card">
      <div className="user-header">
        <h3>{user.name}</h3>
      </div>
      <div className="user-details">
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="email">{user.email}</span>
        </div>
        <div className="detail-row">
          <span className="label">Joined:</span>
          <span>{createdDate}</span>
        </div>
      </div>
      <div className="user-actions">
        <button
          className="btn btn-primary"
          onClick={() => onEdit(user)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (confirm(`Delete user "${user.name}"?`)) {
              onDelete(user.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

