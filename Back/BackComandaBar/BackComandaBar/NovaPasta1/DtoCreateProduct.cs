using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BackComandaBar.NovaPasta1
{
    public class DtoCreateProduct
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
