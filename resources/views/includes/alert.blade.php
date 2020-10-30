@if(session('user.login'))
 <script>
  Swal.fire({
    icon: "success",
    title: "<h5 class='text-center'>¡Buen Trabajo!</h5>",
    html: "<h6 class='text-center'>{{ session('user.login') }}</h6>"
  })
 </script>
@elseif(session('user.fail'))
 <script>
  Swal.fire({
    icon: "error",
    title: "<h5 class='text-center'>Atención</h5>",
    html: "<h6 class='text-center'>{{ session('user.fail') }}</h6>"
  })
 </script>
@elseif(session('user.store'))
 <script>
  Swal.fire({
    icon: "success",
    title: "<h5 class='text-center'>¡Buen Trabajo!</h5>",
    html: "<h6 class='text-center'>{{ session('user.store') }}</h6>"
  })
 </script>
@endif
