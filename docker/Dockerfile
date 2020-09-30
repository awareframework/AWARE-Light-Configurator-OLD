FROM node:8 as build-env

ENV METEOR_ALLOW_SUPERUSER=1

WORKDIR /app

COPY ["./", "./"]

RUN curl https://install.meteor.com/ | /bin/sh; \
    meteor npm i; \
    meteor build --directory /build;

FROM node:8-alpine

EXPOSE 3000

ENV PORT=3000
ENV ROOT_URL=http://localhost

COPY --from=build-env ["/build", "/build"]

WORKDIR /build/bundle/programs/server

RUN npm install -g npm; \
    npm install;

WORKDIR /build/bundle

CMD ["node", "main.js"]
