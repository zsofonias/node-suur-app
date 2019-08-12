
const Idea = require('../models/Idea');

const list = async (req, res, next) => {
    const ideas = await Idea.find({});
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
        };
        Idea.create(newIdea, (err, idea) => {
            if(err) return console.log(err);
            console.log(idea);
            res.redirect('/ideas');
        });      
    }   
};

const editIdea = (req, res, next) => {
    Idea.findById(req.params.id, (err, idea) => {
        if (err) return console.log(err);
        res.render('ideas.create', {
            body: idea,
        });
    });
};

const deleteIdea = (req, res, next) => {
    Idea.findByIdAndDelete({_id : req.params.id}, (err, deleted) => {
        if (err) return console.log(err);
        res.redirect('/ideas');
    });
};

module.exports = {
    list: list,
    create: create,
    store: store,
    editIdea: editIdea,
    deleteIdea: deleteIdea
}