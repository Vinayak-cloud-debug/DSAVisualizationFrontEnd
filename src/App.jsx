
import { Route, Routes } from 'react-router-dom'
import './App.css'
import BSAlgo from './Components/BSAlgo'
import TwoPointerAlgo from './Components/TwoPointerAlgo'
import MergeSortFunction from './Components/MergeSortFunction'
import MergeSort from './Components/MergeSort'

function App() {

  return (
    
    <div>
      <Routes>
        <Route path='/' element = { <BSAlgo/>} />
        <Route path='/TwoPointerAlgo' element = {<TwoPointerAlgo/>}/>
        <Route path='/MergeSort' element = {<MergeSortFunction/>}/>
        <Route path='/MergeSortAlgo' element = {<MergeSort/>}/>
      </Routes>
    </div>
  )
}

export default App
