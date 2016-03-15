var sql = require('mssql');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var Regex = require("regex");

function executeStatement(connection, req, res) {

    var data = [];
    var registerEmail = [];
    var dictionary = new Object();
    var request = new Request("write your sql query here", function (err, rowCount) {
		
        if (err) {
            console.log(err);
        }

		//Remove any duplicate entry in the row
        registerEmail = data.filter(function (elem, pos) {
            return data.indexOf(elem) == pos;
        })

        registerEmail.forEach(function (email) {

			//Your logic here

        })


        connection.close(function (err) {
            if (err)
                console.log('Error in closing the connection');
            console.log('Connection closed');
        });
		
		//Sort the array list if needed
        var sortable = [];
        for (var vehicle in dictionary)
            sortable.push([vehicle, dictionary[vehicle]])
        sortable.sort(function (a, b) {
            return b[1] - a[1]
        });
		
        var result = [];
        result.push({
            finalResult: sortable            
        });

        res.json(result);
    });

    request.on('row', function (columns) {

        columns.forEach(function (column) {
            if (column.value !== null) {
                if (column.metadata.colName !== null) {
                    if (column.metadata.colName.indexOf("EMail") > -1) {
                        data.push(column.value);
                    }
                }
            }
        });

    });

    connection.execSql(request);
}

module.exports = function (req, res) {

    var config = {
        userName: 'xxxx',
        password: 'xxxx',
        server: 'xxxx',
        connectionTimeout: 300000,
        requestTimeout: 300000,
        options: {
            port: 'xxxx',
            database: 'xxxx.MDF',
        },
        pool: {
            idleTimeoutMillis: 300000,
            max: 100
        }
    }

    var connection = new Connection(config);

    connection.on('connect', function (err) {
        if (err) {
            console.log('error : ' + err);
            return;
        }

        console.log("Connected");
        executeStatement(connection, req, res);
    });
}
