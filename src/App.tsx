import GraphView from "./components/GraphView";
import { nodes, links } from "./data/sampleGraph";

function App() {
  return (
    <div>
      <GraphView nodes={nodes} links={links} />
    </div>
  )
}

export default App
