using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StudentDataAccess;

namespace StudentService.Controllers
{
    public class FilterStdntMarkController : ApiController
    {
        public HttpResponseMessage Get(string course ="All")
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                switch (course.ToLower())
                {
                    case "all":
                        return Request.CreateResponse(HttpStatusCode.OK,
                            entities.StdntMarks.ToList());
                    case "se":
                        return Request.CreateResponse(HttpStatusCode.OK,
                            entities.StdntMarks.Where(s => s.Course.ToLower() == "se").ToList());
                    case "dba":
                        return Request.CreateResponse(HttpStatusCode.OK,
                            entities.StdntMarks.Where(s => s.Course.ToLower() == "dba").ToList());
                    default:
                        return Request.CreateResponse(HttpStatusCode.OK,
                            entities.StdntMarks.ToList());
                }
            }
        }
    }
}
