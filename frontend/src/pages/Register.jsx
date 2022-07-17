import { useState, useEffect } from 'react'
import {FaUser} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

/*
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
*/
//do above steps and toastContainer in app.js
//for this to work
import { toast } from  'react-toastify'
import {register, reset} from '../features/auth/authSlice'

function Register() {

const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',

})


const { name, email, password, password2 } = formData


const navigate = useNavigate()
const dispatch = useDispatch()

const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
)

useEffect(() => {
    if(isError) {
        toast.error(message)
    }

    if(isSuccess || user) {
        navigate('/')
    }

    dispatch(reset())


}, [user, isError, isSuccess, message, navigate, dispatch])

//we use navigate and dispatch in useEffect to see
//their changes as well since they give
//'stupid' warnings


const onChange = (e) => {
    //here the curly braces are put inside parenthesis 
    //since setFormData returns an object

    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
    }


const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
        toast.error('Passwords do not match')
    } else {
        const userData = {
            name,
            email,
            password,
        }

        dispatch(register(userData))
    }
    
}

if(isLoading) {
    return <Spinner />
}
  return (
    //the 'name' inside input tag is used
    //to update the state onSubmit using
    //e.target.name
    <>
        <section className='heading'>
            <h1>
                <FaUser />Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className='form-group'>
            <form onSubmit={onSubmit}>
                <div className='form-control'>

                <input type='text' className='form-control' id='name'
                name='name' value={name} placeholder='Enter your name'
                onChange={onChange} />

                </div>
            
        
                <div className='form-control'>
                <input type='text' className='form-control' id='email'
                name='email' value={email} placeholder='Enter your email'
                onChange={onChange} />

                </div>
            

        
            
                <div className='form-control'>
                <input type='password' className='form-control' id='password'
                name='password' value={password} placeholder='Enter your password'
                onChange={onChange} />

                </div>
            

        
            
                <div className='form-control'>
                <input type='password' className='form-control' id='password2'
                name='password2' value={password2} placeholder='Confirm your password'
                onChange={onChange} />

                </div>

                <div className='form-group'>
                    <button type='submit'className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register