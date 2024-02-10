/* *******  DESPUES BORRAR  */
const l_categorias = [
	{
		id: "c377b47a-f80c-4be5-8f9d-ead89cbb0a4a",
		nombre: "Comida Italiana",
	},
	{
		id: "42948a68-efd1-4bc2-932c-4a8539823c54",
		nombre: "Servicios",
	},
	{
		id: "ac295847-93c5-4fc8-b4ab-ecda5e8f4bb0",
		nombre: "Salidas",
	},
	{
		id: "de2a87a2-5eb4-4fe3-a300-d95a33b0e777",
		nombre: "Educación",
	},
	{
		id: "33bded42-a463-4dd1-a0ee-c115597e7f37",
		nombre: "Transporte",
	},
	{
		id: "b6d68d8a-8036-4115-883b-5cb57c1c3813",
		nombre: "Trabajo Alocado diario",
	},
	{
		id: "e989043c-7d70-4e22-9534-0b3ccdf83be3",
		nombre: "Alquiler",
	},
];

const l_operaciones = [
	{
		id: "da576431-7aae-4d1a-8b19-aeeeceef9509",
		descripcion: "compra",
		monto: 123,
		categoria: "c377b47a-f80c-4be5-8f9d-ead89cbb0a4a",
		tipo: "GASTO",
		fecha: "2024/02/07",
	},
	{
		id: "62124484-c39d-4663-8cbb-0e7a3a9e856b",
		descripcion: "pizza",
		monto: 5000,
		categoria: "c377b47a-f80c-4be5-8f9d-ead89cbb0a4a",
		tipo: "GASTO",
		fecha: "2024/02/07",
	},
	{
		id: "fc5199e7-89ad-46a9-8be2-153df86a13e4",
		descripcion: "aguinaldo",
		monto: 1000000,
		categoria: "b6d68d8a-8036-4115-883b-5cb57c1c3813",
		tipo: "GANANCIA",
		fecha: "2024/02/07",
	},
	{
		id: "2d50aad3-f585-4bd2-88f4-cb2bdb66f021",
		descripcion: "Cena lunes",
		monto: 50000,
		categoria: "c377b47a-f80c-4be5-8f9d-ead89cbb0a4a",
		tipo: "GASTO",
		fecha: "2024/02/05",
	},
	{
		id: "2959f1ea-368f-4d4b-8151-73ce497f56cc",
		descripcion: "Merienda",
		monto: 40000,
		categoria: "c377b47a-f80c-4be5-8f9d-ead89cbb0a4a",
		tipo: "GASTO",
		fecha: "2024/02/06",
	},
	{
		id: "01dc7555-b874-490f-9d03-e7a61d441efb",
		descripcion: "Librería",
		monto: 10000,
		categoria: "de2a87a2-5eb4-4fe3-a300-d95a33b0e777",
		tipo: "GASTO",
		fecha: "2024/02/02",
	},
	{
		id: "5bc4c88c-c6e5-4d18-bbc9-cd6a5977a73f",
		descripcion: "Aguinaldo",
		monto: 50000,
		categoria: "b6d68d8a-8036-4115-883b-5cb57c1c3813",
		tipo: "GANANCIA",
		fecha: "2024/01/31",
	},
	{
		id: "99ccefa4-ff57-4e4a-a178-9e35965d5417",
		descripcion: "Venta net",
		monto: 40000,
		categoria: "b6d68d8a-8036-4115-883b-5cb57c1c3813",
		tipo: "GANANCIA",
		fecha: "2024/02/08",
	},
	{
		id: "89965aab-991a-44ad-9ded-ff0731d7da83",
		descripcion: "Sueldo",
		monto: 80000,
		categoria: "e989043c-7d70-4e22-9534-0b3ccdf83be3",
		tipo: "GANANCIA",
		fecha: "2024/02/08",
	},
	{
		id: "4c121508-97a7-4dc7-ba6d-858794f5529f",
		descripcion: "Alquiler",
		monto: 60000,
		categoria: "42948a68-efd1-4bc2-932c-4a8539823c54",
		tipo: "GASTO",
		fecha: "2024/01/30",
	},
	{
		id: "c4113266-375a-4b26-8a25-4d2040433291",
		descripcion: "Remedios",
		monto: 20000,
		categoria: "42948a68-efd1-4bc2-932c-4a8539823c54",
		tipo: "GASTO",
		fecha: "2024/02/07",
	},
];

localStorage.setItem("categorias", JSON.stringify(l_categorias));
localStorage.setItem("operaciones", JSON.stringify(l_operaciones));

