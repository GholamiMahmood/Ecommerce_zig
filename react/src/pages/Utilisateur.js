import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

/*
WebSockets,
  on exécute la commande npm install sockjs-client 
 @stomp/stompjs.les adresses d'envoi et de réception 
 dans frontend correspondent  à celles définies dans 
 la structure de backend. 
 Cela garantit une communication cohérente entre les 
 différentes parties de l'application.Les WebSockets 
 sont utilisés pour permettre une communication en temps
 réel entre le frontend et le backend, ce qui est 
 particulièrement utile lorsque des mises à jour 
 instantanées sont nécessaires.

*/

function Utilisateur() {
    const utilisateurid = useSelector(state => state.auth.user);
    const [achats, setAchats] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    //Nombre d'éléments par page.
    const [itemsPerPage] = useState(5); 
    const stompClientRef = useRef(null);
    const subscriptionRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        const connectWebSocket = async () => {
            return new Promise((resolve, reject) => {
                const socket = new SockJS('http://localhost:8080/ws');
                const stompClient = new Client({
                    webSocketFactory: () => socket,
                    reconnectDelay: 5000, // Reconnect after 5 seconds
                    onConnect: () => {
                        if (isMounted) {
                            console.log('Connected to WebSocket');
                            resolve(stompClient);
                        }
                    },
                    onStompError: (frame) => {
                        if (isMounted) {
                            console.error('Broker reported error: ' + frame.headers['message']);
                            console.error('Additional details: ' + frame.body);
                            reject('Error connecting to WebSocket');
                        }
                    },
                    onWebSocketClose: () => {
                        if (isMounted) {
                            console.log('WebSocket closed, attempting to reconnect...');
                        }
                    }
                });
                stompClient.activate();
                stompClientRef.current = stompClient;
            });
        };

        const subscribeToAchats = async (stompClient) => {
            return new Promise(async (resolve, reject) => {
                try {
                    
                    const messagePayload = utilisateurid.toString();
                    console.log('Sending utilisateurid: ', messagePayload);
                    stompClient.publish({
                        destination: '/app/utilisateurid',
                        body: messagePayload
                    });

                    console.log('la reponse de javaspringboot');

                    const subscription = stompClient.subscribe('/topic/achats', (message) => {
                        console.log('Received message', message);
                        handleReceivedMessage(message);
                    });                    
                    subscriptionRef.current = subscription;
                    resolve(subscription);
                } catch (error) {
                    console.error('Error subscribing to WebSocket topic: ', error);
                    reject(error);
                }
            });
        };

        const handleReceivedMessage = (message) => {
            try {
                console.log('Raw message received: ', message.body);
                const receivedAchats = JSON.parse(message.body);
                console.log('Parsed achats: ', receivedAchats);
                setAchats(receivedAchats);
                setError(null); 
            } catch (error) {
                console.error('Error parsing message: ', error);
                setError('Error parsing message');
            }
        };

        const setupWebSocket = async () => {
            try {
                const stompClient = await connectWebSocket();
                await subscribeToAchats(stompClient);

                // Clean up function for WebSocket connection
                return () => {
                    if (subscriptionRef.current) {
                        subscriptionRef.current.unsubscribe();
                    }
                    stompClient.deactivate(() => {
                        console.log('Disconnected from WebSocket');
                    });
                };
            } catch (error) {
                setError(error);
            }
        };

        const cleanUpWebSocket = setupWebSocket();

        // Clean up function
        return () => {
            isMounted = false;
            cleanUpWebSocket.then(cleanUp => cleanUp()).catch(error => console.error(error));
        };
    }, [utilisateurid]); // Exécutez ceci chaque fois que l'identifiant de l'utilisateur change.

    // pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = achats.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            {/* <h1>{utilisateurid}!</h1> */}
            {error && <div>Error: {error}</div>}
            <div>
                <h2>Liste d'Achat:</h2>
                <table style={{ width: '50%', borderCollapse: 'collapse', border: '2px solid black' }}>
                    <thead style={{ backgroundColor: 'blue', color: 'white' }}>
                        <tr>
                            <th style={{ padding: '2px', border: '1px solid black' }}>#</th>
                            <th style={{ padding: '4px', border: '1px solid black' }}>InventaireID</th>
                            <th style={{ padding: '4px', border: '1px solid black' }}>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((achat, index) => (
                            <tr key={index}>
                                <td style={{ padding: '2px', border: '1px solid black' }}>{index + 1}</td>
                                <td style={{ padding: '4px', border: '1px solid black' }}>{achat.inventaireId}</td>
                                <td style={{ padding: '4px', border: '1px solid black' }}>{achat.prix}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {achats.length > itemsPerPage &&
                        Array.from({ length: Math.ceil(achats.length / itemsPerPage) }, (_, index) => (
                            <li key={index} style={{ display: 'inline-block', margin: '5px' }}>
                                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export { Utilisateur };
