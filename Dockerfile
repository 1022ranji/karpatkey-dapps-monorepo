
FROM node:lts-alpine

RUN apk update && \
    apk add git && \
    apk add openssh-client && \
    apk add --no-cache python3 py3-pip

# RUN --mount=type=secret,id=SSH_PRIVATE_KEY \
#    export SSH_PRIVATE_KEY=$(cat /run/secrets/SSH_PRIVATE_KEY)
   
# RUN mkdir -p /root/.ssh/
# RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa
# RUN chmod -R 600 /root/.ssh/
# RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

RUN mkdir -p /root/.ssh/
RUN --mount=type=secret,id=SSH_PRIVATE_KEY \
    cat /run/secrets/SSH_PRIVATE_KEY >> /root/.ssh/id_rsa
RUN chmod -R 600 /root/.ssh/
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN yarn install --pure-lockfile

# add app
COPY . /app

# clone bots-harvesting
RUN git clone git@github.com:KarpatkeyDAO/bots-harvesting.git

# install python deps
RUN pip3 install -r ./bots-harvesting/requirements.txt

# expose port
EXPOSE 3000
EXPOSE 3001

# start app
CMD yarn start:reports
