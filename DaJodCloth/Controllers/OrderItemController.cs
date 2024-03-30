using DaJodCloth.Data;
using DaJodCloth.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DaJodCloth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public OrderItemController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderItemDto>>> GetAllOrderItem()
        {
            var OrderItem = await _context.OrderItems.ToListAsync();
            var OrderItemDtos = OrderItem.Select(p => new OrderItemDto
            {
                Id = p.Id,
                OdItemOrderId = p.OdItemOrderId,
                OdItemProductId = p.OdItemProductId,
                Price = p.Price,
                Discount = p.Discount,
                Quantity = p.Quantity,
                TotalPrice = p.TotalPrice
            }).ToList();

            return Ok(OrderItemDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<OrderItemDto>>> GetOrderItem(int id)
        {
            var OrderItem = await _context.OrderItems.FindAsync(id);
            if (OrderItem is null)
            {
                return NotFound("OrderItem not found.");
            }

            var OrderItemDto = new OrderItemDto
            {
                Id = OrderItem.Id,
                OdItemOrderId = OrderItem.OdItemOrderId,
                OdItemProductId = OrderItem.OdItemProductId,
                Price = OrderItem.Price,
                Discount = OrderItem.Discount,
                Quantity = OrderItem.Quantity,
                TotalPrice = OrderItem.TotalPrice
            };
            return Ok(OrderItem);
        }

        [HttpPost]
        public async Task<ActionResult<List<OrderItemDto>>> AddOrderItem(OrderItemDto OrderItemDto)
        {
            var orderItem = new OrderItem
            {
                OdItemOrderId = OrderItemDto.OdItemOrderId,
                OdItemProductId = OrderItemDto.OdItemProductId,
                Price = OrderItemDto.Price,
                Discount = OrderItemDto.Discount,
                Quantity = OrderItemDto.Quantity,
                TotalPrice = OrderItemDto.TotalPrice
            };

            _context.OrderItems.Add(orderItem);
            await _context.SaveChangesAsync();

            // Sau khi thêm thành công, cập nhật lại Id của OrderItemDto
            OrderItemDto.Id = orderItem.Id;

            return CreatedAtAction(nameof(GetOrderItem), new { id = orderItem.Id }, OrderItemDto);
        }

        private bool OrderItemExists(int id)
        {
            return _context.OrderItems.Any(e => e.Id == id);
        }

        [HttpPut]
        public async Task<ActionResult<OrderItemDto>> UpdateOrderItem(int id, OrderItemDto OrderItemDto)
        {
            if (id != OrderItemDto.Id)
            {
                return BadRequest();
            }

            var OrderItem = await _context.OrderItems.FindAsync(id);
            if (OrderItem == null)
            {
                return NotFound("OrderItem not found.");
            }

            OrderItem.OdItemOrderId = OrderItemDto.OdItemOrderId;
            OrderItem.OdItemProductId = OrderItemDto.OdItemProductId;
            OrderItem.Price = OrderItemDto.Price;
            OrderItem.Discount = OrderItemDto.Discount;
            OrderItem.Quantity = OrderItemDto.Quantity;
            OrderItem.TotalPrice = OrderItemDto.TotalPrice;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(id))
                {
                    return NotFound("OrderItem not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<OrderItemDto>>> DeleteOrderItem(int id)
        {
            var OrderItem = await _context.OrderItems.FindAsync(id);
            if (OrderItem == null)
            {
                return NotFound("OrderItem not found.");
            }

            _context.OrderItems.Remove(OrderItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
