import mysql from 'mysql2/promise';

export default class Mysql {
    private static config: unknown;
    private static connection: mysql.Connection | null;

    public static async connect (config: unknown): Promise<void> {
        try {
            Mysql.connection = await mysql.createConnection(<mysql.ConnectionOptions> config);
            console.log("DB connection successful");
            return Promise.resolve();
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    public static insert (table: string, fields: [...any], values: Array<unknown>) : Promise<unknown> | undefined {
        let placeholder: string = '?,'.repeat(values.length).replace(/.$/, "");
        const queryBuilder: string = `INSERT INTO ${table}(${fields.join(", ")}) VALUES (${placeholder})`;
        return Mysql.connection?.query(queryBuilder, values);
    }

    public static fetchColumns (table: string, columns: [...any], conditions: string | null = null) { 
        let placeholder: string = `SELECT (${columns.join(",").replace(/.$/, "")}) FROM ${table}`;
        return Mysql.connection?.query(placeholder);
    }

    public static fetchAll (table: string) : Promise <unknown> | undefined {
        const queryBuilder: string = `SELECT * FROM ${table}`;
        return Mysql.connection?.query(queryBuilder);
    }

    public static update (table: string, keys: [...any], contaraints: [...any], values: [...any]) {
        keys.map(key => key + "=?");
        contaraints.map(constraint => constraint += "=?");
        const queryBuilder : string = `UPDATE ${table} SET ${keys} WHERE ${contaraints}`;
        return Mysql.connection?.query(queryBuilder, values);
    }

    public static destroy (table: string, key: string, key_value: any) {
        const queryBuilder : string = `DELETE FROM ${table} WHERE ${key + "?="}`;
        return Mysql.connection?.query(queryBuilder, [key_value]);
    }

    public static batchInsert (table: string, fields: [string], values: [...[...any]]) {
        let placeholder: string = `(${'?'.repeat(fields.length).replace(/.$/, "")}),`.repeat(values.length).replace(/.$/, "");
        console.log("placeholder", placeholder);
        const queryBuilder : string = `INSERT INTO ${table}(${fields.join(", ")}) ${placeholder}`;
        return Mysql.connection?.query(queryBuilder, values);
    }
}