using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASPNETFINAL.Models
{


    public class departWithEmployee
    {
        public int id { get; set; }
        public string name { get; set; }
        public int manager { get; set; }

        public bool theresEmp { get; set; }
        public string fullName { get; set; }
    }
}