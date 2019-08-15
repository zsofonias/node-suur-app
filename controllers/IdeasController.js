
const Idea = require('../models/Idea');

const list = async (req, res, next) => {
    let ideas = await Idea.find({author: req.user.id});
    if (ideas.length < 1) ideas=null;
    res.render('ideas.list', {ideas});
};

const create = (req, res, next) => {
    res.render('ideas.create');
};

const store = (req, res, next) => {
    let errors = [];
    if(!req.body.title){
        errors.push(
            {
                text: 'Title is a required field'
            }
        );
    } 
    if(!req.body.description){
        errors.push(
            {
               text: 'Description is a required field' 
            }
        );
    }

    if(errors.length > 0) {
        return res.render('ideas.create', {
            errors: errors,
            body: req.body
        });
    } else {
        const newIdea = {
            title: req.body.title,
            description: req.body.description,
            author: req.user.id
        };
        Idea.create(newIdea, (err, idea) => {
            if(err) return console.log(err);
            req.flash('success_msg', 'Your Idea has been created');
            res.redirect('/ideas');
        });      
    }   
};

// gets the page to edit its respective idea
const getEditIdea = (req, res, next) => {
    Idea.findById(req.params.id, (err, idea) => {
        if (err) return console.log(err);
        if (idea.author != req.user.id){
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/ideas');
        } else {
            res.render('ideas.edit', {idea});
        }
        
    });
};

const update = (req, res, next) => {
    Idea.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, idea) => {
        if (err) console.log(err);
        req.flash('success_msg', 'Your Idea has been updated');
        res.redirect('/ideas');
    })
}

const remove = (req, res, next) => {
    Idea.findByIdAndDelete(req.params.id, (err, deleted) => {
        if (err) return console.log(err);
        req.flash('success_msg', 'Your Idea has been removed');
        res.redirect('/ideas');
    });
};

module.exports = {
    list: list,
    create: create,
    store: store,
    getEditIdea: getEditIdea,
    update: update,
    remove: remove
};