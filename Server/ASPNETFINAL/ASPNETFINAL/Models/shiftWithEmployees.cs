using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASPNETFINAL.Models
{
    public class shiftWithEmployees
    {
        public int id { get; set; }
        public System.DateTime date { get; set; }
        public System.TimeSpan startTime { get; set; }
        public System.TimeSpan endTime { get; set; }

        public List<employee> empList { get; set; }
    }
}