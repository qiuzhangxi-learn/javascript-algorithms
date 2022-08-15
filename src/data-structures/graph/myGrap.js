//no interface in js
// export interface HttpReadableProps {
//     date?: number;
//     parsed?: UrlWithStringQuery;
//     redirects?: HttpReadable[];
// }

export class GraphVertex {
    constructor(value) {
        if (value === undefined) {
            throw new Error('Graph vertex must have a value');
        }
        this.value = value;
        this.adjacents = []; //adjacency list
    }

    addAdjacent(vertex) {
        this.adjacents.push(vertex);
    }

    removeAdjacent(vertex) {
        const index = this.adjacents.indexOf(vertex);
        if (index > -1) {
            this.adjacents.splice(index, 1);
            return vertex;
        }
        return null;
    }

    removeAllAdjacent() {
        this.adjacents = [];
    }

    getAdjacents() {
        return this.adjacents;
    }

    getDegree() {
        return this.adjacents.length;
    }

    hasAdjacent(vertex) {
        return this.adjacents.indexOf(vertex) > -1;
    }
}

export class Graph {
    constructor(isDirected = false) {
        this.vertices = new Map();
        this.edges = {};
        this.isDirected = isDirected;
    }

    addVertex(value) {
        if (this.vertices.has(value)) {
            return this.vertices.get(value);
        } else {
            const vertex = new GraphVertex(value);
            this.vertices.set(value, vertex);
            return vertex;
        }
    }

    removeVertex(value) {
        const adjacents = this.getAdjacents(value);
        // adjacents.forEach((adjacent) => {
        //     this.removeEdge(value, adjacent.value);
        //     if (!this.isDirected) {
        //         this.removeEdge(adjacent.value, value);
        //     }
        // });
        //cannot use this method. because remove edge will change the size of adjacents that means if the size is 2, then decrease 1. it just only run one time logic content
        const removeVertex = this.vertices.get(value);
        if (removeVertex) {
            while (adjacents.length) {
                if (adjacents.length <= 0) break;
                this.removeEdge(value, adjacents[0].value);
            }
        }
        // const removeVertex = this.vertices.get(value);
        // if (removeVertex) {
        //     const allVertex = this.getAllVertex();
        //     // eslint-disable-next-line no-restricted-syntax
        //     for (const vertex of allVertex) {
        //         vertex.removeAdjacent(removeVertex);
        //     }
        // }
        return this.vertices.delete(value);
    }

    removeAllVertex() {
        this.vertices.clear();
    }

    hasVertex(value) {
        return !!this.getVertex(value);
    }

    getVertex(value) {
        return this.vertices.get(value);
    }

    getAllVertex() {
        return [...this.vertices.values()];
    }

    getAllVertexInValue() {
        return [...this.vertices.keys()];
    }

    getAdjacents(value) {
        return this.vertices.get(value).getAdjacents();
    }

    addEdge(sourceValue, destinationValue, edgeWeight = undefined) {
        const sourceVertex = this.addVertex(sourceValue);
        const destinationVertex = this.addVertex(destinationValue);
        sourceVertex.addAdjacent(destinationVertex);
        const edgeKey = this.getEdgeKey(sourceValue, destinationValue);
        this.edges[edgeKey] = { source: sourceVertex, destination: destinationVertex, weight: edgeWeight };
        if (!this.isDirected) {
            destinationVertex.addAdjacent(sourceVertex);
            const edgeKeyReverse = this.getEdgeKey(destinationValue, sourceValue);
            this.edges[edgeKeyReverse] = { source: destinationVertex, destination: sourceVertex, weight: edgeWeight };
        }
        return { source: sourceVertex, destination: destinationVertex, weight: edgeWeight };
    }

    getEdgeKey(sourceValue, destinationValue) {
        const edgeKey = `${sourceValue}-${destinationValue}`;
        return edgeKey;
    }

    getEdgeVertex(sourceValue, destinationValue) {
        if (!this.hasEdge(sourceValue, destinationValue)) {
            return null;
        } else {
            const sourceVertex = this.vertices.get(sourceValue);
            const destinationVertex = this.vertices.get(destinationValue);
            const edgeWeight = this.edges[this.getEdgeKey(sourceValue, destinationValue)].weight;
            return { source: sourceVertex, destination: destinationVertex, weight: edgeWeight };
        }
    }

    removeEdge(sourceValue, destinationValue) {
        const sourceVertex = this.vertices.get(sourceValue);
        const destinationVertex = this.vertices.get(destinationValue);

        if (sourceVertex && destinationVertex) {
            sourceVertex.removeAdjacent(destinationVertex);
            delete this.edges[this.getEdgeKey(sourceValue, destinationValue)];
            if (!this.isDirected) {
                destinationVertex.removeAdjacent(sourceVertex);
                delete this.edges[this.getEdgeKey(destinationValue, sourceValue)];
            }
            return true;
        }
        return false;
    }

    hasEdge(sourceValue, destinationValue) {
        const sourceVertex = this.vertices.get(sourceValue);
        const destinationVertex = this.vertices.get(destinationValue);

        if (!sourceVertex || !destinationVertex) {
            return false;
        }

        if (sourceVertex.hasAdjacent(destinationVertex)) {
            return true;
        }
        return false;
    }

    getAllEdges() {
        return Object.values(this.edges);
    }

    changeEdgeWeight(sourceValue, destinationValue, newWeight) {
        if (!this.hasEdge(sourceValue, destinationValue)) {
            return null;
        }
        const { weight } = this.getEdgeVertex(sourceValue, destinationValue);
        if (!weight) {
            return null;
        }
        this.edges[this.getEdgeKey(sourceValue, destinationValue)].weight = newWeight;
        return this.edges[this.getEdgeKey(sourceValue, destinationValue)];
    }

    reverseEdge(sourceValue, destinationValue) {
        const edgeVertex = this.getEdgeVertex(sourceValue, destinationValue);
        const edgeWeight = edgeVertex.weight;
        if (!edgeVertex) {
            return null;
        }
        this.removeEdge(sourceValue, destinationValue);

        this.addEdge(destinationValue, sourceValue, edgeWeight);
        const reverseEdgeVertex = this.getEdgeVertex(destinationValue, sourceValue);
        return reverseEdgeVertex;
    }

    reverseAllEdges() {
        this.getAllEdges().forEach((edge) => {
            this.reverseEdge(edge.source.value, edge.destination.value);
        });
    }

    getVerticesIndices() {
        const verticesIndices = {};
        this.getAllVertexInValue().forEach((value, index) => {
          verticesIndices[value] = index;
        });
        return verticesIndices;
    }

    getAdjacencyMatrix() {
        const adjacencyMatrix = Array(this.vertices.size).fill(null).map(() => {
            return Array(this.vertices.size).fill(0);
        });
        const verticesIndices = this.getVerticesIndices();
        this.getAllEdges().forEach((edge) => {
            const rowIndex = verticesIndices[edge.source.value];
            const colIndex = verticesIndices[edge.destination.value];
            const edgeWeight = edge.weight ? edge.weight : 1;
            adjacencyMatrix[rowIndex][colIndex] = edgeWeight;
        });
        return adjacencyMatrix;
    }
}
