/* eslint-disable no-console */
import React from 'react';
import {$createFreeMaterialBannerNode, FreeMaterialBannerNode, INSERT_FREE_MATERIAL_COMMAND} from '../nodes/FreeMaterialBannerNode';
import {COMMAND_PRIORITY_LOW} from 'lexical';
import {INSERT_CARD_COMMAND} from './KoenigBehaviourPlugin';

import {mergeRegister} from '@lexical/utils';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export default function FreeMaterialBannerPlugin() {
    const [editor] = useLexicalComposerContext();

    React.useEffect(() => {
        if (!editor.hasNodes([FreeMaterialBannerNode])){
            console.error('ButtonPlugin: ButtonNode not registered');
            return;
        }

        return mergeRegister(
            editor.registerCommand(
                INSERT_FREE_MATERIAL_COMMAND,
                async (dataset) => {
                    const cardNode = $createFreeMaterialBannerNode(dataset);
                    editor.dispatchCommand(INSERT_CARD_COMMAND, {cardNode, openInEditMode: true});

                    return true;
                },
                COMMAND_PRIORITY_LOW
            )
        );
    }, [editor]);

    return null;
}
