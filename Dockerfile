# Use the official Node.js image as a base
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app into the working directory
COPY . .

# Build the NestJS app
RUN npm run build

# Use a smaller image for the runtime environment
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "dist/src/main.js"]

