FROM node:current-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
# Bundle app source
ENV MONGO_URL mongodb://mongo:27017/docker-node-mongo
ENV REDIS_URL redis://redis:6379
ENV PORT 3000
ENV NODE_ENV development
ARG JWT_SECRET_ARG
ENV JWT_SECRET $JWT_SECRET_ARG
ARG JWT_REFRESH_TOKEN_ARG
ENV JWT_SECRET $JWT_REFRESH_TOKEN_ARG
ARG JWT_LIFETIME_ARG
ENV JWT_SECRET $JWT_LIFETIME_ARG
EXPOSE 3000
CMD npm run start