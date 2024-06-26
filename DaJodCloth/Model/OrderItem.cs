﻿namespace DaJodCloth.Model
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OdItemOrderId { get; set; }
        public int OdItemProductId { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int Quantity { get; set; }
        public int TotalPrice { get; set; }

        // Navigation properties
        public Order Orders { get; set; }
        public Product Product { get; set; }
    }
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int OdItemOrderId { get; set; }
        public int OdItemProductId { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public int Quantity { get; set; }
        public int TotalPrice { get; set; }
    }
}
