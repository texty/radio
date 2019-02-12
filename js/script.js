/**
 * Created by yevheniia on 11.02.19.
 */
// d3.xml("data/maket_color2.svg").mimeType("image/svg+xml").get(function (error, xml) {
//     if (error) {
//         throw error
//     }
//
//     d3.select("#chart").node().appendChild(xml.documentElement);
//
// });
//
// setTimeout(function(){
//     d3.select("#filter-metal").on("click", function(d){
//         console.log(d);
//
//     var x = document.getElementById("metal");
//         if (x.style.display === "none") {
//             x.style.display = "block";
//         } else {
//             x.style.display = "none";
//         }
//         // d3.select("g#metal").toggle();
//     });
// }, 100);

// console.clear();
// var w = window.innerWidth * 0.9, h = 500;
//
// var radius = 6;
// var color = d3.scaleOrdinal(d3.schemeCategory20);
// var centerScale = d3.scalePoint().padding(1).range([50, w - 200]);
// // var forceStrength = 0.1;
//
// var svg = d3.select("body").append("svg")
//     .attr("width", w)
//     .attr("height", h);
//
// var circles_group = svg.append("g")
//     .attr("id", "circles_group")
//     .attr("transform", "translate(100, 0)");
//
// var center = {x: width / 2, y: height / 2};
// var forceStrength = 0.03;
//
//
//
// d3.csv("data/radio.csv", function(data){
//
//     var simulation = d3.forceSimulation()
//         .velocityDecay(0.2)
//         .force('x', d3.forceX().strength(forceStrength).x(center.x))
//         .force('y', d3.forceY().strength(forceStrength).y(center.y))
//         .force('charge', d3.forceManyBody().strength(charge))
//         .on('tick', ticked);
//     // .force("collide",d3.forceCollide( function(d){
//     //     return d.r + 8 }).iterations(16)
//     // )
//     // .force("charge", d3.forceManyBody())
//     // .force("y", d3.forceY().y(h / 2))
//     // .force("x", d3.forceX().x(w / 2));
//
//
//     data.forEach(function(d){
//         d.r = radius;
//         d.x = w / 2;
//         d.y = h / 2;
//     });
//
//     var circles = circles_group.selectAll("circle")
//         .data(data, function(d){ return d.id ;});
//
//     var circlesEnter = circles.enter().append("circle")
//         .attr("r", function(d, i){ return d.r; })
//         .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i * 2; })
//         .attr("cy", function(d, i){ return 250; })
//         .style("fill", function(d, i){ return color(d.style); })
//         .style("stroke", "none")
//         .style("stroke-width", 10)
//         .style("pointer-events", "all")
//         .on("click", function(d) {
//             console.log(d.style)
//         });
//
//     circles = circles.merge(circlesEnter);
//
//     function charge(d) {
//         return -forceStrength * Math.pow(d.radius, 2.0);
//     }
//
//     function ticked() {
//         circles
//             .attr("cx", function(d){ return d.x; })
//             .attr("cy", function(d){ return d.y; });
//     }
//
//     simulation
//         .nodes(data)
//         .on("tick", ticked);
//
//
//     function groupBubbles() {
//         hideTitles();
//
//         // @v4 Reset the 'x' force to draw the bubbles to the center.
//         simulation.force('x', d3.forceX().strength(forceStrength).x(w / 3));
//
//         // @v4 We can reset the alpha value and restart the simulation
//         simulation.alpha(1).restart();
//     }
//
//     function splitBubbles(byVar) {
//
//         centerScale.domain(data.map(function(d){ return d[byVar]; }));
//
//         if(byVar == "all"){
//             hideTitles()
//         } else {
//             showTitles(byVar, centerScale);
//         }
//
//         // @v4 Reset the 'x' force to draw the bubbles to their year centers
//         simulation.force('x', d3.forceX().strength(forceStrength).x(function(d){
//             return centerScale(d[byVar]);
//         }));
//
//         // @v4 We can reset the alpha value and restart the simulation
//         simulation.alpha(2).restart();
//     }
//
//     function hideTitles() {
//         svg.selectAll('.title').remove();
//     }
//
//     function showTitles(byVar, scale) {
//         // Another way to do this would be to create
//         // the year texts once and then just hide them.
//         // var titles = titles_group.selectAll('.title')
//         //     .data(scale.domain());
//         //
//         // titles.enter().append('text')
//         //     .attr('class', 'title')
//         //     .merge(titles)
//         //     .attr('x', function (d) { return scale(d); })
//         //     .attr('y', 40)
//         //     .attr('text-anchor', 'middle')
//         //     .text(function (d) { return ' ' + d; });
//         //
//         // titles.exit().remove()
//
//         var titles = d3.select("#titles_group")
//             .selectAll('.title')
//             .data(scale.domain());
//
//         titles.enter().append('p')
//             .attr('class', 'title')
//             .merge(titles)
//             .attr('x', function (d) { return scale(d); })
//             .attr('y', 40)
//             .attr('text-anchor', 'middle')
//             .text(function (d) {
//                 console.log(d);
//                 return ' ' + d; })
//             .style("color", function(d){ return color(d); })
//             ;
//
//
//         titles.exit().remove()
//
//
//     }
//
//     d3.selectAll("button").on("click", function(d){
//         d3.select("#titles_group").remove();
//     });
//
//     function setupButtons() {
//         d3.selectAll('.button')
//             .on('click', function () {
//
//                 // Remove active class from all buttons
//                 d3.selectAll('.button').classed('active', false);
//                 // Find the button just clicked
//                 var button = d3.select(this);
//
//                 // Set it as the active button
//                 button.classed('active', true);
//
//                 // Get the id of the button
//                 var buttonId = button.attr('id');
//
//                 console.log(buttonId)
//                 // Toggle the bubble chart based on
//                 // the currently clicked button.
//                 splitBubbles(buttonId);
//             });
//     }
//
//     setupButtons()
//
// });
//


