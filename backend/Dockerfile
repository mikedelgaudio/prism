FROM node:18.12.1
WORKDIR /app
ENV PORT=3001
EXPOSE 3001
RUN echo 'Copying /dist to /app'
COPY /dist/ .
RUN echo 'Successfully copied /dist to /app'
USER nobody
RUN echo 'Starting app...'
CMD [ "npm", "start" ]