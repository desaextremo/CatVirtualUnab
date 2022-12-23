//Define variables para acceder al elemento a través de su atributo id
let new_Libros = document.getElementById("new")
let save_Libros = document.getElementById("save")
let delete_Libros = document.getElementById("delete")
let list_data = document.getElementById("list_data")
let save_button = document.getElementById("save_Libros")
let cancel_save_Libros = document.getElementById("cancel_save_Libros")
let cancel_new_Libros = document.getElementById("cancel_new_Libros")
let new_Libros_button = document.getElementById("new_Libros")
let cancel_delete_Libros = document.getElementById("cancel_delete_Libros")
let delete_Libros_button = document.getElementById("delete_Libros")
let table_body = document.getElementById("table_body")
let author_list = document.getElementById("authorId")
let category_list = document.getElementById("categoryId")
let author_list_Edit = document.getElementById("authorId_Edit")
let category_list_Edit = document.getElementById("categoryId_Edit")
let salida = ""
//oyentes de eventos
new_Libros_button.addEventListener("click", insert_)
save_button.addEventListener("click", save_)
cancel_save_Libros.addEventListener("click", initial)
cancel_new_Libros.addEventListener("click", initial)
cancel_delete_Libros.addEventListener("click", initial)
delete_Libros_button.addEventListener("click", delete_apply)
/**
 *la primera vez que la pagina carga y se muestra al Libros solo estara visible la tabla para consultar 
 *los datos
 */
function initial() {
  load_data()
  new_Libros.style.display = "none"
  save_Libros.style.display = "none"
  delete_Libros.style.display = "none"
  list_data.style.display = "block"
}

/**
 *Aspecto de la pagina cuando voy registrar una categoria
 */
function new_() {
  document.getElementById('isbn').value = ""
  new_Libros.style.display = "block"
  save_Libros.style.display = "none"
  delete_Libros.style.display = "none"
  list_data.style.display = "none"
  document.getElementById('isbn').focus()
}

/**
 * Inovca ws para insertar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function insert_() {

  //Obtengo información ingresda en la caja de texto o input
  let isbn_val = document.getElementById('isbn').value
  let categoryId_val = document.getElementById('categoryId').value
  let title_val = document.getElementById('title').value
  let authorId_val = document.getElementById('authorId').value
  let pages_val = document.getElementById('pages').value
  let price_val = document.getElementById('price').value
  let year_val = document.getElementById('year').value
  let description_val = document.getElementById('description').value
  
  axios.post('http://localhost:8084/api/book/new', {
    isbn: isbn_val,
    categoryId: categoryId_val,
    title: title_val,
    authorId: authorId_val,
    pages: pages_val,
    price: price_val,
    year: year_val,
    description: description_val
})
  .then(function (response) {
    console.log(response.data)
    initial()  
  })
  .catch(function (error) {
    console.log(error);
  });
}

/**
 *Aspecto de la pagina cuando voy editar una categoria
 */
function edit_(id) {
  new_Libros.style.display = "none"
  save_Libros.style.display = "block"
  delete_Libros.style.display = "none"
  list_data.style.display = "none"

  axios.get('http://localhost:8084/api/book/' + id)
  .then(function (response) {
    console.log(response.data)
    document.getElementById("id_edit").value = response.data.isbn
    document.getElementById("categoryId_Edit").value = response.data.category.id                                                   
    document.getElementById("title_edit").value = response.data.title
    document.getElementById("authorId_Edit").value = response.data.author.id
    document.getElementById("pages_edit").value = response.data.pages
    document.getElementById("price_edit").value = response.data.price
    document.getElementById("year_edit").value = response.data.year
    document.getElementById("description_edit").value = response.data.description    
	//armar la salida en pantalla
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  });
}

/**
 * Inovca ws para actualizar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function save_() {
  //leer informacion ingresada por el Libros
  let id_edit = document.getElementById("id_edit").value
  //Obtengo información ingresda en la caja de texto o input
  let categoryId_edit_val = document.getElementById('categoryId_Edit').value
  let title_edit_val = document.getElementById('title_edit').value
  let authorId_edit_val = document.getElementById('authorId_Edit').value
  let pages_edit_val = document.getElementById('pages_edit').value
  let price_edit_val = document.getElementById('price_edit').value
  let year_edit_val = document.getElementById('year_edit').value
  let description_edit_val = document.getElementById('description_edit').value

  axios.put('http://localhost:8084/api/book/save', {
    isbn: id_edit,
	  categoryId: categoryId_edit_val,
    title: title_edit_val,
    authorId: authorId_edit_val,
    pages: pages_edit_val,
    price: price_edit_val,
    year: year_edit_val,
    description: description_edit_val
})
  .then(function (response) {
    console.log(response.data);
    initial()
    
	//armar la salida en pantalla
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
}

/**
 *Aspecto de la pagina cuando voy eliminar una categoria
 */
