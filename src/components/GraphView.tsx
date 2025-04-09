import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { NodeData, LinkData } from "../types/graph";

interface Props {
  nodes: NodeData[];
  links: LinkData[];
}

const GraphView: React.FC<Props> = ({ nodes, links }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svgWidth = 1800;
    const svgHeight = 700;

    const svg = d3.select(ref.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(450, 350));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#ccc");

    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "6px")
      .style("background", "#333")
      .style("color", "#fff")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    const node = svg.append("g")
      .selectAll<SVGCircleElement, NodeData>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => {
        const degree = links.filter(l => l.source === d.id || l.target === d.id).length;
        if (d.type === "category") return Math.max(20, degree * 5);
        if (d.type === "algorithm") return Math.min(40, 10 + degree * 6);
        return 10;
      })
      .attr("fill", d => {
        if (d.type === "category") return "lightblue";
        if (d.type === "algorithm") return "lightgreen";
        if (d.type === "problem") return "salmon";
        return "gray";
      })
      .on("mouseover", (_, d) => {
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.title ?? d.id}</strong><br/>${d.source ?? ""}`);
      })
      .on("mousemove", event => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      })
      .on("click", (_, d) => {
        console.log("Clicked node:", d.id);
      })
      .call(
        d3.drag<SVGCircleElement, NodeData>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle");

    simulation.on("tick", () => {
      nodes.forEach((d: any) => {
        d.x = Math.max(30, Math.min(svgWidth - 30, d.x));
        d.y = Math.max(30, Math.min(svgHeight - 30, d.y));
      })

      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node
        .attr("cx", d => (d as any).x)
        .attr("cy", d => (d as any).y);

      label
        .attr("x", d => (d as any).x)
        .attr("y", d => (d as any).y);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      tooltip.remove();
    }
  }, [nodes, links]);

  return <svg ref={ref}></svg>;
};

export default GraphView;

