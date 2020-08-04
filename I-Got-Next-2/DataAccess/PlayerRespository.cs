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
    public class PlayerRespository
    {
        string ConnectionString;

        public PlayerRespository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("IGotNext2");
        }
        public IEnumerable<Player> GetPlayers()
        {
            var sql = @"select *
                        from Player";

            using (var db = new SqlConnection(ConnectionString))
            {
                var players = db.Query<Player>(sql);

                return players;
            }
        }

        public IEnumerable<Player> GetAvailablePlayers()
        {
            var sql = @"select *
                        from Player
                        where TeamId is null";

            using (var db = new SqlConnection(ConnectionString))
            {
                var results = db.Query<Player>(sql);

                return results;
            }
        }

        public Player UpdateSinglePlayerStatus(int playerId, int teamId, bool TeamIsNotAvailable)
        {
            string sql;
            if (TeamIsNotAvailable)
            {
                sql = @"update Player
                            set TeamId = null
                            where PlayerId = @PlayerId";
            }
            else
            {
               sql = @"update Player
                            set TeamId = @TeamId
                            where PlayerId = @PlayerId";
            }

            string playerCount;

            playerCount = @"select count(TeamId)
                            from Player
                            where TeamId = @TeamId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var updatedPlayer = db.QueryFirstOrDefault(sql, new { TeamId = teamId, PlayerId = playerId });

                var numberOfPlayers = db.ExecuteScalar<int>(playerCount, new { TeamId = teamId });

                string stuff;
                if (numberOfPlayers > 4)
                {
                    stuff = @"update Team
                            set IsTeamCountFull = 1
                            where TeamId = @TeamId";

                    db.QueryFirstOrDefault<Team>(stuff, new { TeamId = teamId });
                }
                else
                {
                    stuff = @"update Team
                            set IsTeamCountFull = 0
                            where TeamId = @TeamId";

                    db.QueryFirstOrDefault<Team>(stuff, new { TeamId = teamId });
                }

                return updatedPlayer;
            }
        }

        public Player GetPlayerById(int playerId)
        {
            var sql = @"select *
                        from Player
                        where PlayerId = @PlayerId";
            
            using(var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Player>(sql, new { PlayerId = playerId });

                return result;
            }
        }

        public IEnumerable<Player> GetPlayersByTeamId(int teamId)
        {
            var sql = @"select *
                        from Player
                        where TeamId = @TeamId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.Query<Player>(sql, new { TeamId = teamId });

                return result;
            }
        }
    }
}
