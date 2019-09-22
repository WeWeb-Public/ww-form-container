<template>
    <div class="ww-form">
        <!-- wwManager:start -->
        <wwOrangeButton class="ww-orange-button" v-if="wwObjectCtrl.getSectionCtrl().getEditMode() == 'CONTENT'"></wwOrangeButton>
        <!-- wwManager:end -->
        
        <form @submit="submit" :method="method" :action="action">
            <wwLayoutColumn
                tag="div"
                class="top-ww-obj"
                ww-default="ww-image"
                :ww-list="wwObject.content.data.content"
                @ww-add="add(wwObject.content.data.content, $event)"
                @ww-remove="remove(wwObject.content.data.content, $event)"
            >
                <wwObject v-for="wwObj in wwObject.content.data.content" :key="wwObj.uniqueId" :ww-object="wwObj"></wwObject>
            </wwLayoutColumn>
        </form>
    </div>
</template>

<script>
/* wwManager:start */
import wwWeWebServicePopup from './popup/wwWeWebServicePopup.vue'
wwLib.wwPopups.addPopup('wwWeWebServicePopup', wwWeWebServicePopup)

wwLib.wwPopups.addStory('WWSERVICE_ACTION', {
    title: {
        en: 'WeWeb Email Service',
        fr: `Configuration du service d'email de weweb`
    },
    type: 'wwWeWebServicePopup',
    buttons: {
        OK: {
            text: {
                en: 'Next',
                fr: 'Suivant'
            },
            next: 'LINK_INTERNAL'
        }
    }
})

wwLib.wwPopups.addStory('WW_SERVICE_ACTION_API', {
    title: {
        en: 'Edit API info',
        fr: `Editer les infos de l'API`
    },
    type: 'wwPopupForm',
    storyData: {
        fields: [
            {
                label: {
                    en: 'API URL :',
                    fr: `URL de l'API :`
                },
                desc: {
                    en: 'Form data will be sent to this URL.',
                    fr: 'Les données du formulaire seront envoyées à cette URL.'
                },
                type: 'text',
                key: 'apiUrl',
                valueData: 'wwObject.content.data.button.config.api.url',
                validation: {
                    regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&//=\,]*)$/gi,
                    message: {
                        en: 'URL is in incorrect format.',
                        fr: 'l\'url est dans un format incorrect.',
                    }
                }
            },
            {
                label: {
                    en: 'Method :',
                    fr: 'Méthode :'
                },
                desc: {
                    en: 'Method that will be used to call the API URL',
                    fr: 'Méthode utilisée pour appeler l\'API'
                },
                type: 'select',
                key: 'apiMethod',
                valueData: 'wwObject.content.data.button.config.api.method',
                options: {
                    wwObject: {},
                    values: [
                        {
                            value: 'GET',
                            text: {
                                en: 'GET',
                                fr: 'GET'
                            }
                        },
                        {
                            value: 'POST',
                            default: true,
                            text: {
                                en: 'POST',
                                fr: 'POST'
                            }
                        },
                        {
                            value: 'PUT',
                            text: {
                                en: 'PUT',
                                fr: 'PUT'
                            }
                        },
                        {
                            value: 'PATCH',
                            text: {
                                en: 'PATCH',
                                fr: 'PATCH'
                            }
                        },
                        {
                            value: 'DELETE',
                            text: {
                                en: 'DELETE',
                                fr: 'DELETE'
                            }
                        }
                    ]
                }
            }
        ]
    },
    buttons: {
        OK: {
            text: {
                en: 'Ok',
                fr: 'Valider'
            },
            next: false
        }
    }
})

wwLib.wwPopups.addStory('WWFORM_OPTIONS', {
    title: {
        en: 'Edit Form',
        fr: 'Editer le formulaire'
    },
    type: 'wwPopupEditWwObject',
    buttons: null,
    storyData: {
        list: {
             ACTION_API: {
                separator: {
                    en: 'Actions',
                    fr: 'Actions'
                },
                title: {
                    en: 'Custom API',
                    fr: 'Api personnalisé'
                },
                desc: {
                    en: '',
                    fr: ''
                },
                icon: 'wwi wwi-lang',
                next: 'WW_SERVICE_ACTION_API'
            },
            ACTION_WEWEB: {
                title: {
                    en: 'WeWeb email service',
                    fr: `Service d'email WeWeb`
                },
                desc: {
                    en: '',
                    fr: ''
                },
                icon: 'wwi wwi-newsletter',
                next: 'WWSERVICE_ACTION'
            }
        }
    }
})

