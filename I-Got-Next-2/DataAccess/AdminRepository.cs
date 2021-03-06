﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using I_Got_Next_2.Models;
using System.Data.SqlClient;
using Dapper;


namespace I_Got_Next_2.DataAccess
{
    public class AdminRepository
    {
        string ConnectionString;

        public AdminRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("IGotNext2");
        }

        public Admin GetCredentials(string adminName, string adminPassword)
        {
            var sql = @"select *
                        from Administrator
                        where AdminName = @AdminName AND AdminPassword = @AdminPassword";

            using (var db = new SqlConnection(ConnectionString))
            {
                var results = db.QueryFirstOrDefault<Admin>(sql, new { AdminName = adminName, AdminPassword = adminPassword});

                return results;
            }
        }

        public Team RemoveTeam(int teamId)
        {
            var sql = @"update Team
                        set IsAvailable = 0
                        where TeamId = @teamId";

            var whoPlaying = @"select *
                            from Team
                            where IsCurrentlyPlaying = 1";

            using (var db = new SqlConnection(ConnectionString))
            {
                var team = db.QueryFirstOrDefault<Team>(sql, new { TeamId = teamId });

                var teamRemovedFromCourt = db.QueryFirstOrDefault<Team>(whoPlaying);

                if (teamRemovedFromCourt.IsAvailable == false)
                {
                    var gone = @"update Team
                                set IsCurrentlyPlaying = 0
                                where TeamId = @TeamId";

                    db.QueryFirstOrDefault<Team>(gone, new { TeamId = teamId });
                }

                return team;
            }
        }

        public Team UpdateTeamCurrentlyPlaying(int teamId)
        {
                var sql = @"update Team
                            set IsCurrentlyPlaying = 1
                            where TeamId = @TeamId";

                var team = @"select *
                        from Team
                        where TeamId = @TeamId";

                using (var db = new SqlConnection(ConnectionString))
                {
                    var teamPlaying = db.QueryFirstOrDefault<Team>(sql, new { TeamId = teamId });

                var teams = db.QueryFirstOrDefault<Team>(team, new { TeamId = teamId });

                    return teams;
                }
        }
    }
}
