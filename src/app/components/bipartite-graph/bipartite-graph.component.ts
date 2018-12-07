import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bipartite-graph',
  templateUrl: './bipartite-graph.component.html',
  styleUrls: ['./bipartite-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BipartiteGraphComponent implements OnInit {

  svg;
  width;
  height;
  color;
  simulation;
  link;
  node;

  test = {
    'nodes': [
      {'id': 'Alice', 'group': 2},
      {'id': 'Bob', 'group': 3},
      {'id': 'Cathy', 'group': 4}
    ],
    'links': [
      {'source': 'Alice', 'target': 'Bob', 'value': 2},
      {'source': 'Bob', 'target': 'Cathy', 'value': 4},
      {'source': 'Cathy', 'target': 'Alice', 'value': 6},
    ]
  }

  ngOnInit() {
    console.log('D3.js version:', d3['version']);

    this.loadForceDirectedGraph();
  }
  // Rendering

  loadForceDirectedGraph() {
    this.svg = d3.select('svg');
    this.width = 200; // +this.svg.attr('width');
    this.height = 400; // +this.svg.attr('height');
    this.color = d3.scaleOrdinal(d3.schemeCategory10);

    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d['id']))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    this.render(this.test);
  }

  render(data): void {
    this.link = this.svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data['links'])
      .enter()
      .append('line')
      .attr('stroke-width', (d) => Math.sqrt(d['value']));

    this.node = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data['nodes'])
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', (d) => this.color(d['group']))
      .call(d3.drag()
        .on('start', (d) => {return this.dragStarted(d);})
        .on('drag', (d) => {return this.dragged(d);})
        .on('end', (d) => {return this.dragEnded(d);})
      );
    this.node.append('title')
      .text( (d) => { return d.id});
    this.simulation
      .nodes(data.nodes)
      .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
      .links(data.links);
  }
  ticked() {
    this.link
      .attr('x1', function(d) { return d['source'].x; })
      .attr('y1', function(d) { return d['source'].y; })
      .attr('x2', function(d) { return d['target'].x; })
      .attr('y2', function(d) { return d['target'].y; });

    this.node
      .attr('cx', function(d) { return d['x']; })
      .attr('cy', function(d) { return d['y']; });
  }

  dragStarted(d): void {
    if (!d3.event.active) { this.simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d): void {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragEnded(d): void {
    if (!d3.event.active) { this.simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
  }
}
