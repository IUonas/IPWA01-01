/* 
Tabellen-Logik

Tabelle zeigt pro Zeile genau einen Datensatz 

-> Eine Zeile =     - ein Unternehmen 
                    - in einem Land 
                    - in einer Branche
                    - in einem Jahr
                    - Emission in diesem Jahr 
                    - Veränderung zum Vorjahr

-> Eine Tabellenzeile = ein Objekt in JavaScript 
    -> Viele Zeilen zusammen = Array aus Objekten

*/
/*

{} -> Objekt 
[{},{},.{}] -> Array 

let -> Variabel kann später neu zugewiesen werden 
const -> Variable darf nicht neu zugewiesen werden, (bsp Array kann aber erweitert werden (push))
*/

/*

Ablauf Daten von JS in HTML: 

1. HTML baut table-Struktur 
    - legt table an 
    - legt thead an mit Überschriften 
    - legt tbody an (leer) mit ID als Referenz für JS 

2. JS holt sich das zu bearbeitende HTML-Element (tbody)
    - über const tableBody = document.getElementById("tbody ID"); 

3. JS holt sich Daten 
    - const firstEntry = emissionsData[0];

4. JS schreibt in HTML 
    -   "tbody ID".innerHTML = 
            <tr>
                <td>${firstEntry.company}</td>
                <td>...</td>
            </tr>
        ;

*/


/*const emissionsData = [
    {
        company: "EcoSteel GmbH</td",
        country: "Deutschland",
        industry: "Stahl",
        year: 2023,
        emission: 420000,
        change: -3.2
    },
    {
        company: "NordWind Energy",
        country: "Dänemark",
        industry: "Energie",
        year: 2023,
        emission: 185000,
        change: -8.7
    },
    {
        company: "AlpineLogistik AG",
        country: "Schweiz",
        industry: "Logistik",
        year: 2023,
        emission: 96000,
        change: +1.4
    },
    {
        company: "GreenChem Industries",
        country: "Deutschland",
        industry: "Chemie",
        year: 2022,
        emission: 310000,
        change: -2.1
    },
    {
        company: "BlueTransport Ltd.",
        country: "UK",
        industry: "Transport",
        year: 2023,
        emission: 142000,
        change: +3.8
    }
]
*/

fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        initApp(data);
    });

