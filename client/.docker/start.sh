#!/usr/bin/env sh
set -eu

# Replace env vars in config template and save it as config file
envsubst '${API_HOST}' < /etc/nginx/etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Run nginx
exec /usr/sbin/nginx
