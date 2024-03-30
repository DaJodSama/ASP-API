import React from "react";

const Description = () =>    (

    <section class="section-name padding-y bg">
<div class="container">

<div class="row">
	<div class="col-md-8">
		<h5 class="title-description">Mô tả</h5>
		<p>
		COCO thể hiện nghệ thuật tương phản của Mademoiselle: cô là người đã tạo nên cuộc cách mạng thời trang cho nữ giới, bằng ý niệm về sự giản dị và tinh tế,
		 nhưng cũng đồng thời yêu thích phong cách hoa mỹ kiểu Baroque.
		 Hương nước hoa ẩn mình dưới nét sang trọng khác biệt hiện có phiên bản EAU DE PARFUM, EAU DE TOILETTE và các sản phẩm chăm sóc cơ thể.
		</p>
		<ul class="list-check">

		<li>Weight: 0.5kg</li>
		<li>Dành cho Nam và Nữ</li>
		<li>Mùi hương dễ chịu</li>
		<li>Toát lên vẻ quý phái , sang trọng</li>
		</ul>

		<h5 class="title-description">Chi tiết cụ thể</h5>
		<table class="table table-bordered">
			<tr> <th colspan="2">Chi tiết cơ bản</th> </tr>
			<tr> <td>CoCo Chanel Paris</td><td>Dành cho Nam và Nữ</td> </tr>
			<tr> <td>Sexy man</td><td>Dành cho Nam</td> </tr>
			<tr> <td>Mùi hương từ hoa cỏ cay nồng</td> <td> <i class="fa fa-check text-success"></i> Yes </td></tr>

			<tr> <th colspan="2">Dung tích</th> </tr>
			<tr> <td>Sexy man</td><td>100ml</td> </tr>
			<tr> <td>CoCo</td><td>100ML</td> </tr>
			<tr> <td>Height</td><td>10cm</td> </tr>


		</table>
	</div> 
	
	<aside class="col-md-4">

		<div class="box">
		
		<h5 class="title-description">Sản phẩm ưa chuộng trong 1 tháng nay</h5>
		

    <h5 class="title-description">Sản phẩm</h5>
      

    <article class="media mb-3">
      <a href="#"><img class="img-sm mr-3" src={require("../../assets/images/items/3.jpg")} /></a>
      <div class="media-body">
        <h6 class="mt-0"><a href="#">How to use this item</a></h6>
        <p class="mb-2"> Mùi hương dễ chịu quyến rũ  chị em phụ nữ </p>
      </div>
    </article>

    <article class="media mb-3">
      <a href="#"><img class="img-sm mr-3" src={require("../../assets/images/items/2.jpg")} /></a>
      <div class="media-body">
        <h6 class="mt-0"><a href="#">New tips and tricks</a></h6>
        <p class="mb-2"> Mùi hương dễ chịu quyến rũ  chị em phụ nữ </p>
      </div>
    </article>
 
    <article class="media mb-3">
      <a href="#"><img class="img-sm mr-3" src={require("../../assets/images/items/1.jpg")} /></a>
      <div class="media-body">
        <h6 class="mt-0"><a href="#">New tips and tricks</a></h6>
        <p class="mb-2"> Mùi hương dễ chịu quyến rũ  chị em phụ nữ </p>
      </div>
    </article>


		
	</div> 
	</aside> 
</div> 

</div> 
</section>
);

export default Description