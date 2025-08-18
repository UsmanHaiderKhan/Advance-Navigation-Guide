import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import EventDetail, {action as eventDeleteAction, loader as eventDetailsLoader} from './pages/Event-Detail';
import NewEvent, {action as newEventAction} from './pages/NewEvent';
import EditEvent from './pages/Edit-Event';
import Events, {loader} from './pages/Events';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import Error from './pages/Error';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <Error/>,
        children: [
            {path: '/', element: <Home/>},
            {
                path: '/events',
                element: <EventsRootLayout/>,
                children: [
                    {
                        index: true,
                        element: <Events/>,
                        loader: loader,
                    },
                    {
                        path: ':eventId',
                        id: 'event-detail',
                        loader: eventDetailsLoader,
                        children: [
                            {
                                index: true,
                                action: eventDeleteAction,
                                element: <EventDetail/>,
                            },
                            {path: 'edit', element: <EditEvent/>},
                        ],
                    },
                    {path: '/events/new', element: <NewEvent/>, action: newEventAction},
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
