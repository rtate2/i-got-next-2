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
    }
}
