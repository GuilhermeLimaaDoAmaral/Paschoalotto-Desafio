using ApiCatalog.Core.Entities;
using ApiCatalog.Core.Interfaces.Repository;
using ApiCatalog.Persistence.Context;

namespace ApiCatalog.Persistence.Repository
{
    public class UserRepository: BaseRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}
