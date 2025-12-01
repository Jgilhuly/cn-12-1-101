import { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-header">
        <h3>{product.name}</h3>
        <span className={`stock-badge ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
          {product.in_stock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      <p className="product-description">{product.description}</p>
      <div className="product-details">
        <div className="detail-row">
          <span className="label">Category:</span>
          <span>{product.category}</span>
        </div>
        <div className="detail-row">
          <span className="label">Price:</span>
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
        {product.tags.length > 0 && (
          <div className="detail-row tags">
            <span className="label">Tags:</span>
            <div className="tag-list">
              {product.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="product-actions">
        <button
          className="btn btn-primary"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (confirm(`Delete "${product.name}"?`)) {
              onDelete(product.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

