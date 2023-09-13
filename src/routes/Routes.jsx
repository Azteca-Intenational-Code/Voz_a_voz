import { createBrowserRouter } from 'react-router-dom'
import Home from '../views/Home.jsx'
import Client from '../views/Client/Client'
import Operator from '../views/Opertator/Operator'
import SpeechRecognitionClientContextProvider from '../modules/SpeechRecognition/SpeechRecognitionClient'
import SpeechGeneratorProvider from '../modules/SpeechGenerator'
import Error from '../views/Error'

export default function Routes() {

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <Error />,
            children: [
                {
                    path: "client",
                    element:
                        <SpeechRecognitionClientContextProvider>
                            <SpeechGeneratorProvider>
                                <Client />
                            </SpeechGeneratorProvider>
                        </SpeechRecognitionClientContextProvider>

                    ,
                    errorElement: <Error />
                },
                {
                    path: "operator",
                    element:
                            <Operator />
                    ,
                    errorElement: <Error />
                }
            ]
        },
    ])

    return routes
}
