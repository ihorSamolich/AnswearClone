using Core.Interfaces;
using Slugify;
using System.Text;

public class SlugService : ISlugService
{
    private readonly SlugHelper _slugHelper;
    private static readonly Dictionary<char, string> _translitDictionary = new Dictionary<char, string>
    {
        {'а', "a"}, {'б', "b"}, {'в', "v"}, {'г', "g"}, {'ґ', "g"}, {'д', "d"}, {'е', "e"}, {'є', "ye"},
        {'ж', "zh"}, {'з', "z"}, {'и', "y"}, {'і', "i"}, {'ї', "yi"}, {'й', "y"}, {'к', "k"}, {'л', "l"},
        {'м', "m"}, {'н', "n"}, {'о', "o"}, {'п', "p"}, {'р', "r"}, {'с', "s"}, {'т', "t"}, {'у', "u"},
        {'ф', "f"}, {'х', "kh"}, {'ц', "ts"}, {'ч', "ch"}, {'ш', "sh"}, {'щ', "shch"}, {'ь', ""}, {'ю', "yu"},
        {'я', "ya"}, {'А', "A"}, {'Б', "B"}, {'В', "V"}, {'Г', "G"}, {'Ґ', "G"}, {'Д', "D"}, {'Е', "E"},
        {'Є', "Ye"}, {'Ж', "Zh"}, {'З', "Z"}, {'И', "Y"}, {'І', "I"}, {'Ї', "Yi"}, {'Й', "Y"}, {'К', "K"},
        {'Л', "L"}, {'М', "M"}, {'Н', "N"}, {'О', "O"}, {'П', "P"}, {'Р', "R"}, {'С', "S"}, {'Т', "T"},
        {'У', "U"}, {'Ф', "F"}, {'Х', "Kh"}, {'Ц', "Ts"}, {'Ч', "Ch"}, {'Ш', "Sh"}, {'Щ', "Shch"}, {'Ь', ""},
        {'Ю', "Yu"}, {'Я', "Ya"}, {'Ё', "Yo"}, {'ё', "yo"}, {'Ы', "Y"}, {'ы', "y"}, {'Э', "E"}, {'э', "e"}, {'ъ', ""}
    };

    public SlugService()
    {
        _slugHelper = new SlugHelper();
    }

    public string GenerateSlug(string text)
    {
        var transliteratedText = CyrillicToLatin(text);
        return _slugHelper.GenerateSlug(transliteratedText);
    }

    private static string CyrillicToLatin(string text)
    {
        var result = new StringBuilder();

        foreach (var ch in text)
        {
            if (_translitDictionary.TryGetValue(ch, out var latin))
            {
                result.Append(latin);
            }
            else
            {
                result.Append(ch);
            }
        }

        return result.ToString();
    }
}
