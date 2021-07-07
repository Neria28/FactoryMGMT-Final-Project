using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using ASPNETFINAL.Models;


using System.Web.Http.Cors;

namespace ASPNETFINAL.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class loginController : ApiController
    {
        loginBL bl = new loginBL();
        // GET: api/login/5
        public user Get(int id)
        {
            return bl.GetUser(id);
        }

        // POST: api/login
        public user Post(user usr)
        {
            return bl.VerifyUser(usr);
        }

        // PUT: api/login/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/login/5
        public void Delete(int id)
        {

        }


    }
}
