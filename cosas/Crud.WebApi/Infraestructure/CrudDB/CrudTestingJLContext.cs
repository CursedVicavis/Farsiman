using Crud._common.Entities;
using Crud.WebApi.Infraestructure.CrudDB.Maps;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Crud.WebApi.Infraestructure.CrudDB
{
    public class CrudTestingJLContext : DbContext
    {

        public CrudTestingJLContext(DbContextOptions<CrudTestingJLContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Persona> Colaboradores { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfiguration(new PersonasMaps());
        }
    }
}