wwLib.wwPopups.addStory('WWFORM_ELEMENTS', {
    title: {
        en: 'Select Form element',
        fr: 'Sélectionner un élément de formulaire'
    },
    type: 'wwPopupEditWwObject',
    buttons: null,
    storyData: {
        list: {
            TEXT: {
                separator: {
                    en: 'Inputs',
                    fr: 'Inputs'
                },
                title: {
                    en: 'Text',
                    fr: 'Texte'
                },
                desc: {
                    en: 'Firstname, name, address, etc.',
                    fr: 'Nom, prénom, adresse, etc.'
                },
                icon: 'wwi wwi-text',
                next: 'WWFORM_INPUT_CONFIG'
            },
            EMAIL: {
                title: {
                    en: 'Email',
                    fr: 'Email'
                },
                desc: {
                    en: 'john@doe.com',
                    fr: 'john@doe.com'
                },
                icon: 'wwi wwi-text',
                next: 'WWFORM_INPUT_CONFIG'
            },
            PASSWORD: {
                title: {
                    en: 'Password',
                    fr: 'Mot de passe'
                },
                desc: {
                    en: '**********',
                    fr: '**********'
                },
                icon: 'wwi wwi-text',
                next: 'WWFORM_INPUT_CONFIG'
            },
            PHONE: {
                title: {
                    en: 'Phone',
                    fr: 'Téléphone'
                },
                desc: {
                    en: 'Match format of your choice like 123-45-678',
                    fr: 'Correspond au format de votre choix comme 123-45-678'
                },
                icon: 'wwi wwi-text',
                next: 'WWFORM_INPUT_CONFIG'
            },
            TEXTAREA: {
                title: {
                    en: 'Textarea',
                    fr: 'Zone de texte'
                },
                desc: {
                    en: 'For large texts like messages',
                    fr: 'Pour de grand texte comme des messages'
                },
                icon: 'wwi wwi-text',
                next: 'WWFORM_TEXTAREA_CONFIG'
            },
            NUMBER: {
                title: {
                    en: 'Number',
                    fr: 'Nombre'
                },
                desc: {
                    en: 'To select an integer',
                    fr: 'Pour choisir un nombre'
                },
                // icon: 'wwi wwi-number',
                next: 'WWFORM_INPUT_CONFIG'
            },
            CHECKBOX: {
                separator: {
                    en: 'Selectors',
                    fr: 'Sélecteurs'
                },
                title: {
                    en: 'Checkbox',
                    fr: 'Case à cocher'
                },
                desc: {
                    en: 'To pick a proposition',
                    fr: 'Pour choisir une proposition'
                },
                icon: 'far fa-check-square',
                next: 'WWFORM_CHECKBOX_CONFIG'
            },
            RADIO: {
                title: {
                    en: 'Radio',
                    fr: 'Radio'
                },
                desc: {
                    en: 'To select one proposition',
                    fr: 'Pour choisir une propositions'
                },
                icon: 'far fa-dot-circle',
                next: 'WWFORM_RADIO_CONFIG'
            },
            DROPDOWN: {
                title: {
                    en: 'Dropdown',
                    fr: 'Menu déroulant'
                },
                desc: {
                    en: 'To pick a value from a menu',
                    fr: 'Pour choisir une valeur depuis un menu déroulant'
                },
                icon: 'wwi wwi-chevron-down',
                next: 'WWFORM_DROPDOWN_CONFIG'
            },
            // RANGE: {
            //     title: {
            //         en: 'Range',
            //         fr: ''
            //     },
            //     desc: {
            //         en: 'To select between two values',
            //         fr: 'Pour choisir entre deux valeurs'
            //     },
            //     // next: 'WWFORM_INPUT_CONFIG'
            // },
            DATE: {
                separator: {
                    en: 'Spécific',
                    fr: 'Spécifique'
                },
                title: {
                    en: 'Date',
                    fr: 'Date'
                },
                desc: {
                    en: 'Open a date picker popup',
                    fr: 'Ouvre un sélecteur de date'
                },
                icon: 'far fa-calendar-minus',
                next: 'WWFORM_INPUT_CONFIG'
            },
            TIME: {
                title: {
                    en: 'Time',
                    fr: 'Heure'
                },
                desc: {
                    en: 'Open a time picker popup',
                    fr: `Ouvre un sélecteur d'heure`
                },
                icon: 'far fa-clock',
                next: 'WWFORM_INPUT_CONFIG'
            },
            // FILE: {
            //     title: {
            //         en: 'File',
            //         fr: 'Fichier'
            //     },
            //     desc: {
            //         en: 'Open a upload popup',
            //         fr: 'Ouvrir une popup de téléchargement'
            //     },
            //     icon: 'wwi wwi-image',
            //     // next: 'WWFORM_INPUT_CONFIG'
            // },
            // COLORS: {
            //     title: {
            //         en: 'Colors',
            //         fr: 'Couleurs'
            //     },
            //     desc: {
            //         en: 'Open a color picker',
            //         fr: 'Ouvrir un sélecteur de couleur'
            //     },
            //     icon: 'wwi wwi-color',
            //     // next: 'WWFORM_INPUT_CONFIG'
            // },
            SUBMIT: {
                separator: {
                    en: 'Action',
                    fr: 'Action'
                },
                title: {
                    en: 'Submit Button',
                    fr: `Bouton d'envoies`
                },
                desc: {
                    en: 'To send all the form element data',
                    fr: `Pour envoyer toutes les données d'élément de formulaire`
                },
                icon: 'wwi wwi-button',
                // next: 'WWFORM_SUBMIT_CONFIG'
            },
            CAPTCHA_V2: {
                title: {
                    en: 'Captcha v2 Google',
                    fr: 'Captcha v2 Google'
                },
                desc: {
                    en: 'To prevent robot from sending you a message',
                    fr: 'Pour empêcher des robots de vous envoyer un message'
                },
                icon: 'far fa-square',
                next: 'WWFORM_CAPTCHA_CONFIG'
            },
        }
    }
})
/* wwManager:end */

