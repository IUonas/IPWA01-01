




//Einlesen der Daten für die Tabelle
fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        initApp(data);
    });

function initApp(emissionsData) {



//erstellen der Tabelle über das Tabulator Framework 
const table = new Tabulator("#emissionsTable", {

    data: emissionsData,
    layout: "fitColumns",

    pagination: true,
    paginationSize: 15,

    
    //Aufbau der Tabulator-Tabelle
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




//Chart-Initialisierung & globale Variablen
const chartContext = document.getElementById("emissionsChart");

let emissionsChart;

//Daten nach Feld gruppieren
function groupEmissionByField(data, field) {
    const groupedData = {};

    data.forEach(entry => {
        groupedData[entry[field]] = (groupedData[entry[field]] || 0) + entry.emission;
    });

    return groupedData;
}


//Chart erstellen oder neu rendern
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


//Chart basierend auf Filterstatus aktualisiere
function updateChart(visibleData) {
    const filters = table.getHeaderFilters();

    const hasCountryFilter = filters.some(filter => filter.field === "country");
    const hasIndustryFilter = filters.some(filter => filter.field === "industry");

    
    // Balkendiagramm bei aktiven Filtern
    if (hasCountryFilter || hasIndustryFilter) {
    createChart(
        "bar",
        visibleData.map(entry => entry.company),
        visibleData.map(entry => entry.emission),
        "Emissionen in t CO₂"
    );

    // Kreisdiagramm ohne Filter (Übersicht nach Ländern)
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


//Event: Tabelle gefiltert → Chart aktualisieren
table.on("dataFiltered", function (filters, rows) {
    const visibleData = rows.map(row => row.getData());
    updateChart(visibleData);
});

//Event: Tabelle sortiert → Chart aktualisieren
table.on("dataSorted", function (sorters, rows) {
    const visibleData = rows.map(row => row.getData());
    updateChart(visibleData);
});

//(Optional / aktuell ungenutzt) zweiter Filter-Listener
table.on("dataFiltered", function (filters, rows) {
    const visibleData = rows.map(row => row.getData());
});

}

