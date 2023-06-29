# Args
ARG PORT=3000
ARG NODE_ENV=development

FROM node:lts-alpine as runner

RUN apk update && \
    apk add git && \
    apk add openssh-client && \
    apk add --no-cache python3 py3-pip

# Set env vars
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXTJS_IGNORE_ESLINT=1
ENV NEXTJS_IGNORE_TYPECHECK=0
ENV PORT=${PORT}

WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy all files
COPY . .

# Install dependencies
RUN yarn install --frozen-lockfile

WORKDIR /app/dapps/reports

# Generate cache
RUN yarn generate:cache

# expose port
EXPOSE 3000

# start app
CMD yarn dev
