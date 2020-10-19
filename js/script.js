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


    const names=[...  new Set(data.map(data=>data.company))]
  
    const fillColor=d3.scaleOrdinal(d3.schemeTableau10)
    const xScale=d3.scaleBand()
        .domain(names)
        .rangeRound([0,width])
        .paddingInner(0.1)

    const xAxis = d3.axisBottom()
        .scale(xScale)
        
    
    const yScale=d3.scaleLinear()
        .domain([0,d3.max(data, d=>d.stores)])
        .range([height, 0])

    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10)

    svg.selectAll('.chart')
        .data(data)
        .enter()
        .append('rect')
        .attr('x',d=>xScale(d.company))
        .attr('y',d=>yScale(d.stores))
        .attr('width', xScale.bandwidth())
        .attr('height', height)
        .style('fill',d=>fillColor(d.stores))
        
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
        
        .attr('x', 0)
        .attr('y',0 )
        .text("Store Count")
        .style('text-anchor','middle')

    
        
}) 
