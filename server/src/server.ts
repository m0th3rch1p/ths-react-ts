import express from 'express';
import dotenv from 'dotenv';

import Mysql from './database/mysql';
import DBConfig  from './interfaces/index';

import productCategoriesRoute from './routes/productCategory';
import productsRoute from './routes/products';

dotenv.config();
const app = express();

// Middleware Configurations
app.use(express.json());
app.use(express.static('uploads'));

// Configure Routes
app.use('/product_categories', productCategoriesRoute);
app.use('/products', productsRoute);

// Database Connection & Server start
const dbConfig: DBConfig = {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "",
    port: process.env.MYSQL_PORT || "3306",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DB || "",
};


Mysql.connect(dbConfig).then(() => {
    const serverPort: string = process.env.SERVER_PORT || "8080";
    app.listen(serverPort, () => {
        console.log(`server running on port ${serverPort}`);
    });    
}).catch(err => {
    console.log(`Error starting server`);
});