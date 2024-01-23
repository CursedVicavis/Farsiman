using Academia.Proyecto.WebApi._Features.Empresas.Entities;
using Academia.Proyecto.WebApi.Infrastructure.Logistic.Maps.Empresas;
using Microsoft.EntityFrameworkCore;

namespace Academia.Proyecto.WebApi.Infrastructure.Logistic
{
    public class LogisticDbContext : DbContext
    {
        public LogisticDbContext(DbContextOptions<LogisticDbContext> options) : base(options) 
        { 

        }

        public DbSet<Empresa> Empresas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EmpresaMap());
        }

    }
}
