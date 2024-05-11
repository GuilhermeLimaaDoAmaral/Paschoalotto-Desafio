using Core.Interfaces.Repository;
using Persistence.Context;

namespace Persistence.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private IUserRepository? _userRepository;

        public ApplicationDbContext _applicationDbContext;

        public UnitOfWork(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        public IUserRepository UserRepository
        {
            get
            {
                return _userRepository = _userRepository ?? new UserRepository(_applicationDbContext);
            }
        }

        public void Commit()
        {
            _applicationDbContext.SaveChanges();
        }

        public void Dispose() 
        {
            _applicationDbContext.Dispose();
        }
    }
}
