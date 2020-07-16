using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using I_Got_Next_2.DataAccess;
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

        //api/teams
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
    }
}