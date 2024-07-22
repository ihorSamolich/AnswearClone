namespace Core.Interfaces;
public interface ISlugService
{
    string GenerateSlug(string text);
    string GenerateSlugWithTime(string text);

}
