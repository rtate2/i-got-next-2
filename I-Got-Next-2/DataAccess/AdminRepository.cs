using Microsoft.Extensions.Configuration;
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

            using (var db = new SqlConnection(ConnectionString))
            {
                var team = db.QueryFirstOrDefault<Team>(sql, new { TeamId = teamId });

                return team;
            }
        }
    }
}
