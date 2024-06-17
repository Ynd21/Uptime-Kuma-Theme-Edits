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


## Edit Uptime Kuma CSS
```css
.fa-header-icon {
    font-size: 32px;
    margin-right: 10px;
    vertical-align: middle;
}
.percentage-90-99 {
color: purple !important; /* Light green for 90-99% */
}
.percentage-75-89 {
color: yellow !important; /* Yellow for 75-89% */
}
.percentage-50-74 {
color: orange !important; /* Orange for 50-74% */
}
.percentage-0-49 {
color: red !important; /* Red for 0-49% */
}

.bounce-arrow-down {
    display: inline-block;
    animation: bounce 1s infinite;
    font-size: 1.5em;  /* Increase the size */
    color: #ffffff;  /* Set the arrow color to white */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);  /* Add a shadow for depth */
    position: relative;
    top: 5px;  /* Move the arrow down by 5px to keep it within the box */
}

/* Style the bouncing arrow to be more visible */
.bounce-arrow {
    display: inline-block;
    animation: bounce 1s infinite;
    font-size: 1.5em;  /* Increase the size */
    color: #ffffff;  /* Set the arrow color to white */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);  /* Add a shadow for depth */
    position: relative;
    top: 5px;  /* Move the arrow down by 5px to keep it within the box */
}



.mt-4 {
  column-count: 2; //Number of columns
}
p.item-name {
    color: white;
}

/* ALSO ENABLE DARKMODE FOR STATUS PAGE*/

:root {
  /* Primary Colour */
  --color-one: #724da0; 
  --color-one-hover: #6C4997;
  
  /* Border Colour*/
  --color-two: #6C4997;
  --color-two-hover: #724da0;
}

.btn-info {
  background-color: #0d1117;
  border-color: #0d1117;
  color: #b1b8c0;
}
.group-title span[data-v-c15243e4] {
color: #0d1117;}

.dark a:not(.btn), .dark .table, .dark .nav-link {
  color: #0d1117;
  text-decoration: none;
}

  .hp-bar-big .beat[data-v-d2b93223] {
  display: inline-block;
  background-color: var(--color-one);
}
.overall-status .ok[data-v-cae9ad4b] {
  color: var(--color-one);
}

.bg-primary {
  border-color: var(--color-two);
}
.title-flex {
  color: #222 !important;
}
/* BG Animation */
body {
    background: -moz-linear-gradient(45deg, #02e1ba 0%, #26c9f2 29%, #972e2e 66%, #ffa079 100%);
    background: -webkit-linear-gradient(45deg, #02e1ba 0%,#26c9f2 29%,#912086 66%,#ffa079 100%);
    background: linear-gradient(45deg, #02e1ba 0%,#26c9f2 29%,#912086 66%,#ffa079 100%);
    background-size: 400% 400%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: space-evenly;
	position: relative; 
}
	
#app > div > div.main > h1, #app > div > div > div.main > h1 {
    /* opacity: 0; */
    background-image: url(https://your.domain.here/uptimecasalogo-WyDNxVuiYrYy.png);
    /* display: none; */
    background-repeat: no-repeat;
    background-size: contain;
    padding-bottom: 100px;
    background-position: center;
}
span.logo-wrapper {
    opacity: 0;
}
#app > div > div.main > h1 > span:nth-child(3) {
    opacity: 0;
}

:root {
    /* Base colors */
    --background-color: #0a192f; /* Dark blue that blends well with black fields */
    --card-background: rgba(255, 255, 255, 0.05); /* Slightly transparent cards */
    --text-color: #FFFFFF;
    --accent-color: #64ffda; /* A bright teal for accents that stands out */
    
    /* Typography */
    --font-primary: 'Roboto', sans-serif;
    
    /* Shadows and Borders */
    --box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    --border-color: rgba(255, 255, 255, 0.15); /* Subtle border color */
}

/* Animated Background with Smokey Bottom Overlay */
body {
    background: linear-gradient(132deg, #0a192f, #203a43, #2c5364);
    background-size: 400% 400%;
    animation: Gradient 15s ease infinite;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-evenly;
    position: relative;
}

body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
    mix-blend-mode: overlay; /* Blends the overlay with the background */
    pointer-events: none; /* Allow interactions with the content */
    z-index: 1; /* Position it above the background but below the content */
}

/* Gradient Animation */
@keyframes Gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Card styling */
div.main {
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    box-shadow: var(--box-shadow);
    padding: 10px;
    margin-bottom: 30px;
    border-radius: 10px;
}

/* Typography and text styling */
h1, h2, h3, p {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Buttons and Links */
.btn, a {
    background-color: var(--accent-color);
    color: var(--background-color);
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
}

.btn:hover, a:hover {
    background-color: darken(var(--accent-color), 10%);
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
}
#app > div > div > div.edit.main > h1 > span:nth-child(3), #app > div > div > div.main > h1 > span:nth-child(3) {
opacity: 0;
}

.group-title {
    color: white;
    font-family: 'Press Start 2P', cursive;
    background-image: url(https://your.domain.here/titlebackground-CcY6CrQOcaTk.png);
border-radius: 10px;
}

.shadow-box.list.p-4.overall-status.mb-4 {
    background-image: url(https://your.domain.here/categorybackground-tanluRsQltcW.png);
     text-align: center;
     color: white;
}
.group-title {
    color: white;
    font-family: 'Press Start 2P', cursive;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Adds depth to the text */
    padding: 10px 20px; /* Adds space around the text */
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 4px 10px rgba(0,0,0,0.2); /* Subtle box shadow for a "lifted" effect */
    margin: 10px 0; /* Adds some margin to the top and bottom */
    font-size: 1.2rem; /* Adjust the font size */
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');

.group-title {
    color: #f0f0f0; /* Light gray for a softer look */
    font-family: 'Press Start 2P', cursive; /* A modern, versatile font */
    background-color: #33334d; /* Deep, muted blue for sophistication */
    border-radius: 20px; /* More pronounced rounded corners for a modern look */
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
    text-transform: uppercase; /* UPPERCASE text for emphasis */
    letter-spacing: 1px; /* Spacing between letters for readability */
    border: 1px solid #47476b; /* Subtle border to define edges without harsh lines */
    transition: all 0.3s ease; /* Smooth transition for hover effects */
}

.group-title:hover {
    background-color: #47476b; /* Slightly lighter background on hover */
    color: #ffffff; /* Brighter white text on hover */
    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3); /* Enhanced shadow for lifted effect */
}
.refresh-info.mb-2 {
    background-image: url(https://your.domain.here/categorybackground-tanluRsQltcW.png);
    text-align: center;
    color: white;
}
.banner-0-0-7.mutiny-banner {
    background-color: orange !important;
}
```

### How to Use

1. **Create the `traefik.yml` and `fileConfig.yml`** files in your Traefik configuration directory.
2. **Replace the placeholders** (like `yourdomain.com` and server IP addresses) with your actual values.
3. **Restart Traefik** to apply the new configuration.
4. **Edit Uptime Kuma and add the above CSS, replacing background-image urls.**

