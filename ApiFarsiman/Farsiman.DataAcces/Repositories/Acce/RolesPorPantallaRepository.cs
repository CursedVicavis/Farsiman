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
    public class RolesPorPantallaRepository : IRepository<tbRolesXPantallas>
    {
        public IEnumerable<tbRolesXPantallas> PantallasPorRol(tbRolesXPantallas item)
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", item.role_Id, DbType.String, ParameterDirection.Input);
            return db.Query<tbRolesXPantallas>(ScriptsDataBase.PantallasPorRol, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Delete(tbRolesXPantallas item)
        {
            throw new NotImplementedException();
        }

        public tbRolesXPantallas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRolesXPantallas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbRolesXPantallas> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbRolesXPantallas item)
        {
            throw new NotImplementedException();
        }
    }
}
