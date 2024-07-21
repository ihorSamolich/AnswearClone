using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace Application.Services;
public class ImageService(
    IConfiguration configuration
    ) : IImageService
{
    public async Task<string> SaveImageAsync(IFormFile image)
    {
        using MemoryStream ms = new();
        await image.CopyToAsync(ms);
        string fileName = await SaveImageAsync(ms.ToArray());
        return fileName;
    }

    public async Task<List<string>> SaveImagesAsync(IEnumerable<IFormFile> images)
    {
        List<string> result = [];

        try
        {
            foreach (var image in images)
            {
                result.Add(await SaveImageAsync(image));
            }
        }
        catch (Exception)
        {
            result.ForEach(DeleteImageIfExists);
            throw;
        }

        return result;
    }

    public async Task<string> SaveImageFromUrlAsync(string url)
    {
        var base64 = await GetImageAsBase64Async(url);

        if (base64.Contains(','))
            base64 = base64.Split(',')[1];

        var bytes = Convert.FromBase64String(base64);

        var fileName = await SaveImageAsync(bytes);

        return fileName;
    }

    public async Task<string> SaveImageAsync(string base64)
    {
        if (base64.Contains(','))
            base64 = base64.Split(',')[1];

        var bytes = Convert.FromBase64String(base64);

        var fileName = await SaveImageAsync(bytes);

        return fileName;
    }

    public async Task<string> SaveImageAsync(byte[] bytes)
    {
        List<int> sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>()
            ?? throw new Exception("ImageSizes reading error");

        if (sizes.Count == 0)
            throw new Exception("ImageSizes not inicialized");

        string imageName = $"{Path.GetRandomFileName()}.webp";

        var tasks = sizes
            .Select(s => SaveImageAsync(bytes, imageName, s))
            .ToArray();

        await Task.WhenAll(tasks);

        return imageName;
    }

    private async Task SaveImageAsync(byte[] bytes, string name, int size)
    {
        string dirSaveImage = Path.Combine(ImagesDir, $"{size}_{name}");

        using (var image = Image.Load(bytes))
        {
            image.Mutate(imageProcessingContext =>
            {
                imageProcessingContext.Resize(new ResizeOptions
                {
                    Size = new Size(Math.Min(image.Width, size), Math.Min(image.Height, size)),
                    Mode = ResizeMode.Max
                });
            });

            using var stream = File.Create(dirSaveImage);
            await image.SaveAsync(stream, new WebpEncoder());
        }
    }

    public async Task<List<string>> SaveImagesAsync(IEnumerable<byte[]> bytesArrays)
    {
        List<string> result = [];

        try
        {
            foreach (var bytes in bytesArrays)
            {
                result.Add(await SaveImageAsync(bytes));
            }
        }
        catch (Exception)
        {
            result.ForEach(DeleteImageIfExists);
            throw;
        }

        return result;
    }

    public async Task<byte[]> LoadBytesAsync(string name)
    {
        return await File.ReadAllBytesAsync(Path.Combine(ImagesDir, name));
    }

    public string ImagesDir => Path.Combine(
        Directory.GetCurrentDirectory(),
            configuration["ImagesDir"] ?? throw new NullReferenceException("Images")
    );

    public void DeleteImage(string nameWithFormat)
    {
        foreach (var size in Sizes)
        {
            File.Delete(Path.Combine(ImagesDir, $"{size}_{nameWithFormat}"));
        }
    }

    public void DeleteImages(IEnumerable<string> images)
    {
        foreach (var image in images)
            DeleteImage(image);
    }

    public void DeleteImageIfExists(string nameWithFormat)
    {
        foreach (var size in Sizes)
        {
            if (File.Exists(Path.Combine(ImagesDir, $"{size}_{nameWithFormat}")))
            {
                File.Delete(Path.Combine(ImagesDir, $"{size}_{nameWithFormat}"));
            }
        }
    }

    public void DeleteImagesIfExists(IEnumerable<string> images)
    {
        foreach (var image in images)
            DeleteImageIfExists(image);
    }

    private List<int> Sizes
    {
        get
        {
            List<int> sizes = configuration.GetRequiredSection("ImageSizes").Get<List<int>>()
            ?? throw new Exception("ImageSizes reading error");

            if (sizes.Count == 0)
                throw new Exception("ImageSizes not inicialized");

            return sizes;
        }
    }

    public async Task<string> GetImageAsBase64Async(string imageUrl)
    {
        using var httpClient = new HttpClient();
        var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);

        return Convert.ToBase64String(imageBytes);
    }

    public async Task<string> SaveVideoAsync(IFormFile video)
    {

        var fileName = Path.GetRandomFileName() + ".mp4";
        string path = Path.Combine(ImagesDir, fileName);

        using (var stream = new FileStream(path, FileMode.Create))
        {
            await video.CopyToAsync(stream);
        }
        return fileName;
    }

    public async Task<string> SaveVideoFromUrlAsync(string videoUrl)
    {
        var fileName = Path.GetRandomFileName() + ".mp4";

        string path = Path.Combine(ImagesDir, fileName);

        using (var httpClient = new HttpClient())
        {
            var response = await httpClient.GetAsync(videoUrl);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Could not download the video.");

            using (var stream = await response.Content.ReadAsStreamAsync())
            {
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await stream.CopyToAsync(fileStream);
                }
            }
        }

        return fileName;
    }

    public void DeleteVideo(string nameWithFormat)
    {
        string path = Path.Combine(ImagesDir, nameWithFormat);
        if (File.Exists(path))
        {
            File.Delete(path);
        }
    }

    public bool IsImage(IFormFile file)
    {
        var imageTypes = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        return imageTypes.Contains(extension);
    }

    public bool IsImageFile(string fileName)
    {
        var imageTypes = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp" };
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        return imageTypes.Contains(extension);
    }


}
