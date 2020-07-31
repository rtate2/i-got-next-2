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

        [HttpPut("team/{teamId}/isavailable")]
        public IActionResult UpdateTeamAvailabilityStatus(int teamId)
        {
            var status = _teamRepository.UpdateSingleAvailabilityTeamStatus(teamId);

            return Ok(status);
        }

        [HttpGet("team/{teamId}")]
        public IActionResult GetTeamById(int teamId)
        {
            var team = _teamRepository.GetTeamById(teamId);

            return Ok(team);
        }

        [HttpGet("singleteam/{teamId}")]
        public IActionResult GetSingleTeam(int teamId)
        {
            var team = _teamRepository.GetSingleTeamById(teamId);

            if (team == null)
            {
                return NotFound("The team doesn't exist");
            }

            return Ok(team);
        }

        //select top two teams for each court
        [HttpGet("playergameview/currentgames")]
        public IActionResult GetGameTeams()
        {
            var teams = _teamRepository.GetCurrentGameTeams();

            if (teams == null)
            {
                return NotFound("There are not any teams playing");
            }

            return Ok(teams);
        }

        //select team next to play
        [HttpGet("playergameview/nexttoplay")]
        public IActionResult GetNextTeamToPlay()
        {
            var nextTeam = _teamRepository.NextTeamToPlay();

            if (nextTeam == null)
            {
                return NotFound("No team is signed up to play next");
            }

            return Ok(nextTeam);
        }

        //Update single team
        [HttpPut("team/${teamId}/edit")]
        public IActionResult UpdateSingleTeam(int teamId, TeamDBInfo updatedTeam)
        {
            var newProduct = _teamRepository.UpdateSingleTeam(teamId, updatedTeam);
            return Ok(newProduct);
        }

        //Number of players on the team
        [HttpGet("team/{teamId}/count")]
        public IActionResult TeamMemberCount(int teamId)
        {
            var teamCount = _teamRepository.TeamMemberTotal(teamId);

            if (teamCount == null)
            {
                return NotFound("The team doesn't have any players");
            }

            return Ok(teamCount);
        }

        //update teams's currently playing status
        [HttpPut("currentgame/team/{teamId}")]
        public IActionResult UpdateTeamCurrentlyPlayingStatus(int teamId)
        {
            var isATeam = _teamRepository.GetTeamById(teamId);

            var teamNull = false;

            if (isATeam != null)
            {
                if (!isATeam.IsCurrentlyPlaying)
                {
                    teamNull = true;
                }
            }
            else
            {
                return NotFound("No team found");
            }

            var status = _teamRepository.UpdateTeamCurrentlyPlayingStatus(teamId, teamNull);

            return Ok(status);
        }
    }
}