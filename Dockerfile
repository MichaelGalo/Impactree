# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies exactly from lockfile
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Next.js app (disable Turbopack for reliability in Docker)
RUN npm run build --no-turbo

# Stage 2: Production image
FROM node:20-slim AS runner

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build artifacts from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose Cloud Run default port
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Run the Next.js server
CMD ["npm", "run", "start"]