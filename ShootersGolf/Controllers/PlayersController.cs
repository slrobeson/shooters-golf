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
    [RoutePrefix("api/players")]
    public class PlayersController : ApiController
    {
        [Route("{id:int}")]
        [HttpGet]
        public Player Get(int id)
        {
            var ravenId = "players/" + id;
            using (var session = Global.DocumentStore.OpenSession())
            {
                return session.Load<Player>(ravenId);
            }
        }

        [Route("{team}")]
        [HttpGet]
        public IList<Player> Get(string team)
        {
            using (var session = Global.DocumentStore.OpenSession())
            {
                return session.Query<Player>().Where(x => x.TeamName == team).ToList();
            }
        }

        [HttpGet]
        public IList<Player> Get()
        {
            using (var session = Global.DocumentStore.OpenSession())
            {
                return session.Query<Player>().Take(int.MaxValue).ToList();
            }
        }

        [Route("available")]
        [HttpGet]
        public IList<Player> GetAvailable()
        {
            using (var session = Global.DocumentStore.OpenSession())
            {
                return session.Query<Player>().Where(x => x.TeamName == null).ToList();
            }
        }

        [HttpPut]
        public HttpResponseMessage Put(Player player)
        {
            using(var session = Global.DocumentStore.OpenSession())
            {
                var existing = session.Load<Player>(player.Id);

                if(existing != null)
                {
                    existing.TeamName = player.TeamName;

                    session.Store(existing);
                    session.SaveChanges();
                }

                return new HttpResponseMessage(HttpStatusCode.OK);
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

        [Route("{id:int}")]
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            using (var session = Global.DocumentStore.OpenSession())
            {
                var player = session.Load<Player>(id);

                session.Delete(player);
                session.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }
        }
    }
}
