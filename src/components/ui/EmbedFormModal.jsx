/* eslint-disable no-console */
import React from 'react';
import {CustomModal} from './Modal/index';
import {useEventListener} from '../../hooks/useEventListener';

export default function EmbedFormModal() {
    const [isOpen, setIsOpen] = React.useState(false);

    useEventListener('embed-form-modal', ({action, data}) => {
        if (action === 'open') {
            setIsOpen(true);
        } else if (action === 'close') {
            setIsOpen(false);
        }
    });

    return isOpen ? (
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="koenig-lexical flex min-h-[400px] w-[700px] flex-col gap-4 rounded-sm bg-white px-6 py-8 shadow lg:gap-6 lg:px-8 lg:py-12">
                <article className='flex w-full flex-col gap-1'>
                    <h2 className='text-xl font-semibold'>Embed Form</h2>
                    <p className='text-grey-700' style={{fontSize: '14px', lineHeight: '20px'}}>testes testest testedw dqwdpqwdqwkdwqkdwqdwdwqkdwq dqw</p>
                </article>
            </div>
        </CustomModal>
    ) : null;
}
