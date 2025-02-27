export interface CustomEvents {
    'free-material-banner': {
        action: 'open' | 'close'
    },
    'custom-anchor-modal': {
        action: 'open' | 'close'
    },
    'demo-button-modal': {
        action: 'open' | 'close'
    },
    'embed-form-modal': {
        action: 'open' | 'close'
    },
    'free-material-banner-result': {
        action: 'open' | 'close'
        formData: {}
    },
    'custom-anchor-modal-result': {
        action: 'open' | 'close',
        formData: {
            label: string
            url: string
            variant: string
        }
    },
    'demo-button-modal-result': {
        action: 'open' | 'close',
        formData: {
            label: string
            variant: string
        }
    },
    'embed-form-modal-result': {
        action: 'open' | 'close',
        formData: {}
    },
}
