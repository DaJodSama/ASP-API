using DaJodCloth.Data;
using DaJodCloth.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaJodCloth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public OrderProductController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderProductsDto>>> GetAllOrderProducts()
        {
            var OrderProducts = await _context.OrderProducts.ToListAsync();
            var OrderProductsDtos = OrderProducts.Select(p => new OrderProductsDto
            {
                Id = p.Id,
                OdPrdUserId = p.OdPrdUserId,
                OrderDate = p.OrderDate,
                OrderTotal = p.OrderTotal,
                OrderStatus = p.OrderStatus
            }).ToList();

            return Ok(OrderProductsDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<OrderProductsDto>>> GetOrderProducts(int id)
        {
            var OrderProducts = await _context.OrderProducts.FindAsync(id);
            if (OrderProducts is null)
            {
                return NotFound("OrderProducts not found.");
            }

            var OrderProductsDto = new OrderProductsDto
            {
                Id = OrderProducts.Id,
                OdPrdUserId = OrderProducts.OdPrdUserId,
                OrderDate = OrderProducts.OrderDate,
                OrderTotal = OrderProducts.OrderTotal,
                OrderStatus = OrderProducts.OrderStatus
            };
            return Ok(OrderProducts);
        }

        [HttpPost]
        public async Task<ActionResult<List<OrderProductsDto>>> AddOrderProducts(OrderProductsDto OrderProductsDto)
        {
            var OrderProduct = new OrderProduct
            {
                OdPrdUserId = OrderProductsDto.OdPrdUserId,
                OrderDate = OrderProductsDto.OrderDate,
                OrderTotal = OrderProductsDto.OrderTotal,
                OrderStatus = OrderProductsDto.OrderStatus
            };

            _context.OrderProducts.Add(OrderProduct);
            await _context.SaveChangesAsync();

            // Sau khi thêm thành công, cập nhật lại Id của OrderProductsDto
            OrderProductsDto.Id = OrderProduct.Id;

            return CreatedAtAction(nameof(GetOrderProducts), new { id = OrderProduct.Id }, OrderProductsDto);
        }

        private bool OrderProductsExists(int id)
        {
            return _context.OrderProducts.Any(e => e.Id == id);
        }

        [HttpPut]
        public async Task<ActionResult<OrderProductsDto>> UpdateOrderProducts(int id, OrderProductsDto OrderProductsDto)
        {
            if (id != OrderProductsDto.Id)
            {
                return BadRequest();
            }

            var OrderProducts = await _context.OrderProducts.FindAsync(id);
            if (OrderProducts == null)
            {
                return NotFound("OrderProducts not found.");
            }

            OrderProducts.OdPrdUserId = OrderProductsDto.OdPrdUserId;
            OrderProducts.OrderDate = OrderProductsDto.OrderDate;
            OrderProducts.OrderTotal = OrderProductsDto.OrderTotal;
            OrderProducts.OrderStatus = OrderProductsDto.OrderStatus;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderProductsExists(id))
                {
                    return NotFound("OrderProducts not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<OrderProductsDto>>> DeleteOrderProducts(int id)
        {
            var OrderProducts = await _context.OrderProducts.FindAsync(id);
            if (OrderProducts == null)
            {
                return NotFound("OrderProducts not found.");
            }

            _context.OrderProducts.Remove(OrderProducts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
