FROM node:10

ARG NODEJS_PROYECTO
ARG NODEJS_PUERTO


WORKDIR /home/node/app
RUN chmod 777 . -R

# VOLUME ./volumes/nodejs/${NODEJS_PROYECTO}/ .
COPY ./volumes/nodejs/${NODEJS_PROYECTO}/ .

RUN npm install
RUN npm install -g @angular/cli
RUN npm audit fix

EXPOSE ${NODEJS_PUERTO}

CMD npm start