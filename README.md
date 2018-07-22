
# Introduction
🚿 A web simple code monitoring system.

<img src="screenshot.png"/>

# Brief explanantion
 - **server** directory includes a back-end server made with go. It supports recieving data from clients(atom pugin) and provides an api for administration.
 - **client** directory includes an administration client made with typescript which supports monitoring clients connected to the server.

# Running the server

## The Docker way

### Prerequisites
 - docker

### Guide

Run the command below.

```
docker run -e USER=changeme -e PASS=changeme -p 5697:5697 ksunhokim/shower-server
```

Alternatively, you can build the image from Dockerfile.

```
git clone https://github.com/sunho/shower-server
cd shower-server
docker build -t shower-server . && docker run -e USER=changeme -e PASS=changeme -p 5697:5697 -it shower-server
```

Now open http://127.0.0.1:5697 in your favorite browser. You will see a tidy and shiny administration client.

## The standard way

### Prerequisites
 - go compiler
 - npm

### Guide
Run the command below.

```
go get github.com/sunho/shower-server
```

This will clone the repo and download every go dependency. Now you have to build the frontend or adiministration client.

```
cd $GOPATH/src/github.com/sunho/shower-server
npm install
npx webpack -p --config webpack.config.prod.js
```

After the build was completed, you should see dist folder full of html/js/css files. Now you can run the server.

```
export USER=changeme
export PASS=changeme
go build
./shower-server
```

The environment variables USER and PASS are going to be used as admin username and password for administarion client. If you run the server directly from the host, this isn't really safe, because every process running on the host can access it. Thus if you're serious, you must use Docker or write a script so that the username and password wouldn't be exposed.

Now open http://127.0.0.1:5697 in your favorite browser. You will see a tidy and shiny administration client.

# Connecting to the server

Install Atom. And then, install "code-shower" package([guide](https://flight-manual.atom.io/using-atom/sections/atom-packages/)). Open edit\>Config... and replace "wss://sunho.kim/shower" with "ws://127.0.0.1:5697" Finally, open packages\>Code Shower\>reload. Now if you edit some arbitrary file, it will be shown in the administarion client.
