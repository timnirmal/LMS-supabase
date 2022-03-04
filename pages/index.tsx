import {useState, useEffect} from 'react'
import {NextPage} from 'next'
import {NextAppPageProps} from '../types/app'
import Layout from '../components/Layout'
import {FaLock, FaGithub} from 'react-icons/fa'
import {useAuth} from '../lib/auth'
import {useFormFields} from '../lib/utils'
import Navbar from '../components/Navbar'
import Example from './test'
import Slider from "../components/Slidebar";
import Image from 'next/image'

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

const myLoader = ({src, width, quality}) => {
    return `https://localhost:3000/public/${src}?w=${width}&q=${quality || 75}`
}

const IndexPage: NextPage<NextAppPageProps> = ({}) => {
    const [isSignIn, setIsSignIn] = useState(true)
    const {loading, signIn, signUp, user, signInWithGithub} = useAuth()
    // Now since we have our form ready, what we're going to need for signing up our users
    // 1. let users provide email and password
    const [values, handleChange] = useFormFields<SignUpFieldProps>(FORM_VALUES)

    // 2. send the provided details to Supabase
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        isSignIn ? signIn(values) : signUp(values)
    }

    const images = [
        "components/Slidebar/Screenshot(1082).png"
    ];

    return (
        <div>
            <Layout useBackdrop={true} usePadding={false}>
                <Example/>

                {/*<Image
                    src="/photo-1464822759023-fed622ff2c3b.avif"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
                // fill,fixed,intrinsic,responsive,undefined.
                */}


                <div id="default-carousel" data-carousel="slide" className="relative">
                    <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
                        <div className="hidden duration-700 ease-in-out relative" data-carousel-item="active">
                            <Image
                                src="/photo-1464822759023-fed622ff2c3b.avif"
                                alt="Picture of the author"
                                layout="fill"
                            />
                        </div>
                        <div className="hidden duration-700 ease-in-out relative" data-carousel-item="active">
                            <Image
                                src="/photo-1464822759023-fed622ff2c3b.avif"
                                alt="Picture of the author"
                                layout="fill"
                            />
                        </div>
                        <div className="hidden duration-700 ease-in-out relative" data-carousel-item="active">
                            <Image
                                src="/photo-1464822759023-fed622ff2c3b.avif"
                                alt="Picture of the author"
                                layout="fill"
                            />
                        </div>
                    </div>

                    <div className="flex absolute bottom-5 left-1/2 space-x-3 -translate-x-1/2">
                        <button type="button" className="w-3 h-3 bg-white rounded-full dark:bg-gray-800"
                                aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"/>
                        <button type="button"
                                className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                                aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"/>
                        <button type="button"
                                className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                                aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"/>
                    </div>


                    <button type="button"
                            className="flex absolute top-0 left-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                            data-carousel-prev>
                        <span
                            className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round"
                                      strokeLinejoin="round" strokeWidth="2"
                                      d="M15 19l-7-7 7-7"/></svg>
                            <span className="hidden">Previous</span>
                        </span>
                    </button>
                    <button type="button"
                            className="flex absolute top-0 right-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                            data-carousel-next>
                        <span
                            className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round"
                                      strokeLinejoin="round" strokeWidth="2"
                                      d="M9 5l7 7-7 7"/></svg>
                            <span className="hidden">Next</span>
                        </span>
                    </button>
                </div>



            </Layout>
        </div>
    )
}

export default IndexPage

IndexPage.defaultProps =
    {
        meta: {
            title: 'Ecom'
        }
    }