export default {
    name: "ww-form-container",
    props: {
        wwObjectCtrl: Object,
    },
    data() {
        return {
            designName: wwLib.wwWebsiteData.getWebsiteNameFromRoute(),
            designId: wwLib.wwWebsiteData.getInfo().id,
            apiUrl: wwLib.wwApiRequests._getApiUrl()
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        action() {
            if (this.wwObject.content.data.config &&
                this.wwObject.content.data.config.api &&
                this.wwObject.content.data.config.api.enabled)
                return this.wwObject.content.data.config.api.url
            return 'javascript:void(0);'
        },
        method() {
            if (this.wwObject.content.data.config &&
                this.wwObject.content.data.config.api &&
                this.wwObject.content.data.config.api.enabled)
                return this.wwObject.content.data.config.api.method
            return ''
        }
    },
    methods: {
        /* wwManager:start */
        add(list, options) {
            try {
                list.splice(options.index, 0, options.wwObject);
                this.wwObjectCtrl.update(this.wwObject);
            } catch (error) {
                wwLib.wwLog.error('ERROR : ', error);
            }
        },
        remove(list, options) {
            try {
                list.splice(options.index, 1);
                this.wwObjectCtrl.update(this.wwObject);
            } catch (error) {
                wwLib.wwLog.error('ERROR:', error);
            }
        },
        /* wwManager:end */
        goToPage(pageId) {
            const path = wwLib.wwWebsiteData.getPageRoute(pageId, true) || '/';
            wwLib.$router.push(path);
            this.$emit('next', null);
        },
        async wewebSubmit(formInputs) {
            try {
                const formData = new FormData();
                formData.append('ww-type', 'form');
                formData.append('ww-from', this.designName);
                formData.append('ww-recipients', JSON.stringify(this.wwObject.content.data.config.weweb.recipients));
                let currentSize = 0;
                for (const input of formInputs) {
                    let isError = false
                    if (input.name) {

                        const formElem = {
                            displayName: `${input.name}`,
                            value: input.value
                        }
                        formData.append(formElem.displayName, input.value);
                    }
                }
                await axios.post(`${this.apiUrl}/design/${this.designId}/send_form_info`, formData)
                this.goToPage(this.wwObject.content.data.config.weweb.linkPage);
            } catch (err) {
                wwLib.wwLog.error('ERROR', err)
            }
        },
        async submit(data) {
            try {
                if (this.wwObject.content.data.config.weweb.enabled) {
                    await this.wewebSubmit(data.srcElement)
                }
            } catch (err) {
                wwLib.wwLog.error('ERROR:', err)
            }
        },
        /* wwManager:start */
        async options() {
            let copyObj = JSON.parse(JSON.stringify(this.wwObject)) // to clean
            copyObj.uniqueId += 1
            let options = {
                firstPage: 'WWFORM_OPTIONS',
                data: {
                    wwObject: copyObj,
                }
            }
            try {
                const result = await wwLib.wwPopups.open(options);
                wwLib.wwObjectHover.setLock(this);
                /*=============================================m_ÔÔ_m=============================================\
                  WEWEB SERVICE
                \================================================================================================*/
                this.wwObject.content.data.config = this.wwObject.content.data.config || {};
                this.wwObject.content.data.config.weweb = this.wwObject.content.data.config.weweb || {};
                if (typeof (result.wewebService) != 'undefined') {
                    this.wwObject.content.data.config.api = {};
                    if (typeof (result.wewebService.enabled) != 'undefined') {
                        this.wwObject.content.data.config.weweb.enabled = result.wewebService.enabled;
                    }
                    if (typeof (result.wewebService.recipients) != 'undefined') {
                        this.wwObject.content.data.config.weweb.recipients = result.wewebService.recipients;
                    }
                    if (typeof (result.linkPage) != 'undefined') {
                        this.wwObject.content.data.config.weweb.linkPage = result.linkPage;
                    }
                }
                /*=============================================m_ÔÔ_m=============================================\
                  API SERVICE
                \================================================================================================*/
                this.wwObject.content.data.config.api = this.wwObject.content.data.config.api || {};
                if (typeof (result.apiUrl) != 'undefined' && typeof (result.apiMethod) != 'undefined') {
                    this.wwObject.content.data.config.weweb = {};
                    this.wwObject.content.data.config.api.enabled = true;
                    this.wwObject.content.data.config.api.url = result.apiUrl;
                    this.wwObject.content.data.config.api.method = result.apiMethod;
                }
                this.wwObjectCtrl.update(this.wwObject);
            } catch (err) {
                wwLib.wwLog.error('ERROR', err)
            }
            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
    },
    mounted: function () {
        this.wwObject.content.data.content =  this.wwObject.content.data.content || []
        this.wwObject.content.data.config = this.wwObject.content.data.config || {}

        this.wwObjectCtrl.update(this.wwObject)
        this.$emit('ww-loaded', this);
    }
};
</script>

<style lang="scss" scoped>
.ww-form {
    form {
        width: 100%;
    }
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 50px;
    min-height: 25px;
    .elem-button {
        cursor: pointer;
        position: relative;
        .loading-button {
            opacity: 0;
            visibility: hidden;
        }
        .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: inline-block;
            width: 40px;
            height: 40px;
        }
        .loading:after {
            content: " ";
            display: block;
            width: 30px;
            height: 30px;
            margin: 1px;
            border-radius: 50%;
            border: 3px solid #000;
            border-color: #000 transparent #000 transparent;
            animation: loading 1.2s linear infinite;
        }
    }
    .elem-input {
        width: 100%;
        .input {
            width: 100%;
            outline: none;
        }
        .textarea {
            width: 100%;
            outline: none;
            resize: none;
        }
    }
    .elem-checkbox {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        .checkbox {
            outline: none;
            margin-right: 10px;
        }
        .checkbox-text {
            width: 100%;
        }
    }
    .elem-file {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .input-button {
            cursor: pointer;
            flex-shrink: 0;
            margin-right: 10px;
        }
        input {
            opacity: 0;
            visibility: hidden;
            position: absolute;
        }
    }
    .error-message {
        color: red;
        font-size: 70%;
    }
}
@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.top-ww-objs {
    position: relative;
    padding-top: 20px;
    margin-bottom: 20px;
    .top-ww-obj {
        position: relative;
    }
}

/* wwManager:start */
.ww-orange-button {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    z-index: 1;
}
/* wwManager:end */
</style>
