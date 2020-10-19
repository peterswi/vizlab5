const margin = ({top: 20, right: 20, bottom: 20, left: 40})
const width = 700- margin.left - margin.right;
const height = 700- margin.top - margin.bottom;


d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{
    console.log(data)

    const svg = d3.select('.chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

}) 