using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Academia.Sistema.Desktop.Utility
{
    public static class Helpers
    {
        public static string GetApiRoute(this Enum value)
        {
            //int empresaId = Properties.Settings.Default.EmpresaId
            Type type = value.GetType();
            FieldInfo fieldInfo = type.GetField(value.ToString());

            RutaAttribute[] attribs = fieldInfo.GetCustomAttributes(
            typeof(RutaAttribute), false) as RutaAttribute[];
            return attribs.Length > 0 ? attribs[0].Ruta : null;
        }
    }
}
