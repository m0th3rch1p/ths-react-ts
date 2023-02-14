import express from 'express';
import { ProductCategory } from '../models/productCategory';
import Mysql from '../database/mysql';

export default class ProductCategoryController {
    public static async store (req: express.Request, res: express.Response)  {
        const { name } : ProductCategory = req.body;
        try {
            await Mysql.insert("product_categories", ["name"], [name]);
            res.status(200).json({status: 'success'});
        } catch (error: unknown) {
            res.status(500).json({message: error});
        }
    }

    public static async fetchAll (req: express.Request, res: express.Response) {
        try {
            const result: any = await Mysql.fetchAll("product_categories");
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async fetchData (req: express.Request, res: express.Response) {
        try {
            const result: any = await Mysql.fetchColumns('product_categories', ['name']);
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async updateData (req: express.Request, res: express.Response) {
        const { id } = req.params;
        const { name } : ProductCategory = req.body;
        try {
           const result: any = await Mysql.update('product_categories', ['name'], ['id'], [<string>name, id]);
           res.status(200).json(result[0].affected_rows); 
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async destroy (req: express.Request, res: express.Response) {
        const { id } = req.params;
        try {
            const result: any = await Mysql.destroy('product_categories', 'id=?', [id]);
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}