using System.Linq;
using Raven.Client.Indexes;
using ShootersGolf.Models;

namespace ShootersGolf.Indexes
{
    public class PlayerCountByTeamIndex : AbstractIndexCreationTask<Player, PlayerCountByTeamIndex.ReduceResult>
    {
        public class ReduceResult
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public int PlayerCount { get; set; }
        }

        public PlayerCountByTeamIndex()
        {
            Map = players => from player in players
                             where !string.IsNullOrWhiteSpace(player.TeamId)
                             let team = LoadDocument<Team>(player.TeamId)
                             select new
                             {
                                 team.Id,
                                 team.Name,
                                 PlayerCount = 1
                             };

            Reduce = results => (from result in results
                                 group result by new { result.Id, result.Name } into g
                                 select new { g.Key.Id, g.Key.Name, PlayerCount = g.Sum(x => x.PlayerCount) });
        }
    }
}