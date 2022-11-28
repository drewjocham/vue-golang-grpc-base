FROM golang:1.12.16-stretch
RUN apt-get update && apt-get install -y libudev-dev

ARG GOPATH
ENV GOPATH $GOPATH

ARG MY_PWD
ENV MY_PWD ${MY_PWD}

RUN mkdir -p $GOPATH
RUN mkdir -p $MY_PWD

ENV PATH="/usr/local/go/bin:$GOPATH/bin:${PATH}"
RUN GOPROXY=https://proxy.golang.org GO111MODULE=on go get golang.org/x/tools/gopls@latest
WORKDIR $MY_PWD

CMD /go/bin/gopls  -listen=":7050"
