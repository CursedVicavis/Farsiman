using FarsimanJLS2.Proyecto.Api;
using System.Linq;
using System.Linq.Expressions;

namespace AcademiaFS.Proyecto.Api.Infrastructure.ViajesBD.Repository
{
    public class EntityRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly BOCE_DBContext _context;
        public EntityRepository(BOCE_DBContext context)
        {
            _context = context;
        }
        public void Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
            _context.SaveChanges();
        }
        public IQueryable<TEntity> AsQueryable()
        {
            return _context.Set<TEntity>().AsQueryable();
        }
        public List<TEntity> where(Expression<Func<TEntity, bool>> query)
        { 
            return _context.Set<TEntity>().Where(query).ToList();
        }
        public TEntity? FirstOrDefault(Expression<Func<TEntity, bool>> query)
        {
            return _context.Set<TEntity>().FirstOrDefault();
        }
    }
}
