import dynamic from "next/dynamic";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {getServerSideProps} from "../pages/cart";
import {NextAppPageServerSideProps} from "../types/app";
import {supabaseClient} from "../lib/supabase";
import {useAuth} from "../lib/auth";
import {useEffect} from "react";
import Router from "next/router";
import {ROUTE_AUTH} from "../config";
import {SpinnerFullPage} from "../components/Spinner";
const CodeWithCodemirror = dynamic(import("../components/Editor"), { ssr: false, });


export default function CreatePost({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log("CreatePost");


    const {
        users,       // Logged in user object
        loading,    // Loading state
        signOut,    // Sign out method
        loggedIn,
        userLoading
    } = useAuth()

    console.log(users)

    useEffect(() => {
        if (!userLoading && !loggedIn) {
            Router.push(ROUTE_AUTH)
        }
    }, [userLoading, loggedIn]);

    if (userLoading) {
        return <SpinnerFullPage/>
    }

    return (
        <div>
            <CodeWithCodemirror user={users}/>
        </div>
    );
}

// Fetch user data server-side to eliminate a flash of unauthenticated content.

export const getServerSideProps: GetServerSideProps = async ({req}): Promise<NextAppPageServerSideProps> => {
    const {user} = await supabaseClient.auth.api.getUserByCookie(req);
    if (!user) {
        return {
            redirect: {
                destination: '/auth?from=createpost',
                permanent: false,
            },
        }
    }
    // or, alternatively, can send the same values that client-side context populates to check on the client and redirect
    // The following lines won't be used as we're redirecting above
    return {
        props: {
            user,
            loggedIn: !!user
        }
    }
}
