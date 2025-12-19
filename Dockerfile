FROM node:lts-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Recebe a variável como build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


FROM nginx:stable-alpine AS production-stage

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]