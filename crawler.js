if (localStorage.getItem("an_dz__curcity") === null) {
	localStorage.setItem("an_dz__stations", "");
	localStorage.setItem("an_dz__curcity", 0);
	localStorage.setItem("an_dz__curcity_name", "");
	localStorage.setItem("an_dz__curstate_name", "");
}

function saveTextAsFile() {
	const state = localStorage.getItem("an_dz__curstate_name");
	const textToWrite = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Postos</title></head><body><table><thead><tr><th>MUNICÍPIO</th><th>ESTADO</th><th>COMBUSTÍVEL</th><th>RAZÃO SOCIAL</th><th>ENDEREÇO</th><th>BAIRRO</th><th>BANDEIRA</th><th>PREÇO VENDA</th><th>DATA COLETA</th></tr></thead><tbody>${localStorage.getItem("an_dz__stations")}</tbody></table></body></html>`;
	const textFileAsBlob = new Blob([textToWrite], {
		type : "text/html",
	});

	// Create temporary link. No need to add it to the DOM
	const downloadLink = document.createElement("a");
	downloadLink.download = `postos_${state}.html`;
	downloadLink.title = "Download";
	downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	downloadLink.click();

	localStorage.setItem("an_dz__stations", "");
	localStorage.setItem("an_dz__curcity", 0);
	localStorage.setItem("an_dz__curcity_name", "");
	localStorage.setItem("an_dz__curstate_name", "");
}

function open_city() {
	const cities = document.querySelectorAll("td > a.linkpadrao");
	let cur_city = parseInt(localStorage.getItem("an_dz__curcity"), 10);
	const state = document.querySelector("input[name=\"DESC_ESTADO\"]").value;

	if (cur_city >= cities.length) {
		saveTextAsFile();
		return;
	}

	// force zero para não filtrar por nome
	const city = () => 0;
	// SÃO PAULO: troque as letras para selecionar com quais letras o nome da cidade deve começar
	// const city = (cur) => cities[cur].textContent.search(/^[DEF]/);

	while (city(cur_city) === - 1) {
		if (localStorage.getItem("an_dz__stations").length > 0) {
			saveTextAsFile();
			return;
		}

		cur_city++;
	}

	localStorage.setItem("an_dz__curcity", cur_city + 1);
	localStorage.setItem("an_dz__curstate_name", state);
	localStorage.setItem("an_dz__curcity_name", cities[cur_city].textContent);
	history.pushState(1, "city");
	setTimeout(() => cities[cur_city].click(), 500);
}

function get_stations() {
	const stations = document.querySelectorAll("form .table_padrao tr:not(tr:first-child, tr:nth-child(2))");
	const city = localStorage.getItem("an_dz__curcity_name");
	const state = localStorage.getItem("an_dz__curstate_name");
	const fuel = document.querySelector("input[name=\"desc_Combustivel\"]").value.replace(/^ - ([A-Z ]+) R\$\/l/, "$1");
	let stations_html = localStorage.getItem("an_dz__stations");

	for (let i = 0; i < stations.length; i++) {
		const data = stations[i].childNodes;
		stations_html += `<tr><td>${city}</td><td>${state}</td><td>${fuel}</td>`;

		for (let j = 0; j < data.length; j++) {
			stations_html += `<td>${data[j].textContent}</td>`;
		}

		stations_html += "</tr>";
	}

	localStorage.setItem("an_dz__stations", stations_html);
	history.back();
}

const stations_list = document.querySelector("input[name=\"municipio\"]");
const cities_list = document.querySelector("input[name=\"selMunicipio\"]");

if (cities_list !== null) {
	open_city();
}
else if (stations_list !== null) {
	get_stations();
}
