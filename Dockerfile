FROM node:lts-alpine as runner

RUN apk update && \
    apk add git && \
    apk add openssh-client && \
    apk add --no-cache python3 py3-pip

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN yarn install

WORKDIR /app
# add app
COPY . ./app

# expose port
EXPOSE 3000
EXPOSE 3001

# start app
CMD yarn start:reports
