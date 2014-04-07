using System.Web;
using System.Web.Optimization;

namespace Flipboard
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/lib/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/lib/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/lib/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/lib/bootstrap.js",
                      "~/Scripts/lib/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/paperlessreport.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/metro-bootstrap.css",
                      //"~/Content/font-awesome-4.0.3/fonts/fontawesome-webfont.eot",
                      //"~/Content/font-awesome-4.0.3/fonts/fontawesome-webfont.svg",
                      //"~/Content/font-awesome-4.0.3/fonts/fontawesome-webfont.ttf",
                      //"~/Content/font-awesome-4.0.3/fonts/fontawesome-webfont.woff",
                      //"~/Content/font-awesome-4.0.3/fonts/FontAwesome.otf",
                      "~/Content/font-awesome-4.0.3/css/font-awesome.css",
                      "~/Content/site.css"));
        }
    }
}
