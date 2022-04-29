FROM node:18.0-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8900
CMD npm run dev