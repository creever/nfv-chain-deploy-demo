import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {NfvEnvironmentService} from "../../services/nfv-environment.service";

@Component({
  selector: 'app-bipartite-graph',
  templateUrl: './bipartite-graph.component.html',
  styleUrls: ['./bipartite-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BipartiteGraphComponent implements OnInit {

  constructor(private ne: NfvEnvironmentService) {}

  svg;
  width;
  height;
  color;
  simulation;
  link;
  node;
  data;

  test = {
    'nodes': [
      {'id': 'server1', 'group': 1},
      {'id': 'server2', 'group': 1},
      {'id': 'server3', 'group': 1},

      {'id': 'nfv1', 'group': 2},
      {'id': 'nfv2', 'group': 2},
      {'id': 'nfv3', 'group': 2},
      {'id': 'nfv4', 'group': 2},

      {'id': 'nfv5', 'group': 2},
      {'id': 'nfv6', 'group': 2},
      {'id': 'nfv7', 'group': 2},
      {'id': 'nfv8', 'group': 2}
    ],
    'links': [
      {'source': 'server1', 'target': 'nfv1', 'value': 2},
      {'source': 'server1', 'target': 'nfv2', 'value': 2},
      {'source': 'server1', 'target': 'nfv3', 'value': 2},
      {'source': 'server1', 'target': 'nfv4', 'value': 9},
      {'source': 'server1', 'target': 'nfv5', 'value': 2},
      {'source': 'server1', 'target': 'nfv6', 'value': 2},
      {'source': 'server1', 'target': 'nfv7', 'value': 2},
      {'source': 'server1', 'target': 'nfv8', 'value': 2},

      {'source': 'server2', 'target': 'nfv1', 'value': 2},
      {'source': 'server2', 'target': 'nfv2', 'value': 2},
      {'source': 'server2', 'target': 'nfv3', 'value': 2},
      {'source': 'server2', 'target': 'nfv4', 'value': 2},
      {'source': 'server2', 'target': 'nfv5', 'value': 2},
      {'source': 'server2', 'target': 'nfv6', 'value': 6},
      {'source': 'server2', 'target': 'nfv7', 'value': 2},
      {'source': 'server2', 'target': 'nfv8', 'value': 2},

      {'source': 'server3', 'target': 'nfv1', 'value': 2},
      {'source': 'server3', 'target': 'nfv2', 'value': 2},
      {'source': 'server3', 'target': 'nfv3', 'value': 2},
      {'source': 'server3', 'target': 'nfv4', 'value': 2},
      {'source': 'server3', 'target': 'nfv5', 'value': 2},
      {'source': 'server3', 'target': 'nfv6', 'value': 2},
      {'source': 'server3', 'target': 'nfv7', 'value': 2},
      {'source': 'server3', 'target': 'nfv8', 'value': 2},
    ]
  }

  ngOnInit() {
    console.log('D3.js version:', d3['version']);

    this.loadForceDirectedGraph();

    this.bind();
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

    this.render(this.initData());
  }

  bind() {
    this.ne.servers$.subscribe((servers) => {
      this.updateGraph(servers);
    });

  }

  updateGraph(servers) {
    this.data = this.initData();

    servers.forEach((server, index) => {
      this.pushNode(server.name, 10);
      if (server.vnfs.length) {
        server.vnfs.forEach(vnf => {
          this.pushNode(vnf.name, 20);
          this.pushLink(server.name, vnf.name, vnf.cost);
        });
      }
    });

    this.resetGraph();
    this.render(this.data);
  }

  initData() {
    return {
      'nodes': [],
      'links': []
    };
  }

  pushNode(id, group) {
    this.data.nodes.push({'id': id, 'group': group});
  }

  pushLink(source, target, cost) {
    this.data.links.push({'source': source, 'target': target, 'value': cost});
  }

  render(data): void {
    this.link = this.svg.append('g')
      .attr('class', 'link')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', (d) => d['value']);

    this.node = this.svg.append('g')
      .attr('class', 'node')
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', (d) => this.color(d.group))
      .call(d3.drag()
        .on('start', (d) => {return this.dragStarted(d);})
        .on('drag', (d) => {return this.dragged(d);})
        .on('end', (d) => {return this.dragEnded(d);})
      );

    this.node.append('text')
      .text((d) => { return d.id});

    this.simulation
      .nodes(data.nodes)
      .on('tick', ()=>{return this.ticked()});

    this.simulation.force('link')
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

  resetGraph() {
    this.svg.selectAll('*').remove();
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
