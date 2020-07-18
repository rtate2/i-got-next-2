using System;
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

        public NewTeam AddedTeam(NewTeam team)
        {
            var sql = @"insert into Team (CourtId, [Date], TeamName, IsAvailable, IsTeamCountFull)
                        values (@CourtId, getDate(), @TeamName, 0, 1)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var newTeam = db.QueryFirstOrDefault<NewTeam>(sql, team);

                return newTeam;
            }
        }
    }
}
