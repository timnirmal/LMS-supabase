import React from "react";

// components
import CardLineChart from "/components/Cards/CardLineChart.js";
import CardBarChart from "/components/Cards/CardBarChart.js";
import CardPageVisits from "/components/Cards/CardPageVisits.js";
import CardSocialTraffic from "/components/Cards/CardSocialTraffic.js";

// layout for page
import Admin from "/layout/Admin.js";
import Link from 'next/link'

export default function Dashboard() {
    return (
        <>
            <Admin>
                Your Posts
                Your Courses
                Your Learning Path

                Create Post
                Create Course
                Create Learning Path

                <Link href="/create">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create post
                    </button>
                </Link>

                <div className="flex flex-wrap">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                        <CardLineChart/>
                    </div>
                    <div className="w-full xl:w-4/12 px-4">
                        <CardBarChart/>
                    </div>
                </div>
                <div className="flex flex-wrap mt-4">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                        <CardPageVisits/>
                    </div>
                    <div className="w-full xl:w-4/12 px-4">
                        <CardSocialTraffic/>
                    </div>
                </div>
            </Admin>
        </>
    );
}

//Dashboard.getLayout = (page) => <Admin page={page} />;

