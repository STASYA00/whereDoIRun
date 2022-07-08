# whereDoIRun

## Development notes

if you are getting ```FetchError: request to [YOUR_URL_REQUEST] failed, reason: unable to get local issuer certificate``` try:
```$ npm config set strict-ssl false```

if ```127.0.0.1:3000``` works with ```http``` but not with ```express```, try ```localhost:3000``` instead.