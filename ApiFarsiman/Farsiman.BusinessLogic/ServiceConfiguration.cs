
using Farsiman.BusinessLogic.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Farsiman.DataAcces.Repositories.Acce;
using Farsiman.Entities.Entities;

namespace Farsiman.BussinessLogic
{
    public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection services, string connection)
        {
            DataAcces.Farsiman.BuildConnectionString(connection);
                
            services.AddScoped<UsuariosRepository>();
            services.AddScoped<RolesPorPantallaRepository>();
            services.AddScoped<SalidasRepository>();
            services.AddScoped<SucursalesRepository>();
            services.AddScoped<ProductosRepository>();
        }


        public static void BussinessLogic(this IServiceCollection services)
        {
            services.AddScoped<ServiceFarsiman>();
        }
    }
}
