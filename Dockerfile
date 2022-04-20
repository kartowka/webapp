FROM node:17-alpine

# Create app directory
WORKDIR /app

COPY . .
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
ENV MONGO_URL mongodb://mongo:27017/docker-node-mongo
ENV REDIS_URL redis://redis:6379
ENV PORT 3000
EXPOSE 3000
CMD npm run start