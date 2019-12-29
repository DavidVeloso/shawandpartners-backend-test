FROM node:lts-alpine

WORKDIR /home/swp

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE ${SERVER_PORT}

CMD ["sh", "./scripts/start.sh"]