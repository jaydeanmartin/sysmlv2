# Docker image for running SysML v2

This repository contains the recipes and configurations necessary to setup and run the SysML v2 API, Jupyter notebook server, and database to store models. 

The fist requirement is an environment that can run docker containers. On Windows this is Docker-Deskptop. Thi smust be installed and running before the follwowing command can be executed.

Once the repo has been cloned all one needs to do is type:

docker compose build

This will build three containers. On a fresh install, this may take over 30 minutes depending on network speed and computer speed.

docker compose up -d

This command will start them up, running in the background. 

Once the containers have started, one cen see their logs (output to stdout) by entering:
docker compose logs -f

This will stay open and continue to display new stdout. This can be exited with crtl-c.

When you want to stop the containers, simply:

docker compose down 

this command will stop all of the containers while leaving the shared volume containing the
database on the disk, keeping all of the saved data available when the containers are restarted.

or 

docker compose down -v

The -v option removes the volume that cantains the database, you may not want to do this if you don't want to recreate the database each time you restart the containers. 

The containers can be restarted without building by:

docker compose up -d

Once the containers have started point a local web browser to localhost:9000/data, this will force the creation of the database if it doesn't exist - this will spam the stdout with all of the datbase creation commands. Once this has completed, you will see some text on the page:
{"error":{"requestId":1,"message":""}}

This is normal and means it finished.

To get to the notebook server point the browser to localhost:8888/lab
The first time you go to this page it will ask for a "token" enter "sysmlv2"

I would recommend always hitting localhost::9000/data and then localhost:9000/docs/ before trying to publish a notebook to make sure things are running properly. localhost:9000/docs/ brings up the swagger page to show the currently implemented REST API Services.



## Production Use?

Don't.

This isn't designed for production use, this is for local or trusted use only.

## Example Notebooks

There are a few example notebooks included in the image, their usefulness
might vary according to your experience level.

## Creating Your Own Notebooks

There is a "mydata" folder that you can create your own notebooks in. It is tied to your local file system, and thus will persist over time.

## Inspiration

- [MBSE4U.com](https://mbse4u.com/2020/12/21/sysml-v2-release-whats-inside/) is where I found the meta commands.
- Also from MBSE4U.com, the example [notebook](https://nbviewer.jupyter.org/github/MBSE4U/SysMLv2JupyterBook/blob/master/SysMLv2JupyterBook.ipynb) at [nbviewer.jupyter.org](https://nbviewer.jupyter.org).

## Building a new Release

When a new [release tag](https://github.com/Systems-Modeling/SysML-v2-Release/tags) becomes available, the following things need doing:



## Licensing

Both [SysMLv2 API Server](https://github.com/Systems-Modeling/SysML-v2-API-Services/blob/master/LICENSE) and [SysMLv2 Release](https://github.com/Systems-Modeling/SysML-v2-Release/blob/master/LICENSE) are licensed under the LGPL and this continues to be the case.

**This project does not make any changes to the existing licensing of the
referenced projects.**

This project is also licensed under the [LGPL](/LICENSE).
