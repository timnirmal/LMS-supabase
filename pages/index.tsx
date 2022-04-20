import {NextPage} from 'next'
import {NextAppPageProps} from '../types/app'
import Layout from '../components/Layout'
import Card from "../components/Card/card";
import {getAllPosts} from "../lib/posts/posts";
import {POSTS_PER_PAGE} from "../pages/blog";
import {supabaseClient, getServiceSupabase} from "../lib/supabase";
import {useEffect, useState} from "react";


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



const IndexPage: NextPage<NextAppPageProps> = ({}) => {
    const [posts, setPosts] = useState(null)
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('useEffect')
        setCount(count + 1)
        console.log(count)
        getServiceSupabase()
            .from("posts")
            .select("*")
            .order("inserted_at", { ascending: false })
            .then(({ data, error }) => {
                if (!error) {
                    setPosts(data);
                }
                else {
                    console.log(error)
                }
            });
        console.log(posts);
    },[]);

    //const posts = getAllPosts();
    console.log(posts);
    console.log("Post Got")
    //console.log(posts);
    //const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
    const pagination = {
        currentPage: 1,
        //totalPages: Math.ceil(Object.getOwnPropertyNames(posts).length / POSTS_PER_PAGE),
        totalPages: 5,
    }
    console.log(posts);

    return (
        <div>
            <Layout useBackdrop={true} usePadding={false}>
                <section className="container mx-auto px-0 md:px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">

                        <Card
                            //title={posts[0].title}
                            title="Title"
                            description="Card description"
                            image="/Products/WhiteClock.png"
                        />



                    </div>
                </section>

            </Layout>
        </div>
    )
}

export default IndexPage

IndexPage.defaultProps = {
    meta: {
        title: 'Ecom'
    }
}
