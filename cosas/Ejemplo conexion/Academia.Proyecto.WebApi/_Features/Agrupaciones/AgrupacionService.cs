using Academia.Proyecto.WebApi._Features.Agrupaciones.Entities;

namespace Academia.Proyecto.WebApi._Features.Agrupaciones
{
    public class AgrupacionService
    {
        public AgrupacionService()
        {

        }

        public string Agrupacion(Agrupacion agrupacion)
        {
            string[] nombres = [];
            var grupos = agrupacion.grupo;

            if (agrupacion.personas != null) {
                nombres = agrupacion.personas.ToArray();
            }

            var gruposOrdenados = string.Empty;
            for (int e = 0; e < nombres.Length; e++)
            {
                if (e == 0) gruposOrdenados += ($"\n-------- GRUPO {1} ------------");
                else
                {
                    if (grupos % (e) == 0 && e != 1)
                    {
                        gruposOrdenados += ($"\n-------- GRUPO {e} ------------");
                    }
                }

                gruposOrdenados += ("\n" + nombres[e]);
            }
            return gruposOrdenados;
        }

    }
}
