// CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "RESTORE_CART":
			return {
				...state,
				cartItems: action.payload.cartItems,
				totalQuantity: action.payload.totalQuantity,
			};
		case "ADD_TO_CART":
			const updatedCartItems = [
				...state.cartItems,
				action.payload.product,
			];
			localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

			const updatedTotalQuantity = state.totalQuantity + 1; // Cập nhật số lượng

			return {
				...state,
				cartItems: updatedCartItems,
				totalQuantity: updatedTotalQuantity,
			};
		// Các case khác nếu cần
		default:
			return state;
	}
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, {
		cartItems: [],
		totalQuantity: 0,
	});

	useEffect(() => {
		const storedCartItems =
			JSON.parse(localStorage.getItem("cartItems")) || [];
		const totalQuantity = storedCartItems.reduce((total, item) => {
			if (item && item.quantity) {
				return total + 1;
			}
			return total;
		}, 0);
		dispatch({
			type: "RESTORE_CART",
			payload: { cartItems: storedCartItems, totalQuantity },
		});
	}, []);

	const addToCart = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: { product } });
	};

	return (
		<CartContext.Provider value={{ cartState: state, addToCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
