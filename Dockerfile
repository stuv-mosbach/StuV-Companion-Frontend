FROM nginx:alpine

COPY /platforms/browser/www /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d
