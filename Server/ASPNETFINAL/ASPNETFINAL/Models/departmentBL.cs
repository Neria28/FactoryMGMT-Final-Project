using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASPNETFINAL.Models
{

    public class departmentBL
    {
        neriasLabDBEntities db = new neriasLabDBEntities();

        public List<departWithEmployee> GetAll()
        {
            neriasLabDBEntities db = new neriasLabDBEntities();

            var departments = db.departments.ToList();
            var employees = db.employees.ToList();

            List<departWithEmployee> deptWithEmpsList = new List<departWithEmployee>();

            foreach (var dep in departments)
            {
                departWithEmployee depart = new departWithEmployee();
                depart.id = dep.id;
                depart.name = dep.name;
                depart.manager = dep.manager;
                depart.theresEmp = false;
                foreach (var emp in db.employees.Where(x => x.id == depart.manager))
                {
                    depart.fullName = emp.fName + ' ' + emp.lName;
                }
                foreach (var emp in employees)
                {
                    if (depart.id == emp.departmentID)
                    {
                        depart.theresEmp = true;
                    }
                }


                deptWithEmpsList.Add(depart);
            }
            return deptWithEmpsList;
        }

        public void CreateDept(department dept)
        {
            db.departments.Add(dept);

            db.SaveChanges();
        }



        public void UpdateDepartment(int id, department dept)
        {
            department currentDept = db.departments.Where(x => x.id == id).First();

            if(dept.name == null)
            {
                currentDept.name = currentDept.name;
                currentDept.manager = dept.manager;
            }
            else
            {
                currentDept.name = dept.name;
                currentDept.manager = dept.manager;
            }
            db.SaveChanges();

        }



        public void DeleteDepartment(int departID)
        {
            var currentDept = db.departments.Where(x => x.id == departID).First();
            db.departments.Remove(currentDept);

            db.SaveChanges();

        }
    }
}