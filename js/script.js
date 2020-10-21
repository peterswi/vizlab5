//EVERYTHING HERE IS LIKE SEMI FUNCTIONAL

// CHART INIT ------------------------------**

// create svg with margin convention

const margin = ({top: 20, right: 20, bottom: 20, left: 40})
const width = 700- margin.left - margin.right;
const height = 700- margin.top - margin.bottom;

const svg = d3.select('.chart').append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// create scales without domains
const xScale=d3.scaleBand()
    .rangeRound([0,width])
    .paddingInner(0.15)
    
const yScale=d3.scaleLinear()
    .range([height, 0])

const xAxis = d3.axisBottom()
    .scale(xScale)

const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)

// create axes and axis title containers
svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

svg.append("g")
    .attr("class", "axis y-axis")
    //.attr("transform", `translate(0, ${height})`)
    .call(yAxis);

svg.append('text')
    .attr('class','yaxisTitle')
    .attr('x', 30)
    .attr('y',0 )
    .style('text-anchor','middle')


// (Later) Define update parameters: measure type, sorting direction
let type = document.querySelector('#group-by').value

  
const fillColor=d3.scaleOrdinal(d3.schemeCategory10)

// CHART UPDATE FUNCTION -------------------**
function update(data, type){
    // update domains
    const names=data.map(data=>data.company)
    
    console.log(names)
    ///is this working
    xScale.domain(names)
    
    // update bars
    if(type=='stores'){
        console.log('here')
        yScale.domain([0,d3.max(data, d=>d.stores)])
        
        bars = svg.selectAll('.bar')
            .data(data, function(d){return d.company})
            .enter()
            .append('rect')
            .attr('x',d=>xScale(d.company))
            .attr('y',d=>yScale(d.stores))
            .attr('width', xScale.bandwidth())
            .attr('height', d=>height-yScale(d.stores))
            .style('fill',d=>fillColor(d.company))
        
        x=svg.select('.x-axis')
            .call(xAxis)

        y=svg.select('.y-axis')
            .call(yAxis)      
        
    }
    else{
        console.log('there')
        yScale.domain([0,d3.max(data, d=>d.revenue)])
        const bars = svg.selectAll('.bar')
            .data(data, function(d){return d.company})
            .enter()
            .append('rect')
            .attr('x',d=>xScale(d.company))
            .attr('y',d=>yScale(d.revenue))
            .attr('width', xScale.bandwidth())
            .attr('height', d=> height - yScale(d.revenue))
            .style('fill',d=>fillColor(d.company))
        
        x=svg.select('.x-axis')
            .call(xAxis)

        y=svg.select('.y-axis')
            .call(yAxis) 
    }
    

     // Implement the enter-update-exist sequence


    // update axes and axis title
    
    
       

    svg.append('text')
        .attr('class','yaxisTitle')
        .attr('x', 30)
        .attr('y',0 )
        .text(function(){
            if(type=='stores'){
                return 'Stores Worldwide'
            }
            else{
                return 'Total Revenue'
            }
        })
        .style('text-anchor','middle')
      

}

// CHART UPDATES ---------------------------**

// Loading data
d3.csv('coffee-house-chains.csv', d3.autoType).then(data => {
	update(data, type); // simply call the update function with the supplied data**
});

// (Later) Handling the type change
function onchange(e) {
    console.log(e.target.value)
    type=e.target.value
    d3.csv('coffee-house-chains.csv', d3.autoType).then(data => {
	    update(data, type); // simply call the update function with the supplied data**
    });
    
}
document.querySelector('#group-by').addEventListener('change',onchange)

// (Later) Handling the sorting direction change
