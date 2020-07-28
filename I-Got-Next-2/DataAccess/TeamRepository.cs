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

        //get all teams
        public IEnumerable<Team> GetTeams()
        {
            var sql = @"select *
                        from Team
                        where IsAvailable = 1";

            using (var db = new SqlConnection(ConnectionString))
            {
                var team = db.Query<Team>(sql);

                return team;
            }
        }

        //get teams with players -- won't use this call anymore due to changing how teams are created
        public IEnumerable<TeamsWithPlayers> GetTeamsWithPlayers()
        {
            //var sql = @"select *
            //            from Team
            //            where IsAvailable = 0";

            var sql = @"select *
                        from Player
                        join Team
                        on player.TeamId = team.TeamId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var teams = db.Query<TeamsWithPlayers>(sql);

                return teams;
            }
        }

        //add new team
        public Team AddedTeam(NewTeam team)
        {
            var sql = @"insert into Team ([Date], TeamName, IsAvailable, IsTeamCountFull)
                        output inserted.*
                        values (getDate(), @TeamName, 1, @IsTeamCountFull)";

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

        //get team by Id
        public Team GetTeamById(int teamId)
        {
            var sql = @"select *
                        from Team
                        where TeamId = @TeamId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Team>(sql, new { TeamId = teamId });

                return result;
            }
        }

        //get single team
        public Team GetSingleTeamById(int teamId)
        {
            var sql = @"select *
                        from Team
                        where TeamId = @TeamId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Team>(sql, new { TeamId = teamId });

                return result;
            }
        }

        //get teams playing for each court
        public IEnumerable<Team> GetCurrentGameTeams()
        {
            //var sql = @"select top 2 *
            //            from Team
            //            where IsAvailable = 1";

            var sql = @"select *
                        from Team
                        where IsCurrentlyPlaying = 1";

            using (var db = new SqlConnection(ConnectionString))
            {
                var teams = db.Query<Team>(sql);

                return teams;
            }
        }

        public Team NextTeamToPlay()
        {
            var sql = @"Select top 1 * from
                        (select top 3 *
                        from Team
                        where IsAvailable = 1
                        order by [Date])
                        as Result
                        order by [Date] desc";

            using (var db = new SqlConnection(ConnectionString))
            {
                var team = db.QueryFirstOrDefault<Team>(sql);

                return team;
            }
        }
    }
}
