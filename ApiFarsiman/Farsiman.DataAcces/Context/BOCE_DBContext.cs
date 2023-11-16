﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Farsiman.Entities.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Farsiman.DataAcces.Context
{
    public partial class BOCE_DBContext : DbContext
    {
        public BOCE_DBContext()
        {
        }

        public BOCE_DBContext(DbContextOptions<BOCE_DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<tbLotes> tbLotes { get; set; }
        public virtual DbSet<tbPantallas> tbPantallas { get; set; }
        public virtual DbSet<tbProductos> tbProductos { get; set; }
        public virtual DbSet<tbRoles> tbRoles { get; set; }
        public virtual DbSet<tbRolesXPantallas> tbRolesXPantallas { get; set; }
        public virtual DbSet<tbSalidas> tbSalidas { get; set; }
        public virtual DbSet<tbSalidasDetalles> tbSalidasDetalles { get; set; }
        public virtual DbSet<tbSucursale> tbSucursale { get; set; }
        public virtual DbSet<tbUsuarios> tbUsuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tbLotes>(entity =>
            {
                entity.HasKey(e => e.lote_Id)
                    .HasName("PK_Bode_tbLotes_lote_Id");

                entity.ToTable("tbLotes", "Bode");

                entity.Property(e => e.lote_FechaVencimiento).HasColumnType("datetime");

                entity.HasOne(d => d.prod)
                    .WithMany(p => p.tbLotes)
                    .HasForeignKey(d => d.prod_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bode_tbLotes_prod_Id_tbProductos_prod_Id");
            });

            modelBuilder.Entity<tbPantallas>(entity =>
            {
                entity.HasKey(e => e.pant_Id)
                    .HasName("PK_Acce_tbPantallas_pant_Id");

                entity.ToTable("tbPantallas", "Acce");

                entity.Property(e => e.pant_Esquema).HasMaxLength(100);

                entity.Property(e => e.pant_Nombre).HasMaxLength(100);

                entity.Property(e => e.pant_URL).HasMaxLength(100);

                entity.Property(e => e.usua_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.usua_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.usua_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPantallasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbPantallas_pant_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPantallasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbPantallas_pant_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbProductos>(entity =>
            {
                entity.HasKey(e => e.prod_Id)
                    .HasName("PK_Bode_tbProductos_prod_Id");

                entity.ToTable("tbProductos", "Bode");

                entity.HasIndex(e => e.prod_Descripcion, "PK_Bode_tbProductos_prod_Descripcion")
                    .IsUnique();

                entity.Property(e => e.prod_Descripcion)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.prod_Precio).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.usua_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.usua_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbProductosusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bode_tbProductos_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbProductosusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Bode_tbProductos_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbRoles>(entity =>
            {
                entity.HasKey(e => e.role_Id)
                    .HasName("PK_Acce_tbRoles_role_Id");

                entity.ToTable("tbRoles", "Acce");

                entity.HasIndex(e => e.role_Descripcion, "UQ_acce_tbRoles_role_Descripcion")
                    .IsUnique();

                entity.Property(e => e.role_Descripcion).HasMaxLength(500);

                entity.Property(e => e.usua_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.usua_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.usua_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbRolesusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbRoles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbRolesusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbRoles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbRolesXPantallas>(entity =>
            {
                entity.HasKey(e => e.ropa_Id)
                    .HasName("PK_Acce_tbRolesXPantallas_ropa_Id");

                entity.ToTable("tbRolesXPantallas", "Acce");

                entity.HasIndex(e => new { e.role_Id, e.pant_Id }, "UQ_Acce_tbRolesXPantallas_pant_Id_role_Id")
                    .IsUnique();

                entity.Property(e => e.usua_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.usua_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.usua_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.pant)
                    .WithMany(p => p.tbRolesXPantallas)
                    .HasForeignKey(d => d.pant_Id)
                    .HasConstraintName("FK_Acce_tbRolesXPantallas_pant_Id_Acce_tbPantallas_pant_Id");

                entity.HasOne(d => d.role)
                    .WithMany(p => p.tbRolesXPantallas)
                    .HasForeignKey(d => d.role_Id)
                    .HasConstraintName("FK_Acce_tbRolesXPantallas_role_Id_Acce_tbRoles_role_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbRolesXPantallasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Acce_tbRolesXPantallas_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbRolesXPantallasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Acce_tbRolesXPantallas_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbSalidas>(entity =>
            {
                entity.HasKey(e => e.sali_Id)
                    .HasName("PK_Bode_tbSalidas_sali_Id");

                entity.ToTable("tbSalidas", "Bode");

                entity.Property(e => e.sali_Fecha).HasColumnType("datetime");

                entity.Property(e => e.usua_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.usua_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.sucu)
                    .WithMany(p => p.tbSalidas)
                    .HasForeignKey(d => d.sucu_Id)
                    .HasConstraintName("FK_Bode_tbSucursale_sucu_Id_tbSucursale_sucu_Id");

                entity.HasOne(d => d.usua_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbSalidasusua_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Bode_tbSalidasDetalles_usua_UsuarioCreacion_Acce_tbUsuarios_usua_Id");

                entity.HasOne(d => d.usua_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbSalidasusua_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.usua_UsuarioModificacion)
                    .HasConstraintName("FK_Bode_tbSalidasDetalles_usua_UsuarioModificacion_Acce_tbUsuarios_usua_Id");
            });

            modelBuilder.Entity<tbSalidasDetalles>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tbSalidasDetalles", "Bode");

                entity.Property(e => e.sade_Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<tbSucursale>(entity =>
            {
                entity.HasKey(e => e.sucu_Id)
                    .HasName("PK_Bode_tbSucursale_sucu_Id");

                entity.ToTable("tbSucursale", "Bode");

                entity.HasIndex(e => e.sucu_Nombre, "PK_Bode_tbSucursale_sucu_Nombre")
                    .IsUnique();

                entity.Property(e => e.sucu_Nombre).HasMaxLength(250);
            });

            modelBuilder.Entity<tbUsuarios>(entity =>
            {
                entity.HasKey(e => e.usua_Id)
                    .HasName("PK_Acce_tbUsuarios_usua_Id");

                entity.ToTable("tbUsuarios", "Acce");

                entity.HasIndex(e => e.usua_Nombre, "UQ_acce_tbUsuarios_usua_Nombre")
                    .IsUnique();

                entity.Property(e => e.usua_Contrasenia).IsRequired();

                entity.Property(e => e.usua_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.usua_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.usua_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.usua_Nombre)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}