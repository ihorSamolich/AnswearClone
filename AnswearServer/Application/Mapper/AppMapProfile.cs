using AutoMapper;
using Core.Entities;
using Core.Entities.Discount;
using Core.Entities.Identity;
using Core.ViewModels.Category;
using Core.ViewModels.Discount;
using Core.ViewModels.TargetGroup;
using Core.ViewModels.User;

namespace Application.Mapper;

public class AppMapProfile : Profile
{
    public AppMapProfile()
    {
        CreateMap<UserEntity, UserVm>();
        CreateMap<UserCreateVm, UserEntity>();


        CreateMap<TargetGroupEntity, TargetGroupVm>();
        CreateMap<TargetGroupVm, TargetGroupEntity>();
        CreateMap<TargetGroupCreateVm, TargetGroupEntity>();

        CreateMap<CategoryEntity, CategoryVm>();
        CreateMap<CategoryEntity, ParentCategoryVm>();
        CreateMap<CategoryEntity, ChildrenCategoryVm>();
        CreateMap<CategoryCreateVm, CategoryEntity>();

        CreateMap<DiscountCreateVm, Discount>()
            .ForMember(dest => dest.MediaFile, opt => opt.Ignore());
        CreateMap<Discount, DiscountVm>();
        CreateMap<DiscountValue, DiscountValueVm>();
        CreateMap<DiscountUpdateVm, Discount>()
            .ForMember(dest => dest.MediaFile, opt => opt.Ignore());
    }
}
