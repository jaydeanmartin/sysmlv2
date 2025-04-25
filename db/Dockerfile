FROM postgres:12-bullseye

USER root

RUN apt-get update -y && \
    apt-get clean && \
    rm -rf /var/cache/apt

USER postgres
COPY --chown=postgres:postgres docker-entrypoint-initdb.d //docker-entrypoint-initdb.d

WORKDIR /docker-entrypoint-initdb.d