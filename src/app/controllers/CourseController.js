const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    async show(req, res, next) {
        try {
            const course = await Course.findOne({ slug: req.params.slug });
            res.render('courses/show', {
                course: mongooseToObject(course)
            })
        } catch (err) {
            next(err);
        }
    }

    // [GET] /courses/create
    async create(req, res, next) {
        try {
            res.render('courses/create')
        } catch (err) {
            next(err);
        }
    }

    // [POST] /courses/store
    async store(req, res, next) {
        try {
            req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
            const course = new Course(req.body);
            await course.save();

            res.redirect(`/me/stored/courses`);
        } catch (err) {
            next(err);
        }
    }

    // [GET] /courses/:id/edit
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id);
            res.render('courses/edit', {
                course: mongooseToObject(course)
            })
        } catch (err) {
            next(err);
        }
    }

    // [PUT] /courses/:id
    async update(req, res, next) {
        try {
            await Course.updateOne({ _id: req.params.id }, req.body);

            res.redirect(`/me/stored/courses`);
        } catch (err) {
            next(err);
        }
    }

    // [DELETE] /courses/:id
    async delete(req, res, next) {
        try {
            await Course.delete({ _id: req.params.id });

            res.redirect(`/me/stored/courses`);
        } catch (err) {
            next(err);
        }
    }

    // [DELETE] /courses/:id/force
    async forceDelete(req, res, next) {
        try {
            await Course.deleteOne({ _id: req.params.id });

            res.redirect(`/me/stored/courses`);
        } catch (err) {
            next(err);
        }
    }

     // [PATCH] /courses/:id/restore
    async restore(req, res, next) {
        try {
            await Course.restore({ _id: req.params.id });

            res.redirect(`/me/trash/courses`);
        } catch (err) {
            next(err);
        }
    }
    
    // [POST] /courses/handle-form-actions
    async handleFormActions(req, res, next) {
        try {
            switch(req.body.action) {
                case 'delete':
                    await Course.delete({ _id: { $in: req.body.courseIds } });

                    res.redirect(`/me/stored/courses`);
                    break;
                
                case 'forcedelete':
                    await Course.deleteMany({ _id: { $in: req.body.courseIds } });

                    res.redirect(`/me/trash/courses`);
                    break;
                
                case 'restore':
                    await Course.restore({ _id: { $in: req.body.courseIds } });

                    res.redirect(`/me/trash/courses`);
                    break;
                
                default:
                    res.json({ message: 'Action is invalid!' })
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CourseController();
