const path = require('path');

exports.pageNotFound = (req: any, res: any, next: any) => {
    res.status(404).render('page-not-found', { pageTitle: 'Page Not Found', path: '/404' });
}