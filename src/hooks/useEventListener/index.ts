import {useEffect, useState} from 'react';

import {CustomEventHandler} from '../../types/customEvents/common';
import {CustomEvents} from '../../types/customEvents/customEvents';
import {Handler} from './types';
import {createCustomEvent} from '../../utils/customEvents/createCustomEvent';
import {deleteCustomEvent} from '../../utils/customEvents/deleteCustomEvent';

export const useEventListener = <EventName extends keyof CustomEvents>(
    eventName: EventName,
    eventHandler: Handler<EventName>
) => {
    // @ts-expect-error - data is not defined in the initial state
    const [data, setData] = useState<CustomEvents[EventName]['data']>({});

    // eslint-disable-next-line no-shadow
    const handleSetData = <Data>(data: Data) => {
        setData(prev => ({
            ...prev,
            ...data
        }));
    };

    useEffect(() => {
        //@ts-expect-error
        const handler: CustomEventHandler = (event: CustomEvent) => {
            if (event.detail.data) {
                handleSetData(event.detail.data);
            }

            eventHandler(event.detail);
        };

        createCustomEvent({
            eventName,
            handler
        });

        return () => {
            deleteCustomEvent({
                eventName,
                handler
            });
        };
    }, [eventName, eventHandler]);

    return {
        data,
        setData
    };
};
