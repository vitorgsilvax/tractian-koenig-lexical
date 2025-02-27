import React from 'react';
// import {triggerCustomEvent} from '../utils/customEvents/triggerCustomEvent';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export function CustomEmbedFormNodeComponent({nodeKey}) {
    const [editor] = useLexicalComposerContext();

    React.useEffect(() => {
        // triggerCustomEvent({
        //     eventName: 'free-material-banner',
        //     data: {
        //         action: 'open'
        //     }
        // });
        // eslint-disable-next-line no-console
        console.log('CustomEmbedFormNodeComponent mounted', nodeKey);
    }, [nodeKey, editor]);

    return <p>Custom Embed Form</p>;
}
