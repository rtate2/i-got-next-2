using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace I_Got_Next_2.Models
{
    public class Team
    {
        public int TeamId { get; set; }
        public DateTime Date { get; set; }
        public string TeamName { get; set; }
        public bool IsAvailable { get; set; }
        public bool IsTeamCountFull { get; set; }
        public int CourtId { get; set; }
    }
}
