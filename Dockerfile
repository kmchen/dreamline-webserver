FROM node:argon

MAINTAINER Kuang-Ming Chen <kuangmingchen0702@gmail.com>

# Install Git
RUN apt-get update && apt-get install -y git nano

# Pull code from github and run npm install
RUN git clone https://github.com/kmchen/dreamline-webserver.git && \
    cd /dreamline-webserver && \
    npm install

EXPOSE 8080

CMD [ "npm", "start" ]
