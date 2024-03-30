import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cart from "../pages/cart/Cart";

const Shopping = () => {
  const location = useLocation();
  const cartItemsFromState = location.state && location.state.cartItems ? location.state.cartItems : [];
  const [totalPrice, setTotalPrice] = useState(0);
  
  // State để lưu trữ giỏ hàng
  const [cartItems, setCartItems] = useState(cartItemsFromState);

  // useEffect để cập nhật giỏ hàng từ localStorage khi component được tạo
  useEffect(() => {
    const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(initialCartItems);
  }, []);
  const handleRemoveFromCart = (productId) => {
    // Tìm chỉ mục của sản phẩm cần xóa trong mảng cartItems
    const itemIndex = cartItems.findIndex(item => item.id === productId);
  
    if (itemIndex !== -1) {
      // Tạo bản sao của mảng cartItems và loại bỏ sản phẩm tại chỉ mục itemIndex
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(itemIndex, 1);
  
      // Cập nhật state và lưu vào localStorage sử dụng giá trị mới nhất của state
      setCartItems(() => updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    
      // Tính toán lại tổng giá
      const total = calculateTotalPrice(updatedCartItems);
        setTotalPrice(total);
    }
  };

// Hàm tính tổng giá
const calculateTotalPrice = (items) => {
  // Tính tổng số tiền từ giỏ hàng
  const total = items.reduce((sum, item) => {
      if (item && item.price) {
          return sum + item.price * item.quantity;
      }
      return sum;
  }, 0);
  return total;
};

// Trong component Shopping
const handleUpdateQuantity = (productId, newQuantity) => {
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updatedCartItems = cartItems.map(item => {
    if (item.id === productId) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });

  // Cập nhật giỏ hàng trong localStorage
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

  // Cập nhật state giỏ hàng
  setCartItems(updatedCartItems);

  // Tính toán lại tổng giá
  calculateTotalPrice(updatedCartItems);
};

  
  

  return (
    <div className="container">
      <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
      {/* ... */}
    </div>
  );
};

export default Shopping;
