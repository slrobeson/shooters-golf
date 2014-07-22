using System;
using System.ComponentModel;

namespace ShootersGolf.Models
{
    public class Player
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime RegisteredDateTime { get; set; }
        public ShirtSize ShirtSize { get; set; }
        public string TeamId { get; set; }
    }

    public enum ShirtSize
    {
        [Description("S")]
        S = 1,
        [Description("M")]
        M = 2,
        [Description("L")]
        L = 3,
        [Description("XL")]
        XL = 4,
        [Description("2XL")]
        XXL = 5,
        [Description("3XL")]
        XXXL = 6
    }
}