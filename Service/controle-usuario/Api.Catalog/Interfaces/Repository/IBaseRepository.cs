using ApiCatalog.Core.Entities;
using ApiCatalog.Core.Pagination;

namespace ApiCatalog.Core.Interfaces.Repository
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

