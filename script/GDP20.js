// For adding the modules of node js
const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
// For reading the csv file
const instream = fs.createReadStream('country_details.csv');
// Creating stream for saving into object after reading
const outsream = new Stream();
const rl = readline.createInterface(instream, outsream);
let a = 0;
let i; // Counter
const population = [];
const gdp = [];
const ppp = [];
// const cont = [];


let headers = []; // Array for header
rl.on('line', (line) => {
    if (a === 0) {
        headers = line.split(',');
        a = 1;
    } else {
        const currentline = line.split(',');
        // console.log(currentline[5]);
        // console.log(currentline.indexOf('European Union')==-1);
        if (currentline.indexOf('European Union') === -1 && currentline.indexOf('World') === -1) {
            const temp = {};
            const temp1 = {};
            const temp2 = {};
            /* temp['Country'] = currentline[0];
                            temp1['Country'] = currentline[0];
                            temp2['Country'] = currentline[0]; */
            for (i = 0; i < headers.length; i += 1) {
                if (headers[i] === 'Country') {
                    temp[headers[i]] = currentline[i];
                    temp1[headers[i]] = currentline[i];
                    temp2[headers[i]] = currentline[i];
                }
                if (headers[i] === 'Population2013') {
                    // temp[headers[i]] = currentline[i];
                    temp[headers[i]] = currentline[i];
                }

                if (headers[i] === 'GDP2013') {
                    temp1[headers[i]] = currentline[i];
                }
                if (headers[i] === 'PPP2013') {
                    temp2[headers[i]] = currentline[i];
                }
            }

            population.push(temp);
            gdp.push(temp1);
            ppp.push(temp2);
        }


        // console.log(temp['Country']);
    }
    population.sort((c, b) => b.Population2013 - c.Population2013);
    gdp.sort((c, b) => b.GDP2013 - c.GDP2013);
    ppp.sort((c, b) => b.PPP2013 - c.PPP2013);
});
rl.on('close', () => {
    // console.log(res);
    fs.writeFile('population.json', JSON.stringify(population), 'utf8', (err) => {
        cpopulation();
        if (err) { console.log('error'); }
    });
    fs.writeFile('gdp.json', JSON.stringify(gdp), 'utf8', (err) => {
        cgdp();
        if (err) { console.log('error'); }
    });
    fs.writeFile('ppp.json', JSON.stringify(ppp), 'utf8', (err) => {
        if (err) { console.log('error'); }
    });
    /* fs.writeFile('continent.json', JSON.stringify(ppp), 'utf8', function(err) {
            console.log(err);
        }); */
    //cont();
});

/* const fs = require('fs');
let rawdata = fs.readFileSync('gdp.json');
let pop = JSON.parse(rawdata); */
function cgdp() {
    const pop = require('../gdp.json');
    // console.log(pop);
    // console.log(pop[0].Country);
    // console.log(pop.length);
    const cont = [];
    let temp = {};
    let as = 0;
    let s = 0;
    let e = 0;
    let n = 0;
    let a = 0;
    let af = 0;
    let i;
    for (i = 0; i < pop.length; i += 1) {
        if (pop[i].Country === 'Russia' || pop[i].Country === 'India' || pop[i].Country === 'Japan' || pop[i].Country === 'China' || pop[i].Country === 'Indonesia' || pop[i].Country === 'Saudi Arabia' || pop[i].Country === 'Turkey' || pop[i].Country === 'Republic of Korea') {
            as += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'France' || pop[i].Country === 'Italy' || pop[i].Country === 'Germany' || pop[i].Country === 'United Kingdom') {
            temp.Continent = 'Europe';
            e += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'Australia') {
            // temp3["Country"]="Austrailia";
            a = parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'Mexico' || pop[i].Country === 'USA' || pop[i].Country === 'Canada') {
            // temp3["Country"]="North America";
            n += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'Brazil' || pop[i].Country === 'Argentina') {
            s += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'South Africa') {
            af = parseFloat(pop[i].GDP2013);
        }
    }
    // console.log(as);
    temp.Continent = 'Asia';
    temp.GDP2013 = as;
    cont.push(temp);
    // console.log(cont);
    temp = {};
    temp.Continent = 'North America';
    temp.GDP2013 = n;
    cont.push(temp);
    // console.log(cont)
    temp = {};
    temp.Continent = 'Europe';
    temp.GDP2013 = e;
    cont.push(temp);
    // console.log(cont);
    temp = {};
    temp.Continent = 'South America';
    temp.GDP2013 = s;
    cont.push(temp);
    // console.log(cont);
    temp = {};
    temp.Continent = 'Australia';
    temp.GDP2013 = a;
    // console.log(cont);
    cont.push(temp);
    // console.log(cont);
    temp = {};
    temp.Continent = 'Africa';
    temp.GDP2013 = af;
    cont.push(temp);
    // console.log(temp);
    // console.log(cont);
    const data = JSON.stringify(cont);
    const fs = require('fs');

    fs.writeFile('continentgdp.json', data, (err) => {
        if (err) { console.log('error'); }
    });
}

function cpopulation() {
    const fs = require('fs');
    const pop = require('../population.json');
    // let rawdata = fs.readFileSync('population.json');
    /* const fs = require('fs');
    let pop = JSON.parse(rawdata);
    //console.log(pop);
    //console.log(pop[0].Country);
    //console.log(pop.length); */
    const cont = [];
    let temp = {};
    let as = 0;
    let s = 0;
    let e = 0;
    let n = 0;
    let a = 0;
    let af = 0;
    let i;
    for (i = 0; i < pop.length; i += 1) {
        if (pop[i].Country === 'Russia' || pop[i].Country === 'India' || pop[i].Country === 'Japan' || pop[i].Country === 'China' || pop[i].Country === 'Indonesia' || pop[i].Country === 'Saudi Arabia' || pop[i].Country === 'Turkey' || pop[i].Country === 'Republic of Korea') {
            as += parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'France' || pop[i].Country === 'Italy' || pop[i].Country === 'Germany' || pop[i].Country === 'United Kingdom') {
            temp.Continent = 'Europe';
            e += parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'Australia') {
            // temp3["Country"]="Austrailia";
            a = parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'Mexico' || pop[i].Country === 'USA' || pop[i].Country === 'Canada') {
            // temp3["Country"]="North America";
            n += parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'Brazil' || pop[i].Country === 'Argentina') {
            s += parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'South Africa') {
            af = parseFloat(pop[i].Population2013);
        }
    }
    // console.log(as);
    temp.Continent = 'Asia';
    temp.Population2013 = as;
    cont.push(temp);
    // console.log(cont);
    temp = {};
    temp.Continent = 'North America';
    temp.Population2013 = n;
    cont.push(temp);
    // console.log(cont)
    temp = {};
    temp.Continent = 'Europe';
    temp.Population2013 = e;
    cont.push(temp);
    // console.log(cont);
    temp = {};
    temp.Continent = 'South America';
    temp.Population2013 = s;
    cont.push(temp);
    // console.log(cont);
    temp = {};
    temp.Continent = 'Africa';
    temp.Population2013 = af;
    cont.push(temp);
    // console.log(temp);
    temp = {};
    temp.Continent = 'Australia';
    temp.Population2013 = a;
    // console.log(cont);
    cont.push(temp);
    // console.log(cont);
    const data = JSON.stringify(cont);
    fs.writeFile('continentpopulation.json', data, (err) => {
        if (err) { console.log(err); }
    });

}