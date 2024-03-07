// ________________________________
// crearCategoria con id encriptado
// --------------------------------
const crearIdDato = (nombre) => {
	return { id: uuidv4(), nombre };
};

// ______________________________
// constante Categorias iniciales (para restaurar)
// ------------------------------
const categoriasInicio = [
	crearIdDato("COMIDA"),
	crearIdDato("EDUCACION"),
	crearIdDato("SALIDAS"),
	crearIdDato("SERVICIOS"),
	crearIdDato("TRANSPORTE"),
	crearIdDato("TRABAJO"),
];

// ___________________
// Variables generales
// -------------------
let categoriasLS = [];
let nombNuevaCateg = "";
let idNuevaCateg = "";
let idAEditar = "";
let nombreAEditar = "";
let idCatDuplicada = "";
let indice;

// ________________________
// Guardar en Local Storage
// ------------------------
const grabar = (locacion, dato) =>
	localStorage.setItem(locacion, JSON.stringify(dato));

// ___________________________
// Recuperar del Local Storage
// ---------------------------
const recuperar = (locacion) => {
	categoriasLS = JSON.parse(localStorage.getItem(locacion));
	return categoriasLS;
};

// // _______________________________
// // Funcion Mostrar las categorias
// // -------------------------------
let $muestraCategorias = document.getElementById("muestra-categorias");
const mostrarDato = () => {
	$muestraCategorias.innerHTML = "";
	categoriasLS = recuperar("categorias"); //obligatoriamente llamarla para que recupere las últimas modificaciones de LS
	categoriasLS.forEach((categoria) => {
		if ($muestraCategorias !== null) {
			let divContenCat = document.createElement("div");
			divContenCat.id = "conten-cat";
			let div1 = document.createElement("div");
			div1.id = "nombre-cat";
			let div2 = document.createElement("div");
			div2.id = "bot-editar-borrar";
			divContenCat.classList.add("flex", "justify-between", "my-2", "w-full");
			div1.classList.add("flex", "items-center");
			let spanCategoria = document.createElement("span");
			spanCategoria.classList.add("span-categoria");
			spanCategoria.innerHTML = categoria.nombre;

			let btnEditar = document.createElement("button");
			btnEditar.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
			btnEditar.id = `btn-editar-${categoria.id}`; // Identificador único para el botón de editar
			btnEditar.classList.add(
				"flex-shrink-0",
				"h-8",
				"px-2",
				"md:px-4",
				"lg:px-6",
				"rounded-lg",
				"bg-blue-100",
				"mx-1",
				"md:mx-4",
				"lg:mx-4",
				"hover:bg-blue-200",
				"focus:bg-blue-200",
				"hover:dark:bg-gray-400",
				"focus:dark:bg-gray-400",
				"hover:shadow-md",
				"focus:shadow-md"
			);
			btnEditar.addEventListener("click", () => editarCategoria(categoria.id));

			let btnBorrar = document.createElement("button");
			btnBorrar.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
			btnBorrar.id = `btn-borrar-${categoria.id}`; // Identificador único para el botón de borrar
			btnBorrar.classList.add(
				"flex-shrink-0",
				"h-8",
				"px-2",
				"md:px-4",
				"lg:px-6",
				"rounded-lg",
				"bg-blue-100",
				"hover:bg-blue-200",
				"focus:bg-blue-200",
				"hover:dark:bg-gray-400",
				"focus:dark:bg-gray-400",
				"hover:shadow-md",
				"focus:shadow-md"
			);
			btnBorrar.addEventListener("click", () => borrarCategoria(categoria.id));

			div1.appendChild(spanCategoria);
			div2.appendChild(btnEditar);
			div2.appendChild(btnBorrar);
			divContenCat.appendChild(div1);
			divContenCat.appendChild(div2);
			$muestraCategorias.appendChild(divContenCat);
		}
	});
};

// _________________________
// Funcion inicia categorias
// -------------------------
let valorGuardado;
let categorias;
let iniciaCategorias = () => {
	valorGuardado = recuperar("categorias");
	if (valorGuardado === null) {
		// Verificar si el valor es null
		categorias = categoriasInicio;
		grabar("categorias", categorias);
		mostrarDato();
	} else {
		mostrarDato();
	}
};

