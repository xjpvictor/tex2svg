const http = require('http');
const url = require('url');

function tex2svg(s) {

  const mathjax = require('mathjax-full/js/mathjax.js').mathjax;
  const TeX = require('mathjax-full/js/input/tex.js').TeX;
  const SVG = require('mathjax-full/js/output/svg.js').SVG;
  const liteAdaptor = require('mathjax-full/js/adaptors/liteAdaptor.js').liteAdaptor;
  const RegisterHTMLHandler = require('mathjax-full/js/handlers/html.js').RegisterHTMLHandler;

  const AllPackages = require('mathjax-full/js/input/tex/AllPackages.js').AllPackages;

  const adaptor = liteAdaptor();
  RegisterHTMLHandler(adaptor);

  const tex = new TeX({packages: AllPackages.sort()});
  const svg = new SVG({fontCache: 'local'});
  const html = mathjax.document('', {InputJax: tex, OutputJax: svg});

  const node = html.convert(s);

  return adaptor.outerHTML(node)+'\n';

}

var argv = require('yargs')
  .demand(0).strict()
  .argv;

if (argv._[0] == '0') {
  // cli
  if (typeof argv._[1] == 'undefined' || null === argv._[1])
    console.log('Please input valid tex\n');
  else {
    const tex = argv._[1];
    console.log(tex2svg(tex));
  }
} else if (!isNaN(argv._[0])) {
  // daemon

  http.createServer(function (req, res) {

    const queryObject = url.parse(req.url, true).query;

    if (typeof queryObject.tex == 'undefined' || null === queryObject.tex) {
      res.writeHead(403, {'Content-Type': 'text/plain'});
      res.end('Please input valid tex\n');
      return false;
    }

    const tex = queryObject.tex;

    const svg = tex2svg(tex);

    res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.end(svg);

  }).listen(argv._[0], 'localhost');

} else
  console.log('Please specify port\nFor cli mode usage: node tex2svg.js 0 "math"');

