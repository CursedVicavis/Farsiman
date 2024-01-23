using Academia.Proyecto.WebApi._Features.Estudiantes.Entities;

namespace Academia.Proyecto.WebApi._Features.Estudiantes
{
    public class EstidianteService
    {

        public EstidianteService()
        {

        }

       public string BuscarEstudiantes(List<Estudiante> estudiantes, string nombre) 
       { 
            string estudianteEncontrado = string.Empty;

            foreach (var item in estudiantes)
            {
                if (item.Nombre?.ToUpper() == nombre.ToUpper())
                {
                    estudianteEncontrado += $"----- Coincidencia Encontrada -------\n";
                    estudianteEncontrado += $"Nombre: {item.Nombre}\n";
                    estudianteEncontrado += $"Edad: {item.Edad}\n";
                    estudianteEncontrado += $"Promedio: {item.Promedio}\n";
                }
            }
            
            return $"{estudianteEncontrado} {PromedioEstudiantes(estudiantes)}";
       }


        public string PromedioEstudiantes(List<Estudiante> estudiantes)
        {
            string calificacionesEstudiantes = "\n-------- Promedio -------\n";

            foreach(var item in estudiantes)
            {
               
                if(item.Promedio > 70) {
                    calificacionesEstudiantes += $"{item.Nombre} Estas Aprovado!!\n";
                }
                else if (item.Promedio < 0) {
                    calificacionesEstudiantes += $"{item.Nombre} Tu promedio no es Valido!!\n";
                }
                else {
                    calificacionesEstudiantes += $"{item.Nombre} Estas Reprovado!!\n";
                }
            }

            return calificacionesEstudiantes;
        }
    }
}
