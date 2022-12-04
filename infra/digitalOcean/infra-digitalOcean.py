import pulumi_digitalocean as do

instance = do.Domain(
    "test",
    name='mydomain.com',
    ip_address='192.168.10.10'
)
