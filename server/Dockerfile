# syntax=docker/dockerfile:1

# ---- build stage ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci                       # full deps — typescript needed to compile
COPY . .
RUN npm run build                # tsc → dist/

# ---- runtime stage ----
FROM node:24-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev            # prod deps only
COPY --from=build --chown=node:node /app/dist ./dist

EXPOSE 5000

# 127.0.0.1 (IPv4), NOT localhost — matches the explicit 0.0.0.0 bind above.
# start-period 15s: server connects to Mongo BEFORE it listens, on a slow box.
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5000/api/health || exit 1

USER node
CMD ["node", "dist/server.js"]