function delete_(id) {
  new_Libros.style.display = "none"
  save_Libros.style.display = "none"
  delete_Libros.style.display = "block"
  list_data.style.display = "none"

  let salida=""
  let list_delete = document.getElementById("list_delete")
  //invoca al ws: http://localhost:8084/api/book/un id de categoria

  axios.get('http://localhost:8084/api/book/' + id)
  .then(function (response) {
    //armar la salida en pantalla
    //Obtiene la información registrada por el Libros
    salida += `<li><strong>Isbn :</strong>${response.data.isbn}</li>
               <li><strong>Título :</strong>${response.data.fisrtName} ${response.data.title}</li>
               <li><strong>Autor :</strong>${response.data.author.fisrtName} ${response.data.author.lastName}</li>
               <li><strong>Categoría :</strong>${response.data.category.name}</li>
               <li><strong>Páginas :</strong>${response.data.pages}</li>
               <li><strong>Precio :</strong>${response.data.price}</li>
               <li><strong>Año :</strong>${response.data.year}</li>
               <li><strong>Descripción :</strong>${response.data.description}</li>
               `
    list_delete.innerHTML = salida
    document.getElementById("id_delete").value = response.data.isbn
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  });
}

/**
 * Invoca ws para eliminar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function delete_apply() {
  //obtengo el id
  let id_delete = document.getElementById("id_delete").value

  axios.delete('http://localhost:8084/api/book/' + id_delete)
  .then(function (response) {
    console.log(response.data);
    //armar la salida en pantalla
    initial()
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
}

/**
 * Invocar al ws que obtien informaciòn sobre las categorias, y actualizar la tabla de datos
 * con la informaciòn obtenida
 */
function load_data() {
  // Hacer una petición para un Libros con ID especifico
  axios.get('http://localhost:8084/api/book/all')
    .then(function (response) {
      let datos = response.data
      salida = ""
      //armar la salida en pantalla
      for (let i in response.data) {
        salida += `<tr>
          <td>${response.data[i].isbn}</td>
          <td>${response.data[i].category.name}</td>
          <td>${response.data[i].title}</td>
          <td>${response.data[i].author.fisrtName} ${response.data[i].author.lastName}</td>
          <td>${response.data[i].pages}</td>
          <td>${response.data[i].year}</td>
          <td>${response.data[i].price}</td>
          <td>
              <button class="btn btn-outline-primary" onclick="edit_('${datos[i].isbn}')">Editar</button>
              <button class="btn btn-outline-primary" onclick="delete_('${datos[i].isbn}')">Eliminar</button>
          </td>
        </tr>`
    }
    table_body.innerHTML = salida
    
      document.getElementById("table_body").innerHTML=salida
    })
    .catch(function (error) {
      // manejar error
      alert(error.message)
    })
    .then(function () {
      // siempre sera executado
    });
}

//listas desplegables
function load_authors() {  
  axios.get('http://localhost:8084/api/author/all/')
      .then(function (response) {
          salida=""
          for (let i in response.data) {
              salida += `<option value="${response.data[i].id}">${response.data[i].fisrtName} ${response.data[i].lastName}</option>`
          }
          author_list.innerHTML = salida
          author_list_Edit.innerHTML = salida
      })
      .catch(function (error) {
          //Error - manejar error
          alert(error)
      })
}

function load_categoryes() {
  axios.get('http://localhost:8084/api/category/all/')
      .then(function (response) {
          salida=""
          for (let i in response.data) {
              salida += `<option value="${response.data[i].id}">${response.data[i].name}</option>`
          }
          category_list.innerHTML = salida
          category_list_Edit.innerHTML = salida
      })
      .catch(function (error) {
          //Error - manejar error
          alert(error)
      })
}
//invocar la funcion que muestra la pagina en su estado inicial
initial()
load_authors()
load_categoryes()



