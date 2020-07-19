﻿using System;
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

        [HttpPut("player/{playerId}/team/{teamId}")]
        public IActionResult UpdatePlayerTeamStatus(int teamId, Player player)
        {
            var teamNull = false;
            if(player.teamId == null)
            {
                teamNull = true;
            }
            var status = _playerRespository.UpdateSinglePlayerStatus(player.playerId, teamId, teamNull);

            return Ok(status);
        }
    }
}