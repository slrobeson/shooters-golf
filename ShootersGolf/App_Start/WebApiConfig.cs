using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace ShootersGolf
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            ConfigureFormatter(config);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        private static void ConfigureFormatter(HttpConfiguration config)
        {
            // Remove xml formatters
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            // Add json formatters with camel casing
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
