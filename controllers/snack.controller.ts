const path = require('path');

exports.goToHomePage = (req: any, res: any, next: any) => {
    console.log('HOME PAGE');
    res.render('home');
};
