import wwObject from './wwObject.vue'

const name = "__NAME__";
const version = '__VERSION__';

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.register({
            /* wwManager:start */
            cmsOptions: {
                displayName: {
                    en: 'Form Container',
                    fr: 'Conteneur de Formulaire'
                },
                wwObjectMenu: {
                    items: [{
                        name: 'OPTIONS',
                        text: {
                            en: 'Options...',
                            fr: 'Options...'
                        },
                        icon: 'wwi wwi-edit-other',
                        main: true,
                        action: 'options'
                    }]
                }
            },
            /* wwManager:end */
            content: {
                type: name,
                data: {
                    content: [],
                    config: {
                        weweb: {
                            enabled: true,
                            recipients: [{ address: { email: 'damien@weweb.io' } }]
                        },
                        api: {
                            enabled: false,
                            url: '',
                            method: ''
                        }
                    }
                }
            },
            upsales: {
                wwAnalytics: {
                    click: false
                }
            }
        });

        window.vm.addComponent({
            name: name,
            version: version,
            content: wwObject
        });

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}