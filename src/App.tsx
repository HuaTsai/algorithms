import { useState } from 'react';
import { GraphView } from './components/GraphView';
import { MarkdownViewer } from './components/MarkdownViewer';
import { graphData } from './data/leetcodeData';
import { Node } from './types/graph';
import { Brain, X } from 'lucide-react';

function App() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-full mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <Brain className="h-8 w-8 text-indigo-600" />
          <h1 className="ml-3 text-2xl font-bold text-gray-900">
            LeetCode Knowledge Graph
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg shadow">
          {/* Graph View */}
          <div className={`${selectedNode ? 'w-3/5' : 'w-full'} h-full border-r transition-all duration-300`}>
            <GraphView data={graphData} onNodeClick={setSelectedNode} />
          </div>

          {/* Algorithm Details */}
          {selectedNode && (
            <div className="w-2/5 h-full overflow-y-auto relative">
              <div className="sticky top-0 bg-white border-b px-6 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedNode.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedNode.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <MarkdownViewer content={selectedNode.markdown} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
