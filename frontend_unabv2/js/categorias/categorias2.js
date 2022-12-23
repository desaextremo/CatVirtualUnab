//Define variables para acceder al elemento a través de su atributo id
let new_category = document.getElementById("new")
let save_category = document.getElementById("save")
let delete_category = document.getElementById("delete")
let list_data = document.getElementById("list_data")
let save_button = document.getElementById("save_category")
let cancel_save_category = document.getElementById("cancel_save_category")
let cancel_new_category = document.getElementById("cancel_new_category")
let new_category_button = document.getElementById("new_category")
let cancel_delete_category = document.getElementById("cancel_delete_category")
let delete_category_button = document.getElementById("delete_category")

//oyentes de eventos
new_category_button.addEventListener("click", insert_)
save_button.addEventListener("click", save_)
cancel_save_category.addEventListener("click", initial)
cancel_new_category.addEventListener("click", initial)
cancel_delete_category.addEventListener("click", initial)
delete_category_button.addEventListener("click", delete_apply)
/**
 *la primera vez que la pagina carga y se muestra al usuario solo estara visible la tabla para consultar 
 *los datos
 */
function initial() {
  load_data()
  new_category.style.display = "none"
  save_category.style.display = "none"
  delete_category.style.display = "none"
  list_data.style.display = "block"
}

/**
 *Aspecto de la pagina cuando voy registrar una categoria
 */
function new_() {
  document.getElementById('name').value = ""
  new_category.style.display = "block"
  save_category.style.display = "none"
  delete_category.style.display = "none"
  list_data.style.display = "none"
  document.getElementById('name').focus()
}

/**
 * Inovca ws para insertar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function insert_() {

  //Obtengo información ingresda en la caja de texto o input
  let nameCategory = document.getElementById('name').value

  axios.post('http://localhost:8084/api/category/new', {
    name: nameCategory
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
  new_category.style.display = "none"
  save_category.style.display = "block"
  delete_category.style.display = "none"
  list_data.style.display = "none"

  axios.get('http://localhost:8084/api/category/' + id)
  .then(function (response) {
    document.getElementById("id_edit").value = response.data.id
    document.getElementById("name_edit").value = response.data.name
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
  //leer informacion ingresada por el usuario
  let id_edit = document.getElementById("id_edit").value
  let name_edit = document.getElementById("name_edit").value

  axios.put('http://localhost:8084/api/category/save', {
    id: id_edit,
    name: name_edit
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
  new_category.style.display = "none"
  save_category.style.display = "none"
  delete_category.style.display = "block"
  list_data.style.display = "none"

  let salida=""
  let list_delete = document.getElementById("list_delete")
  //invoca al ws: http://localhost:8084/api/book/un id de categoria

  axios.get('http://localhost:8084/api/category/' + id)
  .then(function (response) {
    //armar la salida en pantalla
    //Obtiene la información registrada por el usuario
    salida += `<li><strong>Id :</strong>${response.data.id}</li>
               <li><strong>Categoría :</strong>${response.data.name}</li>`
    list_delete.innerHTML = salida
    document.getElementById("id_delete").value = response.data.id
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

  axios.delete('http://localhost:8084/api/category/' + id_delete)
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
  let salida = ""
  // Hacer una petición para un usuario con ID especifico
  axios.get('http://localhost:8084/api/category/all')
    .then(function (response) {
      let datos = response.data
      //armar la salida en pantalla
      for(let i in datos){
        salida +=`<tr>
                  <td>${datos[i].name}</td>
                  <td>
                      <button class="btn btn-outline-primary" onclick="edit_('${datos[i].id}')">Editar</button>
                      <button class="btn btn-outline-primary" onclick="delete_('${datos[i].id}')">Eliminar</button>
                  </td>
                </tr>`
    
      }
      //console.log(salida)
    
      document.getElementById("table_body").innerHTML=salida
    })
    .catch(function (error) {
      // manejar error
      alert(error.message)
    })
    .then(function () {
      // siempre sera executado
    });

  /*
  for(let i in responseJson){
    //salida += "Id: " + responseJson[i].id + " Categoria: " + responseJson[i].name + "\n"
    //
    salida +=`<tr>
              <td>${responseJson[i].name}</td>
              <td>
                  <button onclick="edit_('${responseJson[i].id}')">Editar</button>
                  <button onclick="delete_('${responseJson[i].id}')">Eliminar</button>
              </td>
            </tr>`

  }
  console.log(salida)

  document.getElementById("table_body").innerHTML=salida
  */

}
//invocar la funcion que muestra la pagina en su estado inicial
initial()



