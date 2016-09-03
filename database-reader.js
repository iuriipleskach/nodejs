/**
 * Created by ypleskach on 9/2/16.
 */
'use strict';

var path = require('path');
var fs = require('fs');
var sqlite3 = require("sqlite3").verbose();

class DatabaseReader {

	constructor(databaseName) {
		this.databasePath = path.join(__dirname, databaseName);

		var exists = fs.existsSync(this.databasePath);

		if (!exists) {
			console.log("Creating DB file.");
			fs.openSync(this.databasePath, "w");
		}

		var db = new sqlite3.Database(this.databasePath);
		db.serialize(function () {
			if (!exists) {
				db.run("CREATE TABLE Stuff (thing TEXT)");
				var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

				//Insert random data
				for (var i = 0; i < 100; i++) {
					var rnd = Math.floor(Math.random() * 10000000);
					stmt.run("Thing #" + rnd);
				}
				stmt.finalize();
			}
		});

		db.close();
	}

	getRandomValue(callback) {
		var db = new sqlite3.Database(this.databasePath);
		db.serialize(function () {
			db.get("SELECT thing FROM Stuff ORDER BY RANDOM() LIMIT 1", function (err, row) {
				callback.call(this, row.thing)
			});
		});
		db.close()
	}

}

module.exports = new DatabaseReader("test.db");