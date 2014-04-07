using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Flipboard.Startup))]
namespace Flipboard
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
