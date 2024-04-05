import { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { GET_ALL } from "./../api/apiService";
import SearchCategoryResults from "./SearchCategoryResults";
import "./header.css";
import axios from "axios";
import { useAuth } from "./AuthContext";

function Header() {
	const [categories, setCategories] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);

	const navigate = useNavigate();

	const { user, logout } = useAuth();

	useEffect(() => {
		GET_ALL(`Product`).then((item) => setCategories(item.data));
	}, []);

	//SEARCH
	const handleSearch = () => {
		const results = categories.filter((category) =>
			category.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setSearchResults(results);
	};
	const handleSearchClose = () => {
		setShowSearchResults(false);
	};

	//LOGOUT
	const handleLogout = () => {
		logout();
	  };
	return (
		<header className="section-header">
			<section className="header-main border-bottom">
				<div className="container">
					<div className="row align-items-center">
						<div
							style={{ textAlign: "center" }}
							className="col-xl-2 col-lg-3 col-md-12">
							<Link to="/" className="brand-wrap">
								<span
									style={{
										fontSize: "28px",
										fontWeight: "bold",
										textAlign: "center",
									}}>
									DAJOD.
								</span>
							</Link>
						</div>
						<div className="col-xl-6 col-lg-5 col-md-6">
							<form
								action="#"
								className="search-header"
								onSubmit={(e) => {
									e.preventDefault();
									handleSearch();
								}}>
								<div className="input-group w-100">
									<select
										className="custom-select border-right"
										name="category_name">
										<option value="">Tất cả</option>
										{categories.map((category) => (
											<option
												key={category.id}
												value={category.name}>
												{category.name}
											</option>
										))}
									</select>
									<input
										type="text"
										className="form-control"
										placeholder="Search"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
									/>

									<div className="input-group-append">
										<button
											className="btn btn-primary"
											type="submit">
											<i className="fa fa-search"></i> Tìm
											kiếm
										</button>
									</div>
								</div>
							</form>

							{searchResults.length > 0 && (
								<div className="search-results-container">
									<SearchCategoryResults
										results={searchResults}
										onClose={handleSearchClose}
									/>
								</div>
							)}
						</div>{" "}
						<div className="col-xl-4 col-lg-4 col-md-6">
							<div className="widgets-wrap float-md-right">
								<div className="widget-header mr-3">
									<Link to="/profile" className="widget-view">
										<div className="icon-area">
											<i className="fa fa-user"></i>
										</div>
										<small className="text">
											{" "}
											Thông tin{" "}
										</small>
									</Link>
								</div>
								<div className="widget-header mr-3">
									<Link to="/order" className="widget-view">
										<div className="icon-area">
											<i className="fa fa-store"></i>
										</div>
										<small className="text">
											{" "}
											Đơn hàng{" "}
										</small>
									</Link>
								</div>
								<div className="widget-header">
									<Link
										to="/shopping-cart"
										className="widget-view">
										<div className="icon-area">
											<i className="fa fa-shopping-cart"></i>
										</div>
										<small className="text">
											{" "}
											Giỏ hàng{" "}
										</small>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>{" "}
			<nav className="navbar navbar-main navbar-expand-lg border-bottom">
				<div className="container">
					<div className="collapse navbar-collapse" id="main_nav">
						{user ? (
							<>
								<ul className="navbar-nav">
									<li className="nav-item">
										<Link className="nav-link" to="/">
											Trang Chủ
										</Link>
									</li>
									<li className="nav-item">
										<Link
											className="nav-link"
											to="/products">
											Tất cả sản phẩm
										</Link>
									</li>
								</ul>
								<ul className="navbar-nav ml-md-auto">
								<li className="nav-item">
											Xin chào {user.lastName}
									</li>
									<li className="nav-item" onClick={handleLogout}>
										<Link className="nav-link" to="/login">
											Đăng xuất
										</Link>
									</li>
								</ul>
							</>
						) : (
							<>
								<ul className="navbar-nav">
									<li className="nav-item">
										<Link className="nav-link" to="/">
											Trang Chủ
										</Link>
									</li>
									<li className="nav-item">
										<Link
											className="nav-link"
											to="/products">
											Tất cả sản phẩm
										</Link>
									</li>
								</ul>
								<ul className="navbar-nav ml-md-auto">
									<li className="nav-item">
										<Link className="nav-link" to="/login">
											Đăng nhập
										</Link>
									</li>
									<li className="nav-item">
										<Link
											className="nav-link"
											to="/register">
											Đăng ký
										</Link>
									</li>
								</ul>
							</>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
}
export default Header;
