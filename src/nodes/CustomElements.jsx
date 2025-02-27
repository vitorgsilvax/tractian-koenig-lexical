/* eslint-disable no-console */
import EmbedCardIcon from '../assets/icons/kg-card-type-other.svg?react';
import React from 'react';
import SnippetIcon from '../assets/icons/kg-card-type-snippet.svg?react';
import {KoenigCardWrapper} from '../index.js';
import {createCommand} from 'lexical';
import {generateDecoratorNode} from '@tryghost/kg-default-nodes/lib/generate-decorator-node.js';

export const INSERT_CUSTOM_ELEMENT_COMMAND = createCommand();

export class CustomElementsNode extends generateDecoratorNode({nodeType: 'custom-elements', properties: []}) {
    __captionEditor;
    __captionEditorInitialState;
    __createdWithUrl;

    static kgMenu = [{
        section: 'Custom Elements',
        label: 'Demo Button',
        desc: 'Insert a Demo Button',
        Icon: SnippetIcon,
        insertCommand: INSERT_CUSTOM_ELEMENT_COMMAND,
        matches: [],
        queryParams: ['url'],
        priority: 100,
        shortcut: '/demo-button'
    },
    {
        section: 'Custom Elements',
        label: 'Anchor',
        desc: 'insert a Anchor',
        Icon: SnippetIcon,
        insertCommand: INSERT_CUSTOM_ELEMENT_COMMAND,
        queryParams: ['url'],
        matches: ['anchor'],
        priority: 1,
        shortcut: '/anchor'
    },
    {
        section: 'Custom Elements',
        label: 'Embed Form',
        desc: 'Insert a Embed Form',
        Icon: SnippetIcon,
        insertCommand: INSERT_CUSTOM_ELEMENT_COMMAND,
        queryParams: [],
        matches: ['form'],
        priority: 4,
        shortcut: '/embed-form'
    }];

    getIcon() {
        return EmbedCardIcon;
    }

    static insertItem(itemLabel) {
        // eslint-disable-next-line no-console
        console.log(`Item clicado: ${itemLabel}`);
    }

    decorate() {
        return (
            <KoenigCardWrapper nodeKey={this.getKey()}>
                <p>teste</p>
            </KoenigCardWrapper>
        );
    }
}

export const $createCustomElementsNode = (dataset) => {
    return new CustomElementsNode(dataset);
};

export function $isCustomElementsNode(node) {
    return node instanceof CustomElementsNode;
}
