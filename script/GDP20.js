// For adding the modules of node js // FIXME: Comment is too obvious.
const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

// For reading the csv file // FIXME: Too Obvious
const instream = fs.createReadStream('../country_details.csv');
// Creating stream for saving into object after reading
const outsream = new Stream();
const rl = readline.createInterface(instream, outsream);
let counter = 0; // FIXME: RENAME TO isHeader
let i; // Counter // FIXME: Move to local scope
const population = [];
const gdp = [];
const ppp = [];
// const cont = [];


let headers = []; // Array for header
rl.on('line', (line) => {
    if (counter === 0) {
        headers = line.split(',');
        counter = 1;
    } else {
        const values = line.split(',');
        // console.log(values[5]);
        // console.log(values.indexOf('European Union')==-1);
        if (values.indexOf('European Union') === -1 && values.indexOf('World') === -1) {
            const populationobject = {};
            const gdpobject = {};
            const pppobject = {};
            for (i = 0; i < headers.length; i += 1) {
                // FIXME: All lines in this block, can be reduced to 4- lines of code. Use Switch/Case

                if (headers[i] === 'Country') {
                    populationobject[headers[i]] = values[i];
                    gdpobject[headers[i]] = values[i];
                    pppobject[headers[i]] = values[i];
                }
                if (headers[i] === 'Population2013') {
                    // temp[headers[i]] = values[i];
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


        // console.log(temp['Country']);
    }

    // FIXME: Sorting at every line is bad. Either use Tree Set, or move sorting to 'close' event.
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
});

function cgdp() {
    const pop = require('./gdp.json'); // FIXME: remove this require, and get the data as argument
    const continent = [];
    let values = {};

    const continentData = {
        as: 0,
        s: 0,
        e: 0,
        n: 0,
        a: 0
    };

    let as = 0;
    let s = 0;
    let e = 0;
    let n = 0;
    let a = 0;
    let af = 0;
    let i;
    for (i = 0; i < pop.length; i += 1) { // FIXME: Refactor the conditions in this block. Store countries inside an array.
        if (pop[i].Country === 'Russia' || pop[i].Country === 'India' || pop[i].Country === 'Japan' || pop[i].Country === 'China' || pop[i].Country === 'Indonesia' || pop[i].Country === 'Saudi Arabia' || pop[i].Country === 'Turkey' || pop[i].Country === 'Republic of Korea') {
            as += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'France' || pop[i].Country === 'Italy' || pop[i].Country === 'Germany' || pop[i].Country === 'United Kingdom') {
            values.Continent = 'Europe';
            e += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'Australia') {
            // Values3["Country"]="Austrailia";
            a = parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'Mexico' || pop[i].Country === 'USA' || pop[i].Country === 'Canada') {
            // Values3["Country"]="North America";
            n += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'Brazil' || pop[i].Country === 'Argentina') {
            s += parseFloat(pop[i].GDP2013);
        } else if (pop[i].Country === 'South Africa') {
            af = parseFloat(pop[i].GDP2013);
        }
    }
    // console.log(as);
    values.Continent = 'Asia';
    values.GDP2013 = as;
    continent.push(values);
    // console.log(cont);
    values = {};
    values.Continent = 'North America';
    values.GDP2013 = n;
    continent.push(values);
    // console.log(cont)
    values = {};
    values.Continent = 'Europe';
    values.GDP2013 = e;
    continent.push(values);
    // console.log(cont);
    values = {};
    values.Continent = 'South America';
    values.GDP2013 = s;
    continent.push(values);
    // console.log(cont);
    values = {};
    values.Continent = 'Australia';
    values.GDP2013 = a;
    // console.log(cont);
    continent.push(values);
    // console.log(cont);
    values = {};
    values.Continent = 'Africa';
    values.GDP2013 = af;
    continent.push(values);
    // console.log(values);
    // console.log(cont);
    const data = JSON.stringify(continent);
    const fs = require('fs');

    fs.writeFile('continentgdp.json', data, (err) => {
        if (err) { console.log('error'); }
    });
}

function cpopulation() {
    const fs = require('fs');
    const pop = require('./population.json');
    // let rawdata = fs.readFileSync('population.json');
    /* const fs = require('fs');
    let pop = JSON.parse(rawdata);
    //console.log(pop);
    //console.log(pop[0].Country);
    //console.log(pop.length); */
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
            // values3["Country"]="Austrailia";
            a = parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'Mexico' || pop[i].Country === 'USA' || pop[i].Country === 'Canada') {
            // values3["Country"]="North America";
            n += parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'Brazil' || pop[i].Country === 'Argentina') {
            s += parseFloat(pop[i].Population2013);
        } else if (pop[i].Country === 'South Africa') {
            af = parseFloat(pop[i].Population2013);
        }
    }
    // console.log(as);
    values.Continent = 'Asia';
    values.Population2013 = as;
    Continent.push(values);
    // console.log(Continent);
    values = {};
    values.Continent = 'North America';
    values.Population2013 = n;
    Continent.push(values);
    // console.log(Continent)
    values = {};
    values.Continent = 'Europe';
    values.Population2013 = e;
    Continent.push(values);
    // console.log(Continent);
    values = {};
    values.Continent = 'South America';
    values.Population2013 = s;
    Continent.push(values);
    // console.log(Continent);
    values = {};
    values.Continent = 'Africa';
    values.Population2013 = af;
    Continent.push(values);
    // console.log(values);
    values = {};
    values.Continent = 'Australia';
    values.Population2013 = a;
    // console.log(Continent);
    Continent.push(values);
    // console.log(Continent);
    const data = JSON.stringify(Continent);
    fs.writeFile('continentpopulation.json', data, (err) => {
        if (err) { console.log(err); }
    });

}