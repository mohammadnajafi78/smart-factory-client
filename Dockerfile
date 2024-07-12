# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Install a simple server for serving static content
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable
ENV SKIP_PREFLIGHT_CHECK=true
ENV GENERATE_SOURCEMAP=false
ARG REACT_APP_API_BASE_URL=http://82.115.25.219:8000
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ARG REACT_APP_API_CHAT_URL=ws://82.115.25.219:8000/ws
ENV REACT_APP_API_CHAT_URL=${REACT_APP_API_CHAT_URL}

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]
