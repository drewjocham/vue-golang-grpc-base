How to set up SSL

[Read this documentation](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04)

There is a .crt and .key already present. However, they should be recreated and correctly used. 
The `.key` should be on the sever or stored by a secret manager and configured to be injected into the container/POD.

When running the below listed openssl command you will be prompted to answer several of questions. The most important one is 

`Common Name (e.g. server FQDN or YOUR name) []:server_IP_address`

For local development enter localhost; when creating a `.key` and `.crt` for an actual server use its IP address.

---

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt` 

---




