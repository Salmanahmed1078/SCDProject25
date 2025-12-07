# Use Node.js 16 LTS as base image
FROM node:16-alpine

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p backups data

# Expose port (if needed for future web interface)
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]

