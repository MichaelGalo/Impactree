FROM node:20-slim AS builder

WORKDIR /app

ENV NEXT_PUBLIC_API_URL=https://impactree-api-941477901286.us-central1.run.app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build --no-turbo

FROM node:20-slim AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "run", "start"]