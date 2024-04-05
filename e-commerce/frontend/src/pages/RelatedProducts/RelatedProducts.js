import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./slick-carousel.css";
import { Link } from "react-router-dom";

const RelatedProducts = ({ categoryId }) => {
	const [relatedProducts, setRelatedProducts] = useState([]);

	useEffect(() => {
		const fetchRelatedProducts = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5239/api/product?categoryId=${categoryId}`
				);
				const products = response.data;
				setRelatedProducts(products);
			} catch (error) {
				console.error("Lỗi khi tải Sản phẩm liên quan:", error);
			}
		};

		fetchRelatedProducts();
	}, [categoryId]);

	const NextArrow = (props) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: "block", background: "red" }}
				onClick={onClick}
			/>
		);
	};

	const PrevArrow = (props) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: "block", background: "green" }}
				onClick={onClick}
			/>
		);
	};

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	return (
		<div>
			<h2>Sản phẩm liên quan</h2>
			<Slider {...settings}>
				{relatedProducts.map((product) => (
					<div key={product.id}>
						<div style={{ marginLeft: "60px" }}>
							<Link
								to={`/product-detail?productId=${product.id}`}>
								<img
									src={`./images/items/${product.img}`}
									alt={product.title}
									style={{ width: "200px" }}
								/>
							</Link>

							<div
								style={{
									width: "200px",
									position: "absolute",
									bottom: -5,
									marginLeft: "30px",
								}}>
								<h5>{product.name}</h5>
								<p className="">${product.price}</p>
								{/* Các thông tin khác nếu cần */}
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default RelatedProducts;
