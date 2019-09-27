//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const _ = require("lodash");
const ejs=require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

Mongoose.connect("mongodb+srv://vysakhprakash88:vysakh1998@cluster0-aitzv.mongodb.net/todoDB", {useNewUrlParser: true});

const itemsSchema = {
  name: String
};

const Item = Mongoose.model("Item", itemsSchema);


const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultitems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = Mongoose.model("List", listSchema);





app.get("/", function(req, res) {




  Item.find({}, function(err, finditems) {
    console.log(finditems);
    if (finditems.length == 0) {
      Item.insertMany(defaultitems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("suscessfull");
        }
      });

      res.redirect("/");
    } else {

      res.render("list", {
        title: "today",
        newitems: finditems
      });
    }



  });
    });

  app.get("/:new",function(req,res){
    var li= _.capitalize(req.params.new);

    List.findOne({name:li},function(err,found){
      if(!err){
        if(!found){
        const list = new List({
          name:li,
          items:defaultitems
        });

        list.save();
        res.redirect("/"+li);
      }


        else{

          res.render("list", {
            title: found.name,
            newitems: found.items
          });

        }
      }

    });

});

app.post("/", function(req, res) {

  var item = req.body.to;
  var submit=req.body.submit;

  const item4 = new Item({
    name: item,
  });
    if(submit=="today"){

      item4.save();

      res.redirect("/");
    }
    else{
      List.findOne({name:submit},function(err,foundlist){
        foundlist.items.push(item4);
        foundlist.save();
        res.redirect("/"+submit);
      });
    }


  });



  app.post("/delete",function(req,res){
      var check=req.body.check;
    var hidden=req.body.hidden;
    if(hidden=="today"){
      Item.findByIdAndRemove(check,function(err){
        if(!err){

          res.redirect("/");
        }
      });
    }

    else {
      List.findOneAndUpdate({name:hidden},{$pull:{items:{_id:check}}},function(err,result){
        if(!err){
          res.redirect("/"+hidden);
        }
      })

      }


  });








let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}




app.listen (port, function() {
  console.log("server has started at 3000");

});
