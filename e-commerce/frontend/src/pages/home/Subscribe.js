import React from "react";

const Subscribe = () => {
	return (
		<section class="section-subscribe padding-y-lg">
			<div class="container">
				<p class="pb-2 text-center text-white">
					Cung cấp các xu hướng sản phẩm mới nhất và tin tức trong
					ngành ngay tới hộp thư đến của bạn
				</p>

				<div class="row justify-content-md-center">
					<div class="col-lg-5 col-md-6">
						<form class="form-row">
							<div class="col-md-8 col-7">
								<input
									class="form-control border-0"
									placeholder="Your Email"
									type="email"
								/>
							</div>
							<div class="col-md-4 col-5">
								<button
									type="submit"
									class="btn btn-block btn-warning">
									{" "}
									<i class="fa fa-envelope"></i> Đăng ký{" "}
								</button>
							</div>
						</form>
						<small class="form-text text-white-50">
						Chúng tôi sẽ không bao giờ chia sẻ địa chỉ email của bạn với bên thứ ba.{" "}
						</small>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Subscribe;
