//Define variables para acceder al elemento a través de su atributo id
let new_usuario = document.getElementById("new")
let save_usuario = document.getElementById("save")
let delete_usuario = document.getElementById("delete")
let list_data = document.getElementById("list_data")
let save_button = document.getElementById("save_Usuario")
let cancel_save_usuario = document.getElementById("cancel_save_Usuario")
let cancel_new_usuario = document.getElementById("cancel_new_Usuario")
let new_usuario_button = document.getElementById("new_Usuario")
let cancel_delete_usuario = document.getElementById("cancel_delete_Usuario")
let delete_usuario_button = document.getElementById("delete_Usuario")

//oyentes de eventos
new_usuario_button.addEventListener("click", insert_)
save_button.addEventListener("click", save_)
cancel_save_usuario.addEventListener("click", initial)
cancel_new_usuario.addEventListener("click", initial)
cancel_delete_usuario.addEventListener("click", initial)
delete_usuario_button.addEventListener("click", delete_apply)
/**
 *la primera vez que la pagina carga y se muestra al usuario solo estara visible la tabla para consultar 
 *los datos
 */
function initial() {
  load_data()
  new_usuario.style.display = "none"
  save_usuario.style.display = "none"
  delete_usuario.style.display = "none"
  list_data.style.display = "block"
}

/**
 *Aspecto de la pagina cuando voy registrar una categoria
 */
function new_() {
  document.getElementById('fisrtName').value = ""
  new_usuario.style.display = "block"
  save_usuario.style.display = "none"
  delete_usuario.style.display = "none"
  list_data.style.display = "none"
  document.getElementById('fisrtName').focus()
}

/**
 * Inovca ws para insertar la categoria, adicionalmente al final actualiza el listado de categorias
 */
function insert_() {

  //Obtengo información ingresda en la caja de texto o input
  let fisrtName_val = document.getElementById('fisrtName').value
  let lastName_val = document.getElementById('lastName').value
  let birthDay_val = document.getElementById('birthDay').value
  let address_val = document.getElementById('address').value
  let cellPhone_val = document.getElementById('cellPhone').value
  let email_val = document.getElementById('email').value
  let password_val = document.getElementById('password').value
  let role_val = document.getElementById('role').value
  let gender_val = document.getElementById('gender').value

  axios.post('http://localhost:8084/api/user/new', {
    fisrtName: fisrtName_val,
    lastName: lastName_val,
    birthDay: birthDay_val,
    address: address_val,
    email: email_val,
    password: password_val,
    cellPhone: cellPhone_val,
    role: role_val, 
    gender: gender_val, 
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
  new_usuario.style.display = "none"
  save_usuario.style.display = "block"
  delete_usuario.style.display = "none"
  list_data.style.display = "none"

  axios.get('http://localhost:8084/api/user/' + id)
  .then(function (response) {
    console.log(response.data)
    document.getElementById("id_edit").value = response.data.id
    document.getElementById("fisrtName_edit").value = response.data.fisrtName
    document.getElementById("lastName_edit").value = response.data.lastName
    document.getElementById("birthDay_edit").value = response.data.birthDay
    document.getElementById("address_edit").value = response.data.address
    document.getElementById("cellPhone_edit").value = response.data.cellPhone
    document.getElementById("email_edit").value = response.data.email
    document.getElementById("password_edit").value = response.data.password
    document.getElementById("role_edit").value = response.data.role
    document.getElementById("gender_edit").value = response.data.gender
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
  //Obtengo información ingresda en la caja de texto o input
  let fisrtName_val = document.getElementById('fisrtName_edit').value
  let lastName_val = document.getElementById('lastName_edit').value
  let birthDay_val = document.getElementById('birthDay_edit').value
  let address_val = document.getElementById('address_edit').value
  let cellPhone_val = document.getElementById('cellPhone_edit').value
  let email_val = document.getElementById('email_edit').value
  let password_val = document.getElementById('password_edit').value
  let role_val = document.getElementById('role_edit').value
  let gender_val = document.getElementById('gender_edit').value

  axios.put('http://localhost:8084/api/user/save', {
    id: id_edit,
	  fisrtName: fisrtName_val,
    lastName: lastName_val,
    birthDay: birthDay_val,
    address: address_val,
    cellPhone: cellPhone_val,
    email: email_val,
    password:password_val,
    role: role_val,
    gender: gender_val,
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
  new_usuario.style.display = "none"
  save_usuario.style.display = "none"
  delete_usuario.style.display = "block"
  list_data.style.display = "none"

  let salida=""
  let list_delete = document.getElementById("list_delete")
  //invoca al ws: http://localhost:8084/api/book/un id de categoria

  axios.get('http://localhost:8084/api/user/' + id)
  .then(function (response) {
    //armar la salida en pantalla
    //Obtiene la información registrada por el usuario
    salida += `<li><strong>Id :</strong>${response.data.id}</li>
               <li><strong>Nombres :</strong>${response.data.fisrtName} ${response.data.lastName}</li>
               <li><strong>Fecha Nacimiento :</strong>${response.data.birthDay}</li>
               <li><strong>Dirección :</strong>${response.data.address}</li>
               <li><strong>Teléfono :</strong>${response.data.cellPhone}</li>
               <li><strong>Email :</strong>${response.data.email}</li>
               `
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

  axios.delete('http://localhost:8084/api/user/' + id_delete)
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
  axios.get('http://localhost:8084/api/user/all')
    .then(function (response) {
      let datos = response.data
      //armar la salida en pantalla
      for(let i in datos){
        salida +=`<tr>
                  <td>${datos[i].fisrtName} ${datos[i].lastName}</td>
                  <td>${datos[i].birthDay}</td>
                  <td>${datos[i].email}</td>
                  <td>${datos[i].cellPhone}</td>
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
}
//invocar la funcion que muestra la pagina en su estado inicial
initial()



