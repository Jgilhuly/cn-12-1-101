import { Product, ProductCreate, ProductUpdate, User, UserCreate, UserUpdate } from '../types';

const API_BASE = 'http://localhost:8000';

// Helper function for error handling
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  return response.json();
}

// Product API endpoints
export const productApi = {
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_BASE}/products`);
    return handleResponse<Product[]>(response);
  },

  async getById(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE}/products/${id}`);
    return handleResponse<Product>(response);
  },

  async create(product: ProductCreate): Promise<Product> {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return handleResponse<Product>(response);
  },

  async update(id: number, product: ProductUpdate): Promise<Product> {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return handleResponse<Product>(response);
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    await handleResponse<{ message: string }>(response);
  },
};

// User API endpoints
export const userApi = {
  async getAll(): Promise<User[]> {
    const response = await fetch(`${API_BASE}/users`);
    return handleResponse<User[]>(response);
  },

  async getById(id: number): Promise<User> {
    const response = await fetch(`${API_BASE}/users/${id}`);
    return handleResponse<User>(response);
  },

  async create(user: UserCreate): Promise<User> {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return handleResponse<User>(response);
  },

  async update(id: number, user: UserUpdate): Promise<User> {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return handleResponse<User>(response);
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });
    await handleResponse<{ message: string }>(response);
  },
};

