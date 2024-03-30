namespace DaJodCloth.Model
{
    public class Order
    {
        public int Id { get; set; }
        public int OrderUserId { get; set; }
        public DateTime OrderDate { get; set; }
        public int OrderTotal { get; set; }
        public int OrderStatus { get; set; }

        // Navigation properties
        public User User { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
    public class OrdersDto
    {
        public int Id { get; set; }
        public int OrderUserId { get; set; }
        public DateTime OrderDate { get; set; }
        public int OrderTotal { get; set; }
        public int OrderStatus { get; set; }
    }
}
