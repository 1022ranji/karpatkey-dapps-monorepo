
# FROM alpine as builder
# ARG SSH_PRIVATE_KEY
# ENV SSH_PRIVATE_KEY ${SSH_PRIVATE_KEY}

# RUN apk update && \
#     apk add git && \
#     apk add openssh-client && \
#     apk add --no-cache python3 py3-pip

# RUN mkdir -p /root/.ssh/
# RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa
# RUN cat /root/.ssh/id_rsa
# RUN chmod -R 600 /root/.ssh/
# RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

# WORKDIR /app

# clone bots-harvesting
# RUN git clone git@github.com:KarpatkeyDAO/bots-harvesting.git


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

# add app
COPY . /app

# expose port
EXPOSE 3000
EXPOSE 3001

# copy bots-harvesting
# COPY --from=builder /app/bots-harvesting /app/bots-harvesting

# # install deps for bots-harvesting
# RUN pip3 install -r ./bots-harvesting/requirements.txt

# start app
CMD yarn start:reports