function initApp(emissionsData) {
/*

Erster Versuch: 

let data = {
    company: "company",
    industry: "industry",
    year: "year",
    emission: "emission",
    change: "change"
}

let list = [data];

*/

/*

Zweiter Versuch
const tableBody = document.getElementById("tableBody");
const firstEntry = emissionsData[0];

tableBody.innerHTML = `
    <tr>
        <td>${firstEntry.company}</td>
        <td>${firstEntry.country}</td>
        <td>${firstEntry.industry}</td>
        <td>${firstEntry.year}</td>
        <td>${firstEntry.emission}</td>
        <td>${firstEntry.change}</td>
    </tr>
`;

*/ 

/*
Dritter Versuch 

// forEach  -> gehe jeden Eintrag durch 
// entry    -> aktueller Datensatz
emissionsData.forEach(entry => 
    
    {
    // += -> ersetzt nicht sondern erweitert den HTML eintrag 
        tableBody.innerHTML += 
            `
            <tr>
                <td>${entry.company}</td>
                <td>${entry.country}</td>
                <td>${entry.industry}</td>
                <td>${entry.year}</td>
                <td>${entry.emission}</td>
                <td>${entry.change}</td>
            </tr>
            `
        ;
    }
)
*/

//übertragung der original Daten (emissionsData) auf array zur filterung um original Daten nicht zu verlieren
//let currentData = [...emissionsData];


//const tableBody = document.getElementById("tableBody");

/*function renderTable(data) {
    
    //"leeren" des tableBodys 
    tableBody.innerHTML = "";

    //neu rendern der Tabelle
    data.forEach(entry => 
    
        {
        
            // += -> ersetzt nicht sondern erweitert den HTML eintrag 
            tableBody.innerHTML += 
                `
                <tr>
                    <td>${entry.company}</td>
                    <td>${entry.country}</td>
                    <td>${entry.industry}</td>
                    <td>${entry.year}</td>
                    <td>${entry.emission}</td>
                    <td>${entry.change}</td>
                </tr>
                `
            ;
        }
    )
}
*/
/*
Konzept Sortieren: 

nicht Tabelle Filtern 
    -> Array sortieren  => array.sort()
        -> dann Tabelle neu Rendern 


.sort   -> -1 = a bleibt vor b            (<- "Schleife")(<- Fertig wenn nach durchlauf keine Änderungen mehr vorgenommen werden müssen / alles sortiert ist)
        ->  0 = a bleibt vor b
        ->  1 = b kommt vor a 

return a.country.localcompare(b.country); (<- Vergleichkriterium) (return für .sort)

-> a = erster Eintrag in Array
-> b = darauf folgender Eintrag in Array 

-> localcompare = alphabetischer Vergleich -> schaut ob Eintrag in a vor Eintrag in b kommt
    -> Kommt Eintrag a vor Eintrag b in alphabet    -> -1 
    -> Sind Eintrag a und Eintrag b glech           ->  0 
    -> Kommt Eintrag a nach Eintrag b               ->  1 

*/

//Aufruf render Function beim öffnen der Seite
//renderTable (currentData);

//erweiterung durch function -> rendert Tabelle (neu) 


//Funktion für Sortierung nach Land
/*function sortByCountry() {

    currentData.sort((a, b) => 
        {
            return a.country.localeCompare(b.country);
        }
    )
    renderTable (currentData);
}
*/

//Funktion für Sortierung nach Unternehmen
/*function sortByCompany() {

    currentData.sort((a, b) => 
        {
            return a.company.localeCompare(b.company);
        }
    )

    renderTable (currentData);

}
*/

//Funktion für Sortierung nach Branche
/*function sortByIndustry() {

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
*/


//Filter 
/*Konzept Filtern

 -> Sortieren = Reihenfolge ändern 
 -> Filtern = Einträge reduzieren 
        -> nicht Original Daten verändern (emissonsData)
        -> durch Filter Datensatz (currentData) reduzierten

    Original Daten -> Filtern -> Reduzierte Daten -> renderTable mit reduziertem Datensatz

    Filter wird eingegeben -> filterText holen -> currentData auf basis von emissionsData neu berechnen -> renderTable


Überführen der Eingabe: 
    - searchInput = HTML Element
    - searchInput.value = aktuell eingegebene Text
    
    - addEventListener(""trigger""", "auszuführendes "Element()"");
        -> durchgehend Aktiv - wartet auf Event 
            -> Event = "trigger"

                -> "input"   = sobald sich der Inhalt des Feldes ändert (tippen, löschen, einfügen)
                -> "click"   = Klick 
                -> "change"  = wenn Feld verlassen wird 
                -> "keydown" = Taste gedrückt 

            -> auszuführendes "Element()" = was bei trigger ausgeführt werden soll 

    - .toLowerCase() = Alles wird LowerCase -> umgeht Groß/Kleinschreibung
    - .trim() = entfernt Leerzeichen am Anfang und Ende

    -> .filter = geht jeden Eintrag (entry) des arrays (emissionsData) durch 
       
        -> entry.company = überprüfe "company" des Eintrags (entry)
            1. .toLowerCase -> setze alles von entry.company toLowerCase 
            2. .includes(filterText) -> überprüfe ob entry.company filterText enthält
            3. || -> oder -> so bezieht sich .filter auf company, country & industry. Enthält eines davon den filterText bleibt der Eintrag
*/

/*
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
*/

// Tabulator

/* Erzeugen eines Objektes der Klasse Tabulator 
    -> Tabulator weiß wo er arbeiten soll (in welchem DOM-Element) - über ID
    -> und wie er arbeiten soll 
            -> baut aus diesen Infos HTML, Event Handler und Logik (Sortierung, Filter)
*/
const table = new Tabulator("#emissionsTable", {

    /* data -> erwartet Array mit Aufbau [{Feld1: "Inhalt", Feld2: "Inhalt", Feld3: "Inhalt"},{Objekt2},{Objekt3},...]
        -> Tabulator zeigt  jede Zeile ein Objekt
                            jede Spalte ein Feld des Objekts
    
    */ 
    data: emissionsData,

    /* layout -> steuer wie Spaltenbreite berechnet wird 
        -> fitColumns       = Spalten werden so gestreckt, dass sie die gesamte breite ausfüllen
        -> fitData          = Spalten so breit wie der Inhalt
        -> fitDataStretch   = Mischung der oberen 

    */
    layout: "fitColumns",

    pagination: true,
    paginationSize: 15,

    
    

    /* responsiveLayout -> verhalten bei zu wenig Platz auf Bildschirm 
        -> hide    = wenn Bildschirm zu klein werden Spalten von rechts ausgeblendet 
        -> collapse = ausgeblendete Daten erscheinen aufklappbar unter der Zeile 
    */
    //responsiveLayout: "hide", -> ausgeblendet, ersetzt durch getTableLayout function 

    /* columns -> Array erwartet von Tabulator 
        -> Wie sieht jede Spalte aus 
            -> title = was der Nutzer sieht 
            -> field = Schlüsselim Datenobjekt (entry.company -> row[field] -> row["company"] -> Verbindung zwischen Daten und Tabelle)
            -> sorter = wie Tabelle sortiert werden soll 
                -> string = alpabetisch 
                -> number = numerisch 
            -> headerFilter = erzeugt Input Feld im Tabellenkopf
                -> filtert die Daten live 
    */
    columns: [
        { title: "Unternehmen", field: "company", sorter: "string", headerFilter: "input", minWidth: 180,},
        { title: "Land", field: "country", sorter: "string", headerFilter: "input", minWidth: 130 },
        { title: "Branche", field: "industry", sorter: "string", headerFilter: "input", minWidth: 130 },
        { title: "Jahr", field: "year", sorter: "number", minWidth: 90 },
        { title: "Emission (t CO₂)", field: "emission", sorter: "number", minWidth: 150 },
        { title: "Veränderung (%)", field: "change", sorter: "number", minWidth: 160, formatter: function(cell) {
            let value = cell.getValue();

            if (value > 0) {
                return `<span style="color:red; font-weight:bold">${value}</span>`;
          
            } else {
                return `<span style="color:green">${value}</span>`;
            }
            }  
        }
    ]
});




// Chart
const chartContext = document.getElementById("emissionsChart");

let emissionsChart;

function groupEmissionByField(data, field) {
    const groupedData = {};

    data.forEach(entry => {
        groupedData[entry[field]] = (groupedData[entry[field]] || 0) + entry.emission;
    });

    return groupedData;
}



function createChart(type, labels, values, labelText) {
    if (emissionsChart) {
        emissionsChart.destroy();
    }
    
    const showLegend = type === "pie";
    
    emissionsChart = new Chart(chartContext, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: labelText,
                data: values,
                backgroundColor: [
                '#FE5F55',
                '#E8E1EF',
                '#403F4C',
                '#FFEE88',
                '#E5BEED'

                
            ]
            }]
           

        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend:{
                    display: showLegend
                }
            }
        }
    });
}


function updateChart(visibleData) {
    const filters = table.getHeaderFilters();

    const hasCountryFilter = filters.some(filter => filter.field === "country");
    const hasIndustryFilter = filters.some(filter => filter.field === "industry");

    

    if (hasCountryFilter || hasIndustryFilter) {
    createChart(
        "bar",
        visibleData.map(entry => entry.company),
        visibleData.map(entry => entry.emission),
        "Emissionen in t CO₂"
    );
} else {
    const grouped = groupEmissionByField(visibleData, "country");

    createChart(
        "pie",
        Object.keys(grouped),
        Object.values(grouped),
        "Emissionen nach Land"
    );
}
}



table.on("dataFiltered", function (filters, rows) {
    const visibleData = rows.map(row => row.getData());
    updateChart(visibleData);
});
table.on("dataSorted", function (sorters, rows) {
    const visibleData = rows.map(row => row.getData());
    updateChart(visibleData);
});

table.on("dataFiltered", function (filters, rows) {
    const visibleData = rows.map(row => row.getData());
});

}

