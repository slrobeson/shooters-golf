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
    public class SponsorsController : ApiController
    {
        [HttpGet]
        public IList<Sponsor> Get()
        {
            using (var session = Global.DocumentStore.OpenSession())
            {
                return session.Query<Sponsor>().ToList();
            }
        }

        [HttpPost]
        public HttpResponseMessage Post(Sponsor sponsor)
        {
            using (var session = Global.DocumentStore.OpenSession())
            {
                session.Store(sponsor);
                session.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.Created);
            }
        }
    }
}
