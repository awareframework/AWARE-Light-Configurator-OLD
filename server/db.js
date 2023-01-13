/**
 * Database module for interacting with a MySQL database
 */

import mysql from 'promise-mysql';

const connect = async (ip, port, database, username, password) => {
  console.log("Creating database connection...");

  try {
    const connection = await mysql.createConnection({
      host: ip,
      port: port,
      user: username,
      password: password,
      database: database,
      multipleStatements: true
    });
    console.log("Created database connection to " + database);
    return connection;
  } catch (err) {
    console.error("Failed to create database connection, reason: " + err);
    return null;
  }
};

const disconnect = (connection) => {
  console.log("Closing database connection...");

  try {
    console.log("Database connection closed.");
    connection.end();
  } catch (err) {
    console.error("Failed to close database connection.");
  }
};

/**
 * Checks if the privileges for the user of this connection is correct (needs to be INSERT ONLY).
 * @param ip
 * @param port
 * @param database
 * @param username
 * @param password
 * @return {Promise<{success: boolean, msg: string}>}
 */
const checkInsertPrivileges = async (ip, port, database, username, password) => {
  console.log("Checking privileges for connection...");
  const connection = await connect(ip, port, database, username, password);
  return {'success': true, 'msg': 'Debugging mode: skip database information module.'};
  let result = {'success': false, 'msg': ''};

  if (connection == null) {
    result.msg = "Failed to create connection to database, please check if credentials are correct.";
    return result;
  }

  try {
    const rows = await connection.query('SHOW GRANTS FOR CURRENT_USER');
    const privileges = JSON.stringify(rows);
    console.log('User privileges: ', privileges);

    if (privileges.match(/(ALL|CREATE|DROP|EXECUTE|UPDATE|ROUTINE|EVENT|TRIGGER)/)) {
      result.msg = "User account has too many privileges. Warn user and try to make a new account?";
      return result;
    } else if (!privileges.match(/(INSERT)/)) {
      result.msg = "Insufficient privileges for this MySQL account. Please ask your database administrator to add 'INSERT' privilege to your account.";
      return result;
    } else {
      result.success = true;
      result.msg = "Successfully connected. User account has correct privileges.";
    }
    return result;
  } catch (err) {
    console.error(err);
    return result;
  }
};

/**
 * Checks if the privileges for the user of this connection is correct (needs to have ALL).
 * @param ip
 * @param port
 * @param database
 * @param username
 * @param password
 * @return {Promise<{success: boolean, msg: string}>}
 */
const checkRootPrivileges = async (ip, port, database, username, password) => {
  console.log("Checking privileges for connection...");
  const connection = await connect(ip, port, database, username, password);
  let result = {'success': false, 'msg': ''};//, connection: connection};

  if (connection == null) {
    result.msg = "Failed to create connection to database, please check if credentials are correct.";
    return result;
  }

  try {
    const rows = await connection.query('SHOW GRANTS FOR CURRENT_USER');
    const privileges = JSON.stringify(rows);
    console.log('User privileges: ', privileges);

    if (privileges.match(/ALL/)) {
      result.success = true;
      result.msg = "Successfully connected. User account has correct privileges.";
    } else {
      result.success = true;
      result.msg = "Insufficient privileges for this MySQL account. Please use a root account or ask your database administrator to add 'ALL' privilege to your account.";
    }

    await disconnect(connection);
    return result;
  } catch (err) {
    console.error(err);
    return result;
  }
};

/**
 * Initialize database with the proper tables and user required to run an AWARE study.
 * @param ip
 * @param port
 * @param database
 * @param rootUsername
 * @param rootPassword
 * @param insertUsername
 * @param insertPassword
 * @return {Promise<{success: boolean, msg: string}>}
 */
const initDatabase = async (ip, port, database, rootUsername, rootPassword, insertUsername, insertPassword) => {
  let res = await checkRootPrivileges(ip, port, database, rootUsername, rootPassword);
  if (!res.success) {
    return res;
  }
  const connection = await connect(ip, port, database, rootUsername, rootPassword);

  // Init DB tables
  try {
    const dbInitSql = Assets.getText('sql/db-init.sql');
    await connection.query(dbInitSql);
    console.log("Initialized database");
  } catch (e) {
    res.success = false;
    res.msg = "Failed to initialize database, reason: " + String(e);
    console.error(res.msg)
    return res;
  }

  // Create INSERT-only user
  try {
    const createUserSql = `
      CREATE USER IF NOT EXISTS \'${insertUsername}\'@\'localhost\' IDENTIFIED BY \'${insertPassword}\';
      CREATE USER IF NOT EXISTS \'${insertUsername}\'@\'%\' IDENTIFIED BY \'${insertPassword}\';
      GRANT INSERT ON ${database}.* TO \'${insertUsername}\'@\'localhost\';
      GRANT INSERT ON ${database}.* TO \'${insertUsername}\'@\'%\';
      flush privileges;`;
    await connection.query(createUserSql);
    console.log("Created INSERT-only user");
  } catch (e) {
    res.success = false;
    res.msg = "Failed to create INSERT-only user, reason: " + String(e);
    console.error(res.msg)
    return res;
  }

  await disconnect(connection);
  return res;
};

module.exports = {
  checkInsertPrivileges,
  connect,
  disconnect,
  initDatabase
};
