﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using I_Got_Next_2.DataAccess;

namespace I_Got_Next_2.Controller
{
    [Route("api/adminportal")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        AdminRepository _adminRepository;
        public AdminController(AdminRepository repository)
        {
            _adminRepository = repository;
        }

        [HttpGet("admin/{adminname}/password/{adminpassword}")]
        public IActionResult GetAdminCredentials(string adminName, string adminPassword)
        {
            var credentials = _adminRepository.GetCredentials(adminName, adminPassword);

            if (credentials == null)
            {
                return NotFound("Administrator credentials not found");
            }

            return Ok(credentials);
        }

        [HttpPut("remove/{teamId}")]
        public IActionResult RemoveTeamFromList(int teamId)
        {
            var team = _adminRepository.RemoveTeam(teamId);

            return Ok(team);
        }
    }
}