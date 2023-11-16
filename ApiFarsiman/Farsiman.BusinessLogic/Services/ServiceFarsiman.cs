using Farsiman.DataAcces.Repositories.Acce;
using Farsiman.Entities.Entities;
using Farsiman.BussinessLogic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Farsiman.BusinessLogic.Services
{
    public class ServiceFarsiman
    {

        private readonly UsuariosRepository _usuariosRepository;
        private readonly RolesPorPantallaRepository _rolesPorPantallaRepository;
        private readonly SalidasRepository _salidasRepository;
        private readonly SucursalesRepository _sucursalesRepository;
        private readonly ProductosRepository _productosRepository;
        public ServiceFarsiman(UsuariosRepository usuariosRepository, RolesPorPantallaRepository rolesPorPantallaRepository, SalidasRepository salidasRepository, SucursalesRepository sucursalesRepository, ProductosRepository productosRepository)
        {
            _usuariosRepository = usuariosRepository;
            _rolesPorPantallaRepository = rolesPorPantallaRepository;
            _salidasRepository = salidasRepository;
            _sucursalesRepository = sucursalesRepository;
            _productosRepository = productosRepository;
        }
        #region Usuarios
        public ServiceResult IniciarSesion(tbUsuarios item)
        {
            var resultado = new ServiceResult();
            try
            {
                var usuario = _usuariosRepository.Login(item);

                if (usuario.usua_Nombre == null)
                    return resultado.Forbidden("El usuario o contraseña son incorrectos");
                else
                    return resultado.Ok(usuario);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }
        public ServiceResult ListarUsuarios()
        {

            var resultado = new ServiceResult();

            try
            {
                var list = _usuariosRepository.List();
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }

        public IEnumerable<tbRolesXPantallas> Pantallas_Por_Rol(tbRolesXPantallas item)
        {
            try
            {
                var list = _rolesPorPantallaRepository.PantallasPorRol(item);
                return list;
            }
            catch (Exception ex)
            {

                return Enumerable.Empty<tbRolesXPantallas>();
            }
        }


        #endregion
        #region Salidas
        public ServiceResult ListarSalidas()
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _salidasRepository.List();
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }
        public ServiceResult ListarSalidasFiltrado(string fechaInicio, string FechaFinal, int Sucursal)
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _salidasRepository.Filtrado(fechaInicio, FechaFinal, Sucursal);
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }
        public ServiceResult ListarSalidasDetalles(int sali_Id)
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _salidasRepository.ListDetalles(sali_Id);
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }
        public ServiceResult RevisionStock(int cantidad, string prod_Descripcion)
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _salidasRepository.RevisionStock(cantidad, prod_Descripcion);
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }
        public ServiceResult InsertarSalida(tbSalidas Item)
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _salidasRepository.Insert(Item);
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }

        public ServiceResult InsertarSalidaDetalles(tbSalidasDetalles Item)
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _salidasRepository.InsertDetalles(Item);
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }
        public ServiceResult AceptarSalida(tbSalidas Item)
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _salidasRepository.Update(Item);
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }




        #endregion
        #region Sucursales

        public ServiceResult ListarSucursale()
        {

            var resultado = new ServiceResult();

            try
            {
                var list = _sucursalesRepository.List();
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }

        #endregion
        #region Productos

        public ServiceResult ListarProdcutosDDL()
        {

            var resultado = new ServiceResult();

            try
            {
                var list = _productosRepository.DDL();
                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }

        }

        #endregion
    }
}
