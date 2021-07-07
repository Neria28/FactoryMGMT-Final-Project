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


    public class shiftController : ApiController
    {
        shiftBl bl = new shiftBl();

        // GET: api/shift
        [Route("api/shift")]
        public List<shift> Get()
        {
            return bl.GetShifts();

        }

        // GET: api/shift/5
        [Route("api/shift/all")]
        public IEnumerable<shiftWithEmployees> GetAll()
        {
            return bl.getAllShifts();
        }

        // POST: api/shift
        [Route("api/shift")]
        public string Post(employeeShift shift)
        {
            bl.addShiftToEmp(shift);
            return "Shift has added to employee";
        }

        [Route("api/shift/post")]
        public string Post(shift shift)
        {
            bl.addShift(shift);
            return "Shift Created";
        }
    }
}
