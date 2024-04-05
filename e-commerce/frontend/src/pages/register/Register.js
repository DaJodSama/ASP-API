import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ContentRegister = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [lastName, setLastName] = useState("");
	const [firstName, setfirstName] = useState("");
	const [error, setError] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isValidUsername, setIsValidUsername] = useState(true);
	const [usernameError, setUsernameError] = useState("");
	const [isCheckingEmail, setIsCheckingEmail] = useState(false);
	const [isCheckingUsername, setIsCheckingUsername] = useState(false);

	const checkDuplicateEmail = async () => {
		try {
			setIsCheckingEmail(true);
			const response = await axios.get("http://localhost:5239/api/user");
			const userEmails = response.data.map((user) => user.email);
			setIsValidEmail(!userEmails.includes(email));
		} catch (error) {
			console.error("Error fetching user emails:", error);
		} finally {
			setIsCheckingEmail(false);
		}
	};

	const checkDuplicateUsername = async () => {
		try {
			setIsCheckingUsername(true);
			const response = await axios.get("http://localhost:5239/api/user");
			const usernames = response.data.map((user) => user.username);
			if (usernames.includes(firstName)) {
				setUsernameError("Username đã tồn tại");
				setIsValidUsername(false);
			} else {
				setUsernameError("");
				setIsValidUsername(true);
			}
		} catch (error) {
			console.error("Error fetching usernames:", error);
		} finally {
			setIsCheckingUsername(false);
		}
	};

	const handleRegister = async () => {
		if (!isCheckingEmail && !isCheckingUsername) {
			try {
				if (
					email.trim() &&
					password.trim() &&
					/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
					firstName.trim().match(/^[a-zA-Z\s]*$/) &&
					lastName.trim().match(/^[a-zA-Z\s]*$/)
				) {
					await checkDuplicateEmail();
					await checkDuplicateUsername();

					if (isValidEmail && isValidUsername) {
						const response = await axios.post(
							"http://localhost:5239/api/user",
							{
								firstName,
								lastName,
								email,
								password,
							}
						);

						if (response.data.id) {
							alert("Đăng ký  thành công !.");
							navigate("/login");
						} else {
							setError("Đăng ký không thành công !");
						}
					} else {
						setError(
							!isValidEmail
								? "Email đã tồn tại"
								: !isValidUsername
								? "Tên đã tồn tại"
								: "Có lỗi xảy ra"
						);
					}
				} else {
					setError(
						!email.trim()
							? "Vui lòng nhập địa chỉ email"
							: !password.trim()
							? "Vui lòng nhập mật khẩu"
							: !firstName.trim()
							? "Vui lòng nhập tên"
							: !lastName.trim()
							? "Vui lòng nhập họ"
							: !email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
							? "Email không đúng định dạng. Vui lòng nhập lại"
							: !firstName.trim().match(/^[a-zA-Z\s]*$/)
							? "Tên không được chứa ký tự đặc biệt"
							: !lastName.trim().match(/^[a-zA-Z\s]*$/)
							? "Họ không được chứa ký tự đặc biệt"
							: "Có lỗi xảy ra"
					);
				}
			} catch (error) {
				console.error("Registration failed:", error);
				if (error.response) {
					console.log("Server response:", error.response.data);
				}
				setError("Đăng ký không thành công. Vui lòng thử lại.");
			}
		}
	};

	useEffect(() => {
		if (email.trim()) {
			checkDuplicateEmail();
		}
	}, [email]);

	useEffect(() => {
		if (firstName.trim()) {
			checkDuplicateUsername();
		}
	}, [firstName]);

	return (
		<section className="section-content padding-y">
			<div className="card mx-auto" style={{ width: "520px" }}>
				<article className="card-body">
					<header className="mb-4">
						<h4 className="card-title">Sign up</h4>
					</header>
					<form>
						<div className="form-row">
							<label>Họ</label>
							<input
								className="form-control"
								type="text"
								placeholder="Họ"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								autoComplete="off"
							/>
						</div>
						<div className="form-row">
							<label>Tên</label>
							<input
								className={`form-control ${
									!isValidUsername ? "is-invalid" : ""
								}`}
								type="text"
								placeholder="Username"
								value={firstName}
								onChange={(e) => setfirstName(e.target.value)}
								autoComplete="off"
							/>
							{usernameError && (
								<p className="text-danger">{usernameError}</p>
							)}
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								className={`form-control ${
									!isValidEmail ? "is-invalid" : ""
								}`}
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="off"
							/>
							{!isValidEmail && (
								<p className="text-danger">Email đã tồn tại</p>
							)}
						</div>
						<div className="form-row">
							<label>Mật khẩu</label>
							<input
								className="form-control"
								type="password"
								placeholder="Mật khẩu"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="off"
							/>
						</div>

						<label className="form-group mt-3">
							Bạn đã có tài khoản? Vui lòng{" "}
							<Link to="/login" className="text-danger">
								Đăng nhập tài khoản
							</Link>
						</label>

						<div className="form-group mt-3">
							{error && <p className="text-danger">{error}</p>}

							<button
								type="button"
								onClick={handleRegister}
								className="btn btn-primary btn-block">
								Đăng ký
							</button>
						</div>
					</form>
				</article>
			</div>
		</section>
	);
};

export default ContentRegister;
