FROM node:latest AS build


RUN apt update && \
    apt install git && \
    apt install openssh-client

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
RUN git clone git@github.com:KarpatkeyDAO/bots-harvesting.git
EXPOSE 3000

# start app
CMD npm run dev 




# # RUN npm build --output-path=dist




# FROM nginx:alpine

# # copy artifact build from the 'build environment'
# COPY --from=build /app/dist /usr/share/nginx/html

# # expose port 80
# EXPOSE 80

# # run nginx
# CMD ["nginx", "-g", "daemon off;"]

