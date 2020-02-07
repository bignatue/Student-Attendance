using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StudentDataAccess;

namespace StudentService.Controllers
{
    public class TestController : ApiController
    {
        public HttpResponseMessage Get(string course = "All")
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                switch (course.ToLower())
                {
                    case "all":
                        return Request.CreateResponse(HttpStatusCode.OK,
                            entities.TestTables.ToList());
                    case "se":
                        return Request.CreateResponse(HttpStatusCode.OK,
                            entities.TestTables.Where(s => s.Course.ToLower() == "se").ToList());
                    case "dba":
                        return Request.CreateResponse(HttpStatusCode.OK,
                            entities.TestTables.Where(s => s.Course.ToLower() == "dba").ToList());
                    default:
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest,
                            "Value for course must be All, SE or DBA." + course + " is invalid");
                }
            }
        }
    }
}


        