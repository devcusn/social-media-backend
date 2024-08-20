FROM node:18.18-alpine

WORKDIR /app

RUN mkdir uploads

COPY package*.json ./

RUN npm install --force


COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 4001


CMD ["sh", "-c", "npx prisma migrate dev && npm run start:prod"]