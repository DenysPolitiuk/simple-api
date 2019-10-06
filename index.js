const app = require('express')();

const nameRoute = (req, res) => {
	const name = req.query.name;
	res.send(`Hello ${name || 'stranger'}!`);
}

app.get('/hello', nameRoute)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running at ${port}`));
