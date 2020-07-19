﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using I_Got_Next_2.Models;
using Microsoft.Extensions.Configuration;

namespace I_Got_Next_2.DataAccess
{
    public class TeamRepository
    {
        string ConnectionString;

        public TeamRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("IGotNext2");
        }
        public IEnumerable<Team> GetTeams()
        {
            var sql = @"select *
                        from Team";

            using (var db = new SqlConnection(ConnectionString))
            {
                var team = db.Query<Team>(sql);

                return team;
            }
        }

        public IEnumerable<TeamsWithPlayers> GetTeamsWithPlayers()
        {
            var sql = @"select *
                        from Team
                        where IsAvailable = 0";

            using (var db = new SqlConnection(ConnectionString))
            {
                var teams = db.Query<TeamsWithPlayers>(sql);

                return teams;
            }
        }

        public Team AddedTeam(NewTeam team)
        {
            var sql = @"insert into Team ([Date], TeamName, IsAvailable, IsTeamCountFull)
                        output inserted.*
                        values (getDate(), @TeamName, 0, @IsTeamCountFull)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var newTeam = db.QueryFirstOrDefault<Team>(sql, team);

                return newTeam;
            }
        }

        //admin removal of team availability
        public Team UpdateSingleAvailabilityTeamStatus(int teamId)
        {
            var sql = @"update Team
                        set IsAvailable = 1
                        where TeamId = @teamId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var updatedTeam = db.QueryFirstOrDefault(sql, new { TeamId = teamId });

                return updatedTeam;
            }
        }
    }
}
