using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASPNETFINAL.Models
{
    public class loginBL
    {
        private neriasLabDBEntities db = new neriasLabDBEntities();
        public user VerifyUser(user usr)
        {
            var res = db.users.Where(x => x.userName == usr.userName && x.password == usr.password);
            if (res.Count() == 1)
            {
                DateTime localDate = DateTime.Now;

                var userLog = db.userLogs.Where(x => x.userID == res.FirstOrDefault().id);
                if (userLog.Count() == 1)
                {
                    if(userLog.FirstOrDefault().enterDate.ToShortDateString() != localDate.ToShortDateString())
                    {
                        userLog.FirstOrDefault().enterDate = localDate;
                        userLog.FirstOrDefault().actions = 0;
                        db.SaveChanges();
                    }
                }
                else
                {
                    userLog newLog = new userLog();
                    newLog.userID = res.FirstOrDefault().id;
                    newLog.enterDate = localDate;
                    db.userLogs.Add(newLog);
                    db.SaveChanges();
                }
                return res.First();
            }
            else
            {
                return null;
            }
        }

        public user GetUser(int id)
        {
            return db.users.Where(x => x.id == id).First();
        }
    }
}