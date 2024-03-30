import React from "react";
import { Link } from "react-router-dom";

const Region = () => {
	return (
		<section class="padding-bottom">
			<header class="section-heading heading-line">
				<h4 class="title-section text-uppercase">Choose region</h4>
			</header>

			<ul class="row mt-4">
				<li class="col-md col-6">
					<Link to="/" class="icontext">
						{" "}
						<img
							class="icon-flag-sm"
							src={require("../../assets/images/icons/flags/CN.png")}
						/>{" "}
						<span>China</span>{" "}
					</Link>
				</li>
				<li class="col-md col-6">
					<Link to="/" class="icontext">
						{" "}
						<img
							class="icon-flag-sm"
							src={require("../../assets/images/icons/flags/DE.png")}
						/>{" "}
						<span>Germany</span>{" "}
					</Link>
				</li>
				<li class="col-md col-6">
					<Link to="/" class="icontext">
						{" "}
						<img
							class="icon-flag-sm"
							src={require("../../assets/images/icons/flags/AU.png")}
						/>{" "}
						<span>Australia</span>{" "}
					</Link>
				</li>
				<li class="col-md col-6">
					<Link to="/" class="icontext">
						{" "}
						<img
							class="icon-flag-sm"
							src={require("../../assets/images/icons/flags/RU.png")}
						/>{" "}
						<span>Russia</span>{" "}
					</Link>
				</li>
				<li class="col-md col-6">
					<Link to="/" class="icontext">
						{" "}
						<img
							class="icon-flag-sm"
							src={require("../../assets/images/icons/flags/IN.png")}
						/>{" "}
						<span>India</span>{" "}
					</Link>
				</li>
				<li class="col-md col-6">
					<Link to="/" class="icontext">
						{" "}
						<img
							class="icon-flag-sm"
							src={require("../../assets/images/icons/flags/GB.png")}
						/>{" "}
						<span>England</span>{" "}
					</Link>
				</li>
				<li class="col-md col-6">
					<Link to="/" class="icontext">
						{" "}
						<img
							class="icon-flag-sm"
							src={require("../../assets/images/icons/flags/TR.png")}
						/>{" "}
						<span>Turkey</span>{" "}
					</Link>
				</li>
				<li class="col-md col-6">
					<Link to="/" class="icontext">
						{" "}
						<img
							class="icon-flag-sm"
							src={require("../../assets/images/icons/flags/UZ.png")}
						/>{" "}
						<span>Uzbekistan</span>{" "}
					</Link>
				</li>
				<li class="col-md col-6">
					<Link to="/" class="icontext">
						{" "}
						<i class="mr-3 fa fa-ellipsis-h"></i>{" "}
						<span>More regions</span>{" "}
					</Link>
				</li>
			</ul>
			<article class="my-4">
				<img
					src={require("../../assets/images/banners/ad.png")}
					class="w-100"
				/>
			</article>
		</section>
	);
};

export default Region;
