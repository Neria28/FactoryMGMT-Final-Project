using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ASPNETFINAL.Models;


namespace ASPNETFINAL.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class logsController : ApiController
    {
        logsBL bl = new logsBL();
        // GET: api/logs/5
        public bool Get(int id)
        {
            return bl.checkLogs(id);
        }

        // POST: api/logs
        [Route("api/logs/addaction/{id}")]
        public void Put(int id, userLog usr)
        {
            bl.addActions(id, usr);
        }



    }
}
