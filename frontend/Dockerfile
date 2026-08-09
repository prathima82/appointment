# Build Stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package lock and install dependencies
COPY package*.json ./
RUN npm ci

# Copy rest of application code and build
COPY . .
RUN npm run build

# Runtime Stage
FROM nginx:alpine
# Copy static built HTML/JS/CSS assets to Nginx server root
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
