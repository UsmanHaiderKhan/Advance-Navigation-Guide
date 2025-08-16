import { useRouteLoaderData} from "react-router-dom";
import EventItem from "../components/EventItem";
import {redirect} from "react-router";

function EditDetail() {
    const data = useRouteLoaderData('event-detail');
    return (
        <>
          <EventItem event = {data.event}/>
        </>
    )
}
export default EditDetail;
export async function loader({request, params}) {
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw new Response(JSON.stringify({message: "Cloud not fetch event."}), {status:500});
    } else {
        return response;
    }
}
export async function action({params, request}) {
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id,{
        method: request.method,
    });
    if (!response.ok) {
        throw new Response(JSON.stringify({message: "Cloud not delete event."}), {status:500});
    }
    return redirect('/events');

}
