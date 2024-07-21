using Microsoft.AspNetCore.Http;

namespace Core.Interfaces;

public interface IImageService
{
    Task<string> SaveImageAsync(byte[] bytes);
    Task<string> SaveImageAsync(IFormFile image);
    Task<string> SaveImageFromUrlAsync(string url);
    Task<string> SaveImageAsync(string base64);
    Task<List<string>> SaveImagesAsync(IEnumerable<byte[]> bytesArrays);
    Task<List<string>> SaveImagesAsync(IEnumerable<IFormFile> images);

    Task<byte[]> LoadBytesAsync(string name);

    void DeleteImage(string nameWithFormat);
    void DeleteImageIfExists(string nameWithFormat);
    void DeleteImages(IEnumerable<string> images);
    void DeleteImagesIfExists(IEnumerable<string> images);

    Task<string> GetImageAsBase64Async(string imageUrl);
    Task<string> SaveVideoAsync(IFormFile video);
    Task<string> SaveVideoFromUrlAsync(string videoUrl);

    void DeleteVideo(string nameWithFormat);
    bool IsImage(IFormFile file);
    bool IsImageFile(string fileName);

    string ImagesDir { get; }


}
