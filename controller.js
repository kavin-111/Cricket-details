const {information} = require('./schema');

module.exports.getinformation = async (req,res) => {
    console.log("recieved")
    const book = await information.findOne({plname:req.params.bid});
    if(book)
        res.send(book);
    else
        res.send({msg:"player not found!"});
}
module.exports.getallbooks = async (req,res) => {
    const books = await information.find({});
    if(books.length != 0)
        res.send(books)
}

