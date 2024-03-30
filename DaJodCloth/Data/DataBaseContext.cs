using DaJodCloth.Model;
using Microsoft.EntityFrameworkCore;

namespace DaJodCloth.Data
{
    public class DataBaseContext:DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options):base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
  
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                    .HasOne(p => p.Category) // Product has one Category
                    .WithMany(c => c.Products) // Category has many Products
                    .IsRequired(); // Make the relationship required

            modelBuilder.Entity<Product>()
                        .HasIndex(p => p.CategoryId);
            //------------------------------------------
            modelBuilder.Entity<Cart>()
            .HasOne(c => c.User)
            .WithMany()
            .HasForeignKey(c => c.CartUserId);

            modelBuilder.Entity<Cart>()
                .HasOne(c => c.Product)
                .WithMany()
                .HasForeignKey(c => c.CartProductId);

            modelBuilder.Entity<Cart>()
                        .HasIndex(p => p.CartUserId);

            modelBuilder.Entity<Cart>()
                        .HasIndex(p => p.CartProductId);
            //------------------------------------------
            modelBuilder.Entity<Order>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.OrderUserId);

            modelBuilder.Entity<Order>()
                        .HasIndex(p => p.OrderUserId);
            //------------------------------------------
            modelBuilder.Entity<OrderItem>()
            .HasOne(c => c.Orders)
            .WithMany()
            .HasForeignKey(c => c.OdItemOrderId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(c => c.Product)
                .WithMany()
                .HasForeignKey(c => c.OdItemProductId);

            modelBuilder.Entity<OrderItem>()
                        .HasIndex(p => p.OdItemOrderId);

            modelBuilder.Entity<OrderItem>()
                        .HasIndex(p => p.OdItemProductId);
            //------------------------------------------
            modelBuilder.Entity<OrderProduct>()
               .HasOne(c => c.User)
               .WithMany()
               .HasForeignKey(c => c.OdPrdUserId);

            modelBuilder.Entity<OrderProduct>()
                        .HasIndex(p => p.OdPrdUserId);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
    }
    public class DbSeeder
    {
        private readonly DataBaseContext _context;

        public DbSeeder(DataBaseContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            // Kiểm tra xem có sản phẩm nào không hợp lệ không
            var invalidProducts = await _context.Products
                .Where(p => !_context.Categories.Any(c => c.Id == p.CategoryId))
                .ToListAsync();

            // Nếu có sản phẩm không hợp lệ, cập nhật chúng để chúng tương ứng với các danh mục hợp lệ
            foreach (var product in invalidProducts)
            {
                var validCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id == product.CategoryId);
                if (validCategory != null)
                {
                    product.CategoryId = validCategory.Id;
                }
            }

            // Kiểm tra người dùng không hợp lệ trong bảng Cart
            var invalidUsersInCart = await _context.Cart
                .Where(cart => !_context.Users.Any(u => u.Id == cart.CartUserId))
                .ToListAsync();

            // Cập nhật người dùng không hợp lệ trong bảng Cart
            foreach (var cartItem in invalidUsersInCart)
            {
                var validUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == cartItem.CartUserId);
                if (validUser != null)
                {
                    cartItem.CartUserId = validUser.Id;
                }
            }

            // Kiểm tra sản phẩm không hợp lệ trong bảng Cart
            var invalidProductInCart = await _context.Cart
                .Where(cart => !_context.Products.Any(u => u.Id == cart.CartProductId))
                .ToListAsync();

            // Cập nhật sản phẩm không hợp lệ trong bảng Cart
            foreach (var cartItem in invalidProductInCart)
            {
                var validUser = await _context.Products.FirstOrDefaultAsync(u => u.Id == cartItem.CartProductId);
                if (validUser != null)
                {
                    cartItem.CartProductId = validUser.Id;
                }
            }

            // Kiểm tra người dùng không hợp lệ trong bảng Order
            var invalidUsersInOrder = await _context.Orders
                .Where(order => !_context.Users.Any(u => u.Id == order.OrderUserId))
                .ToListAsync();

            // Cập nhật người dùng không hợp lệ trong bảng Order
            foreach (var order in invalidUsersInOrder)
            {
                var validUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == order.OrderUserId);
                if (validUser != null)
                {
                    order.OrderUserId = validUser.Id;
                }
            }

            // Kiểm tra đơn hàng không hợp lệ trong bảng OrderItems
            var invalidOrderItems = await _context.OrderItems
                .Where(orderItem => !_context.Orders.Any(order => order.Id == orderItem.OdItemOrderId))
                .ToListAsync();

            // Cập nhật các đơn hàng không hợp lệ trong bảng OrderItems
            foreach (var orderItem in invalidOrderItems)
            {
                var validOrder = await _context.Orders.FirstOrDefaultAsync(order => order.Id == orderItem.OdItemOrderId);
                if (validOrder != null)
                {
                    orderItem.OdItemOrderId = validOrder.Id;
                }
            }

            // Kiểm tra sản phẩm không hợp lệ trong bảng OrderItems
            var invalidProductsInOrderItems = await _context.OrderItems
                .Where(orderItem => !_context.Products.Any(product => product.Id == orderItem.OdItemProductId))
                .ToListAsync();

            // Cập nhật sản phẩm không hợp lệ trong bảng OrderItems
            foreach (var orderItem in invalidProductsInOrderItems)
            {
                var validProduct = _context.Products.FirstOrDefault(product => product.Id == orderItem.OdItemProductId);
                if (validProduct != null)
                {
                    orderItem.OdItemProductId = validProduct.Id;
                }
            }

            // Kiểm tra người dùng không hợp lệ trong bảng Order
            var invalidUsersInOrderItems = await _context.OrderProducts
                .Where(order => !_context.Users.Any(u => u.Id == order.OdPrdUserId))
                .ToListAsync();

            // Cập nhật người dùng không hợp lệ trong bảng Order
            foreach (var orderprd in invalidUsersInOrderItems)
            {
                var validUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == orderprd.OdPrdUserId);
                if (validUser != null)
                {
                    orderprd.OdPrdUserId = validUser.Id;
                }
            }

            // Lưu các thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();
        }
    }
}
