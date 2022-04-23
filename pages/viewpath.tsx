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
import Component2 from "../components/Tree/Tree2";

import React, { Component } from 'react';
import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css'; // This only needs to be imported once in your app

import AddNodes from "../components/Tree/AddNodes";

export default function ViewPath({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log("CreatePost");
    const treeData = [{"title":"Egg","expanded":true,"children":[{"title":"Chicken","children":[],"expanded":true}]},{"title":"Fish","children":[{"title":"fingerline","expanded":true}],"expanded":true}];

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
            {// Map treeData to text nodes}
                treeData.map((node, index) => {
                    return (
                        <div key={index} className="bg-red-600 p-2">
                            {node.title}
                            {node.children && node.children.map((child, index) => {
                                return (
                                    <div key={index} className="bg-blue-600 p-2">
                                        {child.title}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    );

}

// Fetch user data server-side to eliminate a flash of unauthenticated content.

export const getServerSideProps: GetServerSideProps = async ({req}): Promise<NextAppPageServerSideProps> => {
    const {user} = await supabaseClient.auth.api.getUserByCookie(req);
    if (!user) {
        return {
            redirect: {
                destination: '/auth?from=viewpath',
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
