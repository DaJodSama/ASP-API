import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
	const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state && location.state.totalPrice;

  const [paymentData, setPaymentData] = useState({
    odPrdUserId: 4,
    orderDate: new Date().toISOString(),
    orderTotal: 1000 || 0, // Sử dụng totalPrice hoặc một giá trị mặc định
    orderStatus: 1,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5239/api/User");
        const userId = response.data.id;
        setPaymentData((prevData) => ({ ...prevData, odPrdUserId: userId }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(
				"http://localhost:5239/api/OrderProduct",
				paymentData
			);
			alert("Thanh toán thành công, Nhấn Ok để quay lại giỏ hàng");
			navigate("/cart");
		} catch (error) {
			console.error("Error submitting payment data:", error);
		}
	};

	const defaultTotalPrice = 0;

  // Sử dụng totalPrice nếu tồn tại, ngược lại sử dụng giá trị mặc định
  const orderTotal = totalPrice !== undefined ? totalPrice : defaultTotalPrice;

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
										value={paymentData.odPrdUserId}
										readOnly
									/>
								</div>
								<div className="col form-group">
									<label>Order Date</label>
									<input
										type="text"
										className="form-control"
										value={new Date(
											paymentData.orderDate
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
										value={paymentData.orderTotal}
										readOnly
									/>
								</div>
								<div className="col form-group">
									<label>Order Status</label>
									<input
										type="text"
										className="form-control"
										value={paymentData.orderStatus}
										readOnly
									/>
								</div>
							</div>
							<button className="button" type="submit">
								Xác Nhận
							</button>
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
