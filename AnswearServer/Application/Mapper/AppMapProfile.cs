using AutoMapper;
using Core.Entities;
using Core.Entities.Filters;
using Core.Entities.Discount;
using Core.Entities.Identity;
using Core.ViewModels.Category;
using Core.ViewModels.Filter;
using Core.ViewModels.Discount;
using Core.ViewModels.TargetGroup;
using Core.ViewModels.User;
using Core.ViewModels.Product;

namespace Application.Mapper;

public class AppMapProfile : Profile
{
    public AppMapProfile()
    {
        CreateMap<UserEntity, UserVm>();
        CreateMap<SignUpVm, UserEntity>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));

        CreateMap<ProductPhotoEntity, ProductPhotoVm>();

        CreateMap<TargetGroupEntity, TargetGroupVm>();
        CreateMap<TargetGroupVm, TargetGroupEntity>();
        CreateMap<TargetGroupCreateVm, TargetGroupEntity>();

        CreateMap<CategoryEntity, CategoryVm>();
        CreateMap<CategoryEntity, ParentCategoryVm>();
        CreateMap<CategoryEntity, ChildrenCategoryVm>();
        CreateMap<CategoryCreateVm, CategoryEntity>();

        CreateMap<FilterNameEntity, FilterVm>();
        CreateMap<FilterValueEntity, FilterValueVm>();
        CreateMap<FilterCreateVm, FilterNameEntity>();
        CreateMap<FilterUpdateVm, FilterNameEntity>()
            .ForMember(dest => dest.FilterValues, opt => opt.Ignore());

        CreateMap<DiscountCreateVm, DiscountEntity>()
            .ForMember(dest => dest.MediaFile, opt => opt.Ignore());
        CreateMap<DiscountEntity, DiscountVm>();
        CreateMap<DiscountValueEntity, DiscountValueVm>();
        CreateMap<DiscountUpdateVm, DiscountEntity>()
            .ForMember(dest => dest.MediaFile, opt => opt.Ignore());

        CreateMap<ProductEntity, ProductVm>();
        CreateMap<ProductVariationEntity, ProductVariationVm>();

        CreateMap<ProductCreateVm, ProductEntity>()
             .ForMember(dest => dest.Variations, opt => opt.Ignore());

        CreateMap<ProductVariationCreateVm, ProductVariationEntity>()
            .ForMember(dest => dest.Photos, opt => opt.Ignore())
            .ForMember(dest => dest.Filters, opt => opt.Ignore());
    }
}
