using DaJodCloth.Data;
using DaJodCloth.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaJodCloth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public OrderController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrdersDto>>> GetAllOrders()
        {
            var Orders = await _context.Orders.ToListAsync();
            var OrdersDtos = Orders.Select(p => new OrdersDto
            {
                Id = p.Id,
                OrderUserId = p.OrderUserId,
                OrderDate = p.OrderDate,
                OrderTotal = p.OrderTotal,
                OrderStatus = p.OrderStatus
            }).ToList();

            return Ok(OrdersDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<OrdersDto>>> GetOrders(int id)
        {
            var Orders = await _context.Orders.FindAsync(id);
            if (Orders is null)
            {
                return NotFound("Orders not found.");
            }

            var OrdersDto = new OrdersDto
            {
                Id = Orders.Id,
                OrderUserId = Orders.OrderUserId,
                OrderDate = Orders.OrderDate,
                OrderTotal = Orders.OrderTotal,
                OrderStatus = Orders.OrderStatus
            };
            return Ok(Orders);
        }

        [HttpPost]
        public async Task<ActionResult<List<OrdersDto>>> AddOrders(OrdersDto OrdersDto)
        {
            var order = new Order
            {
                OrderUserId = OrdersDto.OrderUserId,
                OrderDate = OrdersDto.OrderDate,
                OrderTotal = OrdersDto.OrderTotal,
                OrderStatus = OrdersDto.OrderStatus
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Sau khi thêm thành công, cập nhật lại Id của OrdersDto
            OrdersDto.Id = order.Id;

            return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, OrdersDto);
        }

        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }

        [HttpPut]
        public async Task<ActionResult<OrdersDto>> UpdateOrders(int id, OrdersDto OrdersDto)
        {
            if (id != OrdersDto.Id)
            {
                return BadRequest();
            }

            var Orders = await _context.Orders.FindAsync(id);
            if (Orders == null)
            {
                return NotFound("Orders not found.");
            }

            Orders.OrderUserId = OrdersDto.OrderUserId;
            Orders.OrderDate = OrdersDto.OrderDate;
            Orders.OrderTotal = OrdersDto.OrderTotal;
            Orders.OrderStatus = OrdersDto.OrderStatus;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdersExists(id))
                {
                    return NotFound("Orders not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<OrdersDto>>> DeleteOrders(int id)
        {
            var Orders = await _context.Orders.FindAsync(id);
            if (Orders == null)
            {
                return NotFound("Orders not found.");
            }

            _context.Orders.Remove(Orders);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
