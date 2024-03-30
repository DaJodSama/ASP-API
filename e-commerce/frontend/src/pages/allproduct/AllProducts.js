import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { GET_ALL } from "../../api/apiService";
// import Header from "./Header";
// import Footer from "./Footer";

function AllProduct() {
	const productsPerPage = 6; // Number of products to display per page
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		GET_ALL("Product").then((response) => {
			setProducts(response.data);
		});
	}, []);

	// Calculate the index range for the current page
	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;

	const displayedProducts = products.slice(startIndex, endIndex);

	return (
		<>
			{/* <Header /> */}
			<div className="container">
				<div className="section-heading text-center">
					<h2 className="hTitle">
						<a href="/collections/dien-thoai">Tất cả sản phẩm</a>
					</h2>
				</div>
				<div className="row g-4 mt-1">
					{displayedProducts.length > 0 ? (
						displayedProducts.map((product) => (
							<Col
								xs={12}
								sm={6}
								md={6}
								lg={2}
								key={product.id}
								style={{ marginTop: "10px" }}>
								<Card className="h-100">
									{product.discount !== undefined &&
										product.discount > 0 && (
											<div
												className="discount-badge"
												style={{
													position: "absolute",
													background: "red",
													borderRadius: "50%",
													width: "30px",
													height: "30px",
													color: "white",
													fontSize: "12px",
													top: -10,
													left: -10,
												}}>
												<span style={{marginLeft:"4px", position:"absolute", top:5}}>{product.discount}%</span>
											</div>
										)}
									<Card.Img
										variant="top"
										src={require(`../../assets/images/items/${product.img}`)}
										style={{
											width: "100%",
											height:"60%",
											marginBottom: "10px",
											display: "block",
											margin: "0 auto",
										}}
										alt="Product Image"
									/>

									<Card.Body className="text-center">
										<Card.Title
											style={{
												fontSize: "15px",
												height: "35px",
											}}>
											{product.name}
										</Card.Title>
										<Card.Text
											style={{
												color: "#FF0000",
												fontSize: "15px",
												marginBottom: "10px",
											}}>
											<b>Giá: </b>
											{product.discount !== undefined ? (
												<span>
													{(
														product.price *
														(1 -
															product.discount /
																100)
													).toLocaleString("vi-VN") +
														" VND"}
												</span>
											) : product.price !== undefined ? (
												product.price.toLocaleString(
													"vi-VN"
												) + " VND"
											) : (
												"Price not available"
											)}
										</Card.Text>

										<Link
											to={`/product-detail?productId=${product.id}`}
											type="button"
											className="btn-buy"
											title="Mua sản phẩm">
											Xem sản phẩm
										</Link>
									</Card.Body>
								</Card>
							</Col>
						))
					) : (
						<Col xs={12} className="text-center">
							<p>Hiện không có sản phẩm.</p>
						</Col>
					)}
				</div>
			</div>
			{/* Pagination controls */}
			<div className="text-center" style={{marginLeft:"580px",marginTop:"20px",marginBottom:"20px"}}>
				<nav aria-label="Page navigation">
					<ul className="pagination">
						{Array.from({
							length: Math.ceil(
								products.length / productsPerPage
							),
						}).map((_, index) => (
							<li
								key={index}
								className={`page-item ${
									currentPage === index + 1 ? "active" : ""
								}`}>
								<button
									className="page-link"
									onClick={() => setCurrentPage(index + 1)}>
									{index + 1}
								</button>
							</li>
						))}
					</ul>
				</nav>
			</div>

			<div className="wraplist-button text-center visible-mobile mb-4">
				<a
					href="/product/seller"
					className="button dark btn-collection">
					Xem thêm <b> Tất cả Sản phẩm khuyến mãi </b>
				</a>
			</div>
			{/* <Footer/> */}
		</>
	);
}

export default AllProduct;
