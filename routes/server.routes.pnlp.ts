/*
 * GET home page.
 */
import express = require('express');
import pnlp_core = require('../core/pnlp');

export function usermedia(req: express.Request, res: express.Response) {
    UserMedia userMedia = pnlp_core.GetUserMediaBlocks(req.params);
    res.json(JSON.stringify(usermedia));
};