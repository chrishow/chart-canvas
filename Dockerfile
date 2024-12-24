# Use the official Node.js 22 image as the base image
FROM node:22

# Set the working directory
WORKDIR /src

# Copy files
COPY . .

# Install dependencies
RUN npm install


# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]