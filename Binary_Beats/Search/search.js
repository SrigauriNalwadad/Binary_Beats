// Function to get query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    return searchQuery;
}

// Function to populate search results
function populateSearchResults() {
    document.getElementById('search-results-h2').innerText = `Search results for: "${getQueryParams()}"`;
    const searchQuery = getQueryParams();

    // Placeholder data for demonstration
    let searchResults = [];

    const arrayDataStructure = [{
        title: "Array",
        description: "An array is a data structure that contains a group of elements. Typically, these elements are all of the same data type, such as an integer or string.",
        link: "https://example.com/array"
    }];

    const graphDataStructure = [{
        title: "Graph",
        description: "A graph is a data structure that consists of a finite set of nodes (or vertices) and a set of edges connecting these nodes.",
        link: "https://example.com/graph"
    }];

    const heapDataStructure = [{
        title: "Heap",
        description: "A heap is a special tree-based data structure that satisfies the heap property. In a max heap, for any given node I, the value of I is greater than or equal to the values of its children, and the highest value is at the root.",
        link: "https://example.com/heap"
    },
    {
        title: "Heap Sort",
        description: "Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure to sort elements in ascending order.",
        link: "https://example.com/heapsort"
    },
    {
        title: "Priority Queue",
        description: "A priority queue is an abstract data type that operates similar to a regular queue or stack, but where each element has an associated priority.",
        link: "https://example.com/priorityqueue"
    }
    ];

    const linkedListDataStructure = [{
        title: "Linked List",
        description: "A linked list is a linear data structure where each element is a separate object, with each element (node) containing a reference (link) to the next node in the sequence.",
        link: "https://example.com/linkedlist"
    }];

    const queueDataStructure = [{
        title: "Queue",
        description: "A queue is a linear data structure that follows the First In First Out (FIFO) principle, where elements are added from the rear and removed from the front.",
        link: "https://example.com/queue"
    }];

    const stackDataStructure = [{
        title: "Stack",
        description: "A stack is a linear data structure that follows the Last In First Out (LIFO) principle, where elements are added and removed from the top.",
        link: "https://example.com/stack"
    }];

    const stringDataStructure = [{
        title: "String",
        description: "A string is a sequence of characters, often treated as a data type in many programming languages, used to represent text.",
        link: "https://example.com/string"
    }];

    const treeDataStructure = [{
        title: "Tree",
        description: "A tree is a hierarchical data structure consisting of a root node and zero or more child nodes, with each child node itself being the root of a subtree.",
        link: "https://example.com/tree"
    }];

    const quizDataStructure = [{
        title: "Quiz",
        description: "Test your knowledge of data structures with this interactive quiz.",
        link: "https://example.com/quiz"
    },
    {
        title: "Data Structures and Algorithms Course",
        description: "Enroll in this comprehensive course to learn about various data structures and algorithms.",
        link: "https://example.com/course"
    }
    ];

    if (searchQuery === 'array') {
        searchResults = arrayDataStructure;
    } else if (searchQuery === 'graph') {
        searchResults = graphDataStructure;
    } else if (searchQuery === 'heap') {
        searchResults = heapDataStructure;
    } else if (searchQuery === 'linkedlist') {
        searchResults = linkedListDataStructure;
    } else if (searchQuery === 'queue') {
        searchResults = queueDataStructure;
    } else if (searchQuery === 'stack') {
        searchResults = stackDataStructure;
    } else if (searchQuery === 'string') {
        searchResults = stringDataStructure;
    } else if (searchQuery === 'tree') {
        searchResults = treeDataStructure;
    } else if (searchQuery === 'quiz') {
        searchResults = quizDataStructure;
    }


    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear any existing results

    searchResults.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.classList.add('w-100');

        const title = document.createElement('h3');
        title.innerText = result.title;
        resultItem.appendChild(title);

        const description = document.createElement('p');
        description.innerText = result.description;
        resultItem.appendChild(description);

        const link = document.createElement('a');
        link.href = result.link;
        link.innerText = 'Read more';
        resultItem.appendChild(link);

        resultsContainer.appendChild(resultItem);
    });
}

// Call the function to populate search results
document.addEventListener('DOMContentLoaded', populateSearchResults);
