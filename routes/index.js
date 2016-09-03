var express = require('express');
var router = express.Router();
var database = require('../database-reader');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

// https://expressjs.com/en/guide/routing.html
router.get('/calculator/:x-:y', function (req, res, next) {
	// Вова, попробуй эти строки без Number и обрати внимание на результат x+y
	// const x = req.params['x']
	// const y = req.params['y']
	const x = Number(req.params['x']);
	const y = Number(req.params['y']);
	console.log(x);
	console.log(y);
	console.log(x + y);
	// calculator - имя jade файла который я создал и добавил в проект. multiplication,
	// subtractions, addition - переменные внутри jade файла которые я записываю в джаваскрипте ниже
	res.render('calculator', {
		multiplication: x * y,
		subtraction: x - y,
		addition: (x + y)
	});
});

router.get('/random', function (req, res, next) {
	database.getRandomValue(function (randomValue) {
		console.log(randomValue);
		res.json({value: randomValue})

	})
});


module.exports = router;
