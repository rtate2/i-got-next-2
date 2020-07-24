using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using I_Got_Next_2.DataAccess;
using I_Got_Next_2.Models;
 
namespace I_Got_Next_2.Controller
{
    [Route("api/players")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        PlayerRespository _playerRespository;
        TeamRepository _teamRepository;

        public PlayerController(PlayerRespository respository, TeamRepository teamRepository)
        {
            _playerRespository = respository;
            _teamRepository = teamRepository;
        }

        //get all players
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

        //get all available players not on a team
        [HttpGet("availableplayers")]
        public IActionResult GetAvailablePlayers()
        {
            var players = _playerRespository.GetAvailablePlayers();

            if (players == null)
            {
                return NotFound("Ther aren't any available players");
            }

            return Ok(players);
        }

        //update player's team status
        [HttpPut("player/{playerId}/team/{teamId}")]
        public IActionResult UpdatePlayerTeamStatus(int playerId, int teamId, Player player)
        {
            var isAPlayer = _playerRespository.GetPlayerById(playerId);

            var isATeam = _teamRepository.GetTeamById(teamId);

            var teamNull = false;

            if (isAPlayer != null && isATeam != null)
            {
                if (isATeam.IsAvailable == false )
                {
                    teamNull = true;
                }
                // var status = _playerRespository.UpdateSinglePlayerStatus(playerId, teamId, teamNull);
            }
            else
            {
                return NotFound("No team found");
            }

            var status = _playerRespository.UpdateSinglePlayerStatus(playerId, teamId, teamNull);

            return Ok(status);
        }

        //get player by Id
        [HttpGet("player/{playerId}")]
        public IActionResult GetPlayerById(int playerId)
        {
            var player = _playerRespository.GetPlayerById(playerId);

            return Ok(player);
        }

        //get player by TeamId
        [HttpGet("team/{teamId}")]
        public IActionResult GetPlayersByTeamId(int teamId)
        {
            var players = _playerRespository.GetPlayersByTeamId(teamId);

            if (players == null)
            {
                return NotFound("Team does not exist. No players found.");
            }

            return Ok(players);
        }
    }
}