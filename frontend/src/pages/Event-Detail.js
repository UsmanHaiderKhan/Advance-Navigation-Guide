import {Await, useRouteLoaderData} from "react-router-dom";
import EventItem from "../components/EventItem";
import {redirect} from "react-router";
import EventsList from "../components/EventsList";
import {Suspense} from "react";

function EditDetail() {
    // const data = useRouteLoaderData('event-detail');
    const {event, events} = useRouteLoaderData('event-detail');
    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={event}>
                    {loadedEventDetail => <EventItem event={loadedEventDetail}/>}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents => <EventsList events={loadedEvents}/>}
                </Await>
            </Suspense>
        </>
    )
}

export default EditDetail;

async function loadEventDetail(id) {
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw new Response(JSON.stringify({message: "Cloud not fetch event."}), {status: 500});
    } else {
        const data = await response.json();
        return data.event;
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {
            status: 500,
        });
    } else {
        const data = await response.json();
        return data.events;
    }
}

export async function loader({request, params}) {
    const id = params.eventId;
    return {
        event: await loadEventDetail(id),
        events: loadEvents(),
    };
}

export async function action({params, request}) {
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id, {
        method: request.method,
    });
    if (!response.ok) {
        throw new Response(JSON.stringify({message: "Cloud not delete event."}), {status: 500});
    }
    return redirect('/events');

}
