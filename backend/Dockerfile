## Build command: docker build -t tools-api .

# Stage 1: Build the application.
# FROM node:lts-alpine3.19 as builder # This is the original minimal node 22, but for punycode need version <21.0.0
FROM node:lts-alpine3.19 AS builder
WORKDIR /app
COPY . .
RUN npm i && rm -r node_modules && npm ci
# RUN npm ci --omit=dev

# Stage 2: Run the application
FROM node:lts-alpine3.19
WORKDIR /app
COPY --from=builder /app/config ./config
COPY --from=builder /app/controllers ./controllers
COPY --from=builder /app/cron ./cron
COPY --from=builder /app/middleware ./middleware
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/models ./models
COPY --from=builder /app/routes ./routes
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js ./index.js
COPY --from=builder /app/package.json ./
RUN mkdir public

# Run command on container starting.
CMD ["npm", "run", "start"]