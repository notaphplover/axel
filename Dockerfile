FROM node:12.19.0-alpine

LABEL org.opencontainers.image.source https://github.com/notaphplover/axel

WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet

COPY . .

RUN npm run build && npm run setup:local

RUN npm ci --prod

CMD [ "npm", "run", "start:docker"]
