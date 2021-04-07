FROM node:14-alpine

ENV ENVIRONMENT=production
ENV PORT=5000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["node", "./bin/run"]
