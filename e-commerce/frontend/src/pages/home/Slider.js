import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_ALL } from "./../../api/apiService";

const Slider = () => {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [searchQuery, setSearchQuery] = useState(""); // Step 1: State for search query
	const [filteredProducts, setFilteredProducts] = useState([]); // Step 1: State for filtered products

	useEffect(() => {
		// Fetch categories
		GET_ALL("Category").then((response) => {
			setCategories(response.data.slice(0, 12)); // Limit to the first 12 categories
		});

		// Fetch products and apply filtering based on search query
		GET_ALL("Product").then((response) => {
			const filtered = response.data
				.filter((product) =>
					product.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
				)
				.slice(0, 12); // Limit filtered results to the first 12
			setProducts(response.data.slice(0, 12)); // Set all products (for display when search is empty)
			setFilteredProducts(filtered); // Set filtered products
		});

		const savedUser = localStorage.getItem("loggedInUser");
		if (savedUser) {
			setLoggedInUser(JSON.parse(savedUser));
		}
	}, [searchQuery]); // Step 2: Trigger effect when search query changes

	const handleLogout = () => {
		setLoggedInUser(null);
		localStorage.removeItem("loggedInUser");
	};

	return (
		<section className="section-main padding-y">
			<main className="card">
				<div className="card-body">
					<div className="row">
						<aside className="col-lg col-md-3 flex-lg-grow-0">
							<nav className="nav-home-aside">
								<h6 className="title-category">
									DANH MỤC SẢN PHẨM{" "}
									<i className="d-md-none icon fa fa-chevron-down"></i>
								</h6>

								<ul className="menu-category">
									{categories.map((category) => (
										<Link
											to={`/product/list/${category.id}`}>
											<li style={{ margin: "20px 0" }}>
												{category.name}
											</li>
										</Link>
									))}
								</ul>
							</nav>
						</aside>
						<div className="col-md-9 col-xl-7 col-lg-7">
							<div
								id="carousel1_indicator"
								className="slider-home-banner carousel slide"
								data-ride="carousel">
								<ol className="carousel-indicators">
									<li
										data-target="#carousel1_indicator"
										data-slide-to="0"
										className="active"></li>
									<li
										data-target="#carousel1_indicator"
										data-slide-to="1"></li>
									<li
										data-target="#carousel1_indicator"
										data-slide-to="2"></li>
								</ol>
								<div className="carousel-inner">
									<div className="carousel-item active">
										<img
											src={require("../../assets/images/banners/slide1.png")}
										/>
									</div>
									<div className="carousel-item">
										<img
											src={require("../../assets/images/banners/slide2.jpg")}
										/>
									</div>
									<div className="carousel-item">
										<img
											src={require("../../assets/images/banners/slide3.jpg")}
										/>
									</div>
								</div>
								<Link
									className="carousel-control-prev"
									href="#carousel1_indicator"
									role="button"
									data-slide="prev">
									<span
										className="carousel-control-prev-icon"
										aria-hidden="true"></span>
									<span className="sr-only">Previous</span>
								</Link>
								<Link
									className="carousel-control-next"
									href="#carousel1_indicator"
									role="button"
									data-slide="next">
									<span
										className="carousel-control-next-icon"
										aria-hidden="true"></span>
									<span className="sr-only">Next</span>
								</Link>
							</div>
						</div>
						<div className="col-md d-none d-lg-block flex-grow-1">
							<aside className="special-home-right">
								<h6 className="bg-blue text-center text-white mb-0 p-2">
									Danh mục liên quan
								</h6>

								<div className="card-banner border-bottom">
									<div
										className="py-3"
										style={{ width: "80%" }}>
										<h6 className="card-title">Áo thun</h6>
										<Link
											to="http://localhost:3000/product/list/1"
											className="btn btn-secondary btn-sm">
											{" "}
											Xem ngay{" "}
										</Link>
									</div>
									<img
										src={require("../../assets/images/items/8.jpg")}
										height="80"
										className="img-bg"
									/>
								</div>

								<div className="card-banner border-bottom">
									<div
										className="py-3"
										style={{ width: "80%" }}>
										<h6 className="card-title">
											Áo sơ mi{" "}
										</h6>
										<Link
											to="http://localhost:3000/product/list/5"
											className="btn btn-secondary btn-sm">
											{" "}
											Xem ngay{" "}
										</Link>
									</div>
									<img
										src={require("../../assets/images/items/4.jpg")}
										height="80"
										className="img-bg"
									/>
								</div>
								<div className="card-banner border-bottom">
									<div
										className="py-3"
										style={{ width: "80%" }}>
										<h6 className="card-title">Áo khoác</h6>
										<Link
											to="http://localhost:3000/product/list/4"
											className="btn btn-secondary btn-sm">
											{" "}
											Xem ngay{" "}
										</Link>
									</div>
									<img
										src={require("../../assets/images/items/1.jpg")}
										height="80"
										className="img-bg"
									/>
								</div>
							</aside>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
};
export default Slider;
