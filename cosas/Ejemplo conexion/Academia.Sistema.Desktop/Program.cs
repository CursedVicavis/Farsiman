using Academia.Sistema.Desktop._Login;
using Academia.Sistema.Desktop.Modulos.Sucursales;
using Academia.Sistema.Desktop.Modulos.Sucursales._Models;
using Academia.Sistema.Desktop.Modulos.Usuarios;

UsuariosService usuarios = new();

Console.WriteLine("Bienvenido"); 

// Simulamos un usuario y contraseña para el login

var inicio = await usuarios.Login();
if (inicio)
{
    Console.WriteLine("Login exitoso\n");

    // Menú principal después del login
    while (true)
    {
        Console.WriteLine("Menú Principal:");
        Console.WriteLine("3. Usuarios");
        Console.WriteLine("4. Salir");

        string opcionPrincipal = Console.ReadLine();

        switch (opcionPrincipal)
        {
            case "3":// Menú de Sucursales
                while (true)
                {
                    Console.WriteLine("\nMenú Sucursales:");
                    Console.WriteLine("1. Ver Usuarios");
                    Console.WriteLine("2. Agregar Usuarios");
                    Console.WriteLine("3. Regresar");

                    string opcionUsuarios = Console.ReadLine();

                    switch (opcionUsuarios)
                    {
                        case "1":
                            await usuarios.ObtenerUsuarios();
                            break;
                        case "2":
                             await usuarios.AgregarUsuario();;
                            break;
                        case "3":
                            // Regresar al menú principal
                            break;
                        default:
                            Console.WriteLine("Opción no válida. Intente de nuevo.");
                            break;
                    }

                    if (opcionUsuarios == "2")
                        break; // Salir del bucle de Menú Empresas
                }
                break;
            case "4":
                // Salir del bucle de Menú Empresas
                break;
            default:
                Console.WriteLine("Opción no válida. Intente de nuevo.");
                break;
        }
    }
}
else
{
    Console.WriteLine("Usuario o contraseña incorrectos. Saliendo del programa.");
}





