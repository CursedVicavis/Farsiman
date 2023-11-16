using AutoMapper;
using Farsiman.API.Modelos;
using Farsiman.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SIMEXPRO.API.Extentions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            #region Acceso
            CreateMap<UsuariosViewModel, tbUsuarios>().ReverseMap();
            CreateMap<RolesXPantallasViewModel, tbRolesXPantallas>().ReverseMap();
            CreateMap<SalidasViewModel, tbSalidas>().ReverseMap();
            CreateMap<SalidasDetallesViewModel,tbSalidasDetalles>().ReverseMap();
            CreateMap<SucursaleViewModel, tbSucursale>().ReverseMap();
            CreateMap<ProductosViewModel, tbProductos>().ReverseMap();
            #endregion
        }
    }
}
