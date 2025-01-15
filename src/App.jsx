
import { Route, Routes } from 'react-router-dom'
import './App.css'
import BSAlgo from './Components/BSAlgo'
import TwoPointerAlgo from './Components/TwoPointerAlgo'
import MergeSortFunction from './Components/MergeSortFunction'

function App() {

  return (
    
    <div>
      <Routes>
        <Route path='/' element = { <BSAlgo/>} />
        <Route path='/TwoPointerAlgo' element = {<TwoPointerAlgo/>}/>
        <Route path='/MergeSort' element = {<MergeSortFunction/>}/>

      </Routes>
    </div>
  )
}

export default App
