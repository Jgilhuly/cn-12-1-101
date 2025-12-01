import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ProductList } from './components/ProductList';
import { UserList } from './components/UserList';
import './App.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Product & User Management</h1>
        <p>A complete CRUD application for managing products and users</p>
      </div>
      <div className="cards-grid">
        <Link to="/products" className="card">
          <div className="card-icon">📦</div>
          <h2>Products</h2>
          <p>Manage your product catalog</p>
        </Link>
        <Link to="/users" className="card">
          <div className="card-icon">👥</div>
          <h2>Users</h2>
          <p>Manage user accounts</p>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🎯 CRUD Manager
            </Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/users">Users</Link>
            </div>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2024 Product CRUD Management System. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

