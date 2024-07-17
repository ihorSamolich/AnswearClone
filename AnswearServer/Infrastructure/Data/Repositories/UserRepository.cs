using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly List<User> _users = new List<User>();

        public Task<User> GetByIdAsync(int id)
        {
            return Task.FromResult(_users.FirstOrDefault(u => u.Id == id));
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            return Task.FromResult(_users.AsEnumerable());
        }

        public Task AddAsync(User user)
        {
            _users.Add(user);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(User user)
        {
            var existingUser = _users.FirstOrDefault(u => u.Id == user.Id);
            if (existingUser != null)
            {
                existingUser.Username = user.Username;
                existingUser.Password = user.Password;
                // Оновіть інші властивості
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(int id)
        {
            var user = _users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                _users.Remove(user);
            }
            return Task.CompletedTask;
        }
    }
}
