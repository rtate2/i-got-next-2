using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using I_Got_Next_2.DataAccess;

namespace I_Got_Next_2.Controller
{
    [Route("api/players")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        PlayerRespository _playerRespository;

        public PlayerController(PlayerRespository respository)
        {
            _playerRespository = respository;
        }

        [HttpGet]
        public IActionResult GetAllPlayers()
        {
            var players = _playerRespository.GetPlayers();

            if (players == null)
            {
                return NotFound("There are no players signed into the gym");
            }

            return Ok(players);
        }
    }
}