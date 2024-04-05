using DaJodCloth.Data;
using DaJodCloth.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaJodCloth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public ProductController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();
            var productDtos = products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Discount = p.Discount,
                Img = p.Img,
                Status = p.Status,
                CategoryId = p.CategoryId
            }).ToList();

            var totalResults = productDtos.Count;
            Response.Headers.Append("Content-Range", $"{totalResults}");

            return Ok(productDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<ProductDto>>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product is null)
            {
                return NotFound("Product not found.");
            }

            var productDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Discount = product.Discount,
                Img = product.Img,
                Status = product.Status,
                CategoryId = product.CategoryId
            };
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<List<ProductDto>>> AddProduct(ProductDto prdDto)
        {
            var product = new Product
            {
                Name = prdDto.Name,
                Description = prdDto.Description,
                Price = (int)prdDto.Price,
                Discount = prdDto.Discount,
                Img = prdDto.Img,
                Status = prdDto.Status,
                CategoryId = prdDto.CategoryId
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            prdDto.Id = product.Id;

            // Lấy tổng số lượng sản phẩm sau khi thêm mới
            var totalResults = await _context.Products.CountAsync();
            Response.Headers.Append("Content-Range", $"{totalResults}");

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, prdDto);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<List<ProductDto>>> UpdateProduct(int id, ProductDto updatePrd)
        {
            try
            {
                // Kiểm tra ID của sản phẩm trong yêu cầu cập nhật
                if (id != updatePrd.Id)
                {
                    return BadRequest("Product ID mismatch.");
                }

                // Tìm sản phẩm cần cập nhật trong cơ sở dữ liệu
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound("Product not found.");
                }

                // Cập nhật thông tin của sản phẩm từ dữ liệu đầu vào
                product.Name = updatePrd.Name;
                product.Description = updatePrd.Description;
                product.Price = (int)updatePrd.Price;
                product.Discount = updatePrd.Discount;
                product.Img = updatePrd.Img;
                product.Status = updatePrd.Status;
                product.CategoryId = updatePrd.CategoryId;

                // Lưu thay đổi vào cơ sở dữ liệu
                await _context.SaveChangesAsync();

                // Lấy tổng số lượng sản phẩm sau khi cập nhật
                var totalResults = await _context.Products.CountAsync();
                Response.Headers.Append("Content-Range", $"{totalResults}");

                // Trả về danh sách sản phẩm sau khi cập nhật thành công
                return Ok(await _context.Products.ToListAsync());
            }
            catch (Exception ex)
            {
                // Xử lý nếu có lỗi xảy ra
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<ProductDto>>> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<List<ProductDto>>> GetProductsByCategory(int categoryId)
        {
            var productsInCategory = await _context.Products
                                        .Where(p => p.CategoryId == categoryId)
                                        .ToListAsync();

            var productDtos = productsInCategory.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Discount = p.Discount,
                Img = p.Img,
                Status = p.Status,
                CategoryId = p.CategoryId
            }).ToList();

            return Ok(productDtos);
        }

        [HttpPost]
        [Route("placeOrder")]
        public async Task<ActionResult<OrdersDto>> PlaceOrder(OrdersDto orderDto)
        {
            // Kiểm tra xem đơn hàng có hợp lệ không
            if (!IsValidOrder(orderDto))
            {
                return BadRequest("Invalid order data");
            }

            // Tạo một đối tượng Order từ dữ liệu DTO
            var order = new Order
            {
                OrderUserId = orderDto.OrderUserId,
                // Thêm các thuộc tính khác của đơn hàng từ orderDto
                // Ví dụ: order.TotalPrice = orderDto.TotalPrice
            };

            // Thêm đơn hàng vào cơ sở dữ liệu
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Trả về thông tin đơn hàng đã được đặt
            return Ok(orderDto);
        }
        private bool IsValidOrder(OrdersDto orderDto)
        {
            // Kiểm tra xem CartUserId có được cung cấp không
            if (orderDto.OrderUserId == 0)
            {
                return false;
            }

            // Kiểm tra xem TotalPrice có lớn hơn 0 không
            if (orderDto.OrderTotal <= 0)
            {
                return false;
            }

            return true; // Trả về true nếu tất cả các điều kiện đều đúng
        }

        [HttpGet]
        [Route("getIdCart")]
        public async Task<ActionResult<CartDto>> GetCart(int id)
        {
            var cart = await _context.Cart.FindAsync(id);
            if (cart == null)
            {
                return NotFound("Cart not found.");
            }
            return Ok(cart);
        }

        [HttpPost]
        [Route("addToCart")]
        public async Task<ActionResult<CartDto>> AddToCart(CartDto cartDto)
        {
            try
            {
                // Kiểm tra tính hợp lệ của dữ liệu đầu vào
                if (cartDto == null || cartDto.CartUserId <= 0 || cartDto.CartProductId <= 0 || cartDto.Quantity <= 0)
                {
                    return BadRequest("Invalid cart data.");
                }

                // Lấy thông tin sản phẩm từ cơ sở dữ liệu
                var product = await _context.Products.FindAsync(cartDto.CartProductId);
                if (product == null)
                {
                    return NotFound("Product not found.");
                }

                // Tạo một đối tượng Cart từ dữ liệu DTO
                var cart = new Cart
                {
                    CartUserId = cartDto.CartUserId,
                    CartProductId = cartDto.CartProductId,
                    Price = cartDto.Price,
                    Discount = cartDto.Discount,
                    Quantity = cartDto.Quantity,
                    TotalPrice = (product.Price - product.Discount) * cartDto.Quantity
                };

                // Thêm đối tượng Cart vào cơ sở dữ liệu
                _context.Cart.Add(cart);
                await _context.SaveChangesAsync();

                // Trả về đối tượng CartDto đã được tạo
                return CreatedAtAction(nameof(GetCart), new { id = cart.Id }, cartDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private bool CartExists(int id)
        {
            return _context.Cart.Any(e => e.Id == id);
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<ProductDto>>> SearchProducts(string name)
        {
            // Tìm kiếm sản phẩm theo tên
            var products = await _context.Products
                .Where(p => p.Name.Contains(name))
                .ToListAsync();

            // Chuyển đổi danh sách sản phẩm thành DTO
            var productDtos = products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Discount = p.Discount,
                Img = p.Img,
                Status = p.Status,
                CategoryId = p.CategoryId
            }).ToList();

            // Trả về danh sách sản phẩm kết quả
            return Ok(productDtos);
        }
    }
}
