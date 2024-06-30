# Dockerfile

# Use the official Node.js image as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json /app

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY server /app/server
COPY .env /app

# Expose the port on which your app runs
EXPOSE 5000

# Specify the command to run your app
CMD ["npm", "start"]
