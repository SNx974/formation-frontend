## Étape 1 — Build React
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# VITE_API_URL est injectée au moment du build par Dokploy
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

## Étape 2 — Serveur Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
