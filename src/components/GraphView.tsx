import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Graph as GraphType, Node } from '../types/graph';

interface GraphProps {
  data: GraphType;
  onNodeClick: (node: Node) => void;
}

export function GraphView({ data, onNodeClick }: GraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Set fixed dimensions for the graph
    const width = 1200;
    const height = 800;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Create container for zoom
    const container = svg.append("g");

    // Calculate node sizes based on connections and type
    const getNodeSize = (node: Node) => {
      const baseSize = {
        category: 35,
        algorithm: 25,
        problem: 15
      }[node.type];

      const connections = data.links.filter(
        link => link.source === node.id || link.target === node.id
      ).length;

      return baseSize + Math.min(connections * 2, 10);
    };

    // Get node color based on group and type
    const getNodeColor = (node: Node) => {
      const baseColors = {
        Search: { category: '#4f46e5', algorithm: '#818cf8', problem: '#c7d2fe' },
        Array: { category: '#059669', algorithm: '#34d399', problem: '#a7f3d0' },
        DP: { category: '#dc2626', algorithm: '#f87171', problem: '#fecaca' },
        Graph: { category: '#7c3aed', algorithm: '#a78bfa', problem: '#ddd6fe' },
        Tree: { category: '#0891b2', algorithm: '#22d3ee', problem: '#a5f3fc' }
      };

      return baseColors[node.group as keyof typeof baseColors]?.[node.type] || '#6b7280';
    };

    // Create force simulation with adjusted forces
    const simulation = d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(data.links)
        .id((d: any) => d.id)
        .distance(d => {
          const sourceType = (typeof d.source === 'object' && d.source !== null && 'type' in d.source)
  ? (d.source as Node).type
  : undefined;
          return sourceType === 'category' ? 150 : 100;
        }))
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1))
      .force("collision", d3.forceCollide().radius((d: any) => getNodeSize(d) * 1.5));

    // Create links with varying thickness
    const link = container.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value));

    // Create nodes
    const nodeGroup = container.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .attr("cursor", "pointer")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        event.stopPropagation();
        onNodeClick(d);
      });

    // Add circles to nodes with dynamic sizing and colors
    nodeGroup.append("circle")
      .attr("r", d => getNodeSize(d))
      .attr("fill", d => getNodeColor(d))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseover", function(_, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", getNodeSize(d) * 1.2)
          .attr("stroke-width", 3);
      })
      .on("mouseout", function(_, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", getNodeSize(d))
          .attr("stroke-width", 2);
      });

    // Add labels to nodes with dynamic font size
    nodeGroup.append("text")
      .text(d => d.name)
      .attr("x", d => getNodeSize(d) + 5)
      .attr("y", 5)
      .attr("fill", "#1f2937")
      .attr("font-size", d => {
        switch (d.type) {
          case 'category': return '16px';
          case 'algorithm': return '14px';
          case 'problem': return '12px';
        }
      })
      .attr("font-weight", d => d.type === 'category' ? 'bold' : 'normal')
      .attr("pointer-events", "none");

    // Add title for hover tooltip
    nodeGroup.append("title")
      .text(d => d.description);

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Update positions on each tick
    simulation.on("tick", () => {
      // Constrain nodes within the canvas
      data.nodes.forEach((d: any) => {
        d.x = Math.max(50, Math.min(width - 50, d.x));
        d.y = Math.max(50, Math.min(height - 50, d.y));
      });

      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Add zoom capabilities with limits
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    svg.on("dblclick.zoom", null);
    svg.call(zoom);

    // Reset zoom on window resize
    const handleResize = () => {
      svg
        .attr("width", svgRef.current?.clientWidth ?? 1200)
        .attr("height", svgRef.current?.clientHeight ?? 800);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, onNodeClick]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    />
  );
}
