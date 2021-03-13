FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./prisma ./
RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]