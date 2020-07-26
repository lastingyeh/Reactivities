using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.interfaces
{
    public interface IPhotoAccessor
    {
        PhotoUploadResult AddPhoto(IFormFile file);
        string DeletePhoto(string publicId); 
    }
}