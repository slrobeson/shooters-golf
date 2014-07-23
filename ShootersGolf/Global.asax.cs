using System;
using System.Web.Http;
using Raven.Client;
using Raven.Client.Embedded;
using Raven.Client.Indexes;
using Raven.Database.Server;
using ShootersGolf.Indexes;

namespace ShootersGolf
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }

    internal static class Global
    {
        public static IDocumentStore DocumentStore
        {
            get { return documentStore.Value; }
        }

        private static readonly Lazy<IDocumentStore> documentStore = new Lazy<IDocumentStore>(() =>
        {
            var docStore = new EmbeddableDocumentStore { ConnectionStringName = "RavenDB" };
#if DEBUG
            // Host the RavenDB Studio if running in debug mode.
            docStore.UseEmbeddedHttpServer = true;
            NonAdminHttp.EnsureCanListenToWhenInNonAdminContext(8080);
#endif
            //docStore.RegisterListener(new UniqueConstraintsStoreListener());

            docStore.Initialize();

            //OPTIONAL:
            IndexCreation.CreateIndexes(typeof(PlayerCountByTeamIndex).Assembly, docStore);

            return docStore;
        });
    }
}
