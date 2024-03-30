import React from "react";
import { Link } from "react-router-dom";

const AllCategories = () => {
	return (
		<section class="section-content padding-y">
			<div class="container">
				<nav class="row">
					<div class="col-md-3">
						<div class="card card-category">
							<div class="img-wrap" style={{background: "#ffd7d7"}}>
								<img
									src={require("../../assets/images/items/1.jpg")}
								/>
							</div>
							<div class="card-body">
								<h4 class="card-title">
									{" "}
									<Link to="/">Summer shirts </Link>
								</h4>
								<ul class="list-menu">
									<li>
										{" "}
										<Link href="">Unisex T shirts </Link>
									</li>
									<li>
										{" "}
										<Link href="">Casual shirts </Link>
									</li>
									<li>
										{" "}
										<Link href="">Scherf Ice cream </Link>
									</li>
									<li>
										{" "}
										<Link href="">Another category </Link>
									</li>
									<li>
										{" "}
										<Link href="">Great items name </Link>
									</li>
									<li>
										{" "}
										<Link href="">Great items name </Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="card card-category">
							<div
								class="img-wrap"
								style={{ background: "#FFF68D" }}>
								<img
									src={require("../../assets/images/items/2.jpg")}
								/>
							</div>
							<div class="card-body">
								<h4 class="card-title">
									{" "}
									<Link to="/">Winter jackets </Link>
								</h4>
								<ul class="list-menu">
									<li>
										{" "}
										<Link href="">Leather jackets </Link>
									</li>
									<li>
										{" "}
										<Link href="">Men's jackets </Link>
									</li>
									<li>
										{" "}
										<Link href="">
											Heating battery clothes{" "}
										</Link>
									</li>
									<li>
										{" "}
										<Link href="">Jeans jackets </Link>
									</li>
									<li>
										{" "}
										<Link href="">Great items name </Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="card card-category">
							<div
								class="img-wrap"
								style={{ background: "#bcffb8" }}>
								<img
									src={require("../../assets/images/items/3.jpg")}
								/>
							</div>
							<div class="card-body">
								<h4 class="card-title">
									{" "}
									<Link to="/">Shorts </Link>
								</h4>
								<ul class="list-menu">
									<li>
										{" "}
										<Link href="">Jeans shorts </Link>
									</li>
									<li>
										{" "}
										<Link href="">Swimming shorts </Link>
									</li>
									<li>
										{" "}
										<Link href="">
											Another some shorts{" "}
										</Link>
									</li>
									<li>
										{" "}
										<Link href="">Another category </Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="card card-category">
							<div
								class="img-wrap"
								style={{ background: "#c9fff3" }}>
								<img
									src={require("../../assets/images/items/4.jpg")}
								/>
							</div>
							<div class="card-body">
								<h4 class="card-title">
									{" "}
									<Link to="/">Travel bags </Link>
								</h4>
								<ul class="list-menu">
									<li>
										{" "}
										<Link href="">Leather bags </Link>
									</li>
									<li>
										{" "}
										<Link href="">Cook & Hold ovens </Link>
									</li>
									<li>
										{" "}
										<Link href="">Scherf Ice cream </Link>
									</li>
									<li>
										{" "}
										<Link href="">Another category </Link>
									</li>
									<li>
										{" "}
										<Link href="">Great items name </Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="card card-category">
							<Link
								to="/"
								class="img-wrap"
								style={{ background: "#ddffbb" }}>
								<img
									src={require("../../assets/images/items/5.jpg")}
								/>
							</Link>
							<div class="card-body">
								<h4 class="card-title">
									{" "}
									<Link to="/">Great items </Link>
								</h4>
								<ul class="list-menu">
									<li>
										{" "}
										<Link href="">Combi steamers </Link>
									</li>
									<li>
										{" "}
										<Link href="">Cook & Hold ovens </Link>
									</li>
									<li>
										{" "}
										<Link href="">Scherf Ice cream </Link>
									</li>
									<li>
										{" "}
										<Link href="">Another category </Link>
									</li>
									<li>
										{" "}
										<Link href="">Great items name </Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="card card-category">
							<Link
								to="/"
								class="img-wrap"
								style={{ background: "#dff" }}>
								<img
									src={require("../../assets/images/items/6.jpg")}
								/>
							</Link>
							<div class="card-body">
								<h4 class="card-title">
									{" "}
									<Link to="/">Kitchen furniture </Link>
								</h4>
								<ul class="list-menu">
									<li>
										{" "}
										<Link href="">Combi steamers </Link>
									</li>
									<li>
										{" "}
										<Link href="">Cook & Hold ovens </Link>
									</li>
									<li>
										{" "}
										<Link href="">Scherf Ice cream </Link>
									</li>
									<li>
										{" "}
										<Link href="">Another category </Link>
									</li>
									<li>
										{" "}
										<Link href="">Great items name </Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="card card-category">
							<Link
								to="/"
								class="img-wrap"
								style={{ background: "#ddffeb" }}>
								<img
									src={require("../../assets/images/items/2.jpg")}
								/>
							</Link>
							<div class="card-body">
								<h4 class="card-title">
									{" "}
									<Link to="/">Great items </Link>
								</h4>
								<ul class="list-menu">
									<li>
										{" "}
										<Link href="">Combi steamers </Link>
									</li>
									<li>
										{" "}
										<Link href="">Cook & Hold ovens </Link>
									</li>
									<li>
										{" "}
										<Link href="">Scherf Ice cream </Link>
									</li>
									<li>
										{" "}
										<Link href="">Another category </Link>
									</li>
									<li>
										{" "}
										<Link href="">Great items name </Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="card card-category">
							<Link
								to="/"
								class="img-wrap"
								style={{ background: "#dee4ff" }}>
								<img
									src={require("../../assets/images/items/1.jpg")}
								/>
							</Link>
							<div class="card-body">
								<h4 class="card-title">
									{" "}
									<Link to="/">Other clothes </Link>
								</h4>
								<ul class="list-menu">
									<li>
										{" "}
										<Link href="">Jeans shorts </Link>
									</li>
									<li>
										{" "}
										<Link href="">Cook & Hold ovens </Link>
									</li>
									<li>
										{" "}
										<Link href="">Scherf Ice cream </Link>
									</li>
									<li>
										{" "}
										<Link href="">Another category </Link>
									</li>
									<li>
										{" "}
										<Link href="">Great items name </Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</section>
	);
};

export default AllCategories;
