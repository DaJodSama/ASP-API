namespace DaJodCloth.Model
{
    public class Product
    {
        public int Id {  get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Price { get; set; }
        public int Discount { get; set; }
        public string? Img { get; set; }
        public int Status {  get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public ICollection<Cart> Cart { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }

    }
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Discount { get; set; }
        public string? Img { get; set; }
        public int Status { get; set; }
        public int CategoryId { get; set; }
    }
}
