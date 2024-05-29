namespace BackComandaBar.NovaPasta1
{
    public class DtoCreateCard
    {
        public string? Name { get; set; }
        public double TotalPrice { get; set; }
        public List<DtoCreateProduct>? Products { get; set; }
    }
}
