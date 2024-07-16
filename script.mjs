const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"





d3.select('body')
    .append('h1')
    .text("fCC d3 Scatterplot Graph")
    .attr('id', 'title')

d3.json(url)
    .then(data => {
        console.log(data)
        const w = 1000
        const h = 700

        let parsedTime = d3.timeParse('%I:%M, :%S')

        let formattedTime = d3.timeFormat('%I:%M, :%S')

        let mappedData = data.map(d => [formattedTime(parsedTime((d[0]))), d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]])
        console.log(mappedData)

        const svg = d3.select('body')
                .append('svg')
                .attr('height', h + 80)
                .attr('width', w + 80)


        let x = d3.scaleLinear()
                    .domain([d3.min(year), d3.max(year)])
                    .range(0, w)

        let y = d3.scaleTime()
                    .domain(d3.extent(riderTime, d => d))
                    .range(h, 0)

        svg.append('g')
            .attr('id', 'x-axis')

        svg.append('g')
            .attr('id', 'y-axis')

        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', d => d['Year'])
            .attr('cy', d => h - d['Time'])
            .attr('r', 5)
            .attr('data-xvalue', d => d['Year'])
            .attr('data-yvalue', d => d['Time'])

    })




