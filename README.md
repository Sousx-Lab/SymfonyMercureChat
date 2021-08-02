# Description:

This app is a simple real-time text chat based on Symfony / Api Platform / Mercure Server and ReactJS…

[![chat-sym.jpg](https://i.postimg.cc/25yBjM5w/chat-sym.jpg)](https://postimg.cc/2qp52Hhb)
## Install dependencies:

#### Php
```bash
 composer install
```
#### Javascript yarn / npm
```bash
 yarn install
```

#### Generate the SSH keys with OpenSSL:
```sh
$ mkdir -p config/jwt
$ openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
$ openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout`
 ```
 
### Environment Variables:
 
#### DATABASE:
setup the environment variables for Mysql database connexion, you will need to add the following environment variables to your ***.env*** file.  
if you have a database already installed and configured, change the ```"root:root"```password and username and version of your Mysql database version ```"serverVersion=8.0"``` .

`DATABASE_URL="mysql://root:root@127.0.0.1:3306/fileshare?serverVersion=8.0"`

Create database:
  ```bash
   php bin/console doctrine:database:create 
  ```

Migrate database:
```bash
 php bin/console doctrine:migrations:migrate 
```

## Mercure Server:

[Download](https://github.com/dunglas/mercure/releases) Mercure server

[Configure and Run](https://mercure.rocks/docs/hub/install)

## Start App
  Run php server
  
```bash
php -S localhost:8080 -t public
```
Run webpack server for assets (yarn or npm)

```bash
 yarn dev-server
```
