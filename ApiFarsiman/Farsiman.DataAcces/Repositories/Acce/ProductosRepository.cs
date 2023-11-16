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
    public class ProductosRepository : IRepository<tbProductos>
    {
        public RequestStatus Delete(tbProductos item)
        {
            throw new NotImplementedException();
        }

        public tbProductos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbProductos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbProductos> List()
        {
            throw new NotImplementedException();
        }
        public IEnumerable<tbProductos> DDL()
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);

            return db.Query<tbProductos>(ScriptsDataBase.listarProductoDDL, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbProductos item)
        {
            throw new NotImplementedException();
        }
    }
}
