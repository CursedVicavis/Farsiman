using Dapper;
using Farsiman.Entities.Entities;
using Microsoft.Data.SqlClient;
using Farsiman.DataAccess;
using Farsiman.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Farsiman.DataAcces.Repositories.Acce
{
    public class UsuariosRepository : IRepository<tbUsuarios>
    {
        public tbUsuarios Login(tbUsuarios item)
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@usua_Nombre", item.usua_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_Contrasenia", item.usua_Contrasenia, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<tbUsuarios>(ScriptsDataBase.IniciarSesion, parametros, commandType: CommandType.StoredProcedure);
            return resultado;
        }

        public RequestStatus Delete(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        tbUsuarios IRepository<tbUsuarios>.Find(int? id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<tbUsuarios> IRepository<tbUsuarios>.List()
        {
            throw new NotImplementedException();
        }
        public IEnumerable<tbUsuarios> List()
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);

            return db.Query<tbUsuarios>(ScriptsDataBase.ListarUsuarios, null, commandType: CommandType.StoredProcedure);
        }
    }
}
