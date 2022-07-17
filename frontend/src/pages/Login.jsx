import { useState, useEffect } from 'react'
import {FaSignInAlt} from 'react-icons/fa'

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
import {login, reset} from '../features/auth/authSlice'



function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        

    })


    const { email, password } = formData

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

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
        
    }

    if (isLoading) {
        return <Spinner />
    }

  return (
    //the 'name' inside input tag is used
    //to update the state onSubmit using
    //e.target.name
    <>
        <section className='heading'>
            <h1>
                <FaSignInAlt />Login
            </h1>
            <p>Login to view and set your goals</p>
        </section>

        <section className='form-group'>
            <form onSubmit={onSubmit}>
                
        
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
            

        

                <div className='form-group'>
                    <button type='submit'className='btn btn-block'>Login</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login