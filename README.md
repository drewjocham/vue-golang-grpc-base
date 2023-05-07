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

## GCP App Engine
If you would like ot use App Engine on GCP there are two yaml files at the root of the
directory. Once App Engine turned on and the SDK is downloaded locally run the below commands to deploy.

## Manual GCP App Engine deployment `not recommended` use a ci/cd tool
Deploy the api container
`gcloud app deploy api/app.yaml`

Deploy the view container
`gcloud app deploy view/app.yaml`

## GCP App Engine Setup with Cloud Build
1) Enable App Engine
   - [setup a default container](https://cloud.google.com/appengine/docs/flexible/go/create-app) this can take a few min
   - Need to be signed in to gcp `gcloud auth login`
2) Enable Repository on cloud build
   - this service account will need the "service account user“ role
3) Enable Artifact Registry API
4) Enable App Engine API Admin
5) Create an artifact repository, here I called it personal
6) In Cloud repository authenticate your github account
   - Choose the branch

