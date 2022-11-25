


//just an indicator of a current button 
const changeButtonsIfActive = () =>{
    let btns = document.querySelectorAll('button');

    for(let i = 0; i < btns.length; i++){

        btns[i].addEventListener('click', function(){

            let current = document.querySelectorAll('.active');
            if(current.length > 0 ){

                current[0].className = current[0].className.replace('active', '');
                
            }
            btns[i].className = 'active';
        })
    }
}

changeButtonsIfActive()


//fetching countries and displaying them into container div
let countriesArr = [];
const fetchCountries = async () =>{
        let loader = `
            <div class = "wrapperLoading">
                <div>
                    <h2 class="waitText">
                        Please wait for a moment...
                    </h2>
                </div>
                <div class="loading"></div>
            </div>`;
        document.querySelector('.countriesContainer').innerHTML = loader;
        const url = 'https://restcountries.com/v2/all';
        let countriesContainer = document.querySelector('.countriesContainer');
        const response = await fetch(url);
        const countries = await response.json();


        //pushing countries into array that the array can be used in the search feature
        pushingCountries = () =>{
            
            for(const country of countries){
                let capital = ''
                if(country.capital){
                    capital = country.capital
                };

                if(!country.capital){
                    capital = 'No official capital'
                }
                countriesArr.push({
                    countryName: country.name,
                    population: country.population,
                    languages: country.languages,
                    flag: country.flag,
                    capital: capital
                });
            }
     
        }
        pushingCountries();

        //counting the total number of countries in the world
        let countriesCounts = document.querySelector('.countriesCounts');
        countriesCounts.innerText = `Currently, we have ${countries.length} countries`
        let defaultFlag = 0;
        // let GetTheme = JSON.parse(localStorage.getItem('PageTheme'));
        function changeColor(){
            const toggle = document.querySelector('#toggle');
            let header = document.querySelector('header');
            let cards = document.querySelectorAll('.cards')
            let toggleText = document.querySelector('.toggleText');
            let wrapper = document.querySelector('.wrapper');
            let ul = document.querySelector('ul');
            let countriesWrapper = document.querySelectorAll('.countriesWrapper');
            let noDataFoundDiv = document.querySelector('.noDataFoundDiv');
            let populationContainer = document.querySelectorAll('.populationContainer')
            let languagesContainer = document.querySelectorAll('.languagesContainer')
            let countsText = document.querySelectorAll('.countsContainer')
            
            for(const card of cards){
                card.style.background = 'white';
                card.style.color = 'black';
                card.style.transition = '1.5s'
            }
            const lightMode = () =>{
                header.style.background = "white"
                header.style.transition = '1.5s'
                header.style.color = 'black';
                countriesContainer.style.background = '#e7e7e7';
                countriesContainer.style.transition = '1.5s'
                toggle.style.color = 'black'
                wrapper.style.background = 'white';
                toggleText.style.color = 'black';
                noDataFoundDiv.style.color = '#e7e7e7'; 
                for(const card of cards){
                    card.style.background = 'white';
                    card.style.color = 'black';
                    card.style.transition = '1.5s'
                }
                for(const languagesText of languagesContainer){
                    languagesText.style.color = 'black';
                }
                for(const counts of countsText){
                    counts.style.color = 'black'
                }
        
                for(const country of countriesWrapper){
                    country.style.color = 'black';
                }
        
                for(population of populationContainer){
                    population.style.color = 'black';
                }
            }
            
            
            const darkMode = () =>{
                header.style.background = "#444343"
                header.style.transition = '1.5s'
                header.style.color = 'white';  
                countriesContainer.style.transition = '1.5s'
                countriesContainer.style.background = '#333';
                toggleText.style.color = 'white';
                toggle.style.color = 'white';
                wrapper.style.background = '#444343';
                noDataFoundDiv.style.color = '#333';
                for(const languagesText of languagesContainer){
                    languagesText.style.color = 'white';
                }
                for(const counts of countsText){
                    counts.style.color = 'white'
                }
        
            
                for(const card of cards){
                    card.style.background = '#444343';
                    card.style.color = 'white';
                    card.style.transition = '1.5s'
                }
        
                for(const country of countriesWrapper){
                    country.style.color = 'white';
                }
        
                for(population of populationContainer){
                    population.style.color = 'white';
                }
        
          
            }
           
        
            let theme;
  
            toggle.addEventListener('click', function(){
                
                this.classList.toggle("bi-sun-fill");
        
                
                if(this.classList.toggle("bi-moon-stars-fill")){
                    theme = 'light';
                    defaultFlag = 0;
                    lightMode();
                }
                else{
                    theme = 'dark'
                    defaultFlag = 1;
                    darkMode();
                }
                localStorage.setItem('PageTheme', JSON.stringify(theme));
                console.log(localStorage)


            })
   
            
           let GetTheme = JSON.parse(localStorage.getItem('PageTheme'));
                if(GetTheme === 'dark'){
                    darkMode();
                    defaultFlag = 1;
                    toggle.className = 'bi-sun-fill'
                }
                else{
                    lightMode();
                    defaultFlag = 0;
                    toggle.className = 'bi-moon-stars-fill'
                }

                

        }
        
        changeColor()

        console.log(defaultFlag)
    
        
       
        //after the url has been fetched. It's time to display the countries into div. 
        function displayCountries(array){

            
            countriesContainer.innerHTML = '';


            for(let i = 0; i < array.length; i++){
                let cards = document.createElement('div');          //creating cards container for countries
                let flags = document.createElement('img');
                let country = document.createElement('p');
                cards.className = 'cards'; 
    
                //fetching flag
                flags.className = 'flags'; 
                cards.appendChild(flags);
                flags.src = `${array[i].flag}` 
    
                //fetching countries names
                country.innerText = `${array[i].countryName}`;  
                 
                // countriesContainer.appendChild(div);
                
                country.className ='country'
                //creating divs for details element
                let details = document.createElement('div');
                details.className = 'details';
    
                //creating details element
                let capital = document.createElement('p');
                let languages = document.createElement('p')
                let population = document.createElement('p');
           
    
                //fetching details
                capital.innerText     = `Capital:     ${array[i].capital}`;
                
     
                //to get the language
                let language = '';
                for(let j = 0; j<array[i].languages.length; j++){
                    if(array[i].languages.length===1){
                        language = `Language: ${array[i].languages[0].name}`;
                    }
                   
                    if(array[i].languages.length===2){
                        language = `Languages: ${array[i].languages[0].name} and ${array[i].languages[1].name} `;
                    }
    
                    //to format the language in an appropriate way especially if there are 2 or more countries
                    if(array[i].languages.length>2){
                       let formattedLanguage = ''
                       for(let j = 0; j<array[i].languages.length; j++){
                            if(j === array[i].languages.length - 2){
                                formattedLanguage += `${array[i].languages[array[i].languages.length-2].name} and ${array[i].languages[array[i].languages.length-1].name}`
                            }
                            if(j < array[i].languages.length - 2){
                                formattedLanguage += `${array[i].languages[j].name}, `
                            }
                       }
                       language = `Languages: ${formattedLanguage}`
    
                    }
    
                }
     
    
    
                languages.innerText = language;
    
                population.innerText  = `Population:  ${array[i].population.toLocaleString()}`;
    
                
                //appending the elements into a div to be displayed
                cards.append(country, details);
                details.append(capital, languages, population);
               
                document.querySelector('.countriesContainer').append(cards);
                // console.log(cards)
              
                if(defaultFlag === 1){
                    cards.style.background = '#444343';
                    cards.style.color = 'white';
                }
                if(defaultFlag === 0){
                    cards.style.background = 'white';
                    cards.style.color = 'black';
                }
            }

        }

        const buttons = document.querySelectorAll('.buttonContainers > button');
        

        //a toggle button used to sort the countries alphabetically (A-Z)
        function  sortByName(){

            const sortByNameButton = buttons[0];
            let countriesContainer = document.querySelector('.countriesContainer')
            let reversed = []
            sortByNameButton.addEventListener('click', function(){
                reversed.push(countriesArr.reverse());
                displayCountries(reversed[0])
                
            })
            
            
            
        }
        
        sortByName();
       
 
        
        sortByCapital = () =>{
            const sortByCapitalButton = buttons[1];
            let sortedCapitals = Object.values(countriesArr).sort((a,b)=> {
                if(a.capital > b.capital) return -1;
                if(a.capital < b.capital) return 1;
                return 0;
            });
            console.log(sortedCapitals)
            
            let reversingCapitalsArray = [];
            sortByCapitalButton.addEventListener('click', function(){
                
                reversingCapitalsArray.push(sortedCapitals.reverse());
                displayCountries(reversingCapitalsArray[0])
            })



        }

        sortByCapital();


        sortByPopulation = () =>{
            const sortByPopulationButton = buttons[2];
            let sortedPopulation = Object.values(countriesArr).sort((a,b)=>{
                if(a.population < b.population) return -1;
                if(a.population > b.population) return 1;
                return 0;
            })

            let reversingPopulationArray = [];
            sortByPopulationButton.addEventListener('click', function(){
                reversingPopulationArray.push(sortedPopulation.reverse());
                displayCountries(reversingPopulationArray[0]);
            })
        }

        sortByPopulation();

        //search function
        search = () =>{
            let countriesContainer = document.querySelector('.countriesContainer');
            let searchInput = document.querySelector('.search');    
            
            
            searchInput.addEventListener('input', function(){
                countriesContainer.innerHTML = '';
                let searchedCountries = [];
                let pole = 0;
                let criteriaSatisfaction = document.querySelector('.criteria');
                
                criteriaSatisfaction.innerHTML = '';
                //pushing searched words into an array that matches the country name
                for(const country of countriesArr){
                    if(country.countryName.toUpperCase().includes(searchInput.value.toUpperCase())){
                        searchedCountries.push({
                            countryName: country.countryName,
                            population: country.population,
                            languages: country.languages,  
                            flag: country.flag,
                            capital: country.capital
                        })
                        
                        pole = 1;
                    }

                }
       
                if(searchInput.value === ''){
                    criteriaSatisfaction.innerHTML = '';
                }
                else{
                    criteriaSatisfaction.innerText = `${searchedCountries.length} satisfied the search criteria`;
                }
                

                //If there's no found words. The display will show "No Data Found";

                let noDataFoundDiv = document.querySelector('.noDataFoundDiv');
                if(pole === 0){
                    countriesContainer.style.display = 'none'
                    noDataFoundDiv.style.display = 'flex';
                }


         

                if(pole === 1){
                    countriesContainer.style.height = 'fit-content'
                    countriesContainer.style.display = 'flex'
                    noDataFoundDiv.style.display = 'none';
                }

                //calling back this function to display countries with search countries only
               
                displayCountries(searchedCountries)
                
    
            })
        
        }
        displayCountries(countriesArr)
        
        search();
        

        //To get the top 10 most populated countries
        const getTop10Population=()=>{
            let populationArr = [];
            let count = 10;
        
        
            for(let country of countriesArr){
        
                populationArr.push({country: country.name, population: country.population})
            }
            
            let sorter = populationArr.sort((a,b)=>b.population - a.population);
            let tallySorter = [];
            for(let i = 0; i<count; i++){
                let container = {country: sorter[i].country, population: sorter[i].population}
                tallySorter.push(container)
            }
            return tallySorter
        }
        
        
        
        
        getTop10Population()


        //To get the countries based on their population
        let getCountries=()=>{
            let ul = document.querySelector('ul')
            
        
            let totalPopulation=0;
            let worldPopulation = [];
            for(let i = 0 ; i<countries.length; i++){
                totalPopulation+=countries[i].population
                
            }
            worldPopulation.push(totalPopulation)
                
            
            for(let i = 0; i<10; i++){
                let populationArr = [];
                let count = 10;
         
            for(let country of countries){
        
                populationArr.push({country: country.name, population: country.population})
            }
            
            let sorter = populationArr.sort((a,b)=>b.population - a.population);
            let tallySorter = [];
            for(let i = 0; i<count; i++){
                let container = {country: sorter[i].country, population: sorter[i].population}
                tallySorter.push(container)
                
            }
            let filteredCountries = ['World']
            for(let i = 0; i<tallySorter.length; i++){
                 filteredCountries.push(tallySorter[i].country)
            }
            
            for(let i = 0; i<tallySorter.length; i++){
                worldPopulation.push(tallySorter[i].population)
            }
        
            let li = document.createElement('li');
        
            let overallPopulation = worldPopulation[0];
        
            let totalArr = [];
            let totals = 0;
            for(let i = 0 ; i<10; i++){
                totals=(worldPopulation[i]/overallPopulation) * 100;
                totalArr.push(totals)
            }
           
            
            //a function that creates progress bar based on the value of either population or languages used.
            
            progressBarCreator = () =>{
                let charts = `<div class="charts" style="width: 600px"><p class="chartChild" style="width: ${totalArr[i]}%"></p></div>`
                let countriesCont = `<p class="countriesWrapper">${filteredCountries[i]}</p>`
                let worldPopulationCont = `<p class="populationContainer">${worldPopulation[i].toLocaleString()}</p>`
                li.innerHTML = `${countriesCont} ${charts} ${worldPopulationCont} `            
                ul.appendChild(li)
            }

            
            progressBarCreator()
            }
 
            let countriesWrapper = document.querySelectorAll('.countriesWrapper')
            let populationText = document.querySelectorAll('.populationContainer')
            if(defaultFlag === 1){
                for(const countryNameText of countriesWrapper){
                    countryNameText.style.color = 'white';
                }
                for(const population of populationText){
                    population.style.color = 'white'
                }
            }
            if(defaultFlag === 0){
                for(const countryNameText of countriesWrapper){
                    countryNameText.style.color = 'black';
                }
                for(const population of populationText){
                    population.style.color = 'black'
                }
            }
            
        
        }
        getCountries()
        

        //To get the languages in the API
        let getLanguages = () =>{
            let ul = document.querySelector('ul')
            let languagesArr = [];
        
            let filteredLanguages = [];
          
           
            countriesArr.map(country=>{

                for(let i = 0; i<country.languages.length; i++){
                    
                    if(country.languages.length!==1){

                        filteredLanguages.push(country.languages[i].name)

                    }

                    if(country.languages.length===1){

                        filteredLanguages.push(country.languages[i].name)

                    }

                }
            })

            for(let i = 0; i<10; i++){
            let container = {};
        
            for(let i = 0; i<filteredLanguages.length; i++){
                let num = filteredLanguages[i]
                if(typeof container[num]==='number'){
                    container[num]+=1;
                }
                else{
                    container[num]=1;
                }
            }
        
            let sorter = Object.entries(container).sort((a,b)=> b[1]-a[1])

            let tallySorter=[];
            for(let i = 0; i < 10; i++){
                let carry={languages: sorter[i][0], counts: sorter[i][1]}
                tallySorter.push(carry)
            }
        
            let li = document.createElement('li');
            let totalLanguages = Object.values(container).length
            let totals = 0;
            let totalArr = [];
        
            for(let i = 0; i<10; i++){
                let counts = tallySorter[i].counts
                totals = (counts/totalLanguages)*100;
                totalArr.push(totals)
            }

            
            let charts = `<div class="charts" style="width: 600px"><p class="chartChild" style="width: ${totalArr[i]}%"></p></div>`
            let languagesContainer = `<p class="languagesContainer">${tallySorter[i].languages}</p>`
            let countsContainer = `<p class="countsContainer">${tallySorter[i].counts}</p>`
            li.innerHTML = `${languagesContainer} ${charts} ${countsContainer} `
            ul.appendChild(li)
        
            }
            let languagesContainer = document.querySelectorAll('.languagesContainer')
            let countsText = document.querySelectorAll('.countsContainer')
            if(localStorage.PageTheme.includes('dark')){
                for(const languagesText of languagesContainer){
                    languagesText.style.color = 'white';
                }
                for(const counts of countsText){
                    counts.style.color = 'white'
                }
            }
            if(localStorage.PageTheme.includes('light')){
                for(const languagesText of languagesContainer){
                    languagesText.style.color = 'black';
                }
                for(const counts of countsText){
                    counts.style.color = 'black'
                }
            }
        
        }
        

        
let  toggleButtons = () =>{
    let pToggle = document.querySelector('.toggleContainer > p')
    let btns = document.querySelectorAll('.btn')
    let ul = document.querySelector('ul')


    
    for(let i = 0; i<btns.length; i++){

        btns[i].addEventListener('click',function(){
            let current = document.getElementsByClassName("activeButton");
            ul.innerHTML=''
            if(btns[i]===btns[0]){
                pToggle.innerText = '10 Most populated countries in the World'
                getCountries()
                
            }
            if(btns[i]===btns[1]){
                pToggle.innerText = '10 Most spoken languages in the World'
                getLanguages()
            }

            if(current.length > 0){
                current[0].className = current[0].className.replace(" active", "");
                
            }
 
            this.className += " activeButton";    

        })

    }
}
toggleButtons()

//dark mode toggle





  
}


fetchCountries();




