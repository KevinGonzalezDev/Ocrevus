window._ = require('lodash');

try
{
 window.$ = window.jQuery = require('jquery');
 window.Popper = require('popper.js').default;
 window.Bootstrap = require('bootstrap');
 window.Bootstrap_Select = require('bootstrap-select');
 window.Swal = require('sweetalert2');
 window.Sb_Admin = require('startbootstrap-sb-admin-2/js/sb-admin-2');
 window.Base = require('./other/base');
}
catch(e){}

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if(token){
 window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}
else{
 console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
