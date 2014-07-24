using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Raven.Client;
using ShootersGolf.Models;

namespace ShootersGolf.Controllers
{
    public class PlayersController : ApiController
    {
        [HttpGet]
        public IList<Player> Get()
        {
            using (var session = Global.DocumentStore.OpenSession())
            {
                return session.Query<Player>().Take(int.MaxValue).ToList();
            }
        }

        [HttpPost]
        public HttpResponseMessage Post(Player player)
        {
            player.RegisteredDateTime = DateTime.Now;

            using (var session = Global.DocumentStore.OpenSession())
            {
                session.Store(player);
                session.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }
    }
}
