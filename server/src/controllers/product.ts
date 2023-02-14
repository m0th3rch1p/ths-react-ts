import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import { randomBytes } from 'crypto';
import Product from '../models/product';
import Mysql from '../database/mysql';

export default class ProductController {
    public static async store (req: express.Request, res: express.Response) {
        try {
            const filename = randomBytes(16).toString('hex');
            fs.access('uploads', (err) => {
                if (err) {
                    fs.mkdir('uploads', (err) => {
                        sharp(req.file?.buffer).webp({ quality: 20 }).toFile(`upload/${filename}.webp`, (err: any) => {
                            if (err) {
                                // Revert db insert and send error using websockets
                            }
                        });
                    });
                }
            });
            const { category_id, title, description, post, days, nights } : Product = req.body;
            const results: any = await Mysql.insert('products', ['category_id', 'title', 'description', 'post', 'days', 'nights'], [category_id, title, description, post, days, nights]);
            res.status(200).json(results[0]);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    public static async fetchAll (req: express.Request, res: express.Response) {
        try {
            const result: any = await Mysql.fetchAll("products");
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async fetchData (req: express.Request, res: express.Response) {
        try {
            const result: any = await Mysql.fetchColumns('products', ['category_id', 'title', 'description', 'post', 'days', 'nights']);
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async updateData (req: express.Request, res: express.Response) {
        const { id } = req.params;
        const { category_id, title, description, post, days, nights } : Product = req.body;
        try {
           const result: any = await Mysql.update('products', ['category_id', 'title', 'description', 'post', 'days', 'nights'], ['id'], [category_id, title, description, post, days, nights, id]);
           res.status(200).json(result[0].affected_rows); 
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public static async destroy (req: express.Request, res: express.Response) {
        const { id } = req.params;
        try {
            const result: any = await Mysql.destroy('product_categories', 'id', [id]);
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
};