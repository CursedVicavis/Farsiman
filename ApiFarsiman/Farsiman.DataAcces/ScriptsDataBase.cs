using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace Farsiman.DataAccess
{
    public class ScriptsDataBase
    {

        #region Acceso

        #region Usuarios
        public static string ListarUsuarios = "Acce.UDP_tbUsuarios_Listar";
        public static string InsertarUsuarios = "acce.UDP_tbUsuarios_Insertar";
        public static string EditarUsuarios = "acce.UDP_tbUsuarios_Editar";
        public static string EliminarUsuarios = "acce.UDP_tbUsuarios_Eliminar";

        #endregion

        #region Pantallas
        public static string ListarPantallas = "Acce.UDP_tbPantallas_Listar";
        #endregion

        #region Roles
        public static string ListarRoles = "Acce.UDP_tbRoles_Listar";
        public static string InsertarRoles = "Acce.UDP_tbRoles_Insertar";
        public static string EditarRoles = "Acce.UDP_tbRoles_Editar";
        public static string EliminarRoles = "Acce.UDP_tbRoles_Eliminar";
        #endregion

        #region RolesXPantallas
        public static string PantallasPorRol = "Acce.UDP_tbRolesXPantallas_Listar";
        public static string InsertarRolesXPantallas = "Acce.UDP_tbRolesXPantallas_Insertar";
        public static string EditarRolesXPantallas = "Acce.UDP_tbRolesXPantallas_Editar";
        public static string EliminarRolesXPantallas = "Acce.UDP_tbRolesXPantallas_Eliminar";
        public static string DibujarMenuRolesXPantallas = "Acce.UDP_RolesPorPantalla_DibujadoMenu";
        public static string DibujadoMenu = "Acce.UDP_RolesPorPantalla_DibujarMenu";
        #endregion

        #region Login
        public static string IniciarSesion = "Acce.UDP_IniciarSesion";
        #endregion

        #endregion
        #region Bodegas
        public static string listarSalida = "Bode.UDP_tbSalidas_Listar";
        public static string listarSalidaDetalle = "Bode.UDP_tbSalidasDetalles_Listar ";
        public static string listarSucursales= "Bode.UDP_tbSucursale_Listar";
        public static string listarProductoDDL= "Bode.UDP_tbProducto_DDL";
        public static string RevisionStock = "Bode.UDP_tbLotes_RevisaStock";
        public static string InsertarSalida = "Bode.UDP_tbSalida_Crear";
        public static string InsertarSalidaDetale = "Bode.UDP_tbSalidaDetalles_Crear";
        public static string AceptarSalida = "Bode.UDP_tbSalida_AceptarSalida";
        public static string ListroFiltroSalida = "Bode.UDP_tbSalida_Filtrar";
        #endregion
    }
}

