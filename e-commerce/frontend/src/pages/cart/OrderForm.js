import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./OrderForm.css"; // Import file CSS vào
import { useNavigate } from "react-router-dom";

const OrderForm = ({ totalPrice, odPrdUserId, productId, quantity, price }) => {
	// Nhận ID người dùng từ props
	console.log("odPrdUserId:", odPrdUserId);
	console.log("Product:", productId);
	const navigate = useNavigate();
	const [orderData, setOrderData] = useState({
		odPrdUserId: 6, // Sử dụng ID người dùng từ props
		orderTotal: totalPrice,
		orderDate: new Date().toISOString(),
		orderStatus: 1,
		// orderDetails: [
		//   {
		//     productId: productId, // Sẽ được tự động lấy khi thêm vào giỏ hàng
		//     quantity: quantity,
		//     price: price
		//   }
		// ]
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setOrderData({
			...orderData,
			[name]: value,
		});
	};

	// const handleProductChange = (e, index) => {
	//   const { name, value } = e.target;
	//   const updatedOrderDetails = [...orderData.orderDetails];
	//   updatedOrderDetails[index][name] = value;
	//   setOrderData({
	//     ...orderData,
	//     orderDetails: updatedOrderDetails
	//   });
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5239/api/OrderProduct", orderData)
			.then((response) => {
				console.log(response.data);
				// Thực hiện các hành động tiếp theo sau khi đặt hàng thành công
			})
			.catch((error) => {
				console.error(error);
				alert("Đơn hàng đã được đặt thành công!");
				localStorage.removeItem("cartItems");
				navigate("/");
			});
	};

	return (
		<div className={styles.container}>
			{" "}
			{/* Sử dụng class từ file CSS */}
			<h2>Đơn hàng mới</h2>
			<form onSubmit={handleSubmit}>
				{/* <label>User ID:</label> */}
				<input
					type="text"
					name="odPrdUserId"
					value={orderData.odPrdUserId}
					onChange={handleInputChange}
					required
				/>
				<label>Tổng tiền:</label>
				<input
					type="number"
					name="orderTotal"
					value={orderData.orderTotal}
					onChange={handleInputChange}
					readOnly
				/>
				<label>Ngày đặt hàng:</label>
				<input
					type="text"
					name="orderDate"
					value={orderData.orderDate}
					onChange={handleInputChange}
					readOnly
				/>
				<label>Trạng thái:</label>
				<input
					type="text"
					name="orderDate"
					value={orderData.orderStatus}
					onChange={handleInputChange}
					readOnly
				/>
				<hr />

				<button className="order-button" type="submit">
					Đặt hàng
				</button>
			</form>
		</div>
	);
};

export default OrderForm;
