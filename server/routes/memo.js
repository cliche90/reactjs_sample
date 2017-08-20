import express from 'express';
import Memo from '../model/memo';
import mongoose from 'mongoose';

const router = express.Router();

/*
    Write Memo: POST /api/memo
    Body Sample: {
        contents: "sample"
    }
    Error Code:
        1. NOT LOGGED IN
        2. EMPTY CONTENTS
 */
router.post('/', (req, res) => {
    // check login
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // check contents
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // create new memo
    let memo = new Memo({
        writer: req.body.loginInfo.username,
        contents: req.body.contents
    });

    // save new memo
    memo.save(err => {
        if(err) throw err;
        return res.json({
            success: true
        })
    });

});

/*
    Modify Memo: PUT /api/memo/:id
    Body Sample: {
        contents: "sample"
    }
    Error Code:
        1. INVALID ID
        2. EMPTY CONTENTS
        3. NOT LOGGED IN
        4. NO RESOURCE
        5. PERMISSION FAILURE
 */
router.put('/:id', (req, res) => {

    // validate id
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    if(typeof req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // check login
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // find memo & modify
    Memo.findById(req.params.id, (err, memo) => {
        if(err) throw err;

        if(!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        if(memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        memo.contents = req.body.contents;
        memo.date.edited = new Date();
        memo.is_edited = true;

        memo.save((err, memo) => {
            if(err) throw err;
            return res.json({
                success: true
            });
        });
    })



});

/*
    Delete Memo: DELETE /api/memo/:id
    Error Code:
        1. INVALID ID
        2. NOT LOGGED IN
        3. NO RESOURCE
        4. PERMISSION FAILURE
 */

router.delete('/:id', (req, res) => {

    // validate id
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // check log in
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // find meme & check for writer
    Memo.findById(req.params.id, (err, memo) => {
        if(err) throw err;

        if(!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        if(memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILUER",
                code: 4
            });
        }

        // remove memo
        Memo.remove({_id: req.params.id}, err => {
            if(err) throw err;
            res.json({
                success: true
            });
        });
    })
});

/*
    Read Memo: GET /api/memo
 */
router.get('/', (req, res) => {
    Memo.find()
    .sort({"_id": -1})
    .limit(6)
    .exec((err, memos) => {
        if(err) throw err;
        res.json(memos);
    });
});

export default router;