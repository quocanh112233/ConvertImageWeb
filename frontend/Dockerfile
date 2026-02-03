# Build Stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Accept build argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Serve Stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
# Custom Nginx config to handle React Router and Proxy to Backend (optional via Nginx, currently Frontend calls localhost)
# For Docker Compose, we ensure frontend container can reach backend if we proxy, 
# BUT since this is Client-Side React, 'localhost' in axios calls refers to User's browser machine.
# So standard Nginx serving static files is fine.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
