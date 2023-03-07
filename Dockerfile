# FROM node:latest
FROM node:lts-alpine

# node:latest image : size 1.79GB
# RUN apt update && \
#     apt install git && \
#     apt install openssh-client && \
#     apt install python3-pip -y

# node:lts-alpine image : size 988 MB
RUN apk update && \
    apk add git && \
    apk add openssh-client && \
    apk add --no-cache python3 py3-pip


RUN mkdir -p /root/.ssh/
COPY github /root/.ssh/id_rsa
# RUN echo "$SSH_KEY" > /root/.ssh/id_rsa
COPY github.pub /root/.ssh/id_rsa.pub
RUN chmod -R 600 /root/.ssh/
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install

# add app
COPY . /app

# clone bots-harvesting
RUN git clone git@github.com:KarpatkeyDAO/bots-harvesting.git

# install python deps
RUN pip3 install -r ./bots-harvesting/requirements.txt

# expose port
EXPOSE 3000

# start app
CMD npm run dev 
