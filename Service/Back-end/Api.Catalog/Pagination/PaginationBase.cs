﻿using ApiCatalog.Core.Entities;
using ApiCatalog.Core.Pagination.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiCatalog.Core.Pagination
{
    public class PaginationBase<T> : IPaginationBase<T> where T : EntityBase
    {
        const int maxPageSize = 50;

        private int _pageSize;
        public int PageNumber { get; set; } = 1;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}
