using BackComandaBar.Models;
using BackComandaBar.Services.CardService;
using BackComandaBar.Services.ProductService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackComandaBar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService) =>
            _productService = productService;


        [HttpGet]
        public async Task<ActionResult<List<ProductModel>>> GetCards()
        {
            return Ok(await _productService.GetProducts());
        }


        [HttpPost]
        public async Task<ProductModel> PostCard(ProductModel newProduct)
        {
            await _productService.CreateAsync(newProduct);
            return newProduct;
        }


    }
}
