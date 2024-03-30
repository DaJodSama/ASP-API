namespace DaJodCloth.Model
{
    public class Cart
    {
        public int Id { get; set; }
        public int CartUserId { get; set; }
        public int CartProductId { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int Quantity { get; set; }
        public int TotalPrice { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Product Product { get; set; }
    }
    public class CartDto
    {
        public int Id { get; set; }
        public int CartUserId { get; set; }
        public int CartProductId { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int Quantity { get; set; }
        public int TotalPrice { get; set; }
    }
}
