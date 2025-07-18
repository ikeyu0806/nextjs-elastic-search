FROM node:23-bullseye-slim

WORKDIR /app

EXPOSE 3000

COPY . /app

RUN npm i

# RUN npm run build

CMD ["npm", "run", "dev"]