import Sidebar from "./components/Sidebar"
import Chat from "./components/Chat"
function App() {
  

  return (
     <>
       <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Chat />
      </div>
    </div>
    </>
  )
}

export default App
