using Academia.Proyecto.WebApi.Infrastructure.Logistic;
using AutoMapper;
using Microsoft.AspNetCore.Identity.Data;

namespace Academia.Proyecto.WebApi._Features.Calculadora
{
    public class CalculadoraService
    {

        //private readonly LogisticDbContext _logisticDbContext;
        ///private readonly IMapper _mapper;

        public CalculadoraService()
        {
           // _logisticDbContext = logisticDbContext;
            //_mapper = mapper;
        }

        public string Suma(int numero1, int numero2) 
        {
            return $"{numero1} + {numero2} =  {numero1 + numero2}";
        }

        public string Resta(int numero1, int numero2)
        {
            return $"{numero1} - {numero2} =  {numero1 - numero2}";
        }

        public string Multiplicacion(int numero1, int numero2)
        {
            return $"{numero1} x {numero2} =  {numero1 * numero2}";
        }

        public string Division(int numero1, int numero2)
        {
            return numero2 == 0 ? "No se puede Dividir por 0" : $"{numero1} / {numero2} = {numero1 / numero2}";
        }
    }
}
