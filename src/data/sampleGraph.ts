import { NodeData, LinkData } from "../types/graph";

export const nodes: NodeData[] = [
  { id: "Sort", type: "category", title: "Sorting Algorithms" },
  { id: "Graph", type: "category", title: "Graph Algorithms" },
  { id: "Tree", type: "category", title: "Tree Algorithms" },
  { id: "Dynamic_Programming", type: "category", title: "Dynamic Programming" },

  { id: "DFS", type: "algorithm", title: "Depth-First Search" },
  { id: "BFS", type: "algorithm", title: "Breadth-First Search" },
  { id: "QuickSort", type: "algorithm", title: "QuickSort Algorithm" },
  { id: "DP_Knapsack", type: "algorithm", title: "0/1 Knapsack" },
  { id: "Sliding_Window", type: "algorithm", title: "Sliding Window Technique", isGeneral: true },
  { id: "Two_Pointers", type: "algorithm", title: "Two Pointers Technique", isGeneral: true },
  { id: "Binary_Search", type: "algorithm", title: "Binary Search", isGeneral: true },

  { id: "LC30", type: "problem", title: "Substring with Concatenation of All Words", source: "LeetCode" },
  { id: "LC438", type: "problem", title: "Find All Anagrams in a String", source: "LeetCode" },
  { id: "LC53", type: "problem", title: "Maximum Subarray", source: "LeetCode" },
  { id: "CLRS10", type: "problem", title: "QuickSort Example", source: "CLRS" },
  { id: "CSES23", type: "problem", title: "Counting Rooms", source: "CSES" },
  { id: "CSES1083", type: "problem", title: "Missing Number", source: "CSES" },
  { id: "CPH17", type: "problem", title: "Shortest Path in Grid", source: "Competitive Programming Handbook" }
];

export const links: LinkData[] = [
  { source: "DFS", target: "Graph" },
  { source: "BFS", target: "Graph" },
  { source: "Binary_Search", target: "Sort" },
  { source: "Binary_Search", target: "Tree" },
  { source: "QuickSort", target: "Sort" },
  { source: "DP_Knapsack", target: "Dynamic_Programming" },
  { source: "Sliding_Window", target: "Sort" },
  { source: "Two_Pointers", target: "Sort" },

  { source: "DFS", target: "CSES23" },
  { source: "BFS", target: "CPH17" },
  { source: "QuickSort", target: "CLRS10" },
  { source: "DP_Knapsack", target: "LC53" },
  { source: "Binary_Search", target: "CSES1083" },
  { source: "Sliding_Window", target: "LC30" },
  { source: "Two_Pointers", target: "LC438" },

  { source: "LC30", target: "LC438" },
  { source: "LC30", target: "LC53" },
  { source: "CLRS10", target: "CSES1083" }
];


