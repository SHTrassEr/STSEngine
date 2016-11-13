(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function index(req, res) {
        res.render('index', { title: 'Express', year: new Date().getFullYear() });
    }
    exports.index = index;
    ;
    function about(req, res) {
        res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
    }
    exports.about = about;
    ;
    function contact(req, res) {
        res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
    }
    exports.contact = contact;
    ;
    function game(req, res) {
        res.render('game', { title: 'Game', year: new Date().getFullYear(), message: 'Game' });
    }
    exports.game = game;
    ;
});
