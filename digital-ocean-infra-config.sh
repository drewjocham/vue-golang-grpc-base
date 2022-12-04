# https://www.pulumi.com/registry/packages/digitalocean/installation-configuration/

export DIGITALOCEAN_TOKEN=XXXXXXXXXXXXXX
pulumi config set digitalocean:token XXXXXXXXXXXXXX --secret

export SPACES_ACCESS_KEY_ID=XXXXXXXXXXXXXX
export SPACES_SECRET_ACCESS_KEY=XXXXXXXXXXXXXX

pulumi config set digitalocean:spaces_access_id XXXXXXXXXXXXXX \
    && pulumi config set digitalocean:spaces_secret_key XXXXXXXXXXXXXX --secret
