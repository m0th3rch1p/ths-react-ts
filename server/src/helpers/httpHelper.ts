import express from 'express';

export const respondWith200StatusCode = (res: express.Response,  data: null | {} = null) => {
    res.json(data);
};