FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run typecheck && npm run build

FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN groupadd --system app && useradd --system --gid app --create-home app
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/.output ./.output
USER app
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
