/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, BEST_DEALS as INITIAL_BEST_DEALS } from '../data/products';

const ProductContext = createContext();

const API_BASE = '/api';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('admin_db_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (_e) {}
    }
    return INITIAL_PRODUCTS;
  });

  const [bestDeals, setBestDeals] = useState(() => {
    const saved = localStorage.getItem('admin_db_best_deals');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (_e) {}
    }
    return INITIAL_BEST_DEALS;
  });

  const [dbStatus, setDbStatus] = useState('connecting');

  const fetchFromDb = useCallback(async () => {
    try {
      const prodRes = await fetch(`${API_BASE}/products`);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (Array.isArray(prodData) && prodData.length > 0) {
          setProducts(prodData);
          localStorage.setItem('admin_db_products', JSON.stringify(prodData));
        } else if (INITIAL_PRODUCTS.length > 0) {
          setProducts(INITIAL_PRODUCTS);
        }
      }

      const dealsRes = await fetch(`${API_BASE}/best-deals`);
      if (dealsRes.ok) {
        const dealsData = await dealsRes.json();
        if (Array.isArray(dealsData) && dealsData.length > 0) {
          setBestDeals(dealsData);
          localStorage.setItem('admin_db_best_deals', JSON.stringify(dealsData));
        } else if (INITIAL_BEST_DEALS.length > 0) {
          setBestDeals(INITIAL_BEST_DEALS);
        }
      }

      setDbStatus('connected');
    } catch (error) {
      console.warn("MongoDB API offline or connecting, using cached local data:", error);
      setDbStatus('offline');
    }
  }, []);

  useEffect(() => {
    fetchFromDb();
    const interval = setInterval(fetchFromDb, 2000);
    return () => clearInterval(interval);
  }, [fetchFromDb]);

  const reloadData = () => {
    fetchFromDb();
  };

  const addProduct = async (newProduct) => {
    const productWithId = newProduct.id ? newProduct : { ...newProduct, id: Date.now() };

    // Update optimistic local state
    const updated = [productWithId, ...products];
    setProducts(updated);
    localStorage.setItem('admin_db_products', JSON.stringify(updated));
    window.dispatchEvent(new Event('products_updated'));

    // Sync to MongoDB backend
    try {
      await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productWithId)
      });
      fetchFromDb();
    } catch (e) {
      console.error("Failed to sync new product to MongoDB backend:", e);
    }
  };

  const updateProduct = async (id, updatedFields) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    setProducts(updated);
    localStorage.setItem('admin_db_products', JSON.stringify(updated));
    window.dispatchEvent(new Event('products_updated'));

    try {
      await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      fetchFromDb();
    } catch (e) {
      console.error("Failed to update product in MongoDB backend:", e);
    }
  };

  const deleteProduct = async (id) => {
    const updated = products.filter((p) => String(p.id) !== String(id) && String(p._id) !== String(id));
    setProducts(updated);
    localStorage.setItem('admin_db_products', JSON.stringify(updated));

    const updatedDeals = bestDeals.filter((d) => String(d.id) !== String(id) && String(d._id) !== String(id));
    setBestDeals(updatedDeals);
    localStorage.setItem('admin_db_best_deals', JSON.stringify(updatedDeals));

    window.dispatchEvent(new Event('products_updated'));

    try {
      await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE'
      });
      fetchFromDb();
    } catch (e) {
      console.error("Failed to delete product from MongoDB backend:", e);
    }
  };

  const addBestDeal = async (newDeal) => {
    const dealWithId = newDeal.id ? newDeal : { ...newDeal, id: Date.now() };
    const updated = [dealWithId, ...bestDeals.filter(d => String(d.id) !== String(dealWithId.id))];
    setBestDeals(updated);
    localStorage.setItem('admin_db_best_deals', JSON.stringify(updated));
    window.dispatchEvent(new Event('products_updated'));

    try {
      await fetch(`${API_BASE}/best-deals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealWithId)
      });
      fetchFromDb();
    } catch (e) {
      console.error("Failed to sync best deal to MongoDB backend:", e);
    }
  };

  const deleteBestDeal = async (id) => {
    const updated = bestDeals.filter((d) => String(d.id) !== String(id) && String(d._id) !== String(id));
    setBestDeals(updated);
    localStorage.setItem('admin_db_best_deals', JSON.stringify(updated));
    window.dispatchEvent(new Event('products_updated'));

    try {
      await fetch(`${API_BASE}/best-deals/${id}`, {
        method: 'DELETE'
      });
      fetchFromDb();
    } catch (e) {
      console.error("Failed to delete best deal from MongoDB backend:", e);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      bestDeals,
      dbStatus,
      addProduct,
      updateProduct,
      deleteProduct,
      addBestDeal,
      deleteBestDeal,
      reloadData
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
