using AutoMapper;
using Core.Entities;
using Core.ViewModels.Category;
using Core.ViewModels.TargetGroup;

namespace Application.Mapper;

public class AppMapProfile : Profile
{
    public AppMapProfile()
    {
        CreateMap<TargetGroupEntity, TargetGroupVm>();
        CreateMap<TargetGroupVm, TargetGroupEntity>();
        CreateMap<TargetGroupCreateVm, TargetGroupEntity>();


        CreateMap<CategoryEntity, CategoryVm>();
        CreateMap<CategoryEntity, ParentCategoryVm>();
        CreateMap<CategoryEntity, ChildrenCategoryVm>();
        CreateMap<CategoryCreateVm, CategoryEntity>();

    }
}
