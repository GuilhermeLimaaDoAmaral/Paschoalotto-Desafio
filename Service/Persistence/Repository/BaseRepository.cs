using Core.Entities;
using Core.Interfaces.Repository;
using Core.Pagination;
using Persistence.Context;

namespace Persistence.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : EntityBase
    {
        private ApplicationDbContext _applicationDbContext { get; set; }
        public BaseRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public virtual IEnumerable<T?> GetAll()
            => _applicationDbContext.Set<T>()
                            .ToList();

        public virtual T? GetById(long id)
            => _applicationDbContext.Set<T>()
                            .Where(x => x.Id == id)
                            .FirstOrDefault();

        public virtual T Create(T obj)
        {
            _applicationDbContext.Add(obj);
            return obj;
        }

        public virtual T Update(T obj)
        {
            _applicationDbContext.Set<T>().Update(obj);
            return obj;
        }

        public virtual void Delete(long id)
        {
            var obj = GetById(id);

            if (obj != null)
            {
                _applicationDbContext.Remove(obj);
            }
        }

        public PagedListBase<T> GetAllPagination(PaginationBase<T> paginationBase)
        {
            var obj = _applicationDbContext.Set<T>().OrderBy(x => x.Id).AsQueryable();
            return PagedListBase<T>.ToPagedList(obj, paginationBase.PageNumber, paginationBase.PageSize);
        }
    }
}
