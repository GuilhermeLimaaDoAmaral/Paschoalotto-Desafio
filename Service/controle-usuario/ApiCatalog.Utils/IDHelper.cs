using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiCatalog.Utils
{
    public static class IDHelper
    {
        public const int INVALID_ID = -1;

        public static bool IsIdValid(this int id)
            => id > 0;

        public static bool IsIdValid(this int? id)
            => id != null || id > 0;

        public static bool IsIdInvalid(this int id)
            => id < 1;

        public static bool IsIdInvalid(this int? id)
            => id == null || id < 1;
    }
}
