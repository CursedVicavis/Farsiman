using Dapper;
using Farsiman.DataAccess;
using Farsiman.DataAccess.Repositories;
using Farsiman.Entities.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Farsiman.DataAcces.Repositories.Acce
{
    public class SucursalesRepository : IRepository<tbSucursale>
    {
        public RequestStatus Delete(tbSucursale item)
        {
            throw new NotImplementedException();
        }

        public tbSucursale Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbSucursale item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbSucursale> List()
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);

            return db.Query<tbSucursale>(ScriptsDataBase.listarSucursales, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbSucursale item)
        {
            throw new NotImplementedException();
        }
    }
}