//______________________________________________________________________________
// Función que  evita minúsculas y acentos --> para evitar categorías duplicadas
//------------------------------------------------------------------------------
const sinAcentosMayus = (texto) => {
	if (typeof texto === "string") {
		texto = texto.replace(/[áäâà]/g, "a");
		texto = texto.replace(/[éëêè]/g, "e");
		texto = texto.replace(/[íïîì]/g, "i");
		texto = texto.replace(/[óöôò]/g, "o");
		texto = texto.replace(/[úüûù]/g, "u");
		texto = texto.toUpperCase();
	}
	return texto;
};

// _____________________________________________
// funcion armado del array para guardarlo en LS
// ---------------------------------------------
const armadoArrayGuardar = (locacion, id, nombre, funcion) => {
	const nuevoObj = { id, nombre };
	let arrayListoParaGuardar = [];
	if (categoriasLS) {
		let datoDuplicado = revisarDatosDuplicados(id, nombre);
		if (!datoDuplicado) {
			if (funcion === "nuevaCateg") {
				categoriasLS.push(nuevoObj);
				return categoriasLS;
			}
			if (funcion === "edicion") {
				let nombre = nombre;
				arrayListoParaGuardar = categoriasLS.map((categoria) => {
					if (categoria.id === id) {
						return { ...categoria, nombre: nombre }; // Actualiza el nombre si el ID coincide
					} else {
						return categoria; // Retorna la categoría sin cambios si el ID no coincide
					}
				});
				return arrayListoParaGuardar;
			}
		} else {
			activarVentMod($mjeCatDuplicada);
			return;
		}
	}
};

//_______________________________________
// Función ingreso categoría en el input (transformación en mayúscula, sin acento)
// --------------------------------------
let $inpCategoria = document.getElementById("categoria");

const ingresarCategoria = (inputTextCateg) => {
	nombNuevaCateg = inputTextCateg.value.trim();
	nombNuevaCateg = sinAcentosMayus(nombNuevaCateg);
	nombNuevaCateg = nombNuevaCateg.slice(0, 14); //toma hasta 14 caracteres para la categoría
	return nombNuevaCateg;
};

// _______________________________________________________
// Evento - Boton cerrar mensaje por categorías duplicadas
// -------------------------------------------------------
const $contVentanaModal = document.getElementById("cont-ventana-modal");
const $mjeCatDuplicada = document.getElementById("mje-cat-duplicada");
const $cerrar = document.getElementById("cerrar-cat-duplicada");
let $inpEditarCategoria = document.getElementById("editar-categoria");

$cerrar.addEventListener("click", () => {
	$mjeCatDuplicada.classList.add("hidden");
	$inpEditarCategoria.value = nombreAEditar;
	if ($contEditarCategoria.classList.contains("hidden")) {
		$contVentanaModal.classList.add("hidden");
	}
	$inpCategoria.value = " ";
});

// ______________________________________________________________________
// Evento - Ingreso de texto en input de categoria o de edicion categoria
// ----------------------------------------------------------------------
$inpCategoria.addEventListener(
	"input",
	(e) => ($inpCategoria.value = ingresarCategoria($inpCategoria))
);

// _________________________________________________
// Evento - Boton cerrar mensaje por categoría vacía
// -------------------------------------------------
const $cerrarCatVacia = document.getElementById("cerrar-cat-vacia");
const $mjeCatVacia = document.getElementById("mje-cat-vacia");
$cerrarCatVacia.addEventListener("click", () => {
	$mjeCatVacia.classList.add("hidden");
	if ($contEditarCategoria.classList.contains("hidden")) {
		$contVentanaModal.classList.add("hidden");
	}
	$inpCategoria.value = " ";
});

// ________________________________________
// Revisar nombres de categorias duplicados
// ----------------------------------------
const revisarDatosDuplicados = (id, nombre) => {
	//quitar el ID porque está demás
	for (let i = 0; i < categoriasLS.length; i++) {
		if (categoriasLS[i].nombre === nombre) {
			categoriaDuplicada = true;
			idCatDuplicada = categoriasLS[i].id;
			return categoriaDuplicada;
		}
	}
	categoriaDuplicada = false;
	return categoriaDuplicada;
};

