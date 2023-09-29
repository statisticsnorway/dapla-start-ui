# Build stage
FROM nginx:1.24-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache nodejs yarn && \
    yarn global add @beam-australia/react-env && \
    apk del curl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .env docker-entrypoint.sh /var/
COPY /build /usr/share/nginx/html


# Change ownership and permissions for NGINX directories
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chown -R nginx:nginx /usr/share/nginx/html/__ENV.js

USER nginx

EXPOSE 8180

ENTRYPOINT ["sh", "/var/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]