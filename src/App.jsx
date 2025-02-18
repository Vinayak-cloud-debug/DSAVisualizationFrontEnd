
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
import QuickSort from './Components/QuickSort'
import ReverseLL from './Components/ReverseLL'
import LinearSearch from './Components/LinearSearch'
import LargestElement from './Components/LargestElement'
import SmallestElement from './Components/SmallestElement'
import SecondLargestElement from './Components/SecondLargestElement'
import LeftRotateArray from './Components/LeftRotateArray'
import SpiralMatrix from './Components/SpiralMatrix'
import NumberOfPaths from './Components/NumberOfPaths'

function App() {

  return (
    
    <div className='top-0 left-0 '  >
      <Routes>
        <Route path='/' element = { <Home/>} />
        <Route path='/BSAlgo' element = { <BSAlgo/>} />
        <Route path='/TwoPointerAlgo' element = {<TwoPointerAlgo/>}/>
        <Route path='/MergeSort' element = {<MergeSortFunction/>}/>
        <Route path='/MergeSortAlgo' element = {<MergeSort/>}/>
        <Route path='/SelectionSortAlgo' element = {<SelectionSort/>}/>
        <Route path='/BubbleSortAlgo' element = {<BubbleSort/>}/>
        <Route path='/InsertionSortAlgo' element = {<InsertionSort/>}/>
        <Route path='/QuickSortAlgo' element = {<QuickSort/>}/>
        <Route path='/ReverseLL' element = {<ReverseLL/>}/>
        <Route path='/LinearSearch' element = {<LinearSearch/>}/>
        <Route path='/LargestElement' element = {<LargestElement/>}/>
        <Route path='/SmallestElement' element = {<SmallestElement/>}/>
        <Route path='/SecondLargestElement' element = {<SecondLargestElement/>}/>
        <Route path='/LeftRotateArray' element = {<LeftRotateArray/>}/>
        <Route path='/SpiralMatrix' element = {<SpiralMatrix/>}/>
        <Route path='/NumberOfPaths' element = {<NumberOfPaths/>}/>












      </Routes>
    </div>
  )
}

export default App
