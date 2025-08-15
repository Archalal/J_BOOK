
// import CodeCell from "./components/CodeCell";
import { Provider } from "react-redux";
// import TestEditor from "./components/TestEditor";
import store from "./State/Store";
import CellList from "./components/CellList";
import '@fortawesome/fontawesome-free/css/all.min.css'





function App() {
  



  return ( 
   <Provider store={store}>
     <>
    {/* <TestEditor /> */}
   {/* <CodeCell /> */}
   <CellList />
    </>
   </Provider>
  );
}

export default App;
