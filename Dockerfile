FROM node:18.18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000


CMD ["sh", "-c", "npx prisma migrate dev && npm run start:prod"]