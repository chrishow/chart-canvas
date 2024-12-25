# Description: Dockerfile for the nodejs application
FROM node:12-alpine

# Set the working directory
WORKDIR /src

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install --prod
RUN npm rebuild canvas --build-from-source


# Copy files
COPY . .


# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "src/index.js"]