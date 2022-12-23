//definiciones de variables
let letter_list = document.getElementById("letter_list")
let table_body = document.getElementById("table_body")
let query = document.getElementById("query")
let salida = ""

//registrar un oyente de eventos
query.addEventListener("click", query_books_letter)

function load_letters() {
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    for (let i in alphabet){
        salida += `<option value="${alphabet[i]}">${alphabet[i]}</option>`
    }

    letter_list.innerHTML = salida
}

function query_books_letter() {
    let letter = letter_list.value
    salida = ""
    axios.get('http://localhost:8084/api/book/ind/' + letter)
        .then(function (response) {
            for (let i in response.data) {
                salida += `<tr>
                  <td>${response.data[i].isbn}</td>
                  <td>${response.data[i].category.name}</td>
                  <td>${response.data[i].title}</td>
                  <td>${response.data[i].author.fisrtName} ${response.data[i].author.lastName}</td>
                  <td>${response.data[i].pages}</td>
                  <td>${response.data[i].year}</td>
                  <td>${response.data[i].price}</td>
                </tr>`
            }
            table_body.innerHTML = salida
        })
        .catch(function (error) {
            //Error - manejar error
            alert(error)
        })
}

load_letters()