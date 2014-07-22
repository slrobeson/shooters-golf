using System.ComponentModel;

namespace ShootersGolf.Models
{
    public class Sponsor
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public SponsorLevel Level { get; set; }
    }

    public enum SponsorLevel
    {
        [Description("Hole - $100")]
        Hole = 1,
        [Description("T-Shirt - $100")]
        TShirt = 2,
        [Description("Hole In One - $150")]
        HoleInOne = 3
    }
}