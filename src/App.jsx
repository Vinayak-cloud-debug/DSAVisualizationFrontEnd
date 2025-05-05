
import { Route, Routes } from 'react-router-dom'
import './App.css'
import BSAlgo from './Components/BSAlgo'
import BubbleSort from './Components/BubbleSort'
import Home from './Components/Home'
import InsertionSort from './Components/Insertion'
import LargestElement from './Components/LargestElement'
import LeftRotateArray from './Components/LeftRotateArray'
import LinearSearch from './Components/LinearSearch'
import MergeSort from './Components/MergeSort'
import MergeSortFunction from './Components/MergeSortFunction'
import NumberOfPaths from './Components/NumberOfPaths'
import QuickSort from './Components/QuickSort'
import ReverseLL from './Components/ReverseLL'
import SecondLargestElement from './Components/SecondLargestElement'
import SelectionSort from './Components/SelectionSort'
import SmallestElement from './Components/SmallestElement'
import SpiralMatrix from './Components/SpiralMatrix'
import TwoPointerAlgo from './Components/TwoPointerAlgo'
import Login from './pages/Login/login'
import SignUp from './pages/SignUp/SignUp'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import ResetPassword from './pages/resetPassword/ResetPassword'
import VerifyOTP from './pages/verifyOtp/verifyGmailOtp'
import Graph from './Components/Graph'
  
function App() {


  return (
    
    <div className='top-0 left-0 '  >
      <Routes>
        <Route path = '/login' element = {<Login/>}/>
        <Route path='/' element = {  <Home/>} />
        <Route path = '/signup' element = {<SignUp/>}/>
        <Route path = '/reset-password' element = {<ResetPassword/>}/>
        <Route path='/Verify-Gmail' element = { <verifyGmail/>} />
        <Route path='/verifyOTP' element = { <VerifyOTP/>} />
        <Route path='/forgot-password' element = { <ForgotPassword/>} />
        <Route path='/BSAlgo' element = { <BSAlgo/>} />
        <Route path='/TwoPointerAlgo' element = {<TwoPointerAlgo/>}/>
        <Route path='/MergeSort' element = {  <MergeSortFunction/>}/>
        <Route path='/MergeSortAlgo' element = {  <MergeSort/>}/>
        <Route path='/SelectionSortAlgo' element = {  <SelectionSort/>}/>
        <Route path='/BubbleSortAlgo' element =  { <BubbleSort/>}/>
        <Route path='/InsertionSortAlgo' element = {<InsertionSort/>}/>
        <Route path='/QuickSortAlgo' element = { <QuickSort/>}/>
        <Route path='/ReverseLL' element = { <ReverseLL/>}/>
        <Route path='/LinearSearch' element = {<LinearSearch/>}/>
        <Route path='/LargestElement' element = {  <LargestElement/>}/>
        <Route path='/SmallestElement' element = { <SmallestElement/>}/>
        <Route path='/SecondLargestElement' element = { <SecondLargestElement/>}/>
        <Route path='/LeftRotateArray' element = { <LeftRotateArray/>}/>
        <Route path='/SpiralMatrix' element = { <SpiralMatrix/>}/>
        <Route path='/NumberOfPaths' element = {  <NumberOfPaths/>}/>
        {/* <Route path='/Graph' element = {  <Graph/>}/> */}




      </Routes>
    </div>
  )
}

export default App
