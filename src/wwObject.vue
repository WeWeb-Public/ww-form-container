<template>
    <div class="ww-form">
        <!-- wwManager:start -->
        <wwOrangeButton class="ww-orange-button" v-if="wwObjectCtrl.getSectionCtrl().getEditMode() == 'CONTENT'"></wwOrangeButton>
        <!-- wwManager:end -->
        
        <form :id="wwObject.content.data.config.name" 
            :autocomplete="wwObject.content.data.config.autocomplete" 
            :method="methodForm"
            :action="wwObject.content.data.config.action" 
            :enctype="wwObject.content.data.config.encType"
            :acceptCharset="wwObject.content.data.config.acceptCharset"
            :target="wwObject.content.data.config.target"
            @submit="redirect">
            
            <!-- SPECIFIC METHOD (PUT, PATCH, DELETE, etc...) -->
            <input v-if="wwObject.content.data.config.method !== 'POST'" type="hidden" name="_method" :value="wwObject.content.data.config.method"/>
            
            <!-- WEWEB-EMAIL CONFIGURATION -->
            <span v-if="wwObject.content.data.config.type === 'weweb-email'">
                <input type="hidden" name="ww-type" value="form">
                <input type="hidden" name="ww-from" :value="wwObject.content.data.config.from">
                <input type="hidden" name="ww-recipients" :value="JSON.stringify(wwObject.content.data.config.recipients)">
            </span>

            <!-- FORM CONTENT -->
            <wwLayoutColumn
                tag="div"
                class="ww-obj"
                ww-default="ww-image"
                :ww-list="wwObject.content.data.content"
                @ww-add="add(wwObject.content.data.content, $event)"
                @ww-remove="remove(wwObject.content.data.content, $event)"
            >
                <wwObject v-for="wwObj in wwObject.content.data.content" :key="wwObj.uniqueId" :ww-object="wwObj"></wwObject>
            </wwLayoutColumn>

            <wwObject :ww-object="wwObject.content.data.input"></wwObject>
            <wwObject :ww-object="wwObject.content.data.textarea"></wwObject>
            <wwObject :ww-object="wwObject.content.data.submit"></wwObject>
        </form>
    </div>
</template>

<script>
/* wwManager:start */
// FORM ELELEMTS
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

import wwFormConfigPopup from './popup/wwFormConfigPopup.vue'
wwLib.wwPopups.addPopup('wwFormConfigPopup', wwFormConfigPopup)

wwLib.wwPopups.addStory('WW_FORM_CONFIG_POPUP', {
    title: {
        en: 'Form Configuration',
        fr: `Configuration du formulaire`
    },
    type: 'wwFormConfigPopup',
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

wwLib.wwPopups.addStory('WW_FORM_OPTIONS', {
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
                    en: 'CONFIGURATION',
                    fr: 'CONFIGURATION'
                },
                title: {
                    en: 'Form Configuration',
                    fr: 'Configuration du formulaire'
                },
                desc: {
                    en: '',
                    fr: ''
                },
                icon: 'wwi wwi-config',
                next: 'WW_FORM_CONFIG_POPUP'
            }
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
        return {}
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        target() {
            return '/'+wwLib.wwWebsiteData.getPageRoute(this.wwObject.content.data.config.linkPage)
        },
        methodForm() {
            // Only accept POST and GET
            return this.method === 'POST' || this.method === 'GET' ? this.method : 'POST'
        },
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
        async redirect(data) {
            try {
                this.goToPage(this.wwObject.content.data.config.linkPage)
            } catch (err) {
                wwLib.wwLog.error('ERROR:', err)
            }
        },
        /* wwManager:start */
        async options() {
            let copyObj = JSON.parse(JSON.stringify(this.wwObject)) // to clean
            copyObj.uniqueId += 1
            let options = {
                firstPage: 'WW_FORM_OPTIONS',
                data: {
                    wwObject: copyObj
                }
            }
            try {
                const result = await wwLib.wwPopups.open(options);
                wwLib.wwObjectHover.setLock(this);

                if (typeof (result.config) != 'undefined') {
                    this.wwObject.content.data.config.type = result.config.type
                    if (result.config.type === 'weweb-email') {
                        this.wwObject.content.data.config.recipients = result.config.recipients
                        this.wwObject.content.data.config.from = result.config.from
                    }

                    this.wwObject.content.data.config.name = result.config.name
                    this.wwObject.content.data.config.autocomplete = result.config.autocomplete
                    this.wwObject.content.data.config.action = result.config.action
                    this.wwObject.content.data.config.method = result.config.method

                    this.wwObject.content.data.config.target = result.config.target
                    this.wwObject.content.data.config.encType = result.config.encType
                    this.wwObject.content.data.config.acceptCharset = result.config.acceptCharset
                }

                if (typeof (result.linkPage) != 'undefined') {
                    this.wwObject.content.data.config.linkPage = result.linkPage;
                }
                this.wwObjectCtrl.update(this.wwObject);
            } catch (err) {
                wwLib.wwLog.error('ERROR', err)
            }
            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
    },
    mounted() {
        this.wwObject.content.data.content =  this.wwObject.content.data.content || []
        this.wwObject.content.data.config = this.wwObject.content.data.config || {}

        this.wwObject.content.data.input = wwLib.wwObject.getDefault({
            type: 'ww-form-input'
        })
        this.wwObject.content.data.textarea = wwLib.wwObject.getDefault({
            type: 'ww-form-textarea'
        })
        this.wwObject.content.data.submit = wwLib.wwObject.getDefault({
            type: 'ww-form-submit'
        })
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
    /* wwManager:start */
    .ww-orange-button {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
    /* wwManager:end */
}
</style>
