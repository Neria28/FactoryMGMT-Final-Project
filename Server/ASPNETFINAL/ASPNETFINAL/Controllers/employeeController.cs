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

    public class employeeController : ApiController
    {
        private static employeeBL bl = new employeeBL();
        // GET: api/employee
        public IEnumerable<employeeWithShifts> Get()
        {
            return bl.GetEmployees();
        }


        [Route("api/employee/{id}")]
        public employee Get(int id)
        {
            return bl.GetEmployee(id);
        }


        //GET: api/employee/inp/by
        [Route("api/employee/search/{inp}/{by}")]
        public IEnumerable<employeeWithShifts> Get(string inp, string by)
        {
            return bl.empSearchResult(inp, by);
        }

        // POST: api/employee
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/employee/5
        [Route("api/employee/put/{id}")]
        public string Put(int id, employee obj)
        {
            bl.UpdateEmp(id, obj);
            return "updated";
        }

        // DELETE: api/employee/5
        [Route("api/employee/delete/{id}")]
        public string Delete(int id)
        {
            bl.DeleteEmpData(id);
            return "All Employee Data Has Deleted";
        }
    }
}
