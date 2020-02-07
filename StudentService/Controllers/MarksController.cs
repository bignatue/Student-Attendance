using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StudentDataAccess;

namespace StudentService.Controllers
{
    public class MarksController : ApiController
    {
        [Authorize]
        public IEnumerable<Mark> Get()
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                return entities.Marks.ToList();
            }
        }

        // Get Method
        public HttpResponseMessage Get(int id)
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                var entity = entities.Marks.FirstOrDefault(s => s.Id == id);
                if (entity != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Student with Id = " + id.ToString() + " not found");
                }
            }
        }

        // Post Method
        public HttpResponseMessage Post([FromBody]Mark mark)
        {
            try
            {
                using (CBCSchoolEntities entities = new CBCSchoolEntities())
                {
                    entities.Marks.Add(mark);
                    entities.SaveChanges();

                    var message = Request.CreateResponse(HttpStatusCode.Created, mark);
                    message.Headers.Location = new Uri(Request.RequestUri + mark.Id.ToString());
                    return message;
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // Delete Method
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (CBCSchoolEntities entities = new CBCSchoolEntities())
                {
                    var entity = entities.Marks.FirstOrDefault(s => s.Id == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Student with Id = " + id.ToString() + " not found to delete");
                    }
                    else
                    {
                        entities.Marks.Remove(entity);
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // Put Method
        public HttpResponseMessage Put(int id, [FromBody]Mark mark)
        {
            try
            {
                using (CBCSchoolEntities entities = new CBCSchoolEntities())
                {
                    var entity = entities.Marks.FirstOrDefault(s => s.Id == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Student with Id = " + id.ToString() + " not found to update");
                    }
                    else
                    {
                        entity.StdntId = mark.StdntId;
                        entity.StdntName = mark.StdntName;
                        entity.Course = mark.Course;
                        entity.Date = mark.Date;
                        entity.Status = mark.Status;

                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, entity);
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