// ______________________________________________
// Evento - Boton AGREGAR de ingreso de categoría
// ----------------------------------------------
let $botonIngresoCategoria = document.getElementById("boton-ingreso-categoria");
$botonIngresoCategoria.addEventListener("click", (e) => {
	let valorCategoria = $inpCategoria.value.trim(); // Obtener el valor del input de la categoría
	if (valorCategoria !== "") {
		//evita ingreso de categoría vacía
		let nuevaCategEncrip = crearIdDato(valorCategoria);
		nombNuevaCateg = nuevaCategEncrip.nombre;
		idNuevaCateg = nuevaCategEncrip.id;
		let datoDuplicado = revisarDatosDuplicados(idNuevaCateg, nombNuevaCateg);
		if (!datoDuplicado) {
			let categoriasParaGuardar = armadoArrayGuardar(
				"categorias",
				idNuevaCateg,
				nombNuevaCateg,
				"nuevaCateg"
			);
			grabar("categorias", categoriasParaGuardar);
			mostrarDato();
			$inpCategoria.value = " ";
			return;
		} else {
			activarVentMod($mjeCatDuplicada);
			return;
		}
	} else {
		activarVentMod($mjeCatVacia);
		return;
	}
});

// _______________________________________
// Función  cancelar edicion de categoría
// ---------------------------------------
const $contEditarCategoria = document.getElementById("cont-editar-categoria");
const cerrarVentEdicion = () => {
	$inpEditarCategoria.value = "";
	$contEditarCategoria.classList.add("hidden");
	$contVentanaModal.classList.add("hidden");
	if (!$mjeCatDuplicada.classList.contains("hidden")) {
		$mjeCatDuplicada.classList.add("hidden");
	}
};

// ________________________
// Función editar categoría
// ------------------------
const $botonCancelarEditarCategoria = document.getElementById(
	"boton-cancelar-editar-categoria"
);
const $botonGrabarEditarCategoria = document.getElementById(
	"boton-grabar-editar-categoria"
);
const editarCategoria = (idCat) => {
	idAEditar = idCat;
	activarVentMod($contEditarCategoria); //Activa la ventana modal con espacio de edicion;
	categoriasLS = recuperar("categorias"); //Obtener categorías del localStorage
	indice = categoriasLS.findIndex((categoria) => categoria.id === idAEditar);
	let categoriaAEditar = categoriasLS.find(
		(categoria) => categoria.id === idCat
	);
	nombreAEditar = categoriaAEditar.nombre;
	$inpEditarCategoria.value = categoriaAEditar.nombre; //Mostrar el nombre de la categoría a editar en el input
	$inpEditarCategoria.addEventListener(
		"input",
		(e) => ($inpEditarCategoria.value = ingresarCategoria($inpEditarCategoria))
	);

	$botonCancelarEditarCategoria.addEventListener("click", () =>
		cerrarVentEdicion()
	);

	$botonGrabarEditarCategoria.addEventListener("click", () => {
		nombNuevaCateg = $inpEditarCategoria.value;
		if (nombNuevaCateg !== "") {
			if (nombNuevaCateg === categoriaAEditar.nombre) {
				//Es el mismo nombre en el mismo ID
				cerrarVentEdicion();
			} else {
				let categoriaEditada = { id: idCat, nombre: nombNuevaCateg };
				let categoriaDuplicada = revisarDatosDuplicados(idCat, nombNuevaCateg);
				if (!categoriaDuplicada) {
					// Ingresa al if si no hay duplicados
					if (indice !== -1) {
						// Verifica si se encontró el objeto con el id dado
						arrayListo = [
							...categoriasLS.slice(0, indice), // Objetos antes del objeto a modificar
							{ ...categoriasLS[indice], nombre: nombNuevaCateg }, // Objeto modificado
							...categoriasLS.slice(indice + 1), // Objetos después del objeto a modificar
						];
					}
					grabar("categorias", arrayListo);
					mostrarDato();
					cerrarVentEdicion();
				} else {
					activarVentMod($mjeCatDuplicada);
				}
			}
		}
	});
};

//--------------------------
// Función borrar categoría
// -------------------------
const borrarCategoria = (id) => {
	const nuevasCategorias = categoriasLS.filter(
		(categoria) => categoria.id !== id
	); // Filtrar las categorías, excluyendo la del id
	grabar("categorias", nuevasCategorias); // Guardar las nuevas categorías en el localStorage
	mostrarDato(); // Mostrar las categorías actualizadas
};

// ______________________________
// Función  Activar Ventana Modal
// ------------------------------
const activarVentMod = (contenAActivar) => {
	$contVentanaModal.classList.remove("hidden");
	contenAActivar.classList.remove("hidden");
};

// ___________________________________
// Llamado para restaurar las categorías
// -----------------------------------
recuperar("categorias");
iniciaCategorias();
