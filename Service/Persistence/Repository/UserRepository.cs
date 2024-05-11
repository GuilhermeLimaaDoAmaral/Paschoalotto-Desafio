using Core.Entities;
using Core.Interfaces.Repository;
using Persistence.Context;

namespace Persistence.Repository
{
    public class UserRepository: BaseRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}
