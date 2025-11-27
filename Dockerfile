FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ARG APP_PORT=8050
ENV PORT=$APP_PORT

CMD ["node", "app.js"]
