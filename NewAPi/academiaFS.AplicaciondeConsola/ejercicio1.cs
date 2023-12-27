using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace academiaFS.AplicaciondeConsola
{
    internal class ejercicio1
    {
        public void menu()
        {
            Console.Clear();
            Console.ReadLine();
            ejercicio1 ejec = new ejercicio1();

            int opcion = 0;

            Console.WriteLine("Seleccione una opcion");
            Console.WriteLine("1) = Cadena de texto");
            Console.WriteLine("2) = Registro de estudiantes");
            Console.WriteLine("3) = Calcular Nota");
            opcion = int.Parse(Console.ReadLine());

            switch (opcion)
            {
                case 1:
                    ejec.Cadenadetexto();
                    break;
                case 2:
                    ejec.Registrarestudiantes();
                    break;
                case 3:
                    ejec.calificacion();
                    break;
                default: 
                    ejec.menu();
                break;
            }
        }
        public void Cadenadetexto()
        {
            Console.Clear();
            string cadena;
            int cantidad = 0;
            int cantidadPalabras = 1;
            string cadenaAlrevez = "";
            string primer = "";
            string texAuxiliar = "";
            string ultima = "";
            string otro = "";
            Console.WriteLine("Ingrese una cadena de texto");
            cadena = Console.ReadLine();

            for (int i = 0; i < cadena.Length; i++)
            {
                if (cadena[i] != ' ')
                {
                    otro += cadena[i].ToString();
                }
                else if (cadena[i - 1] != ' ')
                {
                    otro += " ";
                }
            }
            for (int i = 0; i < otro.Length; i++)
            {
                cantidad++;
                if (otro[i] == ' ')
                {
                    cantidadPalabras++;
                }
            }
            Console.WriteLine(otro);


            for (int i = cadena.Length; i > 0; i--)
            {
                cadenaAlrevez += cadena[i - 1].ToString();
            }
            for (int i = 0; i < cadena.Length; i++)
            {
                if (cadena[i] != ' ')
                {
                    primer += cadena[i].ToString();
                }
                else
                {
                    i = cadena.Length;
                }
            }

            for (int i = cadena.Length - 1; i > 0; i--)
            {
                if (cadena[i] != ' ')
                {
                    texAuxiliar += cadena[i].ToString();
                }
                else
                {
                    i = 0;
                    for (int j = texAuxiliar.Length; j > 0; j--)
                    {
                        ultima += texAuxiliar[j - 1].ToString();
                    }
                }
            }

            Console.WriteLine($"La cadena es: {cadena}");
            Console.WriteLine($"La cantidad de texto es: {cantidad}");
            Console.WriteLine($"La cantidad de palabras es: {cantidadPalabras}");
            Console.WriteLine($"La cadena alrevez es: {cadenaAlrevez}");
            Console.WriteLine($"La primera palabra es: {primer.ToUpper()}");
            Console.WriteLine($"La ultima palabra es: {ultima.ToUpper()}");
        }

        public void Registrarestudiantes()
        {
            Console.Clear();
            ejercicio1 ejec = new ejercicio1();
            string nombre;
            int edad = 0;
            int promedio;
            int notas;
            List<Estudiante> we = new List<Estudiante>();
            for (int i = 0; i < 1; i++)
            {
                Console.WriteLine("Ingrese un estudiante");
                nombre = Console.ReadLine();
                Console.WriteLine("Ingrese la Edad");
                edad = int.Parse(Console.ReadLine());
                Console.WriteLine("Ingrese el promedio");
                promedio = int.Parse(Console.ReadLine());
                Console.WriteLine("Ingrese la nota");
                notas = int.Parse(Console.ReadLine());

                we.Add(new Estudiante() { Nombre = nombre, Edad = edad, Promedio = promedio, Notas = notas });
                Console.Clear();
            }
            edad = 0;
            Console.WriteLine("Estudiantes");
            for (int i = 0; i < we.Count; i++)
            {
                Console.WriteLine($"Nombre {we[i].Nombre}, Edad {we[i].Edad}, Promedio {we[i].Promedio}");
                edad += we[i].Edad;
            }
            edad /= we.Count;
            Console.WriteLine($" Promedio de edad: {edad}");
            Console.Read();
            Console.Clear();
            Console.Read();
            string afirmacion;
            Console.WriteLine("Quiere buscar un estudiante (S/N)");
            afirmacion = Console.ReadLine();
            if (afirmacion.ToUpper() == "S")
            {
                Console.Clear();

                string estudiante;
                Console.WriteLine("Ingrese el estudiante que quiere buscar");
                estudiante = Console.ReadLine();
                for (int i = 0; i < we.Count; i++)
                {
                    if (we[i].Nombre == estudiante)
                    {
                        Console.WriteLine($"Se encontro el estudiante: {estudiante}, Edad: {we[i].Edad}, Promedio: {we[i].Promedio}");
                    }                   
                }
            }
            Console.ReadLine();
            ejec.menu();
        }
        public void calificacion()
        {
            Console.Clear();
            ejercicio1 ejec = new ejercicio1();
            int nota;
            Console.WriteLine("Ingrese una nota");
            nota = int.Parse(Console.ReadLine());
            if (nota >= 70)
            {
                Console.WriteLine("Aprobado");
            }
            else {
                Console.WriteLine("Desaprobado");
            }
            Console.Read();
            ejec.menu();

        }
    }
}
