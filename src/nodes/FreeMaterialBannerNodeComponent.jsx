import React, {useState} from 'react';
import {triggerCustomEvent} from '../utils/customEvents/triggerCustomEvent';
import {useEventListener} from '../hooks/useEventListener';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export function FreeMaterialBannerNodeComponent({nodeKey}) {
    const [editor] = useLexicalComposerContext();

    const [bannerData, setBannerData] = useState(null);
    const [isFormCompleted, setIsFormCompleted] = useState(false);

    React.useEffect(() => {
        triggerCustomEvent({
            eventName: 'free-material-banner',
            data: {
                action: 'open'
            }
        });
    }, [nodeKey, editor]);

    useEventListener('free-material-banner-result', ({action, formData}) => {
        if (action === 'open') {
            setIsFormCompleted(true);
        } else if (action === 'close') {
            setIsFormCompleted(false);
        }

        setBannerData(formData);
    });

    return isFormCompleted ? <div className="border-slate-100 bg-slate-50 flex flex-col justify-between gap-4 overflow-hidden rounded-sm border p-4 shadow lg:aspect-[12/4] lg:flex-row">
        <div className="flex w-full flex-1 flex-col gap-4">
            <div className="font-semibold">{bannerData.title}</div>
            <div className="text-sm">{bannerData.description}</div>
            <div className="flex list-none flex-col justify-center gap-2">
                {bannerData.listItems.map((paragraph, index) => (
                    <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={`paragraph-${index}`}
                        className="flex list-none items-center gap-2"
                    >
                        <svg
                            fill="none"
                            height="16"
                            viewBox="0 0 16 16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_8210_15490)">
                                <path
                                    d="M7.99987 0.533203C3.86654 0.533203 0.533203 3.86654 0.533203 7.99987C0.533203 12.1332 3.86654 15.4665 7.99987 15.4665C12.1332 15.4665 15.4665 12.1332 15.4665 7.99987C15.4665 3.86654 12.1332 0.533203 7.99987 0.533203ZM7.99987 14.5332C4.39987 14.5332 1.46654 11.5999 1.46654 7.99987C1.46654 4.39987 4.39987 1.46654 7.99987 1.46654C11.5999 1.46654 14.5332 4.39987 14.5332 7.99987C14.5332 11.5999 11.5999 14.5332 7.99987 14.5332ZM11.4665 5.06654L12.1999 5.79987L6.7332 11.2665L3.79987 8.3332L4.5332 7.59987L6.7332 9.79987L11.4665 5.06654Z"
                                    fill="#2563EB"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_8210_15490">
                                    <rect fill="#2563EB" height="16" width="16" />
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="text-sm text-[#2563eb]">{paragraph}</div>
                    </div>
                ))}
            </div>
            <div
                className="banner-button text-slate-50 w-full max-w-fit cursor-pointer rounded-sm bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2 text-sm font-semibold tracking-wide transition ease-in-out hover:brightness-[115%] disabled:cursor-not-allowed disabled:opacity-60"
                data-src={bannerData.materialLink}
                data-title={bannerData.materialTitle}
                data-type={bannerData.materialType}
                data-workflow={bannerData.workflow}
            >
                {bannerData.buttonLabel}
            </div>
        </div>
        <div className="hidden w-full max-w-[340px] items-center justify-center p-4 lg:flex">
            <img
                alt="Free Material Banner"
                src={bannerData.image}
            />
        </div>
    </div> : null;
}
