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

    public class departmentController : ApiController
    {
        private static departmentBL bl = new departmentBL();

        // GET: api/department
        public IEnumerable<departWithEmployee> Get()
        {
            return bl.GetAll();
        }

        // GET: api/department/5
        //public bool Get(int deptID)
        //{
        //    return bl.CheckIfEmpOnDept(deptID);
        //}


        // POST: api/department
        public string Post(department dept)
        {
            bl.CreateDept(dept);
            return "Department has created";
        }

        // PUT: api/department/5
        public string Put(int id, department dept)
        {
            bl.UpdateDepartment(id, dept);
            return "updated";
        }

        // DELETE: api/department/5
        public string Delete(int id)
        {
            bl.DeleteDepartment(id);
            return "Department has been deleted.";
        }
    }
}
