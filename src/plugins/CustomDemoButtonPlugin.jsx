/* eslint-disable no-console */
import React from 'react';
import {COMMAND_PRIORITY_LOW} from 'lexical';
import {INSERT_CARD_COMMAND} from './KoenigBehaviourPlugin';

import {$createCustomDemoButtonNode, CustomDemoButtonNode, INSERT_CUSTOM_DEMO_BUTTON_COMMAND} from '../nodes/CustomDemoButtonNode';
import {mergeRegister} from '@lexical/utils';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export default function CustomDemoButtonPlugin() {
    const [editor] = useLexicalComposerContext();

    React.useEffect(() => {
        if (!editor.hasNodes([CustomDemoButtonNode])){
            console.error('CustomDemoButtonPlugin: CustomDemoButtonNode not registered');
            return;
        }

        return mergeRegister(
            editor.registerCommand(
                INSERT_CUSTOM_DEMO_BUTTON_COMMAND,
                async (dataset) => {
                    const cardNode = $createCustomDemoButtonNode(dataset);
                    editor.dispatchCommand(INSERT_CARD_COMMAND, {cardNode, openInEditMode: true});

                    return true;
                },
                COMMAND_PRIORITY_LOW
            )
        );
    }, [editor]);

    return null;
}
