using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace ASPNETFINAL.Models

{ 
    public class employeeBL
    {
        neriasLabDBEntities db = new neriasLabDBEntities();


        public IOrderedEnumerable<employeeWithShifts> GetEmployees()
        {
            neriasLabDBEntities db = new neriasLabDBEntities();

            List<employeeWithShifts> empsWithShiftList = new List<employeeWithShifts>();

            foreach (var emp in db.employees)
            {
                employeeWithShifts employeeWithShift = new employeeWithShifts();
                employeeWithShift.empID = emp.id;
                employeeWithShift.empfName = emp.fName;
                employeeWithShift.emplName = emp.lName;
                employeeWithShift.empStartWorkYear = emp.startWorkYear;
                employeeWithShift.departmentID = emp.departmentID;

                foreach (var dept in db.departments)
                {
                    if (dept.id == emp.departmentID)
                    {
                        employeeWithShift.departmentName = dept.name;
                    }
                }

                //Add Shift to The List
                employeeWithShift.empShift = new List<shift>();

                //Add Shift to The List
                foreach (var shift in db.employeeShifts.Where(c => c.employeeID == emp.id))
                {
                    var curntShift = db.shifts.Where(x => x.id == shift.shiftID).First();
                    employeeWithShift.empShift.Add(curntShift);
                }

                empsWithShiftList.Add(employeeWithShift);

            }
            return empsWithShiftList.OrderBy(x => x.departmentName);
        }
        public employee GetEmployee(int id)
        {
            var currentEmp = db.employees.Where(emp => emp.id == id).First();
            return currentEmp;
        }

        public IEnumerable<employeeWithShifts> empSearchResult(string inp, string by)
        {

            List<employeeWithShifts> result = new List<employeeWithShifts>();
            switch (by)
            {
                case "fname":
                    result = GetEmployees().Where(emp => emp.empfName == inp).ToList();
                    break;
                case "lname":
                    result = GetEmployees().Where(emp => emp.emplName == inp).ToList();
                    break;
                case "dept":
                    result = GetEmployees().Where(emp => emp.departmentName == inp).ToList();
                    break;
            }
            return result;
        }



        public void UpdateEmp(int id, employee obj)
        {
            var currentEmp = db.employees.Where(x => x.id == id).FirstOrDefault();
            currentEmp.id = obj.id;
            currentEmp.fName = obj.fName;
            currentEmp.lName = obj.lName;
            currentEmp.startWorkYear = obj.startWorkYear;
            currentEmp.departmentID = obj.departmentID;

            db.SaveChanges();
        }

        public void DeleteEmpData(int empID)
        {
            var empShifts = db.employeeShifts.Where(x => x.employeeID == empID);
            foreach (var s in empShifts)
            {
                db.employeeShifts.Remove(s);
            }

            var currentEmp = db.employees.Where(x => x.id == empID).First();
            db.employees.Remove(currentEmp);

            db.SaveChanges();
        }
    }
}