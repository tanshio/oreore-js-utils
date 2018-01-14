/*! @preserve undefined v2.0.0 - tansio | MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['jquery-instagram'] = {})));
}(this, (function (exports) { 'use strict';

var instagram = function () {
    var $list = $('.js-insta');
    var token = $list.data('token');
    var createList = function (post) {
        var block = "\n    <li class=\"m-insta__item\">\n      <a href=\"" + post.link + "\" target=\"_blank\" style=\"background-image: url(" + post.images.standard_resolution.url + ")\"></a>\n    </li>\n    ";
        $list.append(block);
    };
    $(function () {
        var count = 10;
        $.ajax({
            url: "https://api.instagram.com/v1/users/self/media/recent?access_token=" + token + "&amp;count=" + count,
            dataType: 'jsonp'
        }).done(function (evt) {
            console.log(evt);
            var post = evt.data;
            if (!post)
                return;
            for (var i = 0; i < post.length; i++) {
                createList(post[i]);
            }
        });
    });
};

exports.instagram = instagram;

Object.defineProperty(exports, '__esModule', { value: true });

})));
