import KoenigCardWrapper from '../components/KoenigCardWrapper';
import MarkdownCardIcon from '../assets/icons/kg-card-type-markdown.svg?react';
import React from 'react';
import SnippetIcon from '../assets/icons/kg-card-type-snippet.svg?react';
import {FreeMaterialBannerNodeComponent} from './FreeMaterialBannerNodeComponent';
import {createCommand} from 'lexical';
import {generateDecoratorNode} from '@tryghost/kg-default-nodes/lib/generate-decorator-node';

export const INSERT_FREE_MATERIAL_COMMAND = createCommand();

export class FreeMaterialBannerNode extends generateDecoratorNode({nodeType: 'free-material-banner', properties: []}) {
    __captionEditor;
    __captionEditorInitialState;
    __createdWithUrl;

    static kgMenu = {
        section: 'Custom Elements',
        label: 'Free Materials Banner',
        desc: 'Insert a Free Material Banner card',
        Icon: SnippetIcon,
        insertCommand: INSERT_FREE_MATERIAL_COMMAND,
        queryParams: [],
        matches: ['free-materials', 'banner'],
        priority: 3,
        shortcut: '/free-materials-banner'
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
                <FreeMaterialBannerNodeComponent nodeKey={this.getKey()} />
            </KoenigCardWrapper>
        );
    }
}

export function $createFreeMaterialBannerNode(dataset) {
    return new FreeMaterialBannerNode(dataset);
}

export function $isMarkdownNode(node) {
    return node instanceof FreeMaterialBannerNode;
}
