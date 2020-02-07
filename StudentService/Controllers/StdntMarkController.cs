using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StudentDataAccess;

namespace StudentService.Controllers
{
    public class StdntMarkController : ApiController
    {
        [Authorize]
        public IEnumerable<StdntMark> Get()
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                return entities.StdntMarks.ToList();
            }
        }

        // Get Method
        public HttpResponseMessage Get(int id)
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                var entity = entities.StdntMarks.FirstOrDefault(s => s.Id == id);
                if (entity != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Student with ID = " + id.ToString() + " not found");
                }
            }
        }

        // Post Method
        public HttpResponseMessage Post([FromBody]StdntMark stdntMark)
        {
            try
            {
                using (CBCSchoolEntities entities = new CBCSchoolEntities())
                {
                    entities.StdntMarks.Add(stdntMark);
                    entities.SaveChanges();

                    var message = Request.CreateResponse(HttpStatusCode.Created, stdntMark);
                    message.Headers.Location = new Uri(Request.RequestUri + stdntMark.Id.ToString());
                    return message;
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
