const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET] / news
    async index(req, res, next) {
        try {
            const courses = (await Course.find({}));
            res.render('home', {
                courses: mutipleMongooseToObject(courses)
            });
        } catch (err) {
            next(err); // chuẩn Express
        }
    }


    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
