let input = require('fs').readFileSync('input', 'utf8').trim().split('\n')

// define classes for nodes and graph
class Node {
  constructor(name) {
    this.name = name
    this.neighbors = []
  }

  addNeighbor(node) {
    this.neighbors.push(node)
  }
}

class Graph {
  constructor() {
    this.nodes = []
  }

  addNode(name) {
    if(this.hasNode(name)) {
      return this.getNode(name)
    }
    let node = new Node(name)
    this.nodes.push(node)
    return node
  }

  addEdge(node1, node2) {
    node1.addNeighbor(node2)
    node2.addNeighbor(node1)
  }

  hasNode(name) {
    return this.nodes.some(node => node.name === name)
  }

  getNode(name) {
    return this.nodes.find(node => node.name === name)
  }

  getPaths(start, end, path = []) {
    path.push(start.name)
    if(start.name === end.name) {
      return [path]
    }
    let paths = []
    start.neighbors.forEach(neighbor => {
      let isNodeUpper = neighbor.name == neighbor.name.toUpperCase() && neighbor.name != 'start' && neighbor.name != 'end'
      if(isNodeUpper || !path.includes(neighbor.name)) {
        let newPaths = this.getPaths(neighbor, end, path.slice())
        paths = paths.concat(newPaths)
      }
    })
    return paths
  }
}

let graph = new Graph()
input.forEach(line => {
  let [node1name, node2name] = line.split('-')
  let node1 = graph.addNode(node1name)
  let node2 = graph.addNode(node2name)
  graph.addEdge(node1, node2)
})

let start = graph.getNode('start')
let end = graph.getNode('end')
console.log(graph.getPaths(start, end).length)
