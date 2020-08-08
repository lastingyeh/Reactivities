using System.Threading.Tasks;
using Application.Profiles;

namespace Application.interfaces
{
    public interface IProfileReader
    {
         Task<Profile> ReadProfile(string username);
    }
}