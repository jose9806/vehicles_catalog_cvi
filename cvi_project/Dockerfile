FROM node:latest

ENV PATH="./node_modules/.bin:$PATH"

COPY . /cvi_project

WORKDIR /cvi_project

RUN npm install
RUN npm run build

CMD ["yarn", "start"]