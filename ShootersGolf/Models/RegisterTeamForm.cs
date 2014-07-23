using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootersGolf.Models
{
    public class RegisterTeamForm
    {
        public string Name { get; set; }

        public Player[] Players { get; set; }
    }
}