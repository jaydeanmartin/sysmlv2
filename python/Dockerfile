FROM python:3.13-slim-bookworm

RUN apt-get update -y && \
    apt-get install -y \
    wget && \
    apt-get clean && \
    rm -rf /var/cache/apt

# define a home directory for installing things
ENV HOME=/usr/src

# set environmnet variables
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

ENV APP_HOME=/usr/src/sysml

# set work dir
WORKDIR $APP_DIR

# install FastAPI
RUN pip install 'fastapi[standard]'
# pip install other requirements using the requirements file
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the code

COPY src/ .

# Add the current directory to PATH so Python can import modules
ENV PATH="$PATH:$APP_HOME"

EXPOSE 8080

# running in dev mode allows code to auto-reload, but also pegs cpu and leaks memory
# since we aren't setting up a volume to edit code live, no need to run dev mode
# CMD ["fastapi", "dev", "/api/main.py", "--port", "8080", "--host", "0.0.0.0"]
CMD ["fastapi", "run", "/api/main.py", "--port", "8080", "--host", "0.0.0.0"]