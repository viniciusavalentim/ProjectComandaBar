﻿using BackComandaBar.Database;
using BackComandaBar.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BackComandaBar.Services.ProductService
{
    public class ProductService
    {
        private readonly IMongoCollection<ProductModel> _productCollection;

        public ProductService(
            IOptions<ComandaBarDatabaseSettings> comandaBarDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                comandaBarDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                comandaBarDatabaseSettings.Value.DatabaseName);

            _productCollection = mongoDatabase.GetCollection<ProductModel>(
                comandaBarDatabaseSettings.Value.ProductCollectionName);
        }

        public async Task<List<ProductModel>> GetProducts()
        {
            List<ProductModel> products = new List<ProductModel>();

            try
            {
                products = await _productCollection.Find(x => true).ToListAsync();

            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return products;
        }


        public async Task CreateAsync(ProductModel newProduct) =>
            await _productCollection.InsertOneAsync(newProduct);

    }
}
