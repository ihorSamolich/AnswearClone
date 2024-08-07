# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# copy csproj and restore as distinct layers
WORKDIR /src
COPY AnswearServer.sln ./
COPY WebApi/*.csproj ./WebApi/
COPY Application/*.csproj ./Application/
COPY Core/*.csproj ./Core/
COPY Infrastructure/*.csproj ./Infrastructure/

RUN dotnet restore

# copy everything else and build app
COPY . .

WORKDIR /src/WebApi
RUN dotnet publish -o /app

WORKDIR /src/Application
RUN dotnet publish -o /app

WORKDIR /src/Core
RUN dotnet publish -o /app

WORKDIR /src/Infrastructure
RUN dotnet publish -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "WebApi.dll"]