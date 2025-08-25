FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .


COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh


# Expose port
EXPOSE 3000

ENTRYPOINT [ "wait-for-it.sh", "blog-db:3306","--" ]
CMD [ "npm","run","dev" ]
