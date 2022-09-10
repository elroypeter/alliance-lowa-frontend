ARG PORT

FROM nginx:1.17.1-alpine

RUN echo $PORT

COPY /public /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# set dynamic port for heroku dyno
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'

