window.addEventListener("load", carregar);

function carregar() {
  
        let formulario = document.forms["cadastro"];
        formulario.addEventListener("submit", validarFormulario);

}

function validarFormulario(event) {
    event.preventDefault();

    let formulario=  document.forms["cadastro"];

    let user = {
    "email": formulario.email.value,
    "fullname" : formulario.fullname.value,
    "username" : formulario.username.value,
    "password": formulario.password.value,
    "cpf": formulario.cpf.value
    }


fetch('http://138.197.78.0/sign-up', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(resultado => {
            if(resultado.status == 200) {
                window.location.href = 'telaLogin.html';
            }else{
                alert("deu ruim");
            }

        })
        .catch(error => {
            console.log(error);
        })


}    

