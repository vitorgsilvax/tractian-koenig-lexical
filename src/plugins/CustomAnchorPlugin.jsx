/* eslint-disable no-console */
import React from 'react';
import {COMMAND_PRIORITY_LOW} from 'lexical';
import {INSERT_CARD_COMMAND} from './KoenigBehaviourPlugin';

import {$createCustomAnchorNode, CustomAnchorNode, INSERT_CUSTOM_ANCHOR_COMMAND} from '../nodes/CustomAnchorNode';
import {mergeRegister} from '@lexical/utils';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export default function CustomAnchorPlugin() {
    const [editor] = useLexicalComposerContext();

    React.useEffect(() => {
        if (!editor.hasNodes([CustomAnchorNode])){
            console.error('CustomAnchorPlugin: CustomAnchorNode not registered');
            return;
        }

        return mergeRegister(
            editor.registerCommand(
                INSERT_CUSTOM_ANCHOR_COMMAND,
                async (dataset) => {
                    const cardNode = $createCustomAnchorNode(dataset);
                    editor.dispatchCommand(INSERT_CARD_COMMAND, {cardNode, openInEditMode: true});

                    return true;
                },
                COMMAND_PRIORITY_LOW
            )
        );
    }, [editor]);

    return null;
}
