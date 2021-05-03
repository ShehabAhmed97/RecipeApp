
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import List from './components/List'

//main app rendered component
function App() {
  return (
    //styling the container division to be column-directed and flexable with dark bg and centered content 
     <div style={{marginTop:"5vh"}} className="container-fluid d-flex flex-column align-items-center justify-content-center text-center bg-dark text-white">
       <h1>welcom to</h1>
       <h1>AWESOME RECIPES <i className="fas fa-utensils" style={{fontSize:"15vh",color:"white"}}></i></h1>
       <div style={{width:"60vw",marginTop:"1vw"}}>
        <List/>
       </div>
     </div>
  );
}

export default App;
