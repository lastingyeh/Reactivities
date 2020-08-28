using System.Threading.Tasks;
using Application.User;

namespace Application.interfaces
{
    public interface IFacebookAccessor
    {
         Task<FacebookUserInfo> FacebookLogin(string accessToken);
    }
}