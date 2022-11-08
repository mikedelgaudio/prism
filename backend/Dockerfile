FROM node:18.12.1
WORKDIR /usr/src/app
RUN echo 'Copying /dist to /app'
COPY /dist/ .
RUN echo 'Successfully copied /dist to /app'
USER nobody
RUN echo 'Starting app...'
CMD [ "npm", "start" ]