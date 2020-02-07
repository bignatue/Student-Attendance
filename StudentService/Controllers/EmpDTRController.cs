using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StudentDataAccess;

namespace StudentService.Controllers
{
    public class EmpDTRController : ApiController
    {
        [Authorize]
        public IEnumerable<EmpDailyTimeRecord> Get()
        {
            using (CBCSchoolEntities entities = new CBCSchoolEntities())
            {
                return entities.EmpDailyTimeRecords.ToList();
            }
        }
    }
}
