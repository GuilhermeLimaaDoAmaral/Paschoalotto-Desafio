using Core.Entities;
using Core.Pagination;

namespace Core.Interfaces.Repository
{
    public interface IBaseRepository<T> where T : EntityBase
    {
        T Create(T obj);
        T? GetById(long id);
        IEnumerable<T?> GetAll();
        T Update(T obj);
        void Delete(long id);
        PagedListBase<T?> GetAllPagination(PaginationBase<T> paginationBase);
    }
}

