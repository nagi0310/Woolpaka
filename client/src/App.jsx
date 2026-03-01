import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import AdminLayout from "./pages/AdminLayout";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AddProductPage from "./pages/AddProductPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import { useCartStore } from "./stores/useCartStore";
import AllProductsPage from "./pages/AllProductsPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user, getCartItems]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-primary-100 text-primary-700 relative overflow-hidden">
      <div className="z-50 relative pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route path="/products">
            <Route path="/products" index element={<AllProductsPage />} />
            <Route path=":category" element={<CategoryPage />} />
            <Route path=":category/:id" element={<ProductPage />} />
          </Route>
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/" />}
          />
          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/" />}
          />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? <AdminLayout /> : <Navigate to="/" />
            }
          >
            <Route index element={<AddProductPage />} />
            <Route path="product-list" element={<AddProductPage />} />
            <Route path="orders" element={<AddProductPage />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
