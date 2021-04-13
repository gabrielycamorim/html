window.addEventListener("load", carregar);

function carregar() {
    if (recuperarCookie("token") !== null) {
        let formulario = document.forms["login"];
        formulario.addEventListener("submit", validarFormulario);
       
    } else {
      window.location.href = "telaLogin.html";
    }
}
function voltar() {
    
        window.location.href = "telaCadastro.html";
}

function adicionarCookie(nome, valor, dias) {
    let data = new Date();
    data.setDate(data.getDate() + dias);
    document.cookie = nome + "=" + valor + ";expires=" + data.toUTCString();
}

function apagarCookie(nome) {
    let data = new Date("01/01/1970");
    document.cookie = nome = "=" + ";expires=" + data.toUTCString();
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
    } else { return null; }
}

function getCookie(nome){
    var name = nome + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++){
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if(c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function validarFormulario(event) {
    event.preventDefault();

    let formulario = document.forms["login"];
    let username = formulario.username.value;
    let password = formulario.password.value;


    let user = {
        "username": username,
        "password": password
    };

    fetch('http://138.197.78.0/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(resultado => {
            console.log(resultado.headers.get("Authorization"));
            if(resultado.status == 200) {
                let token = resultado.headers.get("Authorization");
                adicionarCookie("token", token);
                
                window.location.href = 'telaVer.html';
            }else{
                
                alert("deu ruim");
            }

        })
        .catch(error => {
            console.log(error);
        })
    }
       
