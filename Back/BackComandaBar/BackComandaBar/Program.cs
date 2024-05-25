using BackComandaBar.Database;
using BackComandaBar.Services.CardService;
using BackComandaBar.Services.ProductService;

namespace BackComandaBar
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.Configure<ComandaBarDatabaseSettings>(
                builder.Configuration.GetSection("ComandaBarDatabase"));


            builder.Services.AddSingleton<CardService>();
            builder.Services.AddSingleton<ProductService>();


            var app = builder.Build();


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}