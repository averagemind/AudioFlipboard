using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Flipboard.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Group()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Drilldown()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}