# TeX2SVG

Allow running with node to produce SVG file with TeX input

## INSTALL

Run `npm install` to install required dependencies

## USAGE

### CLI mode

Run with `node tex2svg.js 0 "YOUR TEX INPUT"` to get SVG string as output

### Daemon mode

Run with `node tex2svg.js PORT_NUMBER` to initialize daemon

Access `localhost:PORT_NUMBER?tex=YOUR_TEX_INPUT_WITH_URL_ENCODED` using `curl` to get SVG string as output

A systemd `.service` file included as well

## LICENSE

MIT License

