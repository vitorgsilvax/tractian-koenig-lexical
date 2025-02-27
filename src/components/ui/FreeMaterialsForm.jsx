/* eslint-disable no-console */
import React from 'react';
import {CustomModal} from './Modal/index';
import {triggerCustomEvent} from '../../utils/customEvents/triggerCustomEvent';
import {useEventListener} from '../../hooks/useEventListener';

export default function FreeMaterialsForm() {
    const [generatedListItems, setGeneratedListItems] = React.useState(1);
    const [listItems, setListItems] = React.useState(['']);
    const [isOpen, setIsOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        image: '',
        materialTitle: '',
        materialLink: '',
        materialWorkflow: '',
        materialType: '',
        listItems: [],
        buttonLabel: ''
    });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setIsOpen(false);

        triggerCustomEvent({
            eventName: 'free-material-banner-result',
            data: {
                action: 'open',
                formData
            }
        });
    };

    useEventListener('free-material-banner', ({action, data}) => {
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

    const handleAddListItems = () => {
        if (generatedListItems < 3) {
            setGeneratedListItems(generatedListItems + 1);
            setListItems([...listItems, '']);
        }
    };

    const handleListInputChange = (index, value) => {
        const updatedListItems = [...listItems];
        updatedListItems[index] = value;
        setListItems(updatedListItems);
    };

    return isOpen ? (
        <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="koenig-lexical flex min-h-[400px] w-[700px] flex-col gap-4 rounded-sm bg-white px-6 py-8 shadow lg:gap-6 lg:px-8 lg:py-12">
                <article className='flex w-full flex-col gap-1'>
                    <h2 className='text-xl font-semibold'>Free Material Banner Form</h2>
                    <p className='text-grey-700' style={{fontSize: '14px', lineHeight: '20px'}}>This Free Materials Form Banner serves as a call-to-action to engage users with downloadable resources, such as ebooks, checklists, spreadsheets, or work orders. The banner allows users to select the type of material they want and provides a user-friendly interface for downloading these materials.</p>
                </article>
                <form className='flex w-full flex-col gap-4' onSubmit={e => handleSubmitForm(e)}>
                    <input className='!border-slate-200 w-full rounded-sm border px-4 py-2 text-sm text-grey-700 outline-none' maxLength={80} minLength={4} placeholder='Insert a title' spellCheck={false} style={{borderColor: '#9CA3AF'}} type='text' onChange={handleInputChange('title')} />
                    <input className='!border-slate-200 w-full rounded-sm border px-4 py-2 text-sm text-grey-700 outline-none' maxLength={180} minLength={4} placeholder='Insert a description' spellCheck={false} style={{borderColor: '#9CA3AF'}} type='text' onChange={handleInputChange('description')} />
                    <input className='!border-slate-200 w-full rounded-sm border px-4 py-2 text-sm text-grey-700 outline-none' maxLength={180} minLength={4} placeholder='Insert a label for the download button' spellCheck={false} style={{borderColor: '#9CA3AF'}} type='text' onChange={handleInputChange('buttonLabel')} />
                    <div className='flex w-full flex-col gap-4'>
                        {[...Array(generatedListItems)].map((_, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                            <input key={`generated-item-${index}`} className='!border-slate-200 w-full rounded-sm border px-4 py-2 text-sm text-grey-700 outline-none' maxLength={180} minLength={4} placeholder='Insert a description' spellCheck={false} style={{borderColor: '#9CA3AF'}} type='text' onChange={e => handleListInputChange(index, e.target.value)} />
                        ))}
                        {generatedListItems < 3 ? (
                            <p
                                className="-mt-2 flex cursor-pointer items-start justify-start text-left text-sm text-blue-500 transition-all duration-300 hover:brightness-125"
                                onClick={() => handleAddListItems()}
                            >
                                Click here to add a new bullet point
                            </p>
                        ) : null}
                    </div>
                    <input className='!border-slate-200 w-full rounded-sm border px-4 py-2 text-sm text-grey-700 outline-none' maxLength={180} minLength={4} placeholder='Insert a name for the PDF file' spellCheck={false} style={{borderColor: '#9CA3AF'}} type='text' onChange={handleInputChange('materialTitle')} />
                    <input className='!border-slate-200 w-full rounded-sm border px-4 py-2 text-sm text-grey-700 outline-none' maxLength={180} minLength={4} placeholder='Insert here the link for the banner hero image' spellCheck={false} style={{borderColor: '#9CA3AF'}} type='text' onChange={handleInputChange('image')} />
                    <input className='!border-slate-200 w-full rounded-sm border px-4 py-2 text-sm text-grey-700 outline-none' maxLength={180} minLength={4} placeholder='Material PDF Link' spellCheck={false} style={{borderColor: '#9CA3AF'}} type='text' onChange={handleInputChange('materialLink')}/>
                    <select className='!border-slate-200 w-full cursor-pointer rounded-sm border px-3.5 py-2.5 text-sm text-grey-700 outline-none' placeholder="Select a material type" style={{borderColor: '#9CA3AF', color: '#9CA3AF'}} onChange={handleInputChange('materialType')}>
                        <option>Select a material type</option>
                        <option value="ebook">Ebook</option>
                        <option value="spreadsheet">Spreadsheet</option>
                        <option value="checklist">Checklist</option>
                        <option value="workOrder">Work Order</option>
                    </select>
                    <select className='!border-slate-200 text-slate-500 w-full cursor-pointer rounded-sm border px-3.5 py-2.5 text-sm outline-none' placeholder="Default workflow" style={{borderColor: '#9CA3AF', color: '#9CA3AF'}} onChange={handleInputChange('materialWorkflow')}>
                        <option value="freeMaterial">Default Workflow</option>
                        <option value="">Custom Workflow</option>
                    </select>
                    <button className='mt-2 w-full cursor-pointer rounded-sm bg-[#3F83F8] px-6 py-2 text-center font-medium text-white transition-all duration-300 hover:brightness-125' style={{fontSize: '16px', lineHeight: '24px'}} type='submit'>
                        Create Component
                    </button>
                </form>
            </div>
        </CustomModal>
    ) : null;
}
