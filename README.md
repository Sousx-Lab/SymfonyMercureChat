# Description:

This app is a simple real-time text chat based on Symfony / Api Platform / Mercure Server and ReactJS…

[![chat-sym.jpg](https://i.postimg.cc/25XPm9pm/chat-sym.jpg)](https://postimg.cc/McVsmDKr)
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