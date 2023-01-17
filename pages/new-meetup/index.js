import NewMeetupForm from '@/components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupdata) {
    //console.log(enteredMeetupdata);
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupdata),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="add ypur own meetup"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
}

export default NewMeetupPage;
