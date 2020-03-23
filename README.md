# iot-docker

influxDB vs PostgreSQL
- https://portavita.github.io/2018-07-31-blog_influxdb_vs_postgresql
- https://db-engines.com/en/system/InfluxDB%3BPostgreSQL

## Docker
Install
https://github.com/docker/docker-install

    $ curl -fsSL https://get.docker.com -o get-docker.sh
    $ sh get-docker.sh

add user docker group
https://docs.docker.com/install/linux/linux-postinstall/

    $ ...

Create image

    // cria docker img a partir do arquivo ./Dockerfile
    $ docker build -t iot/dockernode .

### Docker Compose
Install https://docs.docker.com/compose/install/

substitua 1.25.4 pela versao desejada

    $ sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    $ sudo chmod +x /usr/local/bin/docker-compose


Uninstall
    $ sudo rm /usr/local/bin/docker-compose

### Docker Hub
Grafana
- https://hub.docker.com/r/grafana/grafana

PostgresSQL
- https://hub.docker.com/_/postgres


## Grafana
docker
- https://grafana.com/docs/grafana/latest/installation/docker/

PostgreSQL
- https://grafana.com/docs/grafana/latest/features/datasources/postgres/

## PostgreSQL

node-postgres
- https://node-postgres.com/

### Tutorial 
 https://www.postgresqltutorial.com/

### with docker

    $ sudo docker pull postgres

    $ docker run --name iot-postgres -v ./postgres/datadir:/var/lib/postgresql/data -e POSTGRES_PASSWORD=iotdatabase -e POSTGRES_DB=db_iot -d postgres

#### with docker secret

    $ echo "iotdatabase" | docker secret create db_pass -

    $ docker ... POSTGRES_PASSWORD_FILE=/run/secrets/db_pass -d postgres


## NODE.js

### MQTT package
https://www.npmjs.com/package/mqtt

### NODE.js with Docker


npm install -y

touch index.js
touch Dockerfile
touch .dockerignore

package.json
    
    "scripts": {
        "start": "node index.js"
    }


create img

    $ docker build -t iot/dockernode .

run

    $ docker run -p 3000:3000 -d iot/dockernode


#### With nodemon

Install 

    $ npm install nodemon

Update package.json

    "scripts": {
        "start": "nodemon index.js"
    }

run 

    $ docker run -p 3000:3000 -v /home/luiz/git/iot-docker/:/usr/app -d iot/dockernode


### With docker-compose

Add file docker-compose.yml

run

    $ docker-compose up