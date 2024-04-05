//
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../layouts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "../../layouts/css/Style.css";
import OrderForm from "./OrderForm";

const Cart = ({ location }) => {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();
	const [showOrderForm, setShowOrderForm] = useState(false);
	const [hasNewProducts, setHasNewProducts] = useState(false); //  biến state này ktra gio hang co sp k0

	const { user } = useAuth();

	useEffect(() => {
		const storedCartItems = localStorage.getItem("cartItems");
		const parsedCartItems = storedCartItems
			? JSON.parse(storedCartItems)
			: [];
		setProducts(parsedCartItems);
	}, [hasNewProducts]); // Sửa đổi dependency để re-render khi có sản phẩm mới

	const handleRemoveCartItem = (productId) => {
		const updatedCartItems = products.filter(
			(item) => item.id !== productId
		);
		setProducts(updatedCartItems);
		localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
		setHasNewProducts(!hasNewProducts); // Cập nhật state để trigger re-render
	};

	const handleUpdateQuantity = (productId, newQuantity) => {
		const updatedCartItems = products.map((item) =>
			item.id === productId ? { ...item, quantity: newQuantity } : item
		);
		setProducts(updatedCartItems);
		localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
	};

	const handleIncreaseQuantity = (productId, currentQuantity) => {
		handleUpdateQuantity(productId, currentQuantity + 1);
	};

	const handleDecreaseQuantity = (productId, currentQuantity) => {
		if (currentQuantity > 1) {
			handleUpdateQuantity(productId, currentQuantity - 1);
		}
	};

	const totalPrice = products.reduce(
		(total, product) => total + product.price * product.quantity,
		0
	);

	function formatPrice(priceInXu) {
		const dong = priceInXu * 1;
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(dong);
	}

	const handleShowOrderForm = () => {
		if (user && products.length > 0) {
			// Sử dụng userId thay vì user
			navigate("/payment", { state: { totalPrice: totalPrice } });
		} else if (user && products.length === 0) {
			toast.error("Không có sản phẩm trong giỏ hàng.");
		} else {
			toast.error("Vui lòng đăng nhập để mua hàng");

			setTimeout(() => {
				navigate("/login");
			}, 2000);
		}
	};

	return (
		<section className="section-content padding-y">
			<div className="container">
				<div className="row">
					<main className="col-md-9">
						<div className="card">
							{products.length === 0 && (
								<h5 className="text-danger m-2 p-4 text-center">Không có sản phẩm nào trong giỏ hàng.</h5>
							)}
							{products.map((row) => (
								<table
									className="table table-borderless table-shopping-cart"
									key={row.id}>
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
										<tr>
											<td>
												<figure className="itemside">
													<div className="aside">
														<img
															src={`./images/items/${row.image}`}
															className="img-sm"
															alt={row.title}
														/>
													</div>
													<figcaption className="info">
														<Link
															to={`/product-detail?productId=${row.id}`}
															className="img-wrap">
															{row.name}
														</Link>
														<p className="text-muted small">
															Size: XL, Color:
															blue, Brand: Dior
														</p>
													</figcaption>
												</figure>
											</td>
											<td>
												<div className="quantity-control">
													<button
														onClick={() =>
															handleDecreaseQuantity(
																row.id,
																row.quantity
															)
														}
														className="btn btn-outline-secondary btn-sm">
														-
													</button>
													<span className="quantity mx-2">
														{row.quantity}
													</span>
													<button
														onClick={() =>
															handleIncreaseQuantity(
																row.id,
																row.quantity
															)
														}
														className="btn btn-outline-secondary btn-sm">
														+
													</button>
												</div>
											</td>
											<td>
												<div className="price-wrap">
													<var className="price">
														{row.price *
															row.quantity}{" "}
														đ
													</var>
													<small className="text-muted">
														{" "}
														{formatPrice(
															row.price
														)}{" "}
														each{" "}
													</small>
												</div>
											</td>
											<td className="text-right">
												<button
													className="btn btn-danger"
													onClick={() =>
														handleRemoveCartItem(
															row.id
														)
													}>
													{" "}
													Xóa
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							))}
						</div>
						<div className="card-body border-top">
							<button
								onClick={handleShowOrderForm}
								totalPrice={totalPrice}
								userId={user && user.id}
								productId={
									products.length > 0 ? products[0].id : ""
								}
								className="btn btn-info float-md-right">
								Thanh toán{" "}
								<i className="fa fa-chevron-right"></i>
							</button>
							<Link to="/" className="btn btn-light">
								{" "}
								<i className="fa fa-chevron-left"></i> Tiếp tục
								mua sắm{" "}
							</Link>
						</div>
					</main>
					<aside className="col-md-3">
						<div className="card">
							<div className="card-body">
								<dl className="dlist-align">
									<dt>Tổng tiền: </dt>
									<dd className="text-right">
										{formatPrice(totalPrice)}
									</dd>
								</dl>
								<dl className="dlist-align">
									<dt>Giảm giá:</dt>
									<dd className="text-right">0</dd>
								</dl>
								<dl className="dlist-align">
									<dt>Tổng tiền:</dt>
									<dd className="text-right  h5">
										<strong>${totalPrice}</strong>
									</dd>
								</dl>

								<p className="text-center mb-3">
									<img
										src={require("../../assets/images/misc/payments.png")}
										style={{ height: "26" }}
										alt="Payments"
									/>
								</p>
							</div>
						</div>
					</aside>
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick={true}
				pauseOnHover={true}
				draggable={true}
				progress
			/>
		</section>
	);
};

export default Cart;
