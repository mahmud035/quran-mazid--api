# syntax=docker/dockerfile:1

# ---- build stage ----
FROM node:24-alpine AS build
WORKDIR /app

# VITE_API_URL is baked at build time (Vite inlines import.meta.env.*).
# Public URL, NOT a secret. The Batch-2 workflow overrides this default.
ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build                # tsc -b && vite build → dist/

# ---- runtime stage ----
FROM nginxinc/nginx-unprivileged:1.30-alpine
# Non-root by design (uid 101), listens on 8080 — no privileged port, no USER line needed.
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/health || exit 1