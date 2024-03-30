import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
import { Link, useParams } from "react-router-dom";
import startsActive from "../../assets/images/icons/stars-active.svg";
import startsDisable from "../../assets/images/icons/starts-disable.svg";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const cardTextStyle = {
	maxWidth: "80%",
};

const ListCategory = (category) => {
	const productsPerPage = 6;
	const [currentPage, setCurrentPage] = useState(1);
	const [products, setProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [pageNumber, setPageNumber] = useState(0);
	const [sortOption, setSortOption] = useState("discountHighToLow");

	const { id } = useParams();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				let productsUrl = "http://localhost:5239/api/Product";
				// Nếu có id được cung cấp, thêm điều kiện lọc theo category_id
				if (id) {
					productsUrl += `/Category/${id}`;
				}
				const response = await axios.get(productsUrl);
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, [id]);

	const handleSortChange = (event) => {
		setSortOption(event.target.value);
	};

	const sortedProducts = products.sort((a, b) => {
		const priceA = a.price * (1 - a.discount / 100);
		const priceB = b.price * (1 - b.discount / 100);

		if (sortOption === "discountHighToLow") {
			return priceB - priceA;
		} else if (sortOption === "discountLowToHigh") {
			return priceA - priceB;
		}
		return 0; // Default case
	});

	const pageCount = Math.ceil(sortedProducts.length / productsPerPage);

	const changePage = ({ selected }) => {
		setCurrentPage(selected + 1);
	};

	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = currentPage * productsPerPage;

	const displayedProducts = sortedProducts.slice(startIndex, endIndex);
	return (
		<>
			<div className="container">
				{/* Breadcrumb */}
				<div className="card mb-3">
					<div className="card-body">
						<ol className="breadcrumb float-left">
							<li className="breadcrumb-item">Trang chủ</li>
							<li className="breadcrumb-item">
								Danh mục sản phẩm{" "}
							</li>
							{selectedCategory ? (
								<li className="breadcrumb-item active">
									{selectedCategory.name}
								</li>
							) : (
								<li className="breadcrumb-item active">
									Tất cả sản phẩm
								</li>
							)}
						</ol>
					</div>
				</div>

				{/* Sort Dropdown */}
				<div className="text-end mb-3">
					<label htmlFor="sortSelect" className="me-2 label-style">
						Sắp xếp theo:
					</label>
					<select
						id="sortSelect"
						className="form-select select-style"
						value={sortOption}
						onChange={handleSortChange}>
						<option value="discountHighToLow">
							Giảm giá cao đến thấp
						</option>
						<option value="discountLowToHigh">
							Giảm giá thấp đến cao
						</option>
					</select>
				</div>

				{/* Product Cards */}
				<Row className="g-4 mt-4">
					{displayedProducts.map((product) => (
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
												color: "white",
												backgroundColor: "red",
												border: "1px solid red",
												borderRadius: "50%",
												width: "30px",
												height: "30px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												position: "absolute",
												top: "10px",
												right: "10px",
												zIndex: 1,
											}}>
											{product.discount}%
										</div>
									)}
								<Link
									to={`/product-detail?productId=${product.id}`}>
									<Card.Img
										variant="top"
										src={require(`../../assets/images/items/${product.img}`)}
										style={{
											marginBottom: "10px",
											display: "block",
											margin: "0 auto",
											width: "100%%",
										}}
										alt="Product Image"
									/>
								</Link>
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
													(1 - product.discount / 100)
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
										title="Mua sản phẩm"
										style={{
											display: "block",
											width: "100%",
											padding: "10px",
											textDecoration: "none",
											color: "black",
											border: "1px solid red",
											borderRadius: "5px",
											textAlign: "center",
											transition: "border-color 0.3s",
										}}
										onMouseEnter={(e) => {
											e.target.style.borderColor =
												"yellow";
											e.target.style.backgroundColor =
												"yellow";
										}}
										onMouseLeave={(e) => {
											e.target.style.borderColor = "red";
											e.target.style.backgroundColor = "";
										}}>
										Xem sản phẩm
									</Link>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>

				<style>
					{`
                .pagination {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
					margin-bottom: 20px;
                }

                .pagination li {
                    margin: 0 5px;
                    list-style: none;
                    display: inline-block;
                }

                .pagination li a {
                    padding: 5px 10px;
                    border: 1px solid #007bff;
                    color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                }

                .pagination li.active a {
                    background-color: #007bff;
                    color: #fff;
                }
                `}
				</style>
				{/* Pagination */}
				<div className="text-center mt-4">
					<ReactPaginate
						previousLabel={"Previous"}
						nextLabel={"Next"}
						pageCount={pageCount}
						onPageChange={changePage}
						containerClassName={"pagination"}
						previousLinkClassName={"page-link"}
						nextLinkClassName={"page-link"}
						disabledClassName={"disabled"}
						activeClassName={"active"}
					/>
				</div>

				{/* Mobile Button */}
				<div className="wraplist-button text-center visible-mobile">
					<a href="/products" className="button dark btn-collection">
						Xem thêm <b> Tất cả Sản phẩm </b>
					</a>
				</div>
			</div>
		</>
	);
};
export default ListCategory;
