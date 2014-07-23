using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Raven.Abstractions.Data;
using ShootersGolf.Indexes;
using ShootersGolf.Models;

namespace ShootersGolf.Controllers
{
    public class TeamsController : ApiController
    {
        [HttpGet]
        public IList<PlayerCountByTeamIndex.ReduceResult> Get()
        {
            using (var session = Global.DocumentStore.OpenSession())
            {
                return session.Query<PlayerCountByTeamIndex.ReduceResult>("PlayerCountByTeamIndex")
                    .Customize(x => x.WaitForNonStaleResultsAsOfNow()).ToList();
            }
        }

        [HttpPost]
        public HttpResponseMessage Post(RegisterTeamForm team)
        {
            var current = DateTime.Now;
            var teamId = "teams/" + team.Name;
            // Logic to check for unique team name. If unique continue...

            using (var session = Global.DocumentStore.OpenSession())
            {
                if (session.Load<Team>(teamId) != null)
                    throw new InvalidOperationException("Duplicate team name.");

                session.Store(new Team(), Etag.Empty, teamId);

                foreach (var player in team.Players)
                {
                    player.RegisteredDateTime = current;
                    player.TeamName = team.Name;

                    session.Store(player);
                }

                session.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }
    }
}
