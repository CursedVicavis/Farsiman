using System.Linq.Expressions;

namespace AcademiaFS.Proyecto.Api.Infrastructure.ViajesBD.Repository
{
    public interface IRepository<TEntity>
    {
        void Add(TEntity entity);
        IQueryable<TEntity> AsQueryable();
        List<TEntity> where(Expression<Func<TEntity, bool>> query);
        TEntity? FirstOrDefault(Expression<Func<TEntity, bool>> query);
    }
}
