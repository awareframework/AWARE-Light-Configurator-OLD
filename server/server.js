// import SlackAPI from 'node-slack';
// const Slack = new SlackAPI(Meteor.settings.private.slack.hookUrl);

import mysql from 'promise-mysql';

Meteor.methods({
    // sendFeedback: function (doc) {
    //     // Important server-side check for security and data integrity
    //     check(doc, FeedbackSchema);
    //
    //     // Build the text
    //     var text = "Name: " + doc.name + "\n" +
    //         "Email: " + doc.email + "\n\n" +
    //         doc.message;
    //
    //     this.unblock();
    //
    //     Slack.send({
    //         text: text,
    //         channel: '#aware_create_dev',
    //         username: 'Feedback form'
    //     });
    // },

    async testDatabase (ip, port, database, username, password) {
        console.log("Testing database connection ...");

        try {
            let dbconfig = {
              host: ip,
              port: port,
              user: username,
              password: password,
              database: database
            }
            const connection = await mysql.createConnection({
                host: ip,
                port: port,
                user: username,
                password: password,
                database: database
            }).catch(function(error){
                if (connection && connection.end) connection.end();
                //logs out the error
                console.log(error);
                result = error;
                return result;
            });
        
            const rows = await connection.query('SHOW GRANTS FOR CURRENT_USER');

            var result = JSON.stringify(rows);
            console.log('on server', result);

            if(result.match( /(ALL|CREATE|DROP|EXECUTE|UPDATE|ROUTINE|EVENT|TRIGGER)/ )) {
                // User account has too many privileges. Warn user and try to make a new account?
                result = "User account has too many privileges. Warn user and try to make a new account?";
                console.log(result);
                
                connection.end();
                return result;
            }

            if(!result.match( /(INSERT)/ )) {
                // User account has insufficient privileges to store data
                result = "Insufficient privileges for this MySQL account. Please ask your database administrator to add 'INSERT' privilege to your account.";
                console.log(result);

                connection.end();
                return result;
            }

            result = "Successfully connected. User account has correct privileges.";
            console.log(result);
            connection.end();
            return result;
        } catch (err) {
            result = "Error establishing a connection to server. Please verify connection details.";
            return result;
        }
        
        // .then(conn => {
        //     connection = conn;
        //     return connection.query('select `name` from hobbits');
        // });

        // return promisedResult;

        // console.log('on server, testDatabase called with ip: ', ip);
        // if (ip == undefined || ip.length <= 0) {
        //     throw new Meteor.Error(404, "Please enter your ip");
        // }

        // // TODO: check for IP format as it can lead to a mysql package crash on connection object.
        // var mysql = require('mysql');
        // var connection = mysql.createConnection({
        //     host: ip,
        //     database: database,
        //     user: username,
        //     password: password
        // });

        // var response = '';

        // connection.connect(function (err) {
        //     if (err) {
        //         console.error('error connecting: ' + err.stack);
        //         response = err.stack;
        //         response = "test";
        //         return String(err.stack);
        //     }

        //     console.log('connected as id ' + connection.threadId);
        //     response = 'connected successfully';
        //     // return String(connection.threadId);
        // });

        // // Create an INSERT and CREATE only account. If this is impossible, give a warning.
        // // connection.query('CREATE USER \'insert\'@\'localhost\' IDENTIFIED BY \'password\';', function (error, results, fields) {
        // //     if (error) throw error;
        // //     return String(error);
        // //     //console.log('The solution is: ', results[0].solution);
        // // });

        // // connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        // //   if (error) throw error;
        // //   console.log('The solution is: ', results[0].solution);
        // // });

        // response = "Aa"

        // connection.end();
        // // return "Welcome " + ip + " " + database;
        // return response;
    }
});
