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

        public Player UpdateSinglePlayerStatus(int playerId, int teamId, bool isTeamNull)
        {
            string sql;
            if (isTeamNull == true)
            {
                sql = @"update Player
                            set TeamId = null
                            where PlayerId = @playerId";
            }
            else
            {
               sql = @"update Player
                            set TeamId = @teamId
                            where PlayerId = @playerId";
            }

            using (var db = new SqlConnection(ConnectionString))
            {
                var updatedPlayer = db.QueryFirstOrDefault(sql, new { TeamId = teamId, PlayerId = playerId });

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
