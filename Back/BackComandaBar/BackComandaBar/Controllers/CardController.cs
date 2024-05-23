using BackComandaBar.Models;
using BackComandaBar.Services.CardService;
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

        [HttpPost]
        public async Task<CardModel> PostCard(CardModel newCard)
        {
            await _cardService.CreateAsync(newCard);
            return newCard;
        }
    }
}
