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
import '@nosferatu500/react-sortable-tree/style.css'; // This only needs to be imported once in your app
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import AddNodes from "../components/Tree/AddNodes";

export default function CreatePath({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log("CreatePost");
    const [treeData, setTreeData] = React.useState([
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline' }] },
    ]);


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

    const getNodeKey = ({ treeIndex }) => treeIndex;

    return (
        <div style={{ height: 400 }}>
            <AddNodes/>
            {/*<SortableTree
                treeData={treeData}
                onChange={onChangeFunc}
                />*/}
        </div>
    );

    function onChangeFunc(treeData) {
        console.log(treeData);

        const varb = treeData;

        console.log("Varb ",varb);
        // treeData type
        console.log("Varb ",varb.treeData);
        console.log("Varb ",JSON.stringify(treeData));

        // [{"title":"Egg","expanded":true,"children":[{"title":"Chicken","children":[],"expanded":true}]},{"title":"Fish","children":[{"title":"fingerline","expanded":true}],"expanded":true}]
        return setTreeData(treeData);
    }
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


/*

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
import '@nosferatu500/react-sortable-tree/style.css'; // This only needs to be imported once in your app
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import AddNodes from "../components/Tree/AddNodes";

export default function CreatePath({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log("CreatePost");
    const [treeData, setTreeData] = React.useState([
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline' }] },
    ]);


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

    const getNodeKey = ({ treeIndex }) => treeIndex;

    return (
        <div style={{ height: 400 }}>

<SortableTree
    treeData={treeData}
    onChange={treeData => setTreeData(treeData)}
    generateNodeProps={rowInfo => ({
        title: rowInfo.node.title,
        buttons: [
            <button
                onClick={(path) => {
                    const newTreeData = [...treeData];
                    addNodeUnderParent({
                        treeData: newTreeData,
                        parentKey: path[path.length - 1],
                        expandParent: true,
                        getNodeKey,
                        newNode: {title: "New node"},
                    }).treeData
                    setTreeData(newTreeData);
                }}
            >
                Update
            </button>,
            <button
                onClick={() => {
                    const newTreeData = [...treeData];
                    removeNodeAtPath({
                        treeData: newTreeData,
                        path,
                        getNodeKey,
                    }).treeData
                    setTreeData(newTreeData);
                }}
            >
                Remove
            </button>,
        ],
    })}
/>
</div>
);

function onChangeFunc(treeData) {
    console.log(treeData);
    return setTreeData(treeData);
}
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
*/
