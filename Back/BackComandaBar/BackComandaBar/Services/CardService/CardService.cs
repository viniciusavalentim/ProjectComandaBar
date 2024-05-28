using BackComandaBar.Database;
using BackComandaBar.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BackComandaBar.Services.CardService
{
    public class CardService
    {
        private readonly IMongoCollection<CardModel> _cardCollection;
        private readonly IMongoCollection<CardModel> _cardClosedCollection;


        public CardService(
            IOptions<ComandaBarDatabaseSettings> comandaBarDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                comandaBarDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                comandaBarDatabaseSettings.Value.DatabaseName);

            _cardCollection = mongoDatabase.GetCollection<CardModel>(
                comandaBarDatabaseSettings.Value.ComandaBarCollectionName);


            _cardClosedCollection = mongoDatabase.GetCollection<CardModel>(
                comandaBarDatabaseSettings.Value.CardClosedCollectionName);
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
               ReplaceOneResult replace = await _cardCollection.ReplaceOneAsync(x => x.Id == id, card);
               
            }
            catch (Exception ex)
            {
                ex.ToString();
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

        public async Task CreateCardClosed(CardModel newCard)
        {
            newCard.Id = null;
            await _cardClosedCollection.InsertOneAsync(newCard);
        }
           

    }
}
