import React, {Fragment, cloneElement} from 'react';

import {Dialog, Transition} from '@headlessui/react';

import {ModalProps} from './types';

export const CustomModal: React.FC<ModalProps> = ({
    isOpen,
    setIsOpen,
    dismissible = true,
    hideCloseButton,
    zIndex = 'z-[99999999]',
    children,
    fullScreen,
    onlyMobileFullScreen,
    onClose
}) => {
    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        if (dismissible) {
            setIsOpen(false);
        }
    };

    return (
        <Transition as={Fragment} show={isOpen} appear>
            <Dialog
                as="div"
                className={`koenig-lexical relative shadow`}
                style={{zIndex: 9999999999}}
                onClose={handleCloseModal}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-default"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-default"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="bg-slate-800 fixed inset-0 h-screen w-screen"
                        style={{backgroundColor: '#39404773'}}
                    />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div
                        className={`flex min-h-full items-center justify-center ${fullScreen || onlyMobileFullScreen ? '' : 'p-4'} ${onlyMobileFullScreen ? 'lg:p-4' : ''}`}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-default"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-default"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative w-full shadow-xl transition-all md:w-auto">
                                {dismissible && !hideCloseButton && (
                                    <div className="absolute right-3 top-3 z-50">
                                        <button
                                            aria-label="close-modal"
                                            className="duration-default hover:bg-slate-200 hover:text-slate-800 w-7 cursor-pointer rounded-sm p-1 text-grey-700"
                                            type="button"
                                            onClick={handleCloseModal}
                                        >
                                            X
                                        </button>
                                    </div>
                                )}
                                {cloneElement(children, {
                                    className: `${children?.props?.className ?? ''} ${
                                        fullScreen
                                            ? 'min-h-screen w-screen'
                                            : ''
                                    } ${onlyMobileFullScreen ? 'min-h-screen w-screen lg:min-h-fit lg:w-fit' : ''}`
                                })}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
