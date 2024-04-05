import React, { useEffect, useState } from "react";
import { GET_ID } from "../../api/apiService";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import axios from "axios";

const cardTextStyle = {
	maxWidth: "80%",
};

const Content = ({ setCartItems, cartItems }) => {
	const [product, setProduct] = useState({});
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const productId = queryParams.get("productId");
	const [showAddToCartNotification, setShowAddToCartNotification] =
		useState(false);
	const [quantity, setQuantity] = useState(1);
	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};
	useEffect(() => {
		const fetchProductData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5239/api/product/${productId}`
				);
				setProduct(response.data);
			} catch (error) {
				console.error("Error fetching product data:", error);
			}
		};

		fetchProductData();
	}, [productId]);

	const handleAddToGallery = async () => {
		try {
			const productToAdd = product.find((item) => item.id === product.id);

			if (productToAdd) {
				const galleryData = {
					image: productToAdd.img, // Use the actual thumbnail data here
					product: {
						id: productToAdd.id,
					},
				};

				const response = await axios.post(
					//   "http://localhost:8080/api/gallery",
					galleryData
				);

				if (response.status === 201) {
					// Successfully added to gallery
					setShowAddToCartNotification(true);
				} else {
					console.log(response);
				}
			} else {
				alert("Không tìm thấy sản phẩm để thêm vào gallery");
			}
		} catch (error) {
			console.error("Error adding gallery:", error);
			// Handle error during API call
		}
	};

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
				image: product.img,
			};

			setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
			localStorage.setItem(
				"cartItems",
				JSON.stringify([...cartItems, cartItem])
			);
		}

		// Reset quantity to 1 after adding to cart
		setQuantity(1);
		toast.success("Thêm sản phẩm thành công");
		// Delay the page reload by a few seconds (adjust as needed)
		setTimeout(() => {
			window.location.reload();
		}, 1000); // 2000 milliseconds (2 seconds) delay
	};

	const buyNow = () => {
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
				image: product.img,
			};

			setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
			localStorage.setItem(
				"cartItems",
				JSON.stringify([...cartItems, cartItem])
			);
		}

		// Reset quantity to 1 after adding to cart
		setQuantity(1);

		// Show success message (you can implement this as per your UI)
	};

	return (
		<section>
			<section className="py-3 bg-light">
				<div className="container">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a>Home</a>
						</li>
						<li className="breadcrumb-item"></li>
						<li class="breadcrumb-item active" aria-current="page">
							{product && product.name
								? product.name
								: "Product Name Not Available"}
						</li>
					</ol>
				</div>
			</section>
			<section class="section-content bg-white padding-y">
				<div class="container">
					<div class="row">
						<aside class="col-md-6">
							<div class="card">
								<article class="gallery-wrap">
									<div class="img-big-wrap">
										<div>
											{product && product.img && (
												<a href="#">
													<img
														src={`./images/items/${product.img}`}
													/>
												</a>
											)}
										</div>
									</div>
									<div class="thumbs-wrap">
										<a href="#" class="item-thumb">
											<img
												src={`./images/items/${product.img}`}
											/>
										</a>
										<a href="#" class="item-thumb">
											<img
												src={`./images/items/${product.img}`}
											/>
										</a>
										<a href="#" class="item-thumb">
											<img
												src={`./images/items/${product.img}`}
											/>
										</a>
										<a href="#" class="item-thumb">
											<img
												src={`./images/items/${product.img}`}
											/>
										</a>
									</div>
								</article>
							</div>
						</aside>
						<main class="col-md-6">
							<article class="product-info-aside">
								<h2 class="title mt-3">
									{product && product.name
										? product.name
										: "Product Name Not Available"}
								</h2>
								<div class="rating-wrap my-3">
									<ul class="rating-stars">
										<li
											style={cardTextStyle}
											class="stars-active">
											<i class="fa fa-star"></i>{" "}
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>{" "}
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
										</li>
										<li>
											<i class="fa fa-star"></i>{" "}
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>{" "}
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
										</li>
									</ul>
									<small class="label-rating text-muted">
										132 reviews
									</small>
									<small class="label-rating text-success">
										<i class="fa fa-clipboard-check"></i>{" "}
										154 orders{" "}
									</small>
								</div>
								<div class="mb-3">
									<h5 class="title mt-3 text-danger">
										Giá:{" "}
										{product && product.price
											? product.price
											: "Price Not Available"}{" "}
										<span> VND</span>{" "}
									</h5>
									{/* <span class="text-muted">USD 562.65 incl. VAT</span> */}
								</div>
								<p>
									{product && product.description
										? product.description
										: "Product Description Not Available"}
								</p>

								<dl class="row">
									<dt class="col-sm-3">Nhà sản xuất</dt>
									<dd class="col-sm-9">
										<a href="#">1Four</a>
									</dd>
									<dt class="col-sm-3">Bảo hành</dt>
									<dd class="col-sm-9">24 tháng</dd>
									<dt class="col-sm-3">
										Thời gian nhận hàng:
									</dt>
									<dd class="col-sm-9">3-4 ngày</dd>
									<dt class="col-sm-3">Tình trạng</dt>
									<dd class="col-sm-9">Còn hàng</dd>
								</dl>
								<div
									className="form-group col-md d-flex align-items-center mt-2"
									style={{ marginLeft: "-10px" }}>
									<button
										className="btn btn-info"
										onClick={decreaseQuantity}>
										-
									</button>
									<input
										type="text"
										value={quantity}
										className="form-control text-center mx-2"
										style={{ width: "50px" }}
										readOnly
									/>
									<button
										className="btn btn-info"
										onClick={increaseQuantity}>
										+
									</button>
								</div>
								<div class="form-row mt-4">
									<div class="form-group col-md">
										<button
											className="btn btn-primary"
											onClick={handleAddToCart}>
											Thêm giỏ hàng
										</button>
									</div>
								</div>
								{/* Hiển thị thông báo thành công */}
								{/* <img src={`../../assets/images/art/hoa.png`} style={{ width: '105%', height: '80', }}/> */}
							</article>
						</main>
					</div>
				</div>
				<RelatedProducts productId={productId} />
			</section>
			<ToastContainer
				position="top-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</section>
	);
};
export default Content;
