import React, {useState} from 'react';
// import {triggerCustomEvent} from '../utils/customEvents/triggerCustomEvent';
import {triggerCustomEvent} from '../utils/customEvents/triggerCustomEvent';
import {useEventListener} from '../hooks/useEventListener';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export function CustomDemoButtonNodeComponent({nodeKey}) {
    const [editor] = useLexicalComposerContext();
    const [isFormCompleted, setIsFormCompleted] = useState(false);
    const [data, setData] = useState(null);

    React.useEffect(() => {
        triggerCustomEvent({
            eventName: 'demo-button-modal',
            data: {
                action: 'open'
            }
        });
    }, [nodeKey, editor]);

    useEventListener('demo-button-modal-result', ({action, formData}) => {
        if (action === 'open') {
            setIsFormCompleted(true);
        } else if (action === 'close') {
            setIsFormCompleted(false);
        }

        setData(formData);
    });

    return isFormCompleted ? <a
        className="w-full !no-underline"
        href={data.url}
        rel="noreferrer"
        style={{color: 'white', textDecoration: 'none'}} target="_blank"
    >
        <div className="demo-button mt-4 cursor-pointer text-center text-base font-light text-[#2563eb] underline underline-offset-2 transition-all duration-300 hover:brightness-125 lg:text-2xl">
            {data.label}
        </div>
    </a> : null;
}
