using AutoMapper;
using Core.Entities.Discount;
using Core.Entities.Filters;
using Core.Interfaces;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.ViewModels.Discount;

namespace Application.Services.ControllerServices;

public class DiscountService(
    IDiscountRepository repository,
    IMapper mapper,
    IImageService imageService
    ) : IDiscountService
{
    public async Task AddDiscountAsync(DiscountCreateVm discount)
    {
        var newDiscount = mapper.Map<DiscountEntity>(discount);

        var values = new List<DiscountValueEntity>();

        foreach (var value in discount.Values)
        {
            values.Add(new DiscountValueEntity { Percentage = value });
        }

        newDiscount.DiscountValues = values;


        // Визначення розширення файлу
        var fileExtension = Path.GetExtension(discount.MediaFile.FileName).ToLower();
        if (fileExtension == ".jpg" || fileExtension == ".jpeg" || fileExtension == ".png" || fileExtension == ".gif")
        {
            newDiscount.MediaFile = await imageService.SaveImageAsync(discount.MediaFile);
        }
        else if (fileExtension == ".mp4")
        {
            newDiscount.MediaFile = await imageService.SaveVideoAsync(discount.MediaFile);
        }
        else
        {
            throw new InvalidOperationException("Unsupported media file type");
        }

        await repository.AddAsync(newDiscount);
    }

    public async Task DeleteDiscountAsync(int id)
    {
        var deletedDiscount = await repository.GetByIdAsync(id);

        if (!string.IsNullOrEmpty(deletedDiscount.MediaFile))
        {
            if (imageService.IsImageFile(deletedDiscount.MediaFile))
            {
                imageService.DeleteImageIfExists(deletedDiscount.MediaFile);
            }
            else
            {
                imageService.DeleteVideo(deletedDiscount.MediaFile);
            }
        }

        await repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<DiscountVm>> GetAllDiscountAsync()
    {
        var entities = await repository.GetAllAsync();

        return mapper.Map<List<DiscountVm>>(entities);
    }

    public async Task<DiscountVm> GetDiscountByIdAsync(int id)
    {
        var entity = await repository.GetByIdAsync(id);

        return mapper.Map<DiscountVm>(entity);
    }

    public async Task UpdateDiscountAsync(DiscountUpdateVm discount)
    {
        var editedDiscount = await repository.GetByIdAsync(discount.Id);

        if (editedDiscount != null)
        {
            mapper.Map(discount, editedDiscount);

            editedDiscount.DiscountValues.Clear();

            foreach (var value in discount.Values)
            {
                editedDiscount.DiscountValues.Add(new DiscountValueEntity { Percentage = value });
            }

            if (discount.MediaFile != null)
            {
                if (!string.IsNullOrEmpty(editedDiscount.MediaFile))
                {
                    if (imageService.IsImageFile(editedDiscount.MediaFile))
                    {
                        imageService.DeleteImageIfExists(editedDiscount.MediaFile);
                    }
                    else
                    {
                        imageService.DeleteVideo(editedDiscount.MediaFile);
                    }
                }

                if (imageService.IsImage(discount.MediaFile))
                {
                    editedDiscount.MediaFile = await imageService.SaveImageAsync(discount.MediaFile);
                }
                else
                {
                    editedDiscount.MediaFile = await imageService.SaveVideoAsync(discount.MediaFile);
                }
            }


            await repository.UpdateAsync(editedDiscount);
        }
    }

}
