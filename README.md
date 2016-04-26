# Objective

Build a small API that provides airport reviews from customer.
Use the open dataset [link](https://raw.githubusercontent.com/quankiquanki/skytrax-reviewsdataset/master/data/airport.csv)
to provide JSON data via HTTP to be consumed by a frontend-app or other services.

## Setup MongoDB ##

#### Build MongoDB with imported data ####

```sh
$ cd vendor && docker build -t docker/repo .
```
or pull image from docker hub

```sh
$ docker pull kmchen/mongodb
```
#### Running mongodb ####

```sh
$ docker run -p 27017:27017 --name some_name -d docker/repo
```


## Setup web server ##

#### Build web server ####

```sh
$ docker build --tag docker/repo .
```
or pull image from docker hub

```sh
$ docker pull kmchen/web-server
```
#### Running web server ####

```sh
$ docker run -p 8080:8080 -e HOST=<IP> -d docker/repo
```

## API ##
GET /api/all/stats

Returns a collection of all airports  stats ordered by the count of reviews
```
{
    "rest_api_key": "9bf2154e-abc2-4606-96b9-8c20a01f77eb", 
    "client_id": "1096210940045-lqb5rcvtesn96h8dij9ei62e7ha8dcu6.apps.googleusercontent.com"
}
```

GET /api/:airpot/stats

Returns some stats for a specifig airport

```
{
    "rest_api_key": "9bf2154e-abc2-4606-96b9-8c20a01f77eb", 
    "client_id": "1096210940045-lqb5rcvtesn96h8dij9ei62e7ha8dcu6.apps.googleusercontent.com"
}
```

GET /api/:airpot/review

returns a collection of reviews ordered by date as the latest review remains as first element

```
{
    "rest_api_key": "9bf2154e-abc2-4606-96b9-8c20a01f77eb", 
    "client_id": "1096210940045-lqb5rcvtesn96h8dij9ei62e7ha8dcu6.apps.googleusercontent.com"
}
```

## TODO ##

* Add unit test and regression test
* Add a cache service and queueing system
* Add route middleware to validate incoming request
* Handle error checking
* Answer optional questions

## Optional ##

The CSV-file  just  represents  the current state;  we  want  to  be  able  to  update  the data  
in  the system  with  a new version of  the CSV-file, implement a way to  update  the data  
source.   
* 

Right now we  are using this  CSV-file  as  our data  source  for the API but this  may 
change  in  the future. We  want  to be able  to  easily  switch  away  from  the static  CSVfile
to  use a different persistence’s source  like  a queue system. 
Write 3-5 sentences about how a migration to  a queue system  could look  like  and 
what  parts of  the systems have  to  be  changed.


We  want to be  able  to  display only reviews  that  are in  a given ‘overall_rating’-ratio. 
For example,  we  only  want  the API to  return  reviews that  are 2.0 or  above.


Provide a small user  documentation for the API endpoints you implemented.  


Provide unit  tests where you think it  makes sense.
