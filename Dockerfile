FROM node:22.7-alpine3.19
WORKDIR /website
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 5500

CMD ["npm", "run", "dev"]
