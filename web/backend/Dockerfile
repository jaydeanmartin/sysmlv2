FROM ubuntu:noble

# Set environment variable to avoid interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

USER 0

RUN apt-get update -y

RUN apt-get install -y python3-pip sudo nano ncat

ENV APP_HOME=/app

# Create the app directory
RUN mkdir ${APP_HOME}
 
# Set the working directory inside the container
WORKDIR ${APP_HOME}
 
# Set environment variables 
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1 

ENV PIP_BREAK_SYSTEM_PACKAGES=1
 
# Upgrade pip
# RUN pip install --upgrade pip 

COPY . ${APP_HOME}/
RUN pip install -r requirements.txt


# RUN sed -i 's/\r$//g' ${APP_HOME}/entrypoint.sh
RUN chmod +x ${APP_HOME}/entrypoint.sh

EXPOSE 8000

# let's just keep it running for now to test installing more stuff interactively
# CMD ["tail", "-f", "/dev/null"]
ENTRYPOINT ["/app/entrypoint.sh"]
