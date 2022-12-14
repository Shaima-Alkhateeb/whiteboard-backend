'use strict';

const express = require('express');
const router = express.Router();

const { Post, commentModel, userModel } = require('../models/index');

const bearerAuth = require('../middlewares/bearer-auth')
const acl = require('../middlewares/acl')


router.get('/post', bearerAuth, acl('read'), getAllPosts);
router.get('/post/:id', bearerAuth, acl('read'), getOnePost);
router.post('/post', bearerAuth, acl('create'), addPost);
router.put('/post/:id', bearerAuth, acl('update'), updatePost);
router.delete('/post/:id/:userID', bearerAuth, acl('delete'), deletePost);


async function getAllPosts(req, res) {
    let post = await Post.readWithComments(commentModel);
    res.status(200).json({
        post
    });
}

async function getOnePost(req, res) {
    const id = req.params.id;
    let post = await Post.readWithComments(commentModel, id);
    res.status(200).json(post);
}

async function addPost(req, res) {
    let newPost = req.body;
    let post = await Post.create(newPost);
    res.status(201).json(post);
}

async function updatePost(req, res) {
    let id = req.params.id;
    const obj = req.body;
    const updatedPost = await Post.update(id, obj);
    res.status(202).json("Post Updated Successfully");
}

async function deletePost(req, res) {
    const id = req.params.id;
    let deletedPost = await Post.delete(id);
    res.status(204).json("Post Deleted Successfully");
}

module.exports = router;