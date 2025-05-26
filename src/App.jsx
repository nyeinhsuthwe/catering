import { RouterProvider } from "react-router-dom"
import router from "./routes/Route"
import 'primereact/resources/themes/lara-light-blue/theme.css';  // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



function App() {

  return (
    
   <>
   
   <RouterProvider router = {router} />
   </>
  )
}

export default App
