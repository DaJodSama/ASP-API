import { Component } from "react";
import { Link } from "react-router-dom";
class Footer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<footer class="section-footer bg-gray">
				<div class="container">
					<section class="footer-top padding-y-lg text-black">
						<div class="row">
							<aside
								class="col-md col-6 text-center">
								<h6 class="title">Danh Mục</h6>
								<ul class="list-unstyled">
									<li>
										{" "}
										<Link to="http://localhost:3000/product/list/1">Áo thun</Link>
									</li>
									<li>
										{" "}
										<Link to="http://localhost:3000/product/list/4">Áo khoác</Link>
									</li>
									<li>
										{" "}
										<Link to="http://localhost:3000/product/list/3">Quần</Link>
									</li>
									<li>
										{" "}
										<Link to="http://localhost:3000/product/list/5">Áo sơ mi</Link>
									</li>
								</ul>
							</aside>
							<aside class="col-md-6 text-center">
								<h6 class="title">Social</h6>
								<ul class="list-unstyled">
									<li>
										<a href="https://www.facebook.com/nvtd.321">
											{" "}
											<i class="fab fa-facebook"></i>{" "}
											Facebook{" "}
										</a>
									</li>
									<li>
										<a href="https://www.instagram.com/thnd.ieao/">
											{" "}
											<i class="fab fa-instagram"></i>{" "}
											Instagram{" "}
										</a>
									</li>
									<li>
										<a href="https://www.youtube.com/channel/UCwqkDkrv6eClRKID4_6owgQ">
											{" "}
											<i class="fab fa-youtube"></i>{" "}
											Youtube{" "}
										</a>
									</li>
								</ul>
							</aside>
						</div>
					</section>

					<section class="footer-bottom text-center bg-dark">
						<p class="text-white">
							Privacy Policy - Terms of Use - User Information
							Legal Enquiry Guide
						</p>
						<p class="text-muted">
							{" "}
							&copy 2019 Company name, All rights reserved{" "}
						</p>
						<br></br>
					</section>
				</div>
			</footer>
		);
	}
}
export default Footer;
