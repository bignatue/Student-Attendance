using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using StudentDataAccess;

namespace StudentService
{
    public class StudentSecurity
    {
        public static bool Login(string username, string password)
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                return entities.Users.Any(user => user.Username.Equals(username,
                    StringComparison.OrdinalIgnoreCase) && user.Password == password);
            }
        }
    }
}