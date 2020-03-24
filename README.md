### Description:

ChatSym is a simple real-time text chat based on Symfony / Api Platform / Mercure Server and ReactJS…

# Installation:

#### `composer install`
#### `yarn install`

#### Generate the SSH keys with OpenSSL:
```sh
$ mkdir -p config/jwt
$ openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
$ openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout`
 ```
## Mercure Server:

[Download](https://github.com/dunglas/mercure/releases) Mercure server

[Configure and Run](https://mercure.rocks/docs/hub/install)
