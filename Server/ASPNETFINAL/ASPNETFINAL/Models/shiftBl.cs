using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASPNETFINAL.Models
{
    public class shiftBl
    {
        neriasLabDBEntities db = new neriasLabDBEntities();

        public List<shift> GetShifts()
        {
            return db.shifts.ToList();
        }

        public IEnumerable<shiftWithEmployees> getAllShifts()
        {
            List<shiftWithEmployees> shiftList = new List<shiftWithEmployees>();
            foreach (var s in db.shifts)
            {
                shiftWithEmployees shift = new shiftWithEmployees();
                shift.id = s.id;
                shift.date = s.date;
                shift.startTime = s.startTime;
                shift.endTime = s.endTime;
                shift.empList = new List<employee>();
                foreach (var emp in db.employeeShifts.Where(x => x.shiftID == s.id))
                {
                    var currntEmp = db.employees.Where(e => e.id == emp.employeeID).First();
                    shift.empList.Add(currntEmp);
                }
                shiftList.Add(shift);
            }
            return shiftList;
        }

        public void addShiftToEmp(employeeShift shift)
        {
            db.employeeShifts.Add(shift);
            db.SaveChanges();
        }

        public void addShift(shift shift)
        {
            db.shifts.Add(shift);
            db.SaveChanges();
        }
    }

}