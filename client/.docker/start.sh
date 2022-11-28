#!/usr/bin/env sh
set -eu

# Replace env vars in config template and save it as config file
envsubst '${ODJ_SIBLING_BACKOFFICE_HOST},${API_PORT_SUFFIX},${ODJ_DEP_VARSGENERIC_ENV}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Run nginx
exec /usr/sbin/nginx
