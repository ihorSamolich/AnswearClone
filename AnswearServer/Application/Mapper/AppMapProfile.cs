using AutoMapper;
using Core.Entities;
using Core.ViewModels;

namespace Application.Mapper;

public class AppMapProfile : Profile
{
    public AppMapProfile()
    {
        CreateMap<TargetGroupEntity, TargetGroupVm>();
        CreateMap<TargetGroupVm, TargetGroupEntity>();
        CreateMap<TargetGroupCreateVm, TargetGroupEntity>();
    }
}
