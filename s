<% newitems.forEach(function(fu)){ %>
<%= fu.name; %>
<% } %>

const listSchema = {
  name:String,
  item:[ItemSchema]

};

const List=Mongoose.model("List",listSchema);


  app.get("/:new",function(req,res){
    const li= req.params.new;
    List.findOne({name:li},function(err,found){
      if(!err){
        if(!found){
        const item4 = new List({
          name:li,
          item:defaultitems
        });
      }
      item4.save();
      res.redirect("/"+list);
      }
        else{
          res.render("list", {
            title: found.name,
            newitems: found.item
          });


        }
          });
          });
















          var items = [];
          var workitems = [];

          app.set('view engine', 'ejs');

          app.use(bodyparser.urlencoded({
            extended: true
          }));
          app.use(express.static("public"));

          app.get("/", function(req, res) {

            const date = Date.getDate();


            ite.find({}, function(err, finditems) {
              if (finditems.length == 0) {
                ite.insertMany(defaultitems, function(err) {
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

            app.get("/:new",function(req,res){
              const li= req.params.new;
              list.findOne({name:li},function(err,found){
                if(!err){
                  if(!found){
                  const item4 = new list({
                    name:li,
                    item:defaultitems
                  });
                }
                item4.save();
                res.redirect("/"+list);
                }
                  else{
                    res.render("list", {
                      title: found.name,
                      newitems: found.item
                    });
                  }

              });

          });

          app.post("/", function(req, res) {

            const item = req.body.to;
            const submit=req.body.submit;


              if(submit=="today"){
                const item3 = new ite({
                  name: item,
                });
                item3.save();

                res.redirect("/");
              }
              else{
                list.findOne({name:submit},function(err,foundlist){
                  foundlist.items.push(submit);
                  foundlist.save();
                  res.redirect("/"+submit);
                });
              }


            });



            app.post("/delete",function(req,res){
                var check=req.body.checkbox;
              console.log(check);

              ite.findByIdAndRemove(check,function(err){
                if(err){
                  console.log(err);
                }
                else{
                  res.redirect("/");
                }
              });
            });







          });
