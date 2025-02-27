/* eslint-disable no-console */
import React from 'react';
import {COMMAND_PRIORITY_LOW} from 'lexical';
import {INSERT_CARD_COMMAND} from './KoenigBehaviourPlugin';

import {$createCustomEmbedFormNode, CustomEmbedFormNode, INSERT_CUSTOM_EMBED_FORM_COMMAND} from '../nodes/CustomEmbedFormNode';
import {mergeRegister} from '@lexical/utils';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export default function CustomEmbedFormPlugin() {
    const [editor] = useLexicalComposerContext();

    React.useEffect(() => {
        if (!editor.hasNodes([CustomEmbedFormNode])){
            console.error('CustomEmbedFormPlugin: CustomEmbedFormNode not registered');
            return;
        }

        return mergeRegister(
            editor.registerCommand(
                INSERT_CUSTOM_EMBED_FORM_COMMAND,
                async (dataset) => {
                    const cardNode = $createCustomEmbedFormNode(dataset);
                    editor.dispatchCommand(INSERT_CARD_COMMAND, {cardNode, openInEditMode: true});

                    return true;
                },
                COMMAND_PRIORITY_LOW
            )
        );
    }, [editor]);

    return null;
}
