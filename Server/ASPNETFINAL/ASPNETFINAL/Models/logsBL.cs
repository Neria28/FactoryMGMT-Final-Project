using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASPNETFINAL.Models
{
    public class logsBL
    {
        private neriasLabDBEntities db = new neriasLabDBEntities();

        public void addActions(int userID , userLog usr)
        {
            var currntUserLog = db.userLogs.Where(x => x.userID == userID).First();
            currntUserLog.actions++;
            db.SaveChanges();
        }

        public bool checkLogs(int userID)
        {
            var currentUserLog = db.userLogs.Where(x => x.userID == userID).First();
            var currentUser = db.users.Where(x => x.id == userID).First();
            if(currentUserLog.actions >= currentUser.numOfActions)
            {
                return true;
            }
            return false;
        }
    }
}