## Setup

- `cp view/.env.production view/.env.local`
- `chmod 777 setup.sh`
- `./setup.sh`
- go to `http://localhost/`

## Commands
- `make up` - start docker environment
- `make down` - stop docker environment
- `make` / `make help` - show available commands

## SSL Config
[ssl-setup.md](./view/.docker/ssl-setup.md)

## App Engine
If you would like ot use App Engine on GCP there are two yaml files at the root of the
directory. Once App Engine turned on and the SDK is downloaded locally run the below commands to deploy.

Deploy the api container
`gcloud app deploy api/api.yaml`

Deploy the view container
`gcloud app deploy view/view.yaml`

