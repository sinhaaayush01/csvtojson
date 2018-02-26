const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const instream = fs.createReadStream('country_details.csv');
const outsream = new Stream();
const rl = readline.createInterface(instream, outsream);
let isHeader = false;
const population = [];
const gdp = [];
const ppp = [];
const countries = [];
let headers = []; // Array for header
rl.on('line', (line) => {
    if (isHeader === false) {
        headers = line.split(',');
        isHeader = true;
    } else {
        let i;
        const values = line.split(',');
        if (values.indexOf('European Union') === -1 && values.indexOf('World') === -1) {
            const populationobject = {};
            const gdpobject = {};
            const pppobject = {};
            for (i = 0; i < headers.length; i += 1) {
                if (headers[i] === 'Country') {
                    populationobject[headers[i]] = values[i];
                    gdpobject[headers[i]] = values[i];
                    pppobject[headers[i]] = values[i];
                }
                if (headers[i] === 'Population2013') {
                    populationobject[headers[i]] = values[i];
                }

                if (headers[i] === 'GDP2013') {
                    gdpobject[headers[i]] = values[i];
                }
                if (headers[i] === 'PPP2013') {
                    pppobject[headers[i]] = values[i];
                }
            }
            population.push(populationobject);
            gdp.push(gdpobject);
            ppp.push(pppobject);
        }
    }
    population.sort((c, b) => b.Population2013 - c.Population2013);
    gdp.sort((c, b) => b.GDP2013 - c.GDP2013);
    ppp.sort((c, b) => b.PPP2013 - c.PPP2013);
});
rl.on('close', () => {
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
});

function cgdp() {
    const pop = require('./gdp.json');
    const continent = [];
    let values = {};
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
            values.Continent = 'Europe';
            e += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'Australia') {
            a = parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'Mexico' || pop[i].Country === 'USA' || pop[i].Country === 'Canada') {
            n += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'Brazil' || pop[i].Country === 'Argentina') {
            s += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'South Africa') {
            af = parseFloat(pop[i].GDP2013);
        }
    }
    values.Continent = 'Asia';
    values.GDP2013 = as;
    continent.push(values);
    values = {};
    values.Continent = 'North America';
    values.GDP2013 = n;
    continent.push(values);
    values = {};
    values.Continent = 'Europe';
    values.GDP2013 = e;
    continent.push(values);
    values = {};
    values.Continent = 'South America';
    values.GDP2013 = s;
    continent.push(values);
    values = {};
    values.Continent = 'Australia';
    values.GDP2013 = a;
    continent.push(values);
    values = {};
    values.Continent = 'Africa';
    values.GDP2013 = af;
    continent.push(values);
    const data = JSON.stringify(continent);
    fs.writeFile('continentgdp.json', data, (err) => {
        if (err) { console.log('error'); }
    });
}

function cpopulation() {
    const pop = require('./population.json');
    const Continent = [];
    let values = {};
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
            values.Continent = 'Europe';
            e += parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'Australia') {
            a = parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'Mexico' || pop[i].Country === 'USA' || pop[i].Country === 'Canada') {
            n += parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'Brazil' || pop[i].Country === 'Argentina') {
            s += parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'South Africa') {
            af = parseFloat(pop[i].Population2013);
        }
    }
    values.Continent = 'Asia';
    values.Population2013 = as;
    Continent.push(values);
    values = {};
    values.Continent = 'North America';
    values.Population2013 = n;
    Continent.push(values);
    values = {};
    values.Continent = 'Europe';
    values.Population2013 = e;
    Continent.push(values);
    values = {};
    values.Continent = 'South America';
    values.Population2013 = s;
    Continent.push(values);
    values = {};
    values.Continent = 'Africa';
    values.Population2013 = af;
    Continent.push(values);
    values = {};
    values.Continent = 'Australia';
    values.Population2013 = a;
    Continent.push(values);
    const data = JSON.stringify(Continent);
    fs.writeFile('continentpopulation.json', data, (err) => {
        if (err) { console.log(err); }
    });
}