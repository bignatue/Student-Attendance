using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentService.Models
{
    public class Test01
    {
        public class User
        {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }

        public class Member
        {
            public int MemberId { get; set; }
            public List<User> Users { get; set; }
        }
    }
}