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
    public class SalidasRepository : IRepository<tbSalidas>
    {
        public RequestStatus Delete(tbSalidas item)
        {
            throw new NotImplementedException();
        }

        public tbSalidas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbSalidas item)
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);
            RequestStatus result = new RequestStatus();

            var parametros = new DynamicParameters();

            parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioCreacion", item.usua_UsuarioCreacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.InsertarSalida, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;

        }
        public RequestStatus InsertDetalles(tbSalidasDetalles item)
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);
            RequestStatus result = new RequestStatus();

            var parametros = new DynamicParameters();

            parametros.Add("@sali_Id", item.sali_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@prod_Id", item.prod_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@sade_Cantidad", item.sade_Cantidad, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.InsertarSalidaDetale, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;

        }

        public IEnumerable<tbSalidas> List()
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);

            return db.Query<tbSalidas>(ScriptsDataBase.listarSalida, null, commandType: CommandType.StoredProcedure);

        }
        public IEnumerable<tbSalidas> Filtrado(string fechaInicio, string FechaFinal,int Sucursal )
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@fechaInicio", fechaInicio, DbType.String, ParameterDirection.Input);
            parametros.Add("@FechaFinal", FechaFinal, DbType.String, ParameterDirection.Input);
            parametros.Add("@Sucursal", Sucursal, DbType.Int32, ParameterDirection.Input);
            return db.Query<tbSalidas>(ScriptsDataBase.ListroFiltroSalida, parametros, commandType: CommandType.StoredProcedure);

        }
        public IEnumerable<tbSalidasDetalles> ListDetalles(int sali_Id)
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@sali_Id", sali_Id, DbType.Int32, ParameterDirection.Input);

            return db.Query<tbSalidasDetalles>(ScriptsDataBase.listarSalidaDetalle, parametros, commandType: CommandType.StoredProcedure);

        }
        public IEnumerable<tbSalidas> RevisionStock(int cantidad, string prod_Descripcion)
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@cantidad", cantidad, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@prod_Descripcion", prod_Descripcion, DbType.String, ParameterDirection.Input);

            return db.Query<tbSalidas>(ScriptsDataBase.RevisionStock, parametros, commandType: CommandType.StoredProcedure);

        }


        public RequestStatus Update(tbSalidas item)
        {
            using var db = new SqlConnection(Farsiman.ConnectionString);
            RequestStatus result = new RequestStatus();

            var parametros = new DynamicParameters();

            parametros.Add("@sali_Id", item.sali_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_UsuarioModificacion", item.usua_UsuarioModificacion, DbType.Int32, ParameterDirection.Input);

            var answer = db.QueryFirst<string>(ScriptsDataBase.AceptarSalida, parametros, commandType: CommandType.StoredProcedure);
            result.MessageStatus = answer;
            return result;
        }
    }
}
