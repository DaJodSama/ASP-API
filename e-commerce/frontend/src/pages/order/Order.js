import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../layouts/AuthContext";

const Order = () => {
	const location = useLocation();
	const [orderData, setOrderData] = useState(null);
	const { user } = useAuth();
	useEffect(() => {
		const orderId = location.state ? location.state.orderId : null;
	
		if (!orderId) return;
	
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:5239/api/OrderProduct/${orderId}`);
				setOrderData(response.data);
			} catch (error) {
				console.error("Error fetching order data:", error);
			}
		};
	
		fetchData();
	}, [location]);
	console.log(orderData)
	return (
		<>
			<section className="section-pagetop bg-gray">
				<div className="container text-center">
					<h2 className="title-page">Thông tin đơn hàng</h2>
				</div>
			</section>

			<section className="section-content padding-y">
				<div className="container">
					<div className="row">
						<main className="col-md-12">
							{orderData ? (
								<article className="card mb-4">
									<header className="card-header">
										<Link to="/" className="float-right">
											{" "}
											<i className="fa fa-print"></i>{" "}
											Print
										</Link>
										<strong className="d-inline-block mr-3">
											Order ID: {orderData.id}
										</strong>
										<span>
											Order Date: {orderData.orderDate}
										</span>
									</header>
									<div className="card-body">
										<div className="row">
											<div className="col-md-8">
												<h6 className="text-muted">
													Delivery to
												</h6>
												<p>
													{user.lastName} <br />
													Email:
													{user.email} <br /> <br />
												</p>
											</div>
											<div className="col-md-4">
												<h6 className="text-muted">
													Payment
												</h6>
												<span className="text-success">
													<i className="fab fa-lg fa-cc-visa"></i>
													Visa **** 4216
												</span>
												<p>
													Subtotal:{" "}
													{orderData.totalPrice}{" "}
													<br />
													Shipping fee: $56 <br />
													<span className="b">
														Total:{" "}
														{orderData.totalPrice}{" "}
													</span>
												</p>
											</div>
										</div>
									</div>
									<div className="table-responsive">
										<table className="table table-hover">
											{orderData.products.map(
												(product) => (
													<tbody>
														<tr key={product.id}>
															<td width="65">
																<img
																	src={
																		product.img
																	}
																	className="img-xs border"
																/>
															</td>
															<td>
																<p className="title mb-0">
																	{
																		product.name
																	}
																</p>
																<var className="price text-muted">
																	{
																		product.price
																	}
																</var>
															</td>
														</tr>
													</tbody>
												)
											)}
										</table>
									</div>
								</article>
							) : (
								<h5 className="p-4 m-2 text-center text-danger">
									Chưa có đơn hàng nào...
								</h5>
							)}
						</main>
					</div>
				</div>
			</section>
		</>
	);
};

export default Order;
