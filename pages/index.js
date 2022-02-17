// our-domain.com

import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb';
import Head from 'next/head';
import React from 'react';


const HomePage = (props) => {
    return (
        <React.Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of React meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </React.Fragment>
    );
};

// this will run for every request. should only use this if we need access to the context
// props or if the content on the website will be updated multiple times per second.

// export async function getServerSideProps(context) {
//     // fetch data from API / filesystem
//     const request = context.req;
//     const response = context.res;
//
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

// this does not run for every request, we can set how often the server will update
// with the 'revalidate' prop. This method is typically faster since it can be cached
export async function getStaticProps() {
    // fetch data from API
// =================================CONNECTING TO DATABASE============================
    const client = await MongoClient.connect(
        'mongodb+srv://LBThree:3gL4Tjn5reeqMEz@cluster0.uzbiq.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
// =================================CONNECTING TO DATABASE============================

// =================================RECEIVING DATA====================================
    const meetups = await meetupsCollection.find().toArray();
    await client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 10
    };
// =================================RECEIVING DATA====================================
}

export default HomePage;
