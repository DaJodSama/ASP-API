import React from "react";

const Services = () => {
	return (
		<section class="padding-bottom">
			<header class="section-heading heading-line">
				<h4 class="title-section text-uppercase">Dịch vụ thương mại</h4>
			</header>

			<div class="row">
				<div class="col-md-3 col-sm-6">
					<article class="card card-post">
						<img
							src={require("../../assets/images/posts/1.jpg")}
							class="card-img-top"
						/>
						<div class="card-body">
							<h6 class="title">Đảm bảo thương mại</h6>
							<p class="small text-uppercase text-muted">
								BẢO VỆ ĐƠN HÀNG
							</p>
						</div>
					</article>
				</div>
				<div class="col-md-3 col-sm-6">
					<article class="card card-post">
						<img
							src={require("../../assets/images/posts/2.jpg")}
							class="card-img-top"
						/>
						<div class="card-body">
							<h6 class="title">Thanh toán bất cứ lúc nào</h6>
							<p class="small text-uppercase text-muted">
								GIẢI PHÁP TÀI CHÍNH
							</p>
						</div>
					</article>
				</div>
				<div class="col-md-3 col-sm-6">
					<article class="card card-post">
						<img
							src={require("../../assets/images/posts/3.jpg")}
							class="card-img-top"
						/>
						<div class="card-body">
							<h6 class="title">Giải pháp kiểm tra</h6>
							<p class="small text-uppercase text-muted">
								KIỂM TRA DỄ DÀNG
							</p>
						</div>
					</article>
				</div>
				<div class="col-md-3 col-sm-6">
					<article class="card card-post">
						<img
							src={require("../../assets/images/posts/4.jpg")}
							class="card-img-top"
						/>
						<div class="card-body">
							<h6 class="title">Ocean and Air Shipping</h6>
							<p class="small text-uppercase text-muted">
								LOGISTIC SERVICES
							</p>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
};

export default Services;
