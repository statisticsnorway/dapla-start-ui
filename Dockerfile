FROM nginx:1.23.3-alpine

RUN apk update  \
    && apk upgrade  \
    && apk add --no-cache nodejs yarn  \
    && yarn global add @beam-australia/react-env

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .env docker-entrypoint.sh /var/
COPY /build /usr/share/nginx/html

EXPOSE 8180

ENTRYPOINT ["sh", "/var/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
