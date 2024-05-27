namespace BackComandaBar.Database
{
    public class ComandaBarDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string ComandaBarCollectionName { get; set; } = null!;
        public string CardClosedCollectionName { get; set; } = null!;
        public string ProductCollectionName { get; set; } = null!;

    }
}
