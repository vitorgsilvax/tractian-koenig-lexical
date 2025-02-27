import KoenigCardWrapper from '../components/KoenigCardWrapper';
import MarkdownCardIcon from '../assets/icons/kg-card-type-markdown.svg?react';
import React from 'react';
import SnippetIcon from '../assets/icons/kg-card-type-snippet.svg?react';
import {CustomEmbedFormNodeComponent} from './CustomEmbedFormNodeComponent';
import {createCommand} from 'lexical';
import {generateDecoratorNode} from '@tryghost/kg-default-nodes/lib/generate-decorator-node';

export const INSERT_CUSTOM_EMBED_FORM_COMMAND = createCommand();

export class CustomEmbedFormNode extends generateDecoratorNode({nodeType: 'embed-form', properties: []}) {
    __captionEditor;
    __captionEditorInitialState;
    __createdWithUrl;

    static kgMenu = {
        section: 'Custom Elements',
        label: 'Embed Form',
        desc: 'Insert a new Embed Form',
        Icon: SnippetIcon,
        insertCommand: INSERT_CUSTOM_EMBED_FORM_COMMAND,
        queryParams: [],
        matches: ['embed-form'],
        priority: 4,
        shortcut: 'embed-form'
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
                <CustomEmbedFormNodeComponent nodeKey={this.getKey()} />
            </KoenigCardWrapper>
        );
    }
}

export function $createCustomEmbedFormNode(dataset) {
    return new CustomEmbedFormNode(dataset);
}

export function $isMarkdownNode(node) {
    return node instanceof CustomEmbedFormNode;
}
