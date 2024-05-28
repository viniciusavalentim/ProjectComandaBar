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


        public async Task<List<CardModel>> GetCards()
        {
            List<CardModel> cards = new List<CardModel>();

            try
            {
                cards = await _cardCollection.Find(x => true).ToListAsync();
            }
            catch (Exception ex)
            {
               ex.ToString();
            }

            return cards;
        }
        public async Task<CardModel> GetCardById(string id)
        {
            CardModel card = new CardModel();

            try
            {
                var filter = Builders<CardModel>.Filter.Eq(x => x.Id, id);
                card = await _cardCollection.Find(filter).FirstOrDefaultAsync();

            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return card;
        }
        public async Task<CardModel> UpdateCard(string id, CardModel card)
        {
            try
            {
                if (card.Id != id)
                {
                    throw new ArgumentException("O campo _id não pode ser alterado.");
                }

                var filter = Builders<CardModel>.Filter.Eq(x => x.Id, id);

                var result = await _cardCollection.ReplaceOneAsync(filter, card);

                if (result.ModifiedCount == 0)
                {
                    throw new InvalidOperationException("Nenhum documento foi atualizado.");
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ocorreu um erro durante a atualização: {ex}");
                throw;
            }

            return card;
        }
        public async Task<CardModel> DeleteCard(string id)
        {
            CardModel card = new CardModel();
            try
            {
                var filter = Builders<CardModel>.Filter.Eq(x => x.Id, id);
                card = await _cardCollection.Find(filter).FirstOrDefaultAsync();
                DeleteResult replace = await _cardCollection.DeleteOneAsync(x => x.Id == id);

            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return card;
        }
        public async Task CreateAsync(CardModel newCard) =>
            await _cardCollection.InsertOneAsync(newCard);

    }
}
