using DaJodCloth.Data;
using DaJodCloth.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaJodCloth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public CartController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<CartDto>>> GetAllCart()
        {
            var Cart = await _context.Cart.ToListAsync();
            var CartDtos = Cart.Select(p => new CartDto
            {
                Id = p.Id,
                CartUserId = p.CartUserId,
                CartProductId = p.CartProductId,
                Price = p.Price,
                Discount = p.Discount,
                Quantity = p.Quantity,
                TotalPrice = p.TotalPrice
            }).ToList();

            return Ok(CartDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<CartDto>>> GetCart(int id)
        {
            var Cart = await _context.Cart.FindAsync(id);
            if (Cart is null)
            {
                return NotFound("Cart not found.");
            }

            var CartDto = new CartDto
            {
                Id = Cart.Id,
                CartUserId = Cart.CartUserId,
                CartProductId = Cart.CartProductId,
                Price = Cart.Price,
                Discount = Cart.Discount,
                Quantity = Cart.Quantity,
                TotalPrice = Cart.TotalPrice
            };
            return Ok(Cart);
        }

        [HttpPost]
        public async Task<ActionResult<CartDto>> Addcart(CartDto cartDto)
        {
            var cart = new Cart
            {
                CartUserId = cartDto.CartUserId,
                CartProductId = cartDto.CartProductId,
                Price = cartDto.Price,
                Discount = cartDto.Discount,
                Quantity = cartDto.Quantity,
                TotalPrice = cartDto.TotalPrice,
            };

            _context.Cart.Add(cart);
            await _context.SaveChangesAsync();

            // Sau khi thêm thành công, cập nhật lại Id của cartDto
            cartDto.Id = cart.Id;

            return CreatedAtAction(nameof(GetCart), new { id = cart.Id }, cartDto);
        }

        private bool CartExists(int id)
        {
            return _context.Cart.Any(e => e.Id == id);
        }

        [HttpPut]
        public async Task<ActionResult<CartDto>> Updatecart(int id, CartDto cartDto)
        {
            if (id != cartDto.Id)
            {
                return BadRequest();
            }

            var cart = await _context.Cart.FindAsync(id);
            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            cart.CartUserId = cartDto.CartUserId;
            cart.CartProductId = cartDto.CartProductId;
            cart.Price = cartDto.Price;
            cart.Discount = cartDto.Discount;
            cart.Quantity = cartDto.Quantity;
            cart.TotalPrice = cartDto.TotalPrice;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound("cart not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<CartDto>>> DeleteCart(int id)
        {
            var Cart = await _context.Cart.FindAsync(id);
            if (Cart == null)
            {
                return NotFound("Cart not found.");
            }

            _context.Cart.Remove(Cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
