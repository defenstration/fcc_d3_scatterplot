const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"


d3.select('body')
    .append('h1')
    .text("fCC d3 Scatterplot Graph")
    .attr('id', 'title')

d3.json(url)
    .then(data => {
        const w = 1000
        const h = 700

        let parsedTime = d3.timeParse('%M:%S')
        let formattedTime = d3.timeFormat('%M:%S')


        let mappedData = data.map(d => ({
            'time': parsedTime(d['Time']), 
            'place': d['Place'], 
            'seconds': d['Seconds'], 
            'name': d['Name'], 
            'year': d['Year'], 
            'nationality': d['Nationality'], 
            'doping': d['Doping'], 
            'url': d['URL']}))

        const svg = d3.select('body')
                .append('svg')
                .attr('height', h + 80)
                .attr('width', w + 80)

        let x = d3.scaleLinear()
                    .domain([d3.min(mappedData, d => d.year), d3.max(mappedData, d => d.year)])
                    .range([0, w])

        let y = d3.scaleTime()
                    .domain(d3.extent(mappedData, d => d['time']))
                    .range([h, 0])

        const xAxis = d3.axisBottom(x)
                        .tickFormat(d3.format("d"));

        const yAxis = d3.axisLeft(y)
                        .tickFormat(d3.timeFormat("%M:%S"));

        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${h})`)
            .call(xAxis)

        svg.append('g')
            .attr('id', 'y-axis')
            .attr('transform', `translate(0, 0)`)
            .call(yAxis)

        svg.append('g')
            .attr('id', 'legend')
            .append('rect')
            .attr('transform', `translate(${w/2}, ${h/2})`)
            .attr('height', '150px')
            .attr('width', '250px')
            .text('Competitors that were doping')

        const tooltip = d3.select('#tooltip')

        svg.selectAll('circle')
            .data(mappedData)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(d['year']))
            .attr('cy', d => y(d['time']))
            .attr('r', 5)
            .attr('data-xvalue', d => d['year'])
            .attr('data-yvalue', d => d['time'])
            .on('mouseover', (event, d) => {
                tooltip.transition().style('opacity', .9)
                tooltip.style('left', (event.pageX + 10) + 'px')
                       .style('top', (event.pageY + 10) + 'px')
                       .attr('data-year', `${d.year}`)
                       .html(`Year: ${d.year}. Name: ${d.name}`);             
                       })
            .on('mouseout', (event) => {
                tooltip.style('opacity', 0);
                })

    })




