//definiciones de variables
let category_list = document.getElementById("category_list")
let table_body = document.getElementById("table_body")
let query = document.getElementById("query")
let salida = ""

//registrar un oyente de eventos
query.addEventListener("click", query_books_category)

function load_categoryes() {
    axios.get('http://localhost:8084/api/category/all/')
        .then(function (response) {
            for (let i in response.data) {
                salida += `<option value="${response.data[i].id}">${response.data[i].name}</option>`
            }
            category_list.innerHTML = salida
        })
        .catch(function (error) {
            //Error - manejar error
            alert(error)
        })
}

function query_books_category() {
    let id_category = category_list.value
    salida = ""
    axios.get('http://localhost:8084/api/book/category/' + id_category)
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

load_categoryes()