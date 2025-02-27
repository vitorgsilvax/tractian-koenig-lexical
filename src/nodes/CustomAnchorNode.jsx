import KoenigCardWrapper from '../components/KoenigCardWrapper';
import MarkdownCardIcon from '../assets/icons/kg-card-type-markdown.svg?react';
import React from 'react';
import SnippetIcon from '../assets/icons/kg-card-type-snippet.svg?react';
import {CustomAnchorNodeComponent} from './CustomAnchorNodeComponent';
import {createCommand} from 'lexical';
import {generateDecoratorNode} from '@tryghost/kg-default-nodes/lib/generate-decorator-node';

export const INSERT_CUSTOM_ANCHOR_COMMAND = createCommand();

export class CustomAnchorNode extends generateDecoratorNode({nodeType: 'anchor', properties: []}) {
    __captionEditor;
    __captionEditorInitialState;
    __createdWithUrl;

    static kgMenu = {
        section: 'Custom Elements',
        label: 'Anchor',
        desc: 'Insert a Anchor Link',
        Icon: SnippetIcon,
        insertCommand: INSERT_CUSTOM_ANCHOR_COMMAND,
        queryParams: [],
        matches: ['anchor'],
        priority: 2,
        shortcut: 'anchor'
    };

    getIcon() {
        return MarkdownCardIcon;
    }

    constructor(dataset = {}, key) {
        // eslint-disable-next-line no-console
        super(dataset, key);
    }

    static insertItem(itemLabel) {
        // eslint-disable-next-line no-console
        console.log(`Item clicado: ${itemLabel}`);
    }

    decorate() {
        return (
            <KoenigCardWrapper
                nodeKey={this.getKey()}
            >
                <CustomAnchorNodeComponent nodeKey={this.getKey()} />
            </KoenigCardWrapper>
        );
    }
}

export function $createCustomAnchorNode(dataset) {
    return new CustomAnchorNode(dataset);
}

export function $isMarkdownNode(node) {
    return node instanceof CustomAnchorNode;
}
