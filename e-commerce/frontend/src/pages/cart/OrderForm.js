import React, { useState } from "react";
import styles from "./OrderForm.css";
import { POST_ADD } from "../../api/apiService";

const OrderForm = ({ totalPrice }) => {
	const [orderData, setOrderData] = useState({
		address: "",
		email: "",
		fullname: "",
		note: "",
		order_date: new Date().toISOString(),
		phone_number: "",
		status: 0,
		total_money: totalPrice,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setOrderData({
			...orderData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		POST_ADD("orders", orderData)
			.then((response) => {
				console.log(response.data);
				alert("Order placed successfully!");
				// Thực hiện các hành động khác nếu cần
			})
			.catch((error) => {
				console.error(error);
				alert("Failed to place order. Please try again.");
			});
	};

	return (
		<div className={styles["order-form-container"]}>
			<h2 className={styles["order-form-title"]}>Place an Order</h2>
			<form className={styles["order-form"]} onSubmit={handleSubmit}>
				<label className={styles["form-label"]}>Full Name:</label>
				<input
					className={styles["form-input"]}
					type="text"
					name="fullname"
					value={orderData.fullname}
					onChange={handleInputChange}
					required
				/>

				<label className={styles["form-label"]}>Email:</label>
				<input
					className={styles["form-input"]}
					type="email"
					name="email"
					value={orderData.email}
					onChange={handleInputChange}
					required
				/>

				<label className={styles["form-label"]}>Address:</label>
				<input
					className={styles["form-input"]}
					type="text"
					name="address"
					value={orderData.address}
					onChange={handleInputChange}
					required
				/>

				<label className={styles["form-label"]}>Phone Number:</label>
				<input
					className={styles["form-input"]}
					type="text"
					name="phone_number"
					value={orderData.phone_number}
					onChange={handleInputChange}
					required
				/>

				<label className={styles["form-label"]}>Note:</label>
				<textarea
					className={styles["form-textarea"]}
					name="note"
					value={orderData.note}
					onChange={handleInputChange}
				/>

				<label className={styles["form-label"]}>Order Date:</label>
				<input
					className={styles["form-input"]}
					type="text"
					name="order_date"
					value={orderData.order_date}
					onChange={handleInputChange}
					readOnly
				/>

				<label className={styles["form-label"]}>Total Money:</label>
				<input
					className={styles["form-input"]}
					type="number"
					name="total_money"
					value={totalPrice}
					readOnly
				/>

				<label className={styles["form-label"]}>Status:</label>
				<select
					className={styles["form-select"]}
					name="status"
					value={orderData.status}
					onChange={handleInputChange}
					required>
					<option value={0}>Pending</option>
					<option value={1}>Processing</option>
					<option value={2}>Shipped</option>
					{/* Thêm các tình trạng khác nếu cần */}
				</select>

				<button className={styles["form-button"]} type="submit">
					Place Order
				</button>
			</form>
		</div>
	);
};

export default OrderForm;
