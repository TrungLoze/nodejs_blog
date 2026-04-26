const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    async storedCourses(req, res, next) {
        try {
            const [courses, deleteCount] = await Promise.all([
                Course.find({}),
                Course.countDocumentsDeleted({})
            ]);
            res.render('me/stored-courses', {
                deleteCount,
                courses: mutipleMongooseToObject(courses)
            });
        } catch (err) {
            next(err); // chuẩn Express
        }
    }

    //[GET] /me/trash/courses
    async trashCourses(req, res, next) {
        try {
            const courses = (await Course.findDeleted({}));
            res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            });
        } catch (err) {
            next(err); // chuẩn Express
        }
    }
}

module.exports = new MeController();
