import Image from 'next/image'
import React from "react";

import {useRouter} from 'next/router'
import Link from 'next/link'
import {FaGithub, FaLock} from "react-icons/fa";

import {useState, useEffect} from 'react'
import {NextPage} from 'next'
import {NextAppPageProps} from '../../types/app'
import Layout from '../Layout'
import {useAuth} from '../../lib/auth'
import {useFormFields} from '../../lib/utils'

// define the shape of the SignUp form's fields
type SignUpFieldProps = {
    email: string,
    password: string
}

// the value we'd like to initialize the SignUp form with
const FORM_VALUES: SignUpFieldProps = {
    email: '',
    password: ''
}


export default function AuthModal({children, className, ...props}) {
    const router = useRouter()
    const {id} = router.query
    const title = props.title || 'Card'

    const [isSignIn, setIsSignIn] = useState(true)
    const {loading, signIn, signUp, users, signInWithGithub} = useAuth()
    // Now since we have our form ready, what we're going to need for signing up our users
    // 1. let users provide email and password
    const [values, handleChange] = useFormFields<SignUpFieldProps>(FORM_VALUES)

    // 2. send the provided details to Supabase
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        isSignIn ? signIn(values) : signUp(values)
    }

    return (
        <div className={`card ${className}`} {...props}>
            <div>
                <div>
                    {/*<button
                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button" data-modal-toggle="authentication-modal"
                    >
                        Toggle modal
                    </button>*/}

                    <div id="authentication-modal" aria-hidden="true"
                         className={
                             //"hidden "+
                             //"overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0"}
                             //"right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0"}
                             ""}
                    >
                        <div className="flex flex-grow">
                        {/*<div className="relative px-4 w-full max-w-lg h-full md:h-auto">*/}

                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-end p-2">
                                    <button type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                            data-modal-toggle="authentication-modal">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>

                                <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">

                                    {/* App logo and tagline*/}
                                    <div className="w-full text-center mb-4 flex  flex-col place-items-center">
                                        <div><FaLock className="text-gray-200 text-5xl shadow-sm"/></div>
                                        <h3 className="text-3xl text-gray-400">Supa<strong>Auth</strong></h3>
                                        <small className="text-gray-300">Please provide
                                            your <strong>email</strong> and <strong>password</strong> and {isSignIn ? 'Log In' : 'Sign Up'}
                                        </small>
                                    </div>

                                    {/* Sign Up form  */}
                                    <form className="" onSubmit={handleSubmit}>
                                        <div className="">
                                            <button onClick={signInWithGithub}
                                                    className="flex-1 bg-white text-green-700 py-3 rounded w-full text-center shadow"
                                            >
                                                <FaGithub
                                                    className="inline-block text-2xl"/> {isSignIn ? 'Log In' : 'Sign Up'} with <strong>Github</strong>
                                            </button>
                                            <hr className="my-4"/>
                                            <div className="mb-4">
                                                <label htmlFor="email"
                                                       className="block font-semibold text-gray-200 mb-2">Email</label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
                                                    placeholder="Your Email"
                                                    required
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="password"
                                                       className="block font-semibold text-gray-200 mb-2">Password</label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
                                                    placeholder="Your password"
                                                    required
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            {/* <!-- Sign Up & Sign In form: Actions --> */}

                                            <div className="flex pt-4 gap-2">
                                                <button type="submit"
                                                        className="flex-1 bg-gray-500 border border-gray-600 text-white py-3 rounded w-full text-center shadow"
                                                >
                                                    {isSignIn ? 'Log In' : 'Sign Up'}
                                                </button>
                                                <div className="flex-1 text-right">
                                                    <small
                                                        className="block text-gray-300">{isSignIn ? 'Not a member yet?' : 'Already a member?'} </small>
                                                    <a className="block font-semibold text-gray-200" href=""
                                                       onClick={(e) => {
                                                           e.preventDefault()
                                                           setIsSignIn(!isSignIn)
                                                       }}
                                                    >{isSignIn ? 'Sign Up' : 'Log In'}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </form>


                                </div>




                                <form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">


                                    {/* TODO: Impliment remember me and lost password */}
                                    <div className="flex justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox"
                                                       className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                                       required="">
                                                </input>
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember"
                                                       className="font-medium text-gray-900 dark:text-gray-300">Remember
                                                    me</label>
                                            </div>
                                        </div>
                                        <a href="#"
                                           className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost
                                            Password?</a>
                                    </div>
                                    {/*<button type="submit"
                                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login
                                        to your account
                                    </button>
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                        Not registered? <a href="#"
                                                           className="text-blue-700 hover:underline dark:text-blue-500">Create
                                        account</a>
                                    </div>*/}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {children}
        </div>
    );
}

