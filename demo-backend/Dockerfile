FROM ubuntu:latest
ENV DEBIAN_FRONTEND noninteractive

LABEL maintainer="dgleason1990@gmail.com"

WORKDIR /src

COPY . .

RUN apt update && apt install postgresql postgresql-contrib -y && apt install python3-pip -y
RUN pip3 install -r requirements.txt
