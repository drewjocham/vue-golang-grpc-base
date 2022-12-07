FROM nginx:1.21.3-alpine

# Configure these later in a pipeline, maybe circle CI?
ARG COMMIT_ID
ARG SOURCE_BRANCH
ENV COMMIT_ID=$COMMIT_ID
ENV SOURCE_BRANCH=$SOURCE_BRANCH

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/*

## Copy the template and mime types
COPY .docker/nginx.conf.template /etc/nginx/etc/nginx/nginx.conf.template
COPY .docker/mime.types /etc/nginx/mime.types

## Log to stdout / stderr
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

## Copy the dist folder to the webroot
COPY ./dist /usr/share/nginx/html
RUN chmod 755 -R /usr/share/nginx/html/*

## Add the startup script
ADD .docker/start.sh /usr/local/bin/
WORKDIR /etc/nginx

## Run the startup script instead og nginx to be able to use env vars on startup
RUN chmod 755 /usr/local/bin/start.sh

## Update deps
RUN apk update && apk upgrade

CMD ["/usr/local/bin/start.sh"]
