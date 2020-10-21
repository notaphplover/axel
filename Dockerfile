FROM node:12.19.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet

COPY . .

CMD [ "npm", "run", "start"]
