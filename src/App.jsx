
import {Navigate, Route, Routes } from 'react-router-dom'
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
import Login from './pages/Login/login'
import SignUp from './pages/SignUp/SignUp'
import ResetPassword from './pages/resetPassword/ResetPassword'
import verifyGmail from './pages/verifyOtp/GmailAuth'
import VerifyOTP from './pages/verifyOtp/verifyGmailOtp'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import { useAuthContext } from './context/AuthContext'
function App() {

  const { authUser } = useAuthContext();

  return (
    
    <div className='top-0 left-0 '  >
      <Routes>
        <Route path='/home' element = { authUser == null? <Login/> : <Home/>} />
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/signup' element = {<SignUp/>}/>
        <Route path = '/resetPassword' element = {<ResetPassword/>}/>
        <Route path='/Verify-Gmail' element = { <verifyGmail/>} />
        <Route path='/verifyOTP' element = { <VerifyOTP/>} />
        <Route path='/forgot-password' element = { <ForgotPassword/>} />
        <Route path='/BSAlgo' element = { authUser == null ?<Login/> : <BSAlgo/>} />
        <Route path='/TwoPointerAlgo' element =  {  authUser == null ? <Login/> :<TwoPointerAlgo/>}/>
        <Route path='/MergeSort' element = {  authUser == null ? <Login/> :<MergeSortFunction/>}/>
        <Route path='/MergeSortAlgo' element = {  authUser == null ? <Login/> :<MergeSort/>}/>
        <Route path='/SelectionSortAlgo' element = {  authUser == null ? <Login/> :<SelectionSort/>}/>
        <Route path='/BubbleSortAlgo' element =  { authUser == null ?<Login/> :<BubbleSort/>}/>
        <Route path='/InsertionSortAlgo' element = { authUser == null ? <Login/> :<InsertionSort/>}/>
        <Route path='/QuickSortAlgo' element = {  authUser == null ?<Login/> :<QuickSort/>}/>
        <Route path='/ReverseLL' element = { authUser == null ? <Login/> :<ReverseLL/>}/>
        <Route path='/LinearSearch' element = {<LinearSearch/>}/>
        <Route path='/LargestElement' element = {  authUser == null ? <Login/> :<LargestElement/>}/>
        <Route path='/SmallestElement' element = { authUser == null ?<Login/> :<SmallestElement/>}/>
        <Route path='/SecondLargestElement' element = {  authUser == null ? <Login/> :<SecondLargestElement/>}/>
        <Route path='/LeftRotateArray' element = {  authUser == null ? <Login/> :<LeftRotateArray/>}/>
        <Route path='/SpiralMatrix' element = {  authUser == null ? <Login/> :<SpiralMatrix/>}/>
        <Route path='/NumberOfPaths' element = {  authUser == null ? <Login/> :<NumberOfPaths/>}/>



      </Routes>
    </div>
  )
}

export default App
