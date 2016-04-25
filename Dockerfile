FROM node:argon

MAINTAINER Kuang-Ming Chen <kuangmingchen0702@gmail.com>

# Install Git
RUN apt-get update && apt-get install -y git nano

EXPOSE 8080

# Pull code from github and run npm install
RUN git clone https://github.com/kmchen/dreamline-webserver.git && \
    cd /dreamline-webserver && \
    npm install

WORKDIR /dreamline-webserver

CMD ["npm", "start"]
