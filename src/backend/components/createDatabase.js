const createDatabase = (mysql) => {
    
    let connection = mysql.createConnection(process.env.DB_URL);

    const executeQuery = (sql) => {
        return new Promise((resolve, reject) => {
           connection.query(sql, function (err, result) {
              if (err) {
                 console.error(err);
                 reject();
              }
              console.log(sql + '\ndone\n'); 
              resolve(result);
           });
        });
    }
    
    return {
        build: async function () {
            await executeQuery(`
                CREATE DATABASE IF NOT EXISTS pokerone;
            `)
            await executeQuery(` 
                CREATE TABLE IF NOT EXISTS pokerone.utenti (
                    email varchar(50) PRIMARY KEY,
                    password varchar(50) NOT NULL,
                    username varchar(50) NOT NULL,
                    nome varchar(50) NOT NULL,
                    cognome varchar(50) NOT NULL,
                    data_nascita varchar(50) NOT NULL,
                    balance int NOT NULL CHECK (balance >= 0)
                );
            `);
        },
        addUser: async function (email, password, username, nome, cognome, data_nascita, balance) {
            await executeQuery(`
                INSERT INTO pokerone.utenti(email, password, username, nome, cognome, data_nascita, balance)
                VALUES('${email}', '${password}', '${username}', '${nome}', '${cognome}', '${data_nascita}', '${balance}');
            `);
        },
        getUser: async function (email) {
            return await executeQuery(`SELECT * FROM pokerone.utenti WHERE utenti.email='${email}';`);
        },
        getAllUsers: async function() {
            return await executeQuery(`SELECT * FROM pokerone.utenti;`);
        }
    }

}

module.exports = createDatabase;