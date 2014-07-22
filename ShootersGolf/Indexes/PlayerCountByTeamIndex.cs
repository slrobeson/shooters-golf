using System.Linq;
using Raven.Client.Indexes;
using ShootersGolf.Models;

namespace ShootersGolf.Indexes
{
    public class PlayerCountByTeamIndex : AbstractIndexCreationTask<Player, PlayerCountByTeamIndex.ReduceResult>
    {
        public class ReduceResult
        {
            public string TeamId { get; set; }
            public string TeamName { get; set; }
            public int PlayerCount { get; set; }
        }

        public PlayerCountByTeamIndex()
        {
            Map = players => from player in players
                             where !string.IsNullOrWhiteSpace(player.TeamId)
                             let team = LoadDocument<Team>(player.TeamId)
                             select new { TeamId = team.Id, TeamName = team.Name, PlayerCount = 1 };

            Reduce = results => from result in results
                                group result by new { result.TeamId, result.TeamName } into g
                                select new { g.Key.TeamId, g.Key.TeamName, PlayerCount = g.Sum(x => x.PlayerCount) };
        }
    }
}