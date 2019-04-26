const express = require('express');
var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var { Student } = require('../models/Student');
// => localhost:3000/students
router.get('/', (req, res) => {
    Student.find((err, docs) => {
        if (!err) 
            res.send(docs);
        else 
            console.log('Error in retriving Students :' + JSON.stringify(err, undefined, 2));   
        
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) 
        res.status(400).send(`No result in given id ${ id }`);
    Student.findById(id, (err, doc) => {
        if (!err) 
            res.send(doc);
        else
        console.log('Error in retriving Student :' + JSON.stringify(err, undefined, 2));
    });
});

router.post('/', (req, res) => {
    var student = new Student({
        id: req.body.id,
        name: req.body.name,
        office: req.body.office,
        bourse: req.body.bourse
    });

    student.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Student save :' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) 
        res.status(400).send(`No result in given id ${ id }`);
    
    var student = new Student({
        _id: id,
        id: req.body.id,
        name: req.body.name,
        office: req.body.office,
        bourse: req.body.bourse
    });

    Student.findByIdAndUpdate(id, { $set: student }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Student update :' + JSON.stringify(err, undefined, 2));
        }
    });

});


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) 
        res.status(400).send(`No result in given id ${ id }`);
    
    Student.findByIdAndDelete(id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Student delete :' + JSON.stringify(err, undefined, 2));
        }
    });

});

module.exports = router;