using System.Linq;
using Raven.Client.Indexes;
using ShootersGolf.Models;

namespace ShootersGolf.Indexes
{
    public class PlayerCountByTeamIndex : AbstractIndexCreationTask<Player, PlayerCountByTeamIndex.ReduceResult>
    {
        public class ReduceResult
        {
            public string TeamName { get; set; }
            public int PlayerCount { get; set; }
        }

        public PlayerCountByTeamIndex()
        {
            Map = assignedPlayers => from player in assignedPlayers
                                     where !string.IsNullOrWhiteSpace(player.TeamName)
                                     select new { player.TeamName, PlayerCount = 1 };

            Reduce = results => from result in results
                                group result by new { result.TeamName } into g
                                select new { g.Key.TeamName, PlayerCount = g.Sum(x => x.PlayerCount) };
        }
    }
}