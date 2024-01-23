using Crud.WebApi.Infraestructure.CrudDB;
using Farsiman.Infraestructure.Core.Entity.Standard;
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
            DbContext dbContext = _serviceProvider.GetService<CrudTestingJLContext>() ?? throw new NullReferenceException() ;
            return new UnitOfWork(dbContext);
        }
    }
}
