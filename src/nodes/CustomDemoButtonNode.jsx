import KoenigCardWrapper from '../components/KoenigCardWrapper';
import MarkdownCardIcon from '../assets/icons/kg-card-type-markdown.svg?react';
import React from 'react';
import SnippetIcon from '../assets/icons/kg-card-type-snippet.svg?react';
import {CustomDemoButtonNodeComponent} from './CustomDemoButtonNodeComponent';
import {createCommand} from 'lexical';
import {generateDecoratorNode} from '@tryghost/kg-default-nodes/lib/generate-decorator-node';

export const INSERT_CUSTOM_DEMO_BUTTON_COMMAND = createCommand();

export class CustomDemoButtonNode extends generateDecoratorNode({nodeType: 'demo-button', properties: []}) {
    __captionEditor;
    __captionEditorInitialState;
    __createdWithUrl;

    static kgMenu = {
        section: 'Custom Elements',
        label: 'Demo Button',
        desc: 'Insert a Demo Button',
        Icon: SnippetIcon,
        insertCommand: INSERT_CUSTOM_DEMO_BUTTON_COMMAND,
        queryParams: [],
        matches: ['demo-button'],
        priority: 1,
        shortcut: 'demo-button'
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
                <CustomDemoButtonNodeComponent nodeKey={this.getKey()} />
            </KoenigCardWrapper>
        );
    }
}

export function $createCustomDemoButtonNode(dataset) {
    return new CustomDemoButtonNode(dataset);
}

export function $isMarkdownNode(node) {
    return node instanceof CustomDemoButtonNode;
}
