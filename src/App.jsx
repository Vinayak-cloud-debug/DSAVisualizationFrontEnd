
import { Route, Routes } from 'react-router-dom'
import './App.css'
import BSAlgo from './Components/BSAlgo'
import BubbleSort from './Components/BubbleSort'
import Home from './Components/Home'
import InsertionSort from './Components/Insertion'
import MergeSort from './Components/MergeSort'
import MergeSortFunction from './Components/MergeSortFunction'
import SelectionSort from './Components/SelectionSort'
import TwoPointerAlgo from './Components/TwoPointerAlgo'

function App() {

  return (
    
    <div >
      <Routes>
        <Route path='/' element = { <Home/>} />
        <Route path='/BSAlgo' element = { <BSAlgo/>} />
        <Route path='/TwoPointerAlgo' element = {<TwoPointerAlgo/>}/>
        <Route path='/MergeSort' element = {<MergeSortFunction/>}/>
        <Route path='/MergeSortAlgo' element = {<MergeSort/>}/>
        <Route path='/SelectionSortAlgo' element = {<SelectionSort/>}/>
        <Route path='/BubbleSortAlgo' element = {<BubbleSort/>}/>
        <Route path='/InsertionSortAlgo' element = {<InsertionSort/>}/>




      </Routes>
    </div>
  )
}

export default App
