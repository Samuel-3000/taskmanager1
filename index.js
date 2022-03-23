const express = require('express');
const app = express();
const config = require('./config');
const Task = require('./Models/Task');
const figlet = require('figlet');

app.use(express.urlencoded({extended: false}));

//establish connection to database

config.authenticate().then(function(){
    console.log(figlet.textSync('mySQL Database Connected!', {
        font: 'roman',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 300,
        whitespaceBreak: true
    }));;
}).catch(function(err){
    console.log(err);
});

//get all Tasks:

app.get('/', function(req, res){
    let data = {
        where: {} //for example, put here section: req.params.section  (to search by section)
    }
    
    if(req.query.id !== undefined){
        data.where.id = req.query.id;
    }
    Task.findAll(data).then(function(result){
        res.send(result);
        
    }).catch(function(err){
        res.send(err)
    });
});

//create a new Task

app.post('/', function(req, res){
    Task.create(req.body).then(function(result){
        console.log(req.body);
        res.redirect('/');//redirect to get route to display all Tasks 
    }).catch(function(err){
        res.send(err);
    });
});

//update progress/priority level of Task via Id:

app.patch('/:id', function(req, res){
    let taskId = req.params.id;

        //find the task

    Task.findByPk(taskId).then(function(result){

        //check if task was found

        if(result){

            //update task progress level

            result.progress_level = req.body.progress_level;
            console.log('Patch completed for task "' + result.title + '", -> Progress Level updated to: ' + req.body.progress_level);
            console.log(figlet.textSync('Patch completed for task "' + result.title + '", -> Progress Level updated to: "' + req.body.progress_level + '",', {
                font: 'ghost',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 300,
                whitespaceBreak: true
            }));
            
            result.priority_level = req.body.priority_level;
            console.log(figlet.textSync('Priority Level updated to: "' + req.body.priority_level + '."', {
                font: 'ghost',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 300,
                whitespaceBreak: true
            }));

            //save changes to DB

            result.save().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Task id not found!');
        }
    }).catch(function(err){
        res.send(err);
    });
});

//delete a task:

app.delete('/:id', function(req, res){
    let taskId = req.params.id;
    //find task
    Task.findByPk(taskId).then(function(result){
        if(result){
            //delete the task:
            result.destroy().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Task id not found!');
        }
    })
})

//figlet console logs:

console.log(figlet.textSync('listening on port 3000.......', {
    font: 'poison',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 300,
    whitespaceBreak: true
}));

app.listen(3000, function(){
    console.log(figlet.textSync('Server Online -> Port 3000!', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 300,
        whitespaceBreak: true
    }));
});