# ---------- Build Stage ----------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy csproj and restore first (caches dependencies)
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the code and publish
COPY . ./
RUN dotnet publish -c Release -o out

# ---------- Runtime Stage ----------
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

LABEL maintainer="Touqeer touqeer_ahson@hotmail.com"
LABEL version="1.0"
LABEL description="Minimal .NET 9 API for Fargate demo"

ENV DOTNET_URLS=http://+:80
ENV DOTNET_RUNNING_IN_CONTAINER=true

# Copy published output from build stage
COPY --from=build /app/out ./

# Expose port 80
EXPOSE 80

# Start the app
ENTRYPOINT ["dotnet", "Api.dll"]
