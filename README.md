# Nightwatch Selenium Docker Starter Kit

This repository is for the automation test that uses nightwatch and selenium server, which can deploy selenium server and it's drivers using docker. All the configurations are base on [Selenium Docker](https://github.com/SeleniumHQ/docker-selenium) which comes from SeleniumHQ and it also contains a simple test from Nightwatch which comes from [Nightwatch Test Runner](http://nightwatchjs.org/guide/#test-runner).

## Folder Structure

Project files overview:

```
  README.md         
  package.json
  src/
    test.js                  Simple nightwatch test
  docker-compose-e2e.yml     Yaml file for retrieving docker images from selenium and creating containers
  nightwatch.conf.js         Nightwatch main configuration
  nightwatch.globals.js      File for declaring global variables to be use for Nightwatch
```

## Requirements
* node 
* npm 
* docker

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can create a new project by doing the following:

```bash
$ git clone https://github.com/hanzodarkria/nightwatch-selenium-docker-starter.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. 

```bash
$ npm install
```

After the package installation, let's run the `.yml` file for retrieving the selenium images, building it and running detached containers.

```bash
$ docker-compose -f docker-compose-e2e.yml up -d
```

This will create 3 containers(which is `selenium/hub`, `selenium/node-chrome-debug`, `selenium/node-firefox-debug`). 
You can check the running containers by doing:
```bash
$ docker ps
```

What's happening now is that we want to connect and run our **Nightwatch** test using the **Selenium** environment that we created which is now in containers. 
This is done in the container `selenium/hub` which handles the connection to our **Selenium** chrome server(`selenium/node-chrome-debug`) and 
firefox server(`selenium/node-firefox-debug`). 

You can now check our **Selenium** server by open a browser and go to
```
http://localhost:4444/grid/console
```

Now, for our **Nightwatch** to connect our to **Selenium** server, let's grab the ip address of our `selenium/hub` by doing 
```bash
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
```

And relace the `SELENIUM_HOST` variable that is in `nightwatch.conf.js` with the ip address that you just get from the previous command
```javascript
const SELENIUM_HOST = "YOUR OWN SELENIUM DOCKER CONTAINER IP";
```
Now a VNC server is running for both chrome and firefox, for seeing what's happening for both, you can connect to the VNC server by doing: 

In Mac, Go to **Finder** > **Go** > **Connect to Server** > **(Paste the VNC Port) Server Address** > **Connect**

Chrome VNC Server Port
```
vnc://localhost:5900
```
Firefox VNC Server Port
```
vnc://localhost:5901
```
And the password for both is *`secret`*. 
You can read more about it by going to [Docker Selenium Debugging Section](https://github.com/SeleniumHQ/docker-selenium#debugging)

Now, everything is set up and you're **READY TO GO!!**

## Running the Project

After completing the [installation](#installation) step, you're ready to start!

|`npm run <script>`    |Description|
|-------------------|-----------|
|`test:chrome`      |Runs test in chrome|
|`test:firefox`     |Runs test in firefox|
|`test:e2e`         |Runs test both chrome and firefox|
|`test:e2e:prod`    |Runs test both chrome and firefox in parallel for production|

## To Learn more on how to configure, Please check these repositories

* [Nightwatch](https://github.com/nightwatchjs/nightwatch)
* [Docker Selenium](https://github.com/SeleniumHQ/docker-selenium)

## Thank You

Get love and give love! Clone the project and HAPPY TESTING!




