//definiciones de variables
let liminf = document.getElementById("liminf")
let limsup = document.getElementById("limsup")
let table_body = document.getElementById("table_body")
let query = document.getElementById("query")
let salida = ""

//registrar un oyente de eventos
query.addEventListener("click", query_books_price)

function query_books_price() {
    let valinf = liminf.value
    let valsup = limsup.value

    salida = ""
    axios.get('http://localhost:8084/api/book/price/'+ valinf + '/' + valsup)
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