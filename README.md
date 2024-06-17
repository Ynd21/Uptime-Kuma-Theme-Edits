# Traefik Configuration for Uptime Kuma with Rewrite Middleware

This guide explains how to set up Traefik with the `rewrite-body` middleware to inject custom CSS and JavaScript into your Uptime Kuma instance.

## traefik.yml

The `traefik.yml` file defines the static configuration for Traefik, including enabling experimental plugins like `rewrite-body`.
```yaml
experimental:
  plugins:
    rewrite-body:
      moduleName: "github.com/packruler/rewrite-body"
      version: "v0.5.1"
```
  
## fileconfig.yml
```yaml
http:
  routers:      
    uptime:
      entryPoints:
        - websecure
      rule: 'Host(`yourdomain.com`)'
      service: Uptime
      middlewares:
        - "kuma-edits"
  services:    
    Uptime:
      loadBalancer:
        servers:
          - url: http://111.111.111.1111:3001       
  middlewares:
    kuma-edits:
      plugin:
         rewrite-body:
           rewrites:
             - regex: (?i)</head>  # Adds case-insensitive matching
               replacement: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"><script src="https://yourdomainhere.com/edits.js"></script></head>
```


### How to Use

1. **Create the `traefik.yml` and `fileConfig.yml`** files in your Traefik configuration directory.
2. **Replace the placeholders** (like `yourdomain.com` and server IP addresses) with your actual values.
3. **Restart Traefik** to apply the new configuration.

