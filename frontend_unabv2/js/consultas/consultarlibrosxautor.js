//definiciones de variables
let author_list = document.getElementById("author_list")
let table_body = document.getElementById("table_body")
let query = document.getElementById("query")
let salida = ""

//registrar un oyente de eventos
query.addEventListener("click", query_books_authors)

function load_authors() {
    axios.get('http://localhost:8084/api/author/all/')
        .then(function (response) {
            for (let i in response.data) {
                salida += `<option value="${response.data[i].id}">${response.data[i].fisrtName} ${response.data[i].lastName}</option>`
            }
            author_list.innerHTML = salida
        })
        .catch(function (error) {
            //Error - manejar error
            alert(error)
        })
}

function query_books_authors() {
    let id_author = author_list.value
    salida = ""
    axios.get('http://localhost:8084/api/book/author/' + id_author)
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

load_authors()