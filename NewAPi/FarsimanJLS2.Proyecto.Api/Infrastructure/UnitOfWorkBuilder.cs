
using Farsiman.Infraestructure.Core.Entity.Standard;
using FarsimanJLS2.Proyecto.Api;
using Microsoft.EntityFrameworkCore;

namespace AcademiaFS.Proyecto.Api.Infrastructure
{
    public class UnitOfWorkBuilder
    {
        readonly IServiceProvider _serviceProvider;
        public UnitOfWorkBuilder(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        public UnitOfWork builderTransporte()
        {
            DbContext dbContext = _serviceProvider.GetService<BOCE_DBContext>() ?? throw new NullReferenceException() ;
            return new UnitOfWork(dbContext);
        }
    }
}
