import wwObject from './wwObject.vue'

const name = "__NAME__";
const version = '__VERSION__';

const addComponent = function () {
    if (window.vm) {

        const designName = wwLib.wwWebsiteData.getWebsiteNameFromRoute()
        const designId = wwLib.wwWebsiteData.getInfo().id
        const apiUrl = wwLib.wwApiRequests._getApiUrl()

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
                    }, {
                        name: 'DEFAULT',
                        text: {
                            en: 'Default',
                            fr: 'Défault'
                        },
                        icon: 'far fa-paper-plane',
                        action: 'defaultStatus'
                    }, {
                        name: 'LOADING',
                        text: {
                            en: 'Loading',
                            fr: 'Chargement'
                        },
                        icon: 'fa fa-spinner',
                        action: 'loadingStatus'
                    }, {
                        name: 'SUCCESS',
                        text: {
                            en: 'Success',
                            fr: 'Succes'
                        },
                        icon: 'wwi wwi-check',
                        action: 'successStatus'
                    }, {
                        name: 'ERROR',
                        text: {
                            en: 'Error',
                            fr: 'Erreur'
                        },
                        icon: 'wwi wwi-cross',
                        action: 'errorStatus'
                    }]
                    
                }
            },
            /* wwManager:end */
            content: {
                type: name,
                data: {
                    content: [
                        wwLib.wwObject.getDefault({
                            type: 'ww-form-input',
                            data: {
                                config: {
                                    name: 'email',
                                    type: 'email',
                                    required: true,
                                    placeholder: {
                                      en: 'Email',
                                      fr: 'Entrez une adresse email...'
                                    }
                                }
                            }
                        }),
                        wwLib.wwObject.getDefault({ type: 'ww-form-submit' })
                    ],
                    config: {
                        type: 'weweb-email',
                        name: 'newsletter',
                        autocomplete: true,
                        redirect: {
                            enabled: false
                        },
                        action: `${apiUrl}/design/${designId}/send_form_info`,
                        method: 'POST',
                        headers: [
                            { name: 'Content-Type', value: 'multipart/form-data' }
                        ]
                    },
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