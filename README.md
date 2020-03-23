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


    $ npm install -y

    $ touch index.js
    $ touch Dockerfile
    $ touch .dockerignore

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

## MQTT

### With nodejs
- https://medium.com/@alifabdullah/using-mqtt-protocol-with-node-js-f0eb8065b5b6
- https://medium.com/@czarantoniodesouza/experimentando-a-node-mcu-com-nodejs-e-mqtt-798bc5666d2f

### MQTT Broker

#### MOSQUITTO

docker hub

    $ docker pull eclipse-mosquitto

run

    $ docker run -it -p 1883:1883 -p 9001:9001 -v mosquitto.conf:/mosquitto/config/mosquitto.conf -v /mosquitto/data -v /mosquitto/log eclipse-mosquitto

#### verneMQ

##### With docker-compose
Tutorial
- https://www.youtube.com/watch?v=8GY7kqYUiXc
- https://github.com/alvarowolfx/smart-home-mqtt

##### MQTT client - Desktop

MQTT explore

MQTTBox
    - https://chrome.google.com/webstore/detail/mqttbox/kaajoficamnjijhkeomgfljpicifbkaf/

- mqtt://0.0.0.0:1883
- client_id : users : password


## mongoDB

### configure with Studio3t

- https://github.com/alvarowolfx/smart-home-mqtt

mongoDB shell

Create user for verneMQ to access the database

```
use devices
db.createUser({ user: 'vernemq', pwd: 'vernemq', roles: [{role : 'readWrite', db: 'devices'}]})
```
Users vernemq:
```
client_id : users : password

DEADBEEF : device : pwddev
wemos-nodemcu-v3 : device : pwddev
unused : commander : pwdcmd
```

- To cipher key to save in database

```
    $ htpasswd -bnBC 10 "" "pwddev" | tr -d ':\n' | sed 's/$2y/$2a/'
    $ htpasswd -bnBC 10 "" "pwdcmd" | tr -d ':\n' | sed 's/$2y/$2a/'
```

- Create users to access vernemq in mongoDB
```
/* Device */
use devices
db.getCollection("vmq_acl_auth").insert({
    "mountpoint" : "",
    "client_id" : "wemos-nodemcu-v3",
    "username" : "device",
    "passhash" : "$2a$10$ozvotzM5e2LsXjhVMTzYPOkS.h83eXEGItRnXTRkSSBm3AAkn0VAW",
    "publish_acl" : [
        {
            "pattern" : "devices/%c/state/#"
        }
    ],
    "subscribe_acl" : [
        {
            "pattern" : "devices/%c/commands/#"
        }
    ]
})

/* User to send commands */
use devices
db.getCollection("vmq_acl_auth").insert({
    "mountpoint" : "",
    "client_id" : "unused",
    "username" : "commander",
    "passhash" : "$2a$10$o57uY5AJSZ2Y/wf.9o//6erHjYIvAn6ilrbcpRAa0ZSd0gsSNba96",
    "publish_acl" : [
        {
            "pattern" : "devices/+/commands/#"
        }
    ],
    "subscribe_acl" : [
        {
            "pattern" : "devices/+/state/#"
        }
    ]
})
```

## Postgres

Tutorials
- https://levelup.gitconnected.com/build-a-multi-container-application-with-docker-compose-460f6199ef3c


# Ideas

# Comunicacao, Backend and Frontend

## Cominicacao

    Distancia
        LAN
        WAN
    Energia
    Custo
    Camada fisica
        TCP/IP
            socket
            WebSocket
            MQTT
    Serializacao
        Json
        xml
        protocolo buffer

    protocolo mDNS (para para ser encontrada na rede local)

## Backend

Backend
    Dados
        tempo real
            nSQL
        Serie Temporal
            FireBase???
            Inlfux
        Associacao (SQL, pra usuarios e etc)
            Postgres
    Deploy
        Containers
        CI/CD
    Cloud
        
    Mensageria
    Escalabilidade
        Vertical 
        Horizontal
    Alerta e eventos
    Autenticacao e autorizacao
        jwt
    envio-nuvem->dispositivo
    recebimento-Dispositivo=>nuvem

## Frontend
    Web page
        
        react
    
    Dashboard

        grafana
    


# Projeto IoT

### Devices

    IO
        Atuadores
        Sensores
        GPIO
        Protocolos
            I2C
            SPI
            Serial Uart
            CAN
    Hardware
        Microcontrolador
            FrameWork
            Arquitetura
    Configuracao
        iD
        setup Inicial
        Provisionamento
        Atualizacao
        reset de Fabrica
    Design Final
        case
        PCB
        Componentes
        Montagem
        Larga escala

### Comunicacao
    
    Distancia
    Energia
    Custo
    Camada fisica
        IP
            TCP
                sockt
                webSocket
                MQTT
        nao IP
            Bluetooth
            Zigbee
            LoRa
    Serializacao
        Json
        xml
        protocolo buffer

### Backend
   
    Dados
        tempo real
        Serie Temporal
        Associacao
    Deploy
        Containers
        CI/CD
    Cloud
        IaaS
        PaaS
        ...
    Mensageria
    Escalabilidade
        Vertical 
        Horizontal
    Alerta e eventos
    Autenticacao e autorizacao
    envio-nuvem->dispositivo
    recebimento-Dispositivo=>nuvem

### Frontend
    
    Web
    Aplicativos
    Administracao e Backoffice

### Analise de dados
    
    Visualizacao
        relatorios
        dashboard
    Comportamento de usuario
    preenchimento de falhas
    predicao