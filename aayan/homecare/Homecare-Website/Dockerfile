# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application runs on
EXPOSE 3001

# Start the app with PM2
CMD ["pm2-runtime", "start", "app.js", "--name", "homecare", "--no-daemon"]
