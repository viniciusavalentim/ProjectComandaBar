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

        [HttpGet("Closed")]
        public async Task<ActionResult<List<CardModel>>> GetCardsClosed()
        {
            return Ok(await _cardService.GetCardsClosed());
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
        [HttpPost("Closed")]
        public async Task<CardModel> PostCardClosed(CardModel newCard)
        {
            await _cardService.CreateCardClosed(newCard);
            return newCard;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CardModel>> UpdateCard(string id, CardModel newCard)
        {
            try
            {
                var updatedCard = await _cardService.UpdateCard(id, newCard);
                return Ok(updatedCard);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest("Nenhum documento foi atualizado.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Ocorreu um erro durante a atualização do cartão.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<CardModel> DeleteCard(string id)
        {
           return await _cardService.DeleteCard(id);
        }
    }
}
