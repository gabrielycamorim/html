window.addEventListener("load", carregar);

function carregar(event) {
    if (recuperarCookie("token") != null) {
        let formulario = document.forms["logout"];
        mostrarTabela();
        //formulario.addEventListener("submit", sair);
    } else {
         window.location.href = "telaLogin.html";
    }
  
}


function mostrarTabela(){
    document.getElementById("mostrarTable").style.display = 'block';
    escolherUser();
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



function editUser(id)
{
    let token = recuperarCookie("token");
    window.location.href = "telaEditar.html";
} 

function deleteUser(id) {
    let token = recuperarCookie("token");

    fetch('http://138.197.78.0/users/' + id,
        {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }
        })
        .then(resultado => {
            console.log("header", resultado.headers)
            console.log("resultado", resultado)

            if (resultado.status == 200) {
                
                mostrarTabela();
            }

            else {
                alert("Não foi possível realizar o processo!");
            }

            return resultado.json();
        })

        .catch(error => {
            console.log(error);
        })
}
function mostrarTabela(){
    document.getElementById("tabela").innerHTML ="";
    let token = recuperarCookie("token");
    
    console.log("" + token );

fetch('http://138.197.78.0/users', {
    method: 'GET',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": token
    }
})
.then(resultado => {

    if(resultado.status == 200) {
        return resultado.json();
               
            }else{
                alert("Deu ruim");
            }
        
      
})
.then(data=>{
    data.forEach(user =>{
        let linha = '<tr class="cliente">' +
        '<td class="cor">'+user.username+'</td>'+
        '<td class="cor">'+user.password+'</td>'+
        '<td class="cor">'+user.email+'</td>'+
        '<td class="cor">'+user.cpf+'</td>'+
        '<td class="cor">'+user.fullname+'</td>'+
        '<td class="cor">'+user.id+'</td>'+
        '<td class="cor"><button onclick="editUser('+user.id+')">'+user.id+'</button></td>'+
        '<td class="cor"><button onclick="deleteUser('+user.id+')">'+user.username+'</button></td>'+
        '</tr>';

        document.getElementById("tabela").innerHTML += linha;

        })
})
.catch(error => {
    console.log(error);
})
}


function addRow(userCredentials){

    const html = '<tr class="cliente"><td class="cor">'+userCredentials.username+'</td><td class="cor">'+userCredentials.password+'</td><td class="cor">'+userCredentials.email+'</td><td class="cor">'+userCredentials.cpf+'</td><td class="cor">'+userCredentials.fullname+'</td><td class="cor">'+userCredentials.id+'</td><td class="cor"><button onclick="editUser('+userCredentials.id+')">'+userCredentials.id+'</button></td><td class="cor"><button onclick="deleteUser('+userCredentials.id+')">'+userCredentials.username+'</button></td></tr>';
    document.getElementById("mostrarTable").innerHTML += html;

}




