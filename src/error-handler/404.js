module.exports= (req, res, next)=> {
    res.status(404).send({
        error: 404,
        route:req.path,
        message: 'page not found 404'
    })
    console.log("page not found 404");
};
