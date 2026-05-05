


fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        initApp(data);
    });

function initApp(emissionsData) {


//übertragung der original Daten (emissionsData) auf array zur filterung um original Daten nicht zu verlieren
let currentData = [...emissionsData];


const tableBody = document.getElementById("tableBody");

function renderTable(data) {
  tableBody.textContent = "";

  data.forEach(entry => {
    const row = document.createElement("tr");

    ["company", "country", "industry", "year", "emission", "change"].forEach(field => {
      const cell = document.createElement("td");
      cell.textContent = entry[field];
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}



//Aufruf render Function beim öffnen der Seite
renderTable (currentData);

//erweiterung durch function -> rendert Tabelle (neu) 


//Funktion für Sortierung nach Land
function sortByCountry() {

    currentData.sort((a, b) => 
        {
            return a.country.localeCompare(b.country);
        }
    )
    renderTable (currentData);
}

//Funktion für Sortierung nach Unternehmen
function sortByCompany() {

    currentData.sort((a, b) => 
        {
            return a.company.localeCompare(b.company);
        }
    )

    renderTable (currentData);

}

//Funktion für Sortierung nach Branche
function sortByIndustry() {

    currentData.sort((a, b) => 
        {
            return a.industry.localeCompare(b.industry);
        }
    )
    renderTable (currentData);
}

//Ausführen der Sort-Funktionen bei click auf deren Button
document.getElementById("sortCompany").onclick = () => {
    sortByCompany(currentData);
};
document.getElementById("sortCountry").onclick = () => {
    sortByCountry(currentData);
}
document.getElementById("sortIndustry").onclick = () => {
    sortByIndustry(currentData);
}





//Suche über alle Tabellenfelder (Unternehmen, Land, Branche)
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function(){
    
    const filterText = searchInput.value.toLowerCase().trim();

    currentData = emissionsData.filter(entry => {
        
        return entry.company.toLowerCase().includes(filterText)||
               entry.country.toLowerCase().includes(filterText)||
               entry.industry.toLowerCase().includes(filterText);
        });

    renderTable(currentData);


});
}