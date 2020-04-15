

const tBody = document.querySelector('.fetch-content')
// fetching confirmed, recovered and total deaths
function fetchApiData(){
        fetch('http://api.coronastatistics.live/all').then((response) => {
        return response.json();
    }).then((data) => {
        const totalConfirmed = document.getElementsByClassName('confirmed-cases')[0].innerHTML = data.cases;
        const totalRecovered = document.getElementsByClassName('recovered-cases')[0].innerHTML = data.recovered;
        const totalDeaths = document.getElementsByClassName('death-cases')[0].innerHTML = data.deaths;
        document.getElementsByClassName('active-cases')[0].innerHTML = totalConfirmed - (totalRecovered + totalDeaths);
        document.getElementsByClassName('closed-cases')[0].innerHTML = totalRecovered + totalDeaths;
    })

        fetch('http://api.coronastatistics.live/countries').then(response => {
            return response.json();
        })
        .then(data => {
            // console.log(data[1].cases)
            let tCases = 0;
            let tNewCases = 0;
            let tDeaths = 0;
            let tNDeaths = 0;
            let tRecovered  = 0;
            let tActiveCases = 0;
            let tCriticalCases = 0;
            let tCasesPMillion = 0;
            let tDeathsPMillion = 0;
            let tTestsPMillion = 0;
            let obj = {};
            function sumWorldData(cases,
                 newCases,
                 ){
                tCases += cases;
                tNewCases += newCases;
                tDeaths
                tNDeaths
                tRecovered
                tActiveCases
                tCriticalCases
                tCasesPMillion
                tDeathsPMillion
                tTestsPMillion
                // obj.totalCases;
                obj.totalCases = tCases;
                // obj.totalNewCases;
                obj.totalNewCases = tNewCases;
            }
            for(let i = 0; i < data.length; i ++){
                sumWorldData(
                     data[i].cases,
                     data[i].todayCases,
                     data[i].deaths,
                     data[i].todayDeaths,
                     data[i].recovered,
                     data[i].active,
                     data[i].critical,
                     data[i].casesPerOneMillion,
                     data[i].deathsPerOneMillion,
                     data[i].tests,
                     data[i].testsPerOneMillion
                )}
            console.log(obj)
        console.log(obj.totalCases)
        console.log(obj.totalNewCases)
        
        

           
            function countriesCount(){
            let i;
            for(i = 0; i < data.length - 2; i++){}
            return i;
        }
        document.querySelector('.countries-count').textContent = countriesCount();
            populateCountryData(data);
        })
    }

    function populateCountryData(data){
        function sortByCases(data){
        data.sort(function(a, b){
            return b.cases - a.cases;
        })
    }

    sortByCases(data);
     


    data.forEach(covid => {
        const tr = document.createElement('tr');   

        // adding '+' sign to new to today new cases and today new deaths
        function addPlus(input){
            if(input === 0){
                input = "";
                return input;
            } 
             else {
                return `+${input}`;
            }
        }

        function removeZero(input) {
            if(input === 0) {
                input = "";
                return input;
            } else {
                return input;
            }
        }
        // calling addPlus and remove zero functions
        const todayCases = addPlus(covid.todayCases);
        const todayDeaths = addPlus(covid.todayDeaths);
        const peopleDied = removeZero(covid.deaths)
        const recoveredCases = removeZero(covid.recovered)
        const activeCases = removeZero(covid.active)
        const criticalCases = removeZero(covid.critical)
        const casesPerOneMillionCases = removeZero(covid.casesPerOneMillion)
        const deathsPerOneMillionCases = removeZero(covid.deathsPerOneMillion)
        const casesTested = removeZero(covid.tests)
        const perOneMillionTestedCases = removeZero(covid.testsPerOneMillion)

        // injecting data to the table
        
        // function that creates td's
        function createDataCell(cellData){
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td)
            return tr;
        }

        const countries = createDataCell(covid.country).children[0];
        createDataCell(covid.cases);
        const newCases = createDataCell(todayCases).children[2];
        createDataCell(peopleDied);
        const newDeaths = createDataCell(todayDeaths).children[4];
        createDataCell(recoveredCases);
        createDataCell(activeCases);
        createDataCell(criticalCases);
        createDataCell(casesPerOneMillionCases);
        createDataCell(deathsPerOneMillionCases);
        createDataCell(casesTested);
        createDataCell(perOneMillionTestedCases);

        tBody.appendChild(tr);

        // styling new cases and new deaths cells + styling international conveyances to distinguish them from other countries.
        if(newCases.textContent.includes('+')){
            newCases.style.background = "#f4f9a7";
            // ff0000
        } 
        if( newDeaths.textContent.includes('+')){
            newDeaths.style.background = "#ff0000";
            newDeaths.style.color = "#ffffff";
        } else if (covid.country.toLowerCase().includes('diamond princess') || covid.country.toLowerCase().includes('ms zaandam')){
            countries.style.color= "blue";
            countries.style.fontStyle = "italic";
        }
    });  
}  

// calling main function
document.addEventListener('DOMContentLoaded', () => { fetchApiData(); });