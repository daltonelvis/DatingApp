FROM node:16-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build --prod


FROM nginx:alpine
#EXPOSE 4000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/client /usr/share/nginx/html

# -to build a docker file
# docker build -f Dockerfile -t dalton/client-datingapp:latest .

# --run
# docker run -p 8083:4000  dalton/client-datingapp:latest
#here 4000 is port mentioned in nginx config

# --get shell to the deployed container, to check files etc
# docker ps
# docker exec -it iddddd sh
