using Domain;

namespace Application.interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);
    }
}