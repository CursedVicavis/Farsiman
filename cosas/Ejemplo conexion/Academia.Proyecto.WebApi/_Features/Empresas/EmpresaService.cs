using Academia.Proyecto.WebApi._Features.Empresas.Entities;
using Academia.Proyecto.WebApi.Infrastructure.Logistic;
using AutoMapper;

namespace Academia.Proyecto.WebApi._Features.Empresas
{
    public class EmpresaService
    {
        //private readonly LogisticDbContext _logisticDbContext;
        //private readonly IMapper _mapper;

        //public EmpresaService(LogisticDbContext logisticDbContext, IMapper mapper)
        //{
        //    _logisticDbContext = logisticDbContext; 
        //    _mapper = mapper;
        //}
        public EmpresaService()
        {
            
        }

        public List<Empresa> ObtenerEmpresas()
        {
            var empresas = new List<Empresa>
        {
            new Empresa { Id = 1, Nombre = "GFS" },
            new Empresa { Id = 2, Nombre = "SFS" },
            new Empresa { Id = 3, Nombre = "DSS" }
            
        };
            return empresas;
        }
    }
}
