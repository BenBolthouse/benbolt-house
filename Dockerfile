FROM node:14-alpine

ENV ENVIRONMENT=production
ENV PORT=5000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx sass views/style.scss static/style.min.css --style compressed

EXPOSE 5000

CMD ["node", "./bin/run"]
