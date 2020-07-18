using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using I_Got_Next_2.DataAccess;
using I_Got_Next_2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace I_Got_Next_2.Controller
{
    [Route("api/teams")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        TeamRepository _teamRepository;
        public TeamController(TeamRepository repository)
        {
            _teamRepository = repository;
        }

        // Get all teams
        [HttpGet]
        public IActionResult GetAllTeams()
        {
            var teams = _teamRepository.GetTeams();

            if(teams == null)
            {
                return NotFound("There are no teams on the list.");
            }

            return Ok(teams);
        }

        // Get teams w/ players
        [HttpGet("teamswithplayers")]
        public IActionResult GetTeamsWithPlayers()
        {
            var teams = _teamRepository.GetTeamsWithPlayers();

            if (teams == null)
            {
                return NotFound("There are no players on a team");
            }

            return Ok(teams);
        }

        // Add teams to list
        [HttpPost]
        public IActionResult AddTeam(NewTeam teamToAdd)
        {
            try
            {
                var teamAdded = _teamRepository.AddedTeam(teamToAdd);

                return Created("", teamAdded);
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                return Created("", new object());
            }
        }
    }
}