d3.csv('data/radio.csv', function (error, data) {

    var width = window.innerWidth * 0.9, height = window.innerHeight;
    // var fill = d3.scale.ordinal()
    //     .range(['#827d92','#827354','#523536','#72856a','#2a3285','#383435'])

    var fill = d3.scale.category20();

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height);

    for (var j = 0; j < data.length; j++) {
        data[j].radius = 8;
        data[j].x = Math.random() * width;
        data[j].y = Math.random() * height;
    }

    var padding = 5;
    var maxRadius = 8;

    var getCenters = function (vname, size) {
        var centers, map;
        centers = _.uniq(_.pluck(data, vname)).map(function (d) {
            return {name: d, value: 1};
        });

        map = d3.layout.treemap().size(size).ratio(1/1);
        map.nodes({children: centers});

        return centers;
    };

    var nodes = svg.selectAll("circle")
        .data(data);

    nodes.enter().append("circle")
        .attr("class", "node")
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .attr("r", 8 )
        .style("fill", function (d) { return fill(d.style); });
        // .on("mouseover", function (d) { showPopover.call(this, d); })
        // .on("mouseout", function (d) { removePopovers(); })

    var force = d3.layout.force();

    draw('style');

    $( "button" ).click(function() {
        draw(this.id);
    });

    function draw (varname) {
        var centers = getCenters(varname, [width, height]);
        force.on("tick", tick(centers, varname));
        labels(centers);
        force.start();
    }

    function tick (centers, varname) {
        var foci = {};
        for (var i = 0; i < centers.length; i++) {
            foci[centers[i].name] = centers[i];
        }
        return function (e) {
            for (var i = 0; i < data.length; i++) {
                var o = data[i];
                var f = foci[o[varname]];
                o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
                o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
            }
            nodes.each(collide(0.5))
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });
        }
    }

    function labels (centers) {
        svg.selectAll(".label").remove();

        svg.selectAll(".label")
            .data(centers).enter().append("text")
            .attr("class", "label")
            .text(function (d) { return d.name })
            .attr("transform", function (d) {
                return "translate(" + (d.x + (d.dx / 2) - 40) + ", " + (d.y + 20) + ")";
            })
            .style("text-transform", "uppercase");
    }

    // function removePopovers () {
    //     $('.popover').each(function() {
    //         $(this).remove();
    //     });
    // }
    //
    // function showPopover (d) {
    //     $(this).popover({
    //         placement: 'auto top',
    //         container: 'body',
    //         trigger: 'manual',
    //         html : true,
    //         content: function() {
    //             return "Make: " + d.make + "<br/>Model: " + d.model +
    //                 "<br/>Trans: " + d.trans + "<br/>MPG: " + d.comb;
    //         }
    //     });
    //     $(this).popover('show')
    // }

    function collide(alpha) {
        var quadtree = d3.geom.quadtree(data);
        return function (d) {
            var r = d.radius + maxRadius + padding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + padding;
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }
});
