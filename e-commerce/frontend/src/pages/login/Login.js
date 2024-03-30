import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const [rememberPassword, setRememberPassword] = useState(true);
	const [users, setUsers] = useState([]);
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [showLoginForm, setShowLoginForm] = useState(true);
	const [loginError, setLoginError] = useState(false);

	const handleRememberToggle = () => {
		setRememberPassword(!rememberPassword);
	};

	const handleLogin = (e) => {
		e.preventDefault();

		const emailInput = document.getElementById("emailInput").value;
		const passwordInput = document.getElementById("passwordInput").value;

		const user = users.find(
			(user) =>
				user.email === emailInput && user.password === passwordInput
		);

		if (user) {
			setLoggedInUser(user); // Cập nhật state loggedInUser trong Header component
			setShowLoginForm(false);
			localStorage.setItem("loggedInUser", JSON.stringify(user));
			setLoginError(false);

			alert("Đăng nhập thành công!");

			navigate("/");
		} else {
			setLoginError(true);
		}
	};

	useEffect(() => {
		axios.get("http://localhost:5239/api/User").then((response) => {
			setUsers(response.data);
		});

		const savedUser = localStorage.getItem("loggedInUser");
		if (savedUser) {
			setLoggedInUser(JSON.parse(savedUser));
			setShowLoginForm(false);
		}
	}, []);

	const handleLogout = () => {
		setLoggedInUser(null);
		setShowLoginForm(true);
		localStorage.removeItem("loggedInUser");
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h2 className="text-center mb-4">Đăng Nhập</h2>
							{loggedInUser ? (
								<div>
									<p className="text-success">
										Bạn đã đăng nhập thành công!
									</p>
									<button
										className="btn btn-primary btn-block"
										onClick={handleLogout}>
										Đăng xuất
									</button>
								</div>
							) : (
								showLoginForm && (
									<form onSubmit={handleLogin}>
										<div className="form-group">
											<input
												id="emailInput"
												name="email"
												className="form-control"
												placeholder="Username"
												type="text"
											/>
										</div>
										<div className="form-group">
											<input
												id="passwordInput"
												name="password"
												className="form-control"
												placeholder="Password"
												type="password"
											/>
										</div>

										<div className="form-group">
											<a
												href="/Register"
												className="float-right">
												Đăng ký
											</a>
											<label className="float-left custom-control custom-checkbox">
												<input
													type="checkbox"
													className="custom-control-input"
													checked={rememberPassword}
													onChange={
														handleRememberToggle
													}
												/>
												<div className="custom-control-label">
													{" "}
													Ghi nhớ mật khẩu{" "}
												</div>
											</label>
										</div>

										<div className="form-group">
											<button
												type="submit"
												className="btn btn-primary btn-block">
												{" "}
												Login{" "}
											</button>
										</div>

										{loginError && (
											<p className="text-danger">
												Tài khoản hoặc mật khẩu không
												chính xác. Vui lòng thử lại.
											</p>
										)}
									</form>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
