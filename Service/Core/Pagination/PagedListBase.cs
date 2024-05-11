using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Pagination
{
    public class PagedListBase<T> : List<T> where T : class
    {
        public int CurrentPage {  get; private set; }
        public int TotalPage { get; private set; }
        public int TotalCount { get; private set;}
        public int PageSize { get; private set;}
        public bool HasPrevious => CurrentPage > 1;
        public bool HasNext => CurrentPage < TotalPage;

        public PagedListBase(List<T> items, int count, int pageNumberm, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumberm;
            TotalPage = (int)Math.Ceiling(count / (double)pageSize);

            AddRange(items);
        }

        public static PagedListBase<T> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            return new PagedListBase<T>(items, count, pageNumber, pageSize);
        }

    }
}
