import { partInfo, machineNames, MachineType, PaintingStationPart, WeldingRobotPart, QualityControlStationPart, AssemblyLinePart } from '../native-app/data/types'

type User = {
    ID: number,
    username: string,
    password: string,
    session: string,
    lastLogin: string
}

async function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bellsant'
    });
}

export function old(username: string, password: string) {
    console.log('mysql')
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'users'
    });

    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error: any, results: any, fields: any) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });

    connection.end();
}


import mysql from 'mysql2/promise';

export async function checkAuth(username: string, session: string) {
    let result = false;
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bellsant',
    });

    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            `SELECT * FROM users WHERE username = "${username}"`
        );
        console.log(Date.now())
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available

        if (Array.isArray(results)) {
            const user = results[0] as User;
            console.log('session ', user.session, session)
            if (user.session === session) {
                result = true;
            }

        }

    } catch (err) {
        console.log(err);
    }
    connection.end();
    return result;
}

export async function login(username: string, password: string) {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bellsant',
    });

    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            `SELECT * FROM users WHERE username = "${username}"`
        );
        console.log(Date.now())
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available

        if (Array.isArray(results) && results.length > 0) {
            const user = results[0] as User;

            const [resultss, fieldss] = await connection.query(
                `UPDATE users SET session = UUID(), lastLogin = CURRENT_TIMESTAMP WHERE ID = ${user.ID}`
            );
            console.log('add results:  ', resultss); // results contains rows returned by server
            console.log('add fields: ', fieldss); // fields contains extra meta data about results, if available
            const [session] = await connection.query(
                `SELECT session FROM users WHERE ID = ${user.ID}`
            );
            console.log('session:  ', session);
            if (Array.isArray(session) && session.length > 0) {
                return session[0];
            }
        } else {
            console.log("User doesnt exist, please sign up");
        }

    } catch (err) {
        console.log(err);
    }

}


export async function logout(username: string, password: string) {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bellsant',
    });

    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            `SELECT * FROM users WHERE username = "${username}"`
        );
        console.log(Date.now())
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available

        if (Array.isArray(results) && results.length > 0) {
            const user = results[0] as User;

            const [resultss, fieldss] = await connection.query(
                `UPDATE users SET session = NULL, WHERE ID = ${user.ID}`
            );
            console.log('add results:  ', resultss); // results contains rows returned by server
            console.log('add fields: ', fieldss); // fields contains extra meta data about results, if available
            // const [session] = await connection.query(
            //     `SELECT session FROM users WHERE ID = ${user.ID}`
            // );
            // console.log('session:  ', session);
            // if (Array.isArray(session) && session.length > 0) {
            //     return session[0];
            // }
        } else {
            console.log("User doesnt exist, please sign up");
        }

    } catch (err) {
        console.log(err);
    }

}


export async function signUp(username: string, password: string) {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bellsant',
    });

    try {
        const [results, fields] = await connection.query(
            `SELECT * FROM users WHERE username = "${username}";`
        );
        console.log(Date.now())
        console.log('results:  ', results); // results contains rows returned by server
        console.log('fields: ', fields); // fields contains extra meta data about results, if available
        if (Array.isArray(results)) {
            if (results.length > 0) {
                console.log("user already exists");
            } else {
                console.log("adding new user");
                const [results, fields] = await connection.query(
                    `INSERT INTO users (username, password) VALUES ("${username}","${password}");`
                );
                console.log('add results:  ', results); // results contains rows returned by server
                console.log('add fields: ', fields); // fields contains extra meta data about results, if available

                const [resultss, fieldss] = await connection.query(
                    `SELECT * FROM users WHERE username = "${username}";`
                );
                console.log(Date.now())
                console.log('resultss:  ', resultss); // results contains rows returned by server
                console.log('fieldss: ', fieldss); // fields contains extra meta data about results, if available
                if (Array.isArray(resultss)) {
                    console.log('returning ', resultss[0])
                    return resultss[0];
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}


export async function addMachine(part: partInfo) {

    // Create the connection to database
    const connection = await createConnection();
    const partApi = {
        [MachineType.WeldingRobot.valueOf()]: MachineType.WeldingRobot.valueOf(),
        [MachineType.AssemblyLine.valueOf()]: MachineType.AssemblyLine.valueOf(),
        [MachineType.PaintingStation.valueOf()]: MachineType.PaintingStation.valueOf(),
        [MachineType.QualityControlStation.valueOf()]: MachineType.QualityControlStation.valueOf()
    }

    try {

        // const [results, fields] = await connection.query(
        //     `INSERT INTO ${partApi[part.name]} (username, password) VALUES ("${username}","${password}");`
        // );

        // console.log(Date.now())
        // console.log('results:  ', results); // results contains rows returned by server
        // console.log('fields: ', fields); // fields contains extra meta data about results, if available
        // if (Array.isArray(results)) {
        //     if (results.length > 0) {
        //         console.log("user already exists");
        //     } else {
        //         console.log("adding new user");
        //         const [results, fields] = await connection.query(
        //             `INSERT INTO users (username, password) VALUES ("${username}","${password}");`
        //         );
        //         console.log('add results:  ', results); // results contains rows returned by server
        //         console.log('add fields: ', fields); // fields contains extra meta data about results, if available

        //         const [resultss, fieldss] = await connection.query(
        //             `SELECT * FROM users WHERE username = "${username}";`
        //         );
        //         console.log(Date.now())
        //         console.log('resultss:  ', resultss); // results contains rows returned by server
        //         console.log('fieldss: ', fieldss); // fields contains extra meta data about results, if available
        //         if (Array.isArray(resultss)) {
        //             console.log('returning ', resultss[0])
        //             return resultss[0];
        //         }
        //     }
        // }
    } catch (err) {
        console.log(err);
    }
}



export async function partPost(machineType: MachineType, part: partInfo) {
    console.log("partPost", machineType, part, `INSERT INTO ${machineType} ("${part.name}") VALUES ("${part.value});`);
    // Create the connection to database
    const connection = await createConnection();
    try {

        // need input sanitation here
        const [machine, machineFields] = await connection.query(
            `Select * FROM ${machineType};`
        );

        if (Array.isArray(machine) && machine.length === 0) {
            const [results, fields] = await connection.query(
                `INSERT INTO ${machineType} (${part.name}) VALUES ("${part.value}");`
            );

        } else {
            const [results, fields] = await connection.query(
                `UPDATE ${machineType} SET "${part.name}" = "${part.value};`
            );
        }

    } catch (err) {
        console.log(err);
    }
}