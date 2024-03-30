import React, { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = ({ OrderTotal }) => {
	const [galleryItems, setGalleryItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [quantities, setQuantities] = useState({});

	useEffect(() => {
		axios.get("http://localhost:5239/api/Product").then((response) => {});
	}, []);

	useEffect(() => {
		const storedCartItems = localStorage.getItem("cartItems");
		if (storedCartItems) {
			setGalleryItems(JSON.parse(storedCartItems));
		}
		const storedQuantities = localStorage.getItem("cartQuantities");
		if (storedQuantities) {
			setQuantities(JSON.parse(storedQuantities));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(galleryItems));
		localStorage.setItem("cartQuantities", JSON.stringify(quantities));
		calculateTotalPrice(galleryItems);
	}, [galleryItems, quantities]);

	const calculateTotalPrice = (items) => {
		let total = 0;
		let discountAmount = 0;

		items.forEach((item) => {
			let price = item.price * (quantities[item.id] || 1);
			if (item.discount) {
				price *= 1 - item.discount / 100;
				discountAmount +=
					item.price *
					(item.discount / 100) *
					(quantities[item.id] || 1);
			}
			total += price;
		});

		setTotalPrice(total);
		setDiscount(discountAmount);
	};

	const deleteGallery = (id) => {
		const updatedItems = galleryItems.filter((item) => item.id !== id);
		setGalleryItems(updatedItems);
		calculateTotalPrice(updatedItems);

		// Lấy giỏ hàng từ localStorage
		const cart = JSON.parse(localStorage.getItem("cart")) || [];

		// Kiểm tra nếu giỏ hàng không tồn tại hoặc rỗng
		if (!cart || cart.length === 0) {
			return;
		}

		// Cập nhật giỏ hàng trong localStorage
		const updatedCart = cart.filter((item) => item.id !== id);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	const deleteAllItems = () => {
		localStorage.removeItem("cartItems");
		localStorage.removeItem("cartQuantities");
		setGalleryItems([]);
		setQuantities({});
		setTotalPrice(0);
		setDiscount(0);
	};

	const increaseQuantity = (id) => {
		setQuantities((prevQuantities) => ({
			...prevQuantities,
			[id]: (prevQuantities[id] || 0) + 1,
		}));
	};

	const decreaseQuantity = (id) => {
		if (quantities[id] > 1) {
			setQuantities((prevQuantities) => ({
				...prevQuantities,
				[id]: prevQuantities[id] - 1,
			}));
		}
	};

	const handleQuantityChange = (id, newQuantity) => {
		setQuantities((prevQuantities) => ({
			...prevQuantities,
			[id]: newQuantity,
		}));
	};

	return (
		<section className="section-content padding-y">
			<div className="container">
				<div className="row">
					<main className="col-md-9">
						<div className="card">
							<table className="table table-borderless table-shopping-cart">
								<thead className="text-muted">
									<tr className="small text-uppercase">
										<th scope="col">Sản phẩm</th>
										<th scope="col" width="120">
											Số lượng
										</th>
										<th scope="col" width="120">
											Giá
										</th>
										<th
											scope="col"
											className="text-right"
											width="200">
											{" "}
										</th>
									</tr>
								</thead>
								<tbody>
									{galleryItems.map((galleryItem, index) => (
										<tr key={index}>
											<td>
												<figure className="itemside">
													<img
														src={require(`../../assets/images/items/${galleryItem.img}`)}
														alt={`Gallery Image ${index}`}
														style={{
															width: "100px",
															height: "150px",
														}}
													/>
												</figure>
												<figcaption
													className="info"
													style={{
														marginTop: "-100px",
														marginLeft: "150px",
														marginBottom: "40px",
													}}>
													<a
														href="#"
														className="title text-dark">
														{galleryItem.name}
													</a>
												</figcaption>
											</td>
											<td width={150}>
												<div
													className="form-row d-flex align-items-center"
													style={{
														marginLeft: "-45%",
													}}>
													<span className="input-group-btn">
														<button
															style={{
																marginTop:
																	"40px",
															}}
															className="btn btn-outline-primary"
															type="button"
															onClick={() =>
																decreaseQuantity(
																	galleryItem.id
																)
															}>
															-
														</button>
													</span>
													<input
														type="text"
														className="form-control text-center mx-2"
														style={{
															width: "70px",
															marginTop: "40px",
														}}
														value={
															quantities[
																galleryItem.id
															] || 1
														}
														readOnly
													/>
													<span className="input-group-btn">
														<button
															style={{
																marginTop:
																	"40px",
															}}
															className="btn btn-outline-primary"
															type="button"
															onClick={() =>
																increaseQuantity(
																	galleryItem.id
																)
															}>
															+
														</button>
													</span>
												</div>
											</td>
											<td>
												<figcaption className="info">
													<p
														style={{
															marginTop: "40px",
															width: "100px",
														}}>
														{galleryItem.discount
															? (
																	galleryItem.price *
																	(1 -
																		galleryItem.discount /
																			100)
															  ).toLocaleString(
																	"vi-VN"
															  ) + " VND"
															: galleryItem.price.toLocaleString(
																	"vi-VN"
															  )}
													</p>
												</figcaption>
											</td>
											<td className="text-right">
												<button
													className="btn btn-light"
													onClick={() =>
														deleteGallery(
															galleryItem.id
														)
													}>
													Remove
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>

							<div className="card-body border-top">
								<a href="/" className="btn btn-light">
									{" "}
									<i className="fa fa-chevron-left"></i> Trở
									về{" "}
								</a>
							</div>
						</div>

						<div className="alert alert-success mt-3">
							<p className="icontext">
								<i className="icon text-success fa fa-truck"></i>{" "}
								Free Delivery within 1-2 weeks
							</p>
						</div>
					</main>
					<aside className="col-md-3">
						<div className="card mb-3">
							<div className="card-body">
								<dl className="dlist-align">
									<dt>Total price:</dt>
									<dd className="text-right">
										{totalPrice.toLocaleString("vi-VN")} VND
                    
                  </dd>
								</dl>
								<hr />
								<p className="text-center mb-3">
									<img
										src={require("../../assets/images/misc/payments.png")}
										height="26"
										alt="Payments"
									/>
								</p>
								<Link to={{ pathname: "/payment", state: { totalPrice: OrderTotal } }}>
									<button
										className="btn btn-primary"
										onClick={deleteAllItems}>
										Thanh toán
									</button>
								</Link>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
};

export default Cart;
