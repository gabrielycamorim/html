window.addEventListener("load", carregar);

function carregar() {
    if (recuperarCookie("token") != null) {
        let formulario = document.forms["editar"];
        formulario.addEventListener("submit", validarFormulario);
    } else {
        window.location.href = "telaEditar.html";
    }
}
function voltar(){
    
    window.location.href = "telaLogin.html";
}


function adicionarCookie(nome, valor, dias) {
    let data = new Date();
    data.setDate(data.getDate() + dias);
    document.cookie = nome + "=" + valor + ";expires=" + data.toUTCString();
}

function apagarCookie(nome) {
    let data = new Date("01/01/1970");
    document.cookie = nome + "=" + ";expires=" + data.toUTCString();

}

function recuperarCookie(nome) {
    let cookies = document.cookie;
    let first = cookies.indexOf(nome + "=");
    let str = "";
    if (first >= 0) {
        str = cookies.substring(first, cookies.length);
        let last = str.indexOf(";");
        if (last < 0) {
            last = str.length;
        }
        str = str.substring(0, last).split("=");
        return decodeURI(str[1]);
    } else {
        return null;
    }
}

function validarFormulario(event) {
    event.preventDefault();

    let formulario=  document.forms["editar"];

    let user = {
    "email": formulario.email.value,
    "fullname" : formulario.fullname.value,
    "username" : formulario.username.value,
    "password": formulario.password.value,
    "cpf": formulario.cpf.value,
    "id": formulario.id.value,
    }
}
function editarUser(id, userEditado){
    let token = "token";

    fetch('http://138.197.78.0/users/' +id, {
            method: 'PUT',
            body: JSON.stringify(userEditado),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token

            }
        })
        .then(resultado => {
            console.log(resultado);
        })
        //     console.log(resultado.headers.get("Authorization"));
        //     if(resultado.status == 200) {
        //         let token = resultado.headers.get("Authorization");
        //         adicionarCookie("token", token);
                
        //       //  window.location.href = 'telaEditar.html';
        //     }else{
                
        //         alert("deu ruim");
        //     }

        // })
        .catch(error => {
            console.log(error);
        })
    
function validarFormulario(event) {

    apagarCookie("token");
    window.location.href = "telaEditar.html";
}
}

