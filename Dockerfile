FROM node:carbon


WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /tmp

RUN cd /tmp && npm i

RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Bootstrap data
WORKDIR /src
ADD . /src
EXPOSE 3332
CMD ["npm", "run", "start:dev"]