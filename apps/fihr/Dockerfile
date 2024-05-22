FROM gcr.io/distroless/nodejs20-debian11@sha256:917c4e6b60fd05d4e54b5e7165371a53a812bbcf244305fccddd2633eb20da39

WORKDIR /app

COPY package.json /app/
COPY .next/standalone/node_modules /app/node_modules
COPY .next/standalone/apps/fihr /app/
COPY .next/static /app/.next/static

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
