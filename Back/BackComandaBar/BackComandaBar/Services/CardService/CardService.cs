using BackComandaBar.Database;
using BackComandaBar.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BackComandaBar.Services.CardService
{
    public class CardService
    {
        private readonly IMongoCollection<CardModel> _cardCollection;

        public CardService(
            IOptions<ComandaBarDatabaseSettings> comandaBarDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                comandaBarDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                comandaBarDatabaseSettings.Value.DatabaseName);

            _cardCollection = mongoDatabase.GetCollection<CardModel>(
                comandaBarDatabaseSettings.Value.ComandaBarCollectionName);
        }


        public async Task CreateAsync(CardModel newCard) =>
            await _cardCollection.InsertOneAsync(newCard);

    }
}
