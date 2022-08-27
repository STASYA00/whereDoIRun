# whereDoIRun

## Development notes

if you are getting ```FetchError: request to [YOUR_URL_REQUEST] failed, reason: unable to get local issuer certificate``` try:
```$ npm config set strict-ssl false```

if ```127.0.0.1:3000``` works with ```http``` but not with ```express```, try ```localhost:3000``` instead.

if the runs are not coherent with the map, the issue probably lies in backslashes. They should be double in the encoded string.

## TODO:

define a standard for lat-lon