/* ******* HASTA AQUI DSPS BORRRAAAAAAAAARRRRRRRRRRRRRR */

/* ---------------------------------------------------- */
/* Función que calcula la Categoría con Mayor GANANCIA y con Mayor GASTO */
function CatMayorGananciaGasto(tipo, mayor) {
	categorias.forEach((cat) => {
		const filtrarOperPorCat = operaciones.filter(
			(oper) => oper.tipo === tipo && cat.id === oper.categoria
		);

		let totalCat = 0;
		if (filtrarOperPorCat.length !== 0) {
			totalCat = filtrarOperPorCat.reduce(function (total, oper) {
				return total + oper.monto;
			}, 0);
		}
		if (totalCat >= mayor.importeCategoria) {
			mayor.importeCategoria = totalCat;
			mayor.nombreCategoria = cat.nombre;
		}
	});
}

/* ---------------------------------------------------- */
/* Función que calcula la Categoría con Mayor BALANCE */
function CatMayorBalance(mayor) {
	categorias.forEach((cat) => {
		const filtrarOperPorCat = operaciones.filter(
			(oper) => cat.id === oper.categoria
		);

		let totalCat = 0;
		if (filtrarOperPorCat.length !== 0) {
			totalCat = filtrarOperPorCat.reduce(function (total, oper) {
				return oper.tipo === "GANANCIA"
					? total + oper.monto
					: total - oper.monto;
			}, 0);
		}
		if (totalCat >= mayor.importeCategoria) {
			mayor.importeCategoria = totalCat;
			mayor.nombreCategoria = cat.nombre;
		}
	});
}

/* ======================== MOSTRAR CON/SIN REPORTES ========================  */
/* Mostrar Imagen, y texto SIN REPORTES */
const cont_sin_reporte = document.getElementById("cont-sin-reporte");
const cont_con_reporte = document.getElementById("cont-con-reporte");

const cat_may_gana_nom = document.getElementById("cat-may-gana-nom");
const cat_may_gana_imp = document.getElementById("cat-may-gana-imp");
const cat_may_gast_nom = document.getElementById("cat-may-gast-nom");
const cat_may_gast_imp = document.getElementById("cat-may-gast-imp");
const cat_may_bala_nom = document.getElementById("cat-may-bala-nom");
const cat_may_bala_imp = document.getElementById("cat-may-bala-imp");

let categorias = [];
let operaciones = [];

function mostrarSinReportes() {
	cont_sin_reporte.classList.remove("hidden");
	cont_con_reporte.classList.add("hidden");
}

/* Mostrar CON REPORTES */
function mostrarConReportes() {
	cont_sin_reporte.classList.add("hidden");
	cont_con_reporte.classList.remove("hidden");

	categorias = JSON.parse(localStorage.getItem("categorias"));
	operaciones = JSON.parse(localStorage.getItem("operaciones"));

	/*  CATEGORIA CON MAYOR GANANCIA */
	let mayor = {
		nombreCategoria: "",
		importeCategoria: 0,
	};
	CatMayorGananciaGasto("GANANCIA", mayor);
	cat_may_gana_nom.innerHTML = `${mayor.nombreCategoria}`;
	cat_may_gana_imp.innerHTML = `$: ${mayor.importeCategoria.toLocaleString(
		"es-ES"
	)}`;

	/* -------------------------- */
	/*  CATEGORIA CON MAYOR GASTO */
	mayor = {
		nombreCategoria: "",
		importeCategoria: 0,
	};
	CatMayorGananciaGasto("GASTO", mayor);
	cat_may_gast_nom.innerHTML = `${mayor.nombreCategoria}`;
	cat_may_gast_imp.innerHTML = `-$ ${mayor.importeCategoria.toLocaleString(
		"es-ES"
	)}`;

	/* -------------------------- */
	/*  CATEGORIA CON MAYOR BALANCE */
	mayor = {
		nombreCategoria: "",
		importeCategoria: Number.NEGATIVE_INFINITY, //número negativo, más grande, con el que trabaja JavaScript
	};
	CatMayorBalance(mayor);
	cat_may_bala_nom.innerHTML = `${mayor.nombreCategoria}`;
	cat_may_bala_imp.innerHTML = `$: ${mayor.importeCategoria.toLocaleString(
		"es-ES"
	)}`;
}

/* ------------------------------------------------ */
/* viene de SCRIPT.JS */
function mostrarReportes() {
	if (localStorage.getItem("operaciones") !== null) {
		mostrarConReportes();
	} else {
		mostrarSinReportes();
	}
}
