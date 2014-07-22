using System;

namespace ShootersGolf.Models
{
    public class Team
    {
        public string Id { get; set; }
        //[UniqueConstraint]
        public string Name { get; set; }
        public DateTime RegisteredDateTime { get; set; }
    }
}