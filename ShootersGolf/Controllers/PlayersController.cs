﻿using System;
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

        [HttpGet]
        public Player Get(int id)
        {
            var ravenId = "players/" + id;
            using (var session = Global.DocumentStore.OpenSession())
            {
                return session.Load<Player>(ravenId);
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
