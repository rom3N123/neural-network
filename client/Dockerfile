FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY . ./

RUN yarn install

EXPOSE 1420

CMD ["yarn", "dev", "--", "--host", "0.0.0.0"]


