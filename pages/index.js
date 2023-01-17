import MeetupList from './../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="a list of reat meetups"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

//will run for every request

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data fom api
//   return {
//     props: {
//       meetups: DummyMeetups,
//     },
//   };
// }

//will run every time after revalidate timer

export async function getStaticProps() {
  // fetch data fom api
  const client = await MongoClient.connect(
    'mongodb+srv://anton22:anton22@cluster0.uzv5pzb.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
export default HomePage;
