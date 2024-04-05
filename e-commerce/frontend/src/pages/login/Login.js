import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../layouts/AuthContext";

const UserLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth(); // Use the login function from the context

	const handleLogin = async () => {
		try {
			if (email && password) {
				const response = await axios.get(
					"http://localhost:5239/api/User",
					{
						params: {
							email,
						},
					}
				);

				const user = response.data.find((user) => user.email === email);

				if (user) {
					const isPasswordValid = user.password === password;

					if (isPasswordValid) {
						const { id, firstName, lastName, email, token } = user;
						login(id, firstName, lastName, email, token);
						alert("Đăng nhập thành công");
						navigate("/");
					} else {
						setError(
							"Mật khẩu không đúng. Vui lòng kiểm tra lại thông tin."
						);
					}
				} else {
					setError(
						"Email không tồn tại. Vui lòng kiểm tra lại thông tin."
					);
				}
			} else {
				setError("Tên đăng nhập và mật khẩu là bắt buộc");
			}
		} catch (error) {
			console.error("Đăng nhập thất bại:", error);
			if (error.response) {
				setError(`Đăng nhập thất bại. ${error.response.data.message}`);
			} else {
				setError("Đăng nhập thất bại. Vui lòng thử lại.");
			}
		}
	};

	return (
		<section className="section-content padding-y">
			<div className="card mx-auto" style={{ width: "320px" }}>
				<article className="card-body">
					<header className="mb-4">
						<h4 className="card-title">Đăng nhập</h4>
					</header>
					<form>
						<div className="form-group">
							<label>Tên đăng nhập</label>
							<input
								required="username"
								className="form-control"
								type="username"
								placeholder="username"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label>Mật khẩu</label>
							<input
								required="password"
								className="form-control"
								type="password"
								placeholder="Mật khẩu"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="form-group mt-3">
							{error && <p className="text-danger">{error}</p>}
							<button
								type="button"
								onClick={handleLogin}
								className="btn btn-primary btn-block">
								Đăng nhập
							</button>
						</div>
						<div className="form-group mt-3">
							{/* <Logout/> */}
							<label className="form-group mt-3">
								Bạn chưa có tài khoản?{" "}
								<Link to="/register" className="text-danger">
									Đăng ký tài khoản
								</Link>
							</label>
						</div>
					</form>
				</article>
			</div>
		</section>
	);
};

export default UserLogin;
