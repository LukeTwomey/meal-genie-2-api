FROM node:20.11.1-alpine3.18

COPY package.json index.js ./
RUN yarn
CMD yarn start