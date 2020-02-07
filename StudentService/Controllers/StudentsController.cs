using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StudentDataAccess;

namespace StudentService.Controllers
{
    public class StudentsController : ApiController
    {
        [Authorize]
        public IEnumerable<Student> Get()
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                return entities.Students.ToList();
            }
        }

        // Get Method
        public HttpResponseMessage Get(int id)
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                var entity = entities.Students.FirstOrDefault(s => s.Id == id);
                if(entity != null)
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
        public HttpResponseMessage Post([FromBody]Student student)
        {
            try
            {
                using (CBCSchoolEntities entities = new CBCSchoolEntities())
                {
                    entities.Students.Add(student);
                    entities.SaveChanges();

                    var message = Request.CreateResponse(HttpStatusCode.Created, student);
                    message.Headers.Location = new Uri(Request.RequestUri + student.Id.ToString());
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
                    var entity = entities.Students.FirstOrDefault(s => s.Id == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Student with Id = " + id.ToString() + " not found to delete");
                    }
                    else
                    {
                        entities.Students.Remove(entity);
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
        public HttpResponseMessage Put(int id, [FromBody]Student student)
        {
            try
            {
                using (CBCSchoolEntities entities = new CBCSchoolEntities())
                {
                    var entity = entities.Students.FirstOrDefault(s => s.Id == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Student with ID = " + id.ToString() + " not found to update");
                    }
                    else
                    {
                        entity.FirstName = student.FirstName;
                        entity.LastName = student.LastName;
                        entity.Gender = student.Gender;
                        entity.Course = student.Course;

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
