class Base
{
 detectBrowser()
 {
  let getBrowserInfo = function()
  {
   let ua= navigator.userAgent, tem,
   M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

   if(/trident/i.test(M[1]))
   {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE '+(tem[1] || '');
   }

   if(M[1]=== 'Chrome')
   {
    tem= ua.match(/\b(OPR|Edge)\/(\d+)/);

    if(tem!= null)
     return tem.slice(1).join(' ').replace('OPR', 'Opera');
   }

   M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];

   if((tem= ua.match(/version\/(\d+)/i))!= null)
    M.splice(1, 1, tem[1]);

   return M.join(' ');
  };

  if(getBrowserInfo().substr(0,2)=='IE'){
   alert('¡Atención!, Esta usando Internet Explorer, este navegador no es compatible con algunas funciones del sitio web, por favor utilice otro navegador para una mejor experiencia, preferiblemente Google Chrome o Firefox');
  }
 }

 headerScroll()
 {
  $(window).scroll(function()
  {
   if($(this).scrollTop()==0)
    $('#header_fixed').css('background-color', 'rgb(255, 255, 255)');
   else
    $('#header_fixed').css('background-color', 'rgba(0, 0, 0, 0.3)');
  });
 }

 scroll()
 {
  $(window).scroll(function()
  {
   if($(this).scrollTop()>100)
    $(".scroll-top").fadeIn();
   else
    $(".scroll-top").fadeOut();
  });

  $(".scroll-top").click(function()
  {
   $("html, body").animate({ scrollTop: 0 }, 600);

   return false;
  });
 }

 timer()
 {
  let url = '/session';
  let minutes = 360; //6 horas

  fetch(url)
   .then(function(response){
    if(response.ok){
     return response.text();
    }
   })
   .catch(function(error)
   {
    Swal.fire({
     icon: "error",
     title: "<h5 class='text-center'>Atención</h5>",
     html: "<h6 class='text-center'>Por favor revise su conexión a internet.</h6>"
    })
   })
   .then(function(data)
   {
    if(data!='No logueado')
    {
     let number = 60000*minutes;

     setTimeout( function()
     {
      Swal.fire({
       icon: "error",
       title: "<h5 class='text-center'>Atención</h5>",
       html: "<h6 class='text-center'>Su sesión ha caducado, por favor vuelva a loguearse.</h6>"
      })

      location.href = '/logout';
     }, number);
    }
   });
 }

 toggleMenu()
 {
  $('.btnMenuCollapse').on('click', function()
  {
   $('.middle').toggleClass('d-none');
   $('.sidebar').toggleClass('sidebar__on');
  });

  $('.btnMenuNoCollapse').on('click', function()
  {
   $('.middle').toggleClass('d-none');
   $('.sidebar').toggleClass('sidebar__on');
  });
 }
}

window.onload = () => {
 let base = new Base();

 base.detectBrowser();
 base.headerScroll();
 base.scroll();
 base.timer();
 base.toggleMenu();
};
