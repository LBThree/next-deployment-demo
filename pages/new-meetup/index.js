// our-domain.com/new-meetup
import React from 'react';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import Head from 'next/head';

const NewMeetupPage = () => {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    }

    return (
        <React.Fragment>
            <Head>
                <title>Add A New Meetup</title>
                <meta
                    name="description"
                    content="Add your own meetups."
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </React.Fragment>
    );
};

export default NewMeetupPage;
