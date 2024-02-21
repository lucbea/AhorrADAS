/* =============================================================== */
/* "Categoría" con Mayor GANANCIA y con Mayor GASTO */
function CatMayorGananciaGasto(tipo, mayor) {
	categReporte.forEach((cat) => {
		const filtrarOperPorCat = operaReporte.filter(
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

/* =============================================================== */
/* Categoría con Mayor BALANCE */
function CatMayorBalance(mayor) {
	categReporte.forEach((cat) => {
		const filtrarOperPorCat = operaReporte.filter(
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

/* =============================================================== */
/* "MES" con Mayor GANANCIA y con Mayor GASTO */
function MesMayorGananciaGasto(tipo, mayor) {
	let arrayAnioMes = [];
	operaReporte.forEach((oper) => {
		const fechaOper = new Date(oper.fecha);
		const anio = fechaOper.getFullYear();
		const mes = fechaOper.getMonth();

		if (
			oper.tipo === tipo &&
			!arrayAnioMes.some((e) => anio === e.anio && mes === e.mes)
		) {
			arrayAnioMes.push({
				anio: fechaOper.getFullYear(),
				mes: fechaOper.getMonth(),
			});
		}
	});

	arrayAnioMes.forEach((anioMes) => {
		const filtrarOperPorMes = operaReporte.filter(
			(oper) =>
				oper.tipo === tipo &&
				new Date(oper.fecha).getFullYear() === anioMes.anio &&
				new Date(oper.fecha).getMonth() === anioMes.mes
		);

		let totalCat = 0;
		if (filtrarOperPorMes.length !== 0) {
			totalCat = filtrarOperPorMes.reduce(function (total, oper) {
				return total + oper.monto;
			}, 0);
		}
		if (totalCat >= mayor.importe) {
			mayor.importe = totalCat;
			mayor.mes = `${meses[anioMes.mes]}-${anioMes.anio}`;
		}
	});
}

/* =============================================================== */
/*  TOTALES por CATEGORIA (Ganancia-Gasto-Balance) */
function totalesPorCat(totales) {
	categReporte.forEach((cat) => {
		const filtrarOperPorCat = operaReporte.filter(
			(oper) => cat.id === oper.categoria
		);

		let gan = 0;
		let gas = 0;
		filtrarOperPorCat.forEach((fil) => {
			fil.tipo === "GANANCIA" ? (gan += fil.monto) : (gas += fil.monto);
		});

		if (gan > 0 || gas > 0) {
			totales.push({
				nombreCat: cat.nombre,
				ganancia: gan,
				gasto: gas,
				balance: gan - gas,
			});
		}
	});
}

/* ===================================================== */
/*  TOTALES por MESES (Ganancia-Gasto-Balance) */
function totalesPorMes(totales) {
	let arrayAnioMes = [];
	operaReporte.forEach((oper) => {
		const fechaOper = new Date(oper.fecha);
		const anio = fechaOper.getFullYear();
		const mes = fechaOper.getMonth();

		if (!arrayAnioMes.some((e) => anio === e.anio && mes === e.mes)) {
			arrayAnioMes.push({
				anio: fechaOper.getFullYear(),
				mes: fechaOper.getMonth(),
			});
		}
	});

	arrayAnioMes.forEach((anioMes) => {
		const filtrarOperPorMes = operaReporte.filter(
			(oper) =>
				new Date(oper.fecha).getFullYear() === anioMes.anio &&
				new Date(oper.fecha).getMonth() === anioMes.mes
		);

		let gan = 0;
		let gas = 0;
		filtrarOperPorMes.forEach((fil) => {
			fil.tipo === "GANANCIA" ? (gan += fil.monto) : (gas += fil.monto);
		});

		if (gan > 0 || gas > 0) {
			totales.push({
				mes: `${anioMes.anio} - ${meses[anioMes.mes]}`,
				mesNum: anioMes.mes,
				anio: anioMes.anio,
				ganancia: gan,
				gasto: gas,
				balance: gan - gas,
			});
		}
	});
}
/* ===================================================== */

function formatPesos(num) {
	return num.toLocaleString("es-ES", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
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

const mes_may_gana_nom = document.getElementById("mes-may-gana-nom");
const mes_may_gana_imp = document.getElementById("mes-may-gana-imp");
const mes_may_gast_nom = document.getElementById("mes-may-gast-nom");
const mes_may_gast_imp = document.getElementById("mes-may-gast-imp");

const totales_por_categoria = document.getElementById("totales-por-categoria");
const totales_por_mes = document.getElementById("totales-por-mes");

let categReporte = [];
let operaReporte = [];
const meses = [
	/* Meses para Mes CON MAYOR ganancia */ "ENE",
	"FEB",
	"MAR",
	"ABR",
	"MAY",
	"JUN",
	"JUL",
	"AGO",
	"SEP",
	"OCT",
	"NOV",
	"DIC",
];

/* ------------------------------------------------ */
function mostrarSinReportes() {
	cont_sin_reporte.classList.remove("hidden");
	cont_con_reporte.classList.add("hidden");
}

/* ------------------------------------------------ */
/* Mostrar CON REPORTES */
function mostrarConReportes() {
	cont_sin_reporte.classList.add("hidden");
	cont_con_reporte.classList.remove("hidden");

	categReporte = JSON.parse(localStorage.getItem("categorias"));
	operaReporte = JSON.parse(localStorage.getItem("operaciones"));

	/* -------------------------- */
	/*  CATEGORIA CON MAYOR GANANCIA */
	let mayor = {
		nombreCategoria: "",
		importeCategoria: 0,
	};

	CatMayorGananciaGasto("GANANCIA", mayor);
	cat_may_gana_nom.innerHTML = `${mayor.nombreCategoria}`;
	cat_may_gana_imp.innerHTML = `$${formatPesos(mayor.importeCategoria)}`;

	/* -------------------------- */
	/*  CATEGORIA CON MAYOR GASTO */
	mayor = {
		nombreCategoria: "",
		importeCategoria: 0,
	};
	CatMayorGananciaGasto("GASTO", mayor);
	cat_may_gast_nom.innerHTML = `${mayor.nombreCategoria}`;
	cat_may_gast_imp.innerHTML = `-$${formatPesos(mayor.importeCategoria)}`;

	/* -------------------------- */
	/*  CATEGORIA CON MAYOR BALANCE */
	mayor = {
		nombreCategoria: "",
		importeCategoria: Number.NEGATIVE_INFINITY, //número negativo, más grande, con el que trabaja JavaScript
	};
	CatMayorBalance(mayor);
	cat_may_bala_nom.innerHTML = `${mayor.nombreCategoria}`;
	cat_may_bala_imp.innerHTML = `$${formatPesos(mayor.importeCategoria)}`;

	/* -------------------------- */
	/*  Mes CON MAYOR GANANCIA */
	let mayorAnioMes = {
		mes: "",
		importe: 0,
	};
	MesMayorGananciaGasto("GANANCIA", mayorAnioMes);
	mes_may_gana_nom.innerHTML = `${mayorAnioMes.mes}`;
	mes_may_gana_imp.innerHTML = `$${formatPesos(mayorAnioMes.importe)}`;

	/* -------------------------- */
	/*  Mes CON MAYOR GASTO */
	mayorAnioMes = {
		mes: "",
		importe: 0,
	};
	MesMayorGananciaGasto("GASTO", mayorAnioMes);
	mes_may_gast_nom.innerHTML = `${mayorAnioMes.mes}`;
	mes_may_gast_imp.innerHTML = `-$${formatPesos(mayorAnioMes.importe)}`;

	/* -------------------------- */
	/* Totales por Categoria  */
	let totalesCat = [];
	totalesPorCat(totalesCat);
	totalesCat.sort((a, b) => {
		return a.nombreCat.localeCompare(b.nombreCat);
	});

	totalesCat.forEach((totCat) => {
		let x;
		if (totCat.balance > 0) {
			x = `<div class="w-full sm:w-[33%] flex justify-end"> $${formatPesos(
				totCat.balance
			)} </div>`;
		} else {
			x = `<div class="w-full sm:w-[33%] flex justify-end text-[red] dark:text-red-900">
			-$${formatPesos(Math.abs(totCat.balance))} </div>`;
		}

		totales_por_categoria.innerHTML += `
		<div class="w-full flex flex-row border-t-2 border-indigo-100 dark:border-gray-400" > 
			  <div class="w-[35%] sm:w-[30%] md:w-[40%] ">
							${totCat.nombreCat}
				</div>

				<div class="w-[65%] sm:w-[70%] md:w-[60%] flex flex-col sm:flex-row">
					<div class="w-full sm:w-[33%] flex justify-end">
						$${formatPesos(totCat.ganancia)}
					</div>

					<div
						class="w-full sm:w-[33%] flex justify-end text-[red] dark:text-red-900"
					>
						-$${formatPesos(totCat.gasto)}
					</div> 
					${x}
				</div> 
		</div>`;
	});

	/* -------------------------- */
	/* Totales por MESES  */
	let totalesMes = [];
	totalesPorMes(totalesMes);
	totalesMes.sort((a, b) => {
		if (a.anio > b.anio) {
			return -1;
		} else {
			if (a.anio < b.anio) {
				return 1;
			} else {
				if (a.mesNum > b.mesNum) {
					return -1;
				} else {
					if (a.mesNum < b.mesNum) {
						return 1;
					} else {
						return 0;
					}
				}
			}
		}
	});

	totalesMes.forEach((totMes) => {
		let x;
		if (totMes.balance > 0) {
			x = `<div class="w-full sm:w-[33%] flex justify-end"> $${formatPesos(
				totMes.balance
			)} </div>`;
		} else {
			x = `<div class="w-full sm:w-[33%] flex justify-end text-[red] dark:text-red-900">
			-$${formatPesos(Math.abs(totMes.balance))} </div>`;
		}

		totales_por_mes.innerHTML += `
		<div class="w-full flex flex-row border-t-2 border-indigo-100 dark:border-gray-400" > 
			  <div class="w-[35%] sm:w-[30%] md:w-[40%] ">
							${totMes.mes}
				</div>

				<div class="w-[65%] sm:w-[70%] md:w-[60%] flex flex-col sm:flex-row">
					<div class="w-full sm:w-[33%] flex justify-end">
						$${formatPesos(totMes.ganancia)}
					</div>

					<div
						class="w-full sm:w-[33%] flex justify-end text-[red] dark:text-red-900"
					>
						-$${formatPesos(totMes.gasto)}
					</div> 
					${x}
				</div> 
		</div>`;
	});
}

/* ------------------------------------------------ */
/* ------------------------------------------------ */
/* viene de SCRIPT.JS */
function mostrarReportes() {
	let lonCate = 0;
	let lonOper = 0;
	if (localStorage.getItem("categorias") !== null) {
		lonCate = JSON.parse(localStorage.getItem("categorias")).length;
	}
	if (localStorage.getItem("operaciones") !== null) {
		lonOper = JSON.parse(localStorage.getItem("operaciones")).length;
	}

	if (lonCate > 0 && lonOper > 0) {
		mostrarConReportes();
	} else {
		mostrarSinReportes();
	}
}
