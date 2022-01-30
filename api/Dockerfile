FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "api.dll"]


# -to build a docker file
# docker build -f Dockerfile -t dalton/api-datingapp:latest .

# --run
# docker run -p 8084:80  dalton/api-datingapp:latest

# --get shell to the deployed container, to check files etc
# docker ps
# docker exec -it iddddd sh
