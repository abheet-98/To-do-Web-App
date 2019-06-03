var bodyparser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abheet_98:abheet01@cluster0-uys35.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo',todoSchema);

/*var itemOne = Todo({item : 'buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('item saved ');
});

var data = [{item : 'get milk'},{item : 'gym'},{item : 'get photostate'}];*/
var urlencodedParser = bodyparser.urlencoded({extended : false});

module.exports = function(app){

    app.get('/todo',function(req,res){
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos : data});
        });  
    });

    app.post('/todo',urlencodedParser, function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        }); 
    });

    app.delete('/todo/:item',function(req,res){
        Todo.find({item : req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};