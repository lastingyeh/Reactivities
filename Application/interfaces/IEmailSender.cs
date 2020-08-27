using System.Threading.Tasks;

namespace Application.interfaces
{
    public interface IEmailSender
    {
         Task SendEmailAsync(string userEmail, string emailSubject, string message);
    }
}