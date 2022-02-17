import React from 'react';
import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from 'mongodb';
import Head from 'next/head';

const MeetupDetails = (props) => {

    return (
        <React.Fragment>
            <Head>
                <title>{"Details about "+ props.meetupData.title}</title>
                <meta name="description"
                content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </React.Fragment>
    );
};

export async function getStaticPaths() {
    // =================================CONNECTING TO DATABASE============================
    const client = await MongoClient.connect(
        'mongodb+srv://LBThree:3gL4Tjn5reeqMEz@cluster0.uzbiq.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    // =================================CONNECTING TO DATABASE============================

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({params: {meetupID: meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup
    const meetupID = context.params.meetupID;

    // =================================CONNECTING TO DATABASE============================
    const client = await MongoClient.connect(
        'mongodb+srv://LBThree:3gL4Tjn5reeqMEz@cluster0.uzbiq.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    // =================================CONNECTING TO DATABASE============================

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupID)}, {})
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
}

export default MeetupDetails;
