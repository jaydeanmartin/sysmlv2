# Docker image for running SysML v2

This repository contains the recipes and configurations necessary to setup and run the SysML v2 API, Jupyter notebook server, and database to store models. 

The fist requirement is an environment that can run docker containers. On Windows this is Docker-Deskptop. Thi smust be installed and running before the follwowing command can be executed.

Once the repo has been cloned all one needs to do is type:

docker-compose up -d --build

This will build all of hte containers and start them up, running in the background. On a fresh install, this may take over 30 minutes depending on network speed and computer speed.

Once the containers have started, one cen see their logs (output to stdout) by entering:
docker-compose logs -f

This will stay open and continue to display new stdout. This can be exited with crtl-c.

When you want to stop the containers, simply:

docker-compose down -v

The -v option removes the volume that cantains the database, you may not want to do this if you don't want to recreate the database each time you restart the containers. 

The containers can be restarted without building by:

docker-compose up -d

Once the containers have started point a local web browser to localhost:9000/data, this will force teh creation of the database if it doesn't exist - this will spam the stdout with all of the datbase creation commands. Once this has completed, you will see soem text on the page:
{"error":{"requestId":1,"message":""}}

This is normal and means it finished.
To get to the notebook server point the browser to localhost:8888
The first time you go to this page it will ask for a "token" enter "sysmlv2"

I would recommend always hitting lcoalhost::9000/data and then localhost:9000/docs/ before trying to publish in a notebook to make sure things are running properly. localhost:9000/docs/ brings up the swagger page to show the currently implemented REST API Services.



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

(Since I do this once a month, I thought I might write this up - please ignore)

1. Ensure there is a corresponding [API Server](https://github.com/Systems-Modeling/SysML-v2-API-Services/tags) release.
2. On the main branch, follow this [commit](https://github.com/gorenje/sysmlv2-jupyter-docker/commit/2adf4b3fc24a7184e2e5f26ed9edd2d4ffce0370) to update all dockerfiles & Makefile for the new release (in this case 2021-03). Important is also the addition of the [github action](https://github.com/gorenje/sysmlv2-jupyter-docker/blob/2adf4b3fc24a7184e2e5f26ed9edd2d4ffce0370/.github/workflows/2021-03.dockerpush.yml) for generating a docker image.
3. Run `make build` to check that all dockerfiles build locally. Make sure that Docker is running locally.
4. In a terminal window, run `make spin-up` to start a Jupyter server locally.
5. In another termainal window, run `make update-testsuite` to update all the test notebooks in the repository. This also retrieves the notebooks from the Docker images and, in the end, there is a commit similar to this [one](https://github.com/gorenje/sysmlv2-jupyter-docker/commit/3597bc3cc1fa2375163b562b02765b4640e3af22).
6. Create a new branch for the release, something like `release-2021-03` ain't bad :smiley:. On that branch, remove all github actions so that only the one for the branch is left, i.e. [this commit](https://github.com/gorenje/sysmlv2-jupyter-docker/commit/5bba34afa7817098f8f5f2477cf076c9641d9703).
7. Push main and the new branch to github.
8. Done.

## Licensing

Both [SysMLv2 API Server](https://github.com/Systems-Modeling/SysML-v2-API-Services/blob/master/LICENSE) and [SysMLv2 Release](https://github.com/Systems-Modeling/SysML-v2-Release/blob/master/LICENSE) are licensed under the LGPL and this continues to be the case.

**This project does not make any changes to the existing licensing of the
referenced projects.**

This project is also licensed under the [LGPL](/LICENSE).
