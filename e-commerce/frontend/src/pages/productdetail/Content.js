import React, { useEffect, useState } from "react";
import { GET_ID } from "../../api/apiService";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
const cardTextStyle = {
	maxWidth: "80%",
};

const Content = ({ onAddToCart, setCartItems, cartItems }) => {
	const [product, setProduct] = useState({});
	const location = useLocation();
	// Use useNavigate instead of useHistory
	const queryParams = new URLSearchParams(location.search);
	const productId = queryParams.get("productId");

	const [quantity, setQuantity] = useState(1);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	// Thời gian để tự động ẩn thông báo sau khi hiển thị (ví dụ: 3 giây)
	const AUTO_HIDE_DELAY = 3000;

	// Effect để tự động ẩn thông báo sau khi hiển thị
	useEffect(() => {
		let timeout;
		if (showSuccessMessage) {
			timeout = setTimeout(() => {
				setShowSuccessMessage(false);
			}, AUTO_HIDE_DELAY);
		}
		return () => clearTimeout(timeout);
	}, [showSuccessMessage]);

	useEffect(() => {
		GET_ID(`Product`, productId).then((item) => setProduct(item.data));
	}, [productId]);

	const handleAddToCart = () => {
		const existingItemIndex = cartItems.findIndex(
			(item) => item.id === product.id
		);

		if (existingItemIndex !== -1) {
			const updatedCartItems = [...cartItems];
			updatedCartItems[existingItemIndex].quantity += quantity;

			setCartItems(updatedCartItems);
			localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
		} else {
			const cartItem = {
				id: product.id,
				name: product.name,
				price: product.price,
				quantity: quantity,
				img: product.img,
			};

			setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
			localStorage.setItem(
				"cartItems",
				JSON.stringify([...cartItems, cartItem])
			);
		}

		setShowSuccessMessage(true);
		setQuantity(1);
	};

	return (
		<section>
			<section classNameName="py-3 bg-light">
				<div classNameName="container">
					<ol class="breadcrumb">
						<li class="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							{product.name}
						</li>
					</ol>
				</div>
			</section>
			<section className="section-content bg-white padding-y">
				<div className="container">
					<div className="row">
						<aside className="col-md-6">
							<div className="card">
								<article className="gallery-wrap">
									<div className="img-big-wrap">
										<div>
											<Link to="/">
												<img alt=""
													src={`./images/items/${product.img}`}
												/>
											</Link>
										</div>
									</div>
									<div className="thumbs-wrap">
										<Link to="/" className="item-thumb">
											<img alt=""
												src={`./images/items/${product.img}`}
											/>
										</Link>
										<Link to="/" className="item-thumb">
											<img alt=""
												src={`./images/items/${product.img}`}
											/>
										</Link>
										<Link to="/" className="item-thumb">
											<img alt=""
												src={`./images/items/${product.img}`}
											/>
										</Link>
										<Link to="/" className="item-thumb">
											<img alt=""
												src={`./images/items/${product.img}`}
											/>
										</Link>
									</div>
								</article>
							</div>
						</aside>
						<main className="col-md-6">
							<article className="product-info-aside">
								<h2 className="title mt-3">{product.name} </h2>
								<div className="rating-wrap my-3">
									<ul className="rating-stars">
										<li
											style={cardTextStyle}
											className="stars-active">
											<i className="fa fa-star"></i>{" "}
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>{" "}
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
										</li>
										<li>
											<i className="fa fa-star"></i>{" "}
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>{" "}
											<i className="fa fa-star"></i>
											<i className="fa fa-star"></i>
										</li>
									</ul>
									<small className="label-rating text-muted">
										132 reviews
									</small>
									<small className="label-rating text-success">
										<i className="fa fa-clipboard-check"></i>{" "}
										154 orders{" "}
									</small>
								</div>
								<div className="mb-3">
									<h5 className="title mt-3 text-danger">
										{product.price}${" "}
									</h5>
									{/* <span className="text-muted">USD 562.65 incl. VAT</span> */}
								</div>
								<p>{product.description} </p>
								<dl className="row">
									<dt className="col-sm-3">Nhà sản xuất</dt>
									<dd className="col-sm-9">
										<Link to="/">1Four</Link>
									</dd>
									<dt className="col-sm-3">Bảo hành</dt>
									<dd className="col-sm-9">24 tháng</dd>
									<dt className="col-sm-3">
										Thời gian nhận hàng:
									</dt>
									<dd className="col-sm-9">3-4 ngày</dd>
									<dt className="col-sm-3">Tình trạng</dt>
									<dd className="col-sm-9">Còn hàng</dd>
								</dl>
								<div className="form-row mt-4">
									<div className="form-group col-md">
										<input
                                        style={{width:"100px", background:"#8E2DE2",marginRight:"20px"}}
											className="btn btn-info "
											type="number"
											value={quantity}
											onChange={(e) =>
												setQuantity(e.target.value)
											}
										/>
										<button
											className="fas fa-shopping-cart btn btn-info"
											onClick={handleAddToCart}>
											Thêm vào giỏ hàng
										</button>
									</div>
								</div>
								{/* Hiển thị thông báo thành công */}
								{showSuccessMessage && (
									<div
										className="alert alert-success mt-3"
										role="alert">
										Sản phẩm đã được thêm vào giỏ hàng thành
										công!
									</div>
								)}
							</article>
						</main>
					</div>
				</div>
			</section>
		</section>
	);
};
export default Content;
