using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BackComandaBar.Models
{
    public class ProductModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Name")]
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
