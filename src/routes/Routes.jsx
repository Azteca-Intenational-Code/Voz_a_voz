import { createBrowserRouter } from 'react-router-dom'
import Home from '../views/home'
import Client from '../views/Client/Client'
import Operator from '../views/Opertator/Operator'
import SpeechRecognitionOperatorContextProvider from '../modules/SpeechRecognition/SpeechRecognitionOperator'
import SpeechRecognitionClientContextProvider from '../modules/SpeechRecognition/SpeechRecognitionClient'
import Speech_IAContextProvider from '../modules/Speech_IA'
import SpeechGeneratorProvider from '../modules/SpeechGenerator'
import Error from '../views/Error'

export default function Routes() {

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <Error />
        },
        {
            path: "/client",
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
            path: "/operator",
            element:
                <SpeechRecognitionOperatorContextProvider>
                    <Speech_IAContextProvider>
                        <Operator />
                    </Speech_IAContextProvider>
                </SpeechRecognitionOperatorContextProvider>
            ,
            errorElement: <Error />
        }
    ])

    return routes
}
