import { Graph } from '../types/graph';

export const graphData: Graph = {
  nodes: [
    // Categories
    {
      id: "cat_search",
      name: "Search Algorithms",
      group: "Search",
      type: "category",
      description: "Various searching techniques and algorithms",
      markdown: `# Search Algorithms

Search algorithms are fundamental techniques used to find specific items or values within a data structure.

## Key Concepts
1. Linear vs Binary Search
2. Space-Time Trade-offs
3. Search Space Reduction`
    },
    {
      id: "cat_array",
      name: "Array Techniques",
      group: "Array",
      type: "category",
      description: "Common array manipulation techniques",
      markdown: `# Array Techniques

Array manipulation techniques are fundamental to solving many programming problems.

## Key Concepts
1. Two Pointers
2. Sliding Window
3. Prefix Sum
4. Array Partitioning`
    },
    {
      id: "cat_dp",
      name: "Dynamic Programming",
      group: "DP",
      type: "category",
      description: "Problem-solving through optimal substructure",
      markdown: `# Dynamic Programming

Dynamic Programming is an algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems.

## Key Concepts
1. Optimal Substructure
2. Overlapping Subproblems
3. Memoization vs Tabulation
4. State Transition`
    },
    {
      id: "cat_tree",
      name: "Tree Algorithms",
      group: "Tree",
      type: "category",
      description: "Tree traversal and manipulation techniques",
      markdown: `# Tree Algorithms

Tree algorithms focus on hierarchical data structures and their operations.

## Key Concepts
1. Tree Traversal
2. Binary Search Trees
3. Balanced Trees
4. Tree Construction`
    },

    // Algorithms
    {
      id: "alg_binary_search",
      name: "Binary Search",
      group: "Search",
      type: "algorithm",
      description: "Efficient search algorithm for sorted arrays",
      markdown: `# Binary Search

## Overview
Binary Search is an efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half.

## Time Complexity
- O(log n)

## Implementation
\`\`\`typescript
function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\`\`\``
    },
    {
      id: "alg_two_pointers",
      name: "Two Pointers",
      group: "Array",
      type: "algorithm",
      description: "Using two pointers to solve array problems",
      markdown: `# Two Pointers Technique

## Overview
The two pointers technique involves using two pointers to solve array-related problems efficiently.

## Common Patterns
1. Opposite directional
2. Same directional
3. Fast and slow pointers

## Implementation
\`\`\`typescript
function twoSum(numbers: number[], target: number): number[] {
    let left = 0, right = numbers.length - 1;
    
    while (left < right) {
        sum = numbers[left] + numbers[right];
        if (sum === target) return [left + 1, right + 1];
        if (sum < target) left++;
        else right--;
    }
    return [];
}
\`\`\``
    },
    {
      id: "alg_sliding_window",
      name: "Sliding Window",
      group: "Array",
      type: "algorithm",
      description: "Window-based array traversal technique",
      markdown: `# Sliding Window

## Overview
The sliding window technique is used to perform operations on arrays using a window that slides through the array.

## Implementation
\`\`\`typescript
function maxSubArray(nums: number[], k: number): number {
    let maxSum = 0;
    let windowSum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        windowSum += nums[i];
        if (i >= k) windowSum -= nums[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
\`\`\``
    },
    {
      id: "alg_inorder",
      name: "Inorder Traversal",
      group: "Tree",
      type: "algorithm",
      description: "Left-Root-Right tree traversal",
      markdown: `# Inorder Traversal

## Overview
Inorder traversal visits the left subtree, then the root, and finally the right subtree.

## Implementation
\`\`\`typescript
function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    
    function traverse(node: TreeNode | null) {
        if (!node) return;
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    }
    
    traverse(root);
    return result;
}
\`\`\``
    },

    // Problems
    {
      id: "prob_binary_search",
      name: "LC 704: Binary Search",
      group: "Search",
      type: "problem",
      description: "Basic binary search implementation",
      markdown: `# LeetCode 704: Binary Search

Given a sorted array of integers nums and a target value, return the index if the target is found. If not, return -1.

## Example
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4

## Solution
\`\`\`typescript
function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\`\`\``
    },
    {
      id: "prob_two_sum",
      name: "LC 167: Two Sum II",
      group: "Array",
      type: "problem",
      description: "Find two numbers that add up to target",
      markdown: `# LeetCode 167: Two Sum II

Given a sorted array of integers numbers and a target number, find two numbers such that they add up to target.

## Example
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]

## Solution
\`\`\`typescript
function twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) return [left + 1, right + 1];
        if (sum < target) left++;
        else right--;
    }
    return [];
}
\`\`\``
    },
    {
      id: "prob_max_subarray",
      name: "LC 53: Maximum Subarray",
      group: "Array",
      type: "problem",
      description: "Find the contiguous subarray with the largest sum",
      markdown: `# LeetCode 53: Maximum Subarray

Find the contiguous subarray with the largest sum.

## Example
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

## Solution
\`\`\`typescript
function maxSubArray(nums: number[]): number {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}
\`\`\``
    },
    {
      id: "prob_inorder",
      name: "LC 94: Binary Tree Inorder",
      group: "Tree",
      type: "problem",
      description: "Inorder traversal of binary tree",
      markdown: `# LeetCode 94: Binary Tree Inorder Traversal

Given the root of a binary tree, return the inorder traversal of its nodes' values.

## Example
Input: root = [1,null,2,3]
Output: [1,3,2]

## Solution
\`\`\`typescript
function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let current = root;
    
    while (current || stack.length) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop()!;
        result.push(current.val);
        current = current.right;
    }
    
    return result;
}
\`\`\``
    }
  ],
  links: [
    // Category to Algorithm links
    { source: "cat_search", target: "alg_binary_search", value: 2 },
    { source: "cat_array", target: "alg_two_pointers", value: 2 },
    { source: "cat_array", target: "alg_sliding_window", value: 2 },
    { source: "cat_tree", target: "alg_inorder", value: 2 },
    
    // Algorithm to Problem links
    { source: "alg_binary_search", target: "prob_binary_search", value: 1 },
    { source: "alg_two_pointers", target: "prob_two_sum", value: 1 },
    { source: "alg_sliding_window", target: "prob_max_subarray", value: 1 },
    { source: "alg_inorder", target: "prob_inorder", value: 1 },
    
    // Related algorithms
    { source: "alg_two_pointers", target: "alg_sliding_window", value: 1 }
  ]
};
