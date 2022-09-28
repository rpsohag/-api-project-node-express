const showHomePage = (req, res) => {
    res.status(200).json({
        "message" : "This is Home page"
    });
}


module.exports = {
    showHomePage
}