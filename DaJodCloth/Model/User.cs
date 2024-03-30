namespace DaJodCloth.Model
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Email { get; set; }   
        public string? Password { get; set; }
        public ICollection<Cart> Cart { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
    }
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
