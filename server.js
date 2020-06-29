const http = require('http')

const server = http.createServer((req, res) => {
	console.log('request received')
	console.log(req.headers)
	res.setHeader('content-type', 'text/html')
	res.setHeader('X-Foo', 'bar')
	res.writeHead(200, {'Content-type': 'text/plain'})
	res.end(`<html maaa=a>
<head>
	<style>
		body div #myid {
			width: 100px;
			background-color: #ff5000;
		}
		body div img {
			width: 30px;
			background-color: #ff1111;
		}
	</style>
</head>
<body>
	<img id="myid">
	<img />
</body>
</html>`)
})

server.listen(8088)