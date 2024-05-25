using BackComandaBar.Models;
using BackComandaBar.Services.CardService;
using BackComandaBar.Services.ProductService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackComandaBar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly CardService _cardService;
        public CardController(CardService cardService) =>
            _cardService = cardService;


        [HttpGet]
        public async Task<ActionResult<List<CardModel>>> GetCards()
        {
            return Ok(await _cardService.GetCards());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CardModel>> GetCard(string id)
        {
            return Ok(await _cardService.GetCardById(id));
        }

        [HttpPost]
        public async Task<CardModel> PostCard(CardModel newCard)
        {
            await _cardService.CreateAsync(newCard);
            return newCard;
        }

        [HttpPut("{id}")]
        public async Task<CardModel> UpdateCard(string id, CardModel newCard)
        {
            return await _cardService.UpdateCard(id, newCard);
        }

        [HttpDelete("{id}")]
        public async Task<CardModel> DeleteCard(string id)
        {
           return await _cardService.DeleteCard(id);
        }
    }
}
