FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Start the application
CMD ["node", "server.js"]