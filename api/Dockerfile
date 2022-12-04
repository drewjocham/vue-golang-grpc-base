# Dockerfile References: https://docs.docker.com/engine/reference/builder/

# Start from the latest golang base image
FROM golang:1.19.3-alpine3.16

# Configure these later in a pipeline
ARG COMMIT_ID
ARG SOURCE_BRANCH
ENV COMMIT_ID=$COMMIT_ID
ENV SOURCE_BRANCH=$SOURCE_BRANCH

# Add Maintainer Info
LABEL maintainer="Drew Jocham <contact@jocham.io>"

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy everything from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -o main .

# Expose port 8080 to the outside world
EXPOSE 8081
EXPOSE 8082

# Command to run the executable
CMD ["./main"]
