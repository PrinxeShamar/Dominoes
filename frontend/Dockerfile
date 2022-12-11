FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY public ./public

COPY src ./src

RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app/

RUN npm install -g serve

COPY --from=builder /usr/src/app/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]