
function sendMail(){
    
//Lee contenido de los difrenetes campos del formulario y los asigna a variables

var name = document.getElementById("name").value; 
var email = document.getElementById("email").value;
var web = document.getElementById("website").value;
var comment = document.getElementById("comment").value;

//Validación de los campos requeridos (Nombre, Email)

if (name == '' || !validateEmail(email)){
    $("#name").addClass( "required" );
    $("#email").addClass( "required" );
    $("#notmailerror").css("display", "block");
}else {
  
      $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          'key': 'TsmIWLUv9JE5tlRnSR6m5g', //API Key asiganada
          'message': {
            'from_email': email, 
            "from_name": name,
            'to': [
              {
                'email': 'contacto@tastypanama.com', //Destinatario del correo
                'name': 'Contacto Tasty Panamá', //Nombre del Remitente
                'type': 'to'
              }
            ],
            'subject': 'Contacto vía Website', //Titulo del correo
            'html': '<h3>Nuevo contacto Tasty Panamá</h3><p>Nombre: ' + name + '</p><p>Email: ' + email + '</p><p>Website: ' + web + '</p><p>Comentario: ' + comment + '</p><p><h5>Datos de contacto recibidos desde el formulario de contacto de tastypanama.com</h5></p>'
          }
        }
      });
    
    /*Se ejecuta cuando el correo ya ha sido enviado*/

    $("#notmail").css("display", "block");
    $("#notmailerror").css("display", "none");
    $("#submit").css("display", "none");
    $("#name").removeClass( "required" );
    $("#email").removeClass( "required" );
    $("#contact :input").prop("disabled", true);
    
    }

}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
    
}

