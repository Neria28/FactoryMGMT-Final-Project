using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASPNETFINAL.Models
{
    public class employeeWithShifts
    {
        public int empID { get; set; }
        public string empfName { get; set; }
        public string emplName { get; set; }
        public int empStartWorkYear { get; set; }
        public int departmentID { get; set; }
        public string departmentName { get; set; }
        public List<shift> empShift { get; set; }

    }
}
