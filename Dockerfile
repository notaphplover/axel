FROM node:12.18.4-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet

COPY . .

CMD [ "npm", "run", "start"]
