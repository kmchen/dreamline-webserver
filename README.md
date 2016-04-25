### Running mongo server ###
> docker run -p 27017:27017 --name some_name -d docker/repo

### Docker run web server ###
> docker run -p 8080:8080 -e HOST=<IP> -d kmchen/web-server
