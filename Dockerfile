FROM node:18-alpine3.16
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /
COPY package.json ./
COPY index.js /
COPY . /
RUN npm install
EXPOSE 5000
CMD npm start --host 0.0.0.0 --port 5000
