import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../layouts/AuthContext";

const Payment = () => {
	const { user } = useAuth();
	const location = useLocation();
	const totalPrice = location.state ? location.state.totalPrice : 0;
	
	const navigate = useNavigate();
	
	const [orderData, setOrderData] = useState({
		odPrdUserId: user.id, // Sử dụng ID người dùng từ props
		orderTotal: totalPrice,
		orderDate: new Date().toISOString(),
		orderStatus: 1,
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
		axios
		  .post("http://localhost:5239/api/OrderProduct", orderData)
		  .then((response) => {
			alert("Đơn hàng đã được đặt thành công!");
			localStorage.removeItem("cartItems");
			navigate("/shopping-cart");
		  })
		  .catch((error) => {
			console.error(error);
			alert("Đã có lỗi xảy ra. Vui lòng thử lại sau!");
		  });
	  };

	return (
		<section className="section-content padding-y">
			<div className="container" style={{ maxWidth: "720px" }}>
				<div className="card mb-4">
					<div className="card-body">
						<h4 className="card-title mb-3">
							Thông tin thanh toán
						</h4>
						<form onSubmit={handleSubmit}>
							<div className="form-row">
								<div className="col form-group">
									<label>User Id</label>
									<input
										type="text"
										className="form-control"
										name="odPrdUserId"
										value={orderData.odPrdUserId}
										onChange={handleInputChange}
										required
										readOnly
									/>
								</div>
								<div className="col form-group">
									<label>Order Date</label>
									<input
										type="text"
										className="form-control"
										value={new Date(
											orderData.orderDate
										).toLocaleString()}
										readOnly
									/>
								</div>
							</div>
							<div className="form-row">
								<div className="col form-group">
									<label>Order Total</label>
									<input
										type="text"
										className="form-control"
										value={orderData.orderTotal}
										onChange={handleInputChange}
										readOnly
									/>
								</div>
								<div className="col form-group">
									<label>Order Status</label>
									<input
										type="text"
										className="form-control"
										value={orderData.orderStatus}
										onChange={handleInputChange}
										readOnly
									/>
								</div>
							</div>
							<div class="d-flex justify-content-center">
								<button
									className="btn btn-info"
									type="submit"
									onClick={handleSubmit}>
									Xác Nhận
								</button>
							</div>
						</form>
					</div>
				</div>
				<br />
				<br />
			</div>
		</section>
	);
};

export default Payment;
