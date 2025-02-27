/* eslint-disable no-console */
import React, {useState} from 'react';
import {CustomModal} from './Modal/index';
import {triggerCustomEvent} from '../../utils/customEvents/triggerCustomEvent';
import {useEventListener} from '../../hooks/useEventListener';

export default function DemoFormModal() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        label: '',
        variant: ''
    });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setIsOpen(false);

        triggerCustomEvent({
            eventName: 'demo-button-modal-result',
            data: {
                action: 'open',
                formData
            }
        });
    };

    useEventListener('demo-button-modal', ({action, data}) => {
        if (action === 'open') {
            setIsOpen(true);
        } else if (action === 'close') {
            setIsOpen(false);
        }
    });

    const handleInputChange = fieldName => (event) => {
        const {value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    return isOpen ? (
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="koenig-lexical flex min-h-[400px] w-[700px] flex-col gap-4 rounded-sm bg-white px-6 py-8 shadow lg:gap-6 lg:px-8 lg:py-12">
                <article className='flex w-full flex-col gap-1'>
                    <h2 className='text-xl font-semibold'>Demo Form Form</h2>
                    <p className='text-grey-700' style={{fontSize: '14px', lineHeight: '20px'}}>testes testest testedw dqwdpqwdqwkdwqkdwqdwdwqkdwq dqw</p>
                </article>
                <form className='flex w-full flex-col gap-4' onSubmit={e => handleSubmitForm(e)}>
                    <input className='!border-slate-200 w-full rounded-sm border px-4 py-2 text-sm text-grey-700 outline-none' maxLength={80} minLength={4} placeholder='Insert the label' spellCheck={false} style={{borderColor: '#9CA3AF'}} type='text' onChange={handleInputChange('label')} />
                    <select className='!border-slate-200 text-slate-500 w-full cursor-pointer rounded-sm border px-3.5 py-2.5 text-sm outline-none' placeholder="Default workflow" style={{borderColor: '#9CA3AF', color: '#9CA3AF'}} onChange={handleInputChange('variant')}>
                        <option value="freeMaterial">Green Variant</option>
                        <option value="">Blue Variant</option>
                    </select>
                    <button className='mt-2 w-full cursor-pointer rounded-sm bg-[#3F83F8] px-6 py-2 text-center font-medium text-white transition-all duration-300 hover:brightness-125' style={{fontSize: '16px', lineHeight: '24px'}} type='submit'>
                        Create Component
                    </button>
                </form>
            </div>
        </CustomModal>
    ) : null;
}
