<template>
    <div class="ww-form">
        <!-- wwManager:start -->
        <wwOrangeButton class="ww-orange-button" v-if="wwObjectCtrl.getSectionCtrl().getEditMode() == 'CONTENT'"></wwOrangeButton>
        <div class="ww-form-status" :class="status" v-if="wwObjectCtrl.getSectionCtrl().getEditMode() == 'CONTENT'">Form status: {{status}}</div>
        <!-- wwManager:end -->

        <form :id="wwObject.content.data.id" :name="wwObject.content.data.config.name" :autocomplete="wwObject.content.data.config.autocomplete" @submit.prevent="submit" :class="wwObject.content.data.class">
            <!-- FORM CONTENT -->
            <wwLayoutColumn ref="content" tag="div" class="ww-obj" ww-default="ww-image" :ww-list="wwObject.content.data.content" @ww-add="add(wwObject.content.data.content, $event)" @ww-remove="remove(wwObject.content.data.content, $event)" :ww-store-config="storeConfig">
                <wwObject v-for="wwObj in wwObject.content.data.content" :key="wwObj.uniqueId" :ww-object="wwObj"></wwObject>
            </wwLayoutColumn>
        </form>
    </div>
</template>

<script>
/* wwManager:start */
// FORM ELELEMTS
wwLib.wwPopups.addStory("WWFORM_ELEMENTS", {
    title: {
        en: "Select Form element",
        fr: "Sélectionner un élément de formulaire"
    },
    type: "wwPopupList",
    buttons: null,
    storyData: {
        list: {
            SUBMIT: {
                separator: {
                    en: "Action",
                    fr: "Action"
                },
                title: {
                    en: "Submit Button",
                    fr: `Bouton d'envoies`
                },
                desc: {
                    en: "To send all the form element data",
                    fr: `Pour envoyer toutes les données d'élément de formulaire`
                },
                icon: "wwi wwi-button",
                next: null,
                result: {
                    wwObjectType: "ww-form-submit"
                }
            },
            TEXT: {
                separator: {
                    en: "Inputs",
                    fr: "Inputs"
                },
                title: {
                    en: "Text",
                    fr: "Texte"
                },
                desc: {
                    en: "Firstname, name, address, etc.",
                    fr: "Nom, prénom, adresse, etc."
                },
                icon: "wwi wwi-text",
                next: null,
                result: {
                    wwObjectType: "ww-form-input",
                    wwObjectData: {
                        config: {
                            name: "text",
                            type: "text",
                            placeholder: {
                                en: "Enter text...",
                                fr: "Entrez du text..."
                            }
                        }
                    }
                }
            },
            EMAIL: {
                title: {
                    en: "Email",
                    fr: "Email"
                },
                desc: {
                    en: "john@doe.com",
                    fr: "john@doe.com"
                },
                icon: "wwi wwi-newsletter",
                next: null,
                result: {
                    wwObjectType: "ww-form-input",
                    wwObjectData: {
                        config: {
                            name: "email",
                            type: "email",
                            placeholder: {
                                en: "Enter email...",
                                fr: "Entrez une adresse email..."
                            }
                        }
                    }
                }
            },
            PASSWORD: {
                title: {
                    en: "Password",
                    fr: "Mot de passe"
                },
                desc: {
                    en: "**********",
                    fr: "**********"
                },
                icon: "fas fa-key",
                next: null,
                result: {
                    wwObjectType: "ww-form-input",
                    wwObjectData: {
                        config: {
                            name: "password",
                            type: "password",
                            placeholder: {
                                en: "Enter password...",
                                fr: "Entrez un mot de passe..."
                            }
                        }
                    }
                }
            },
            PHONE: {
                title: {
                    en: "Phone",
                    fr: "Téléphone"
                },
                desc: {
                    en: "Match format of your choice like 123-45-678",
                    fr: "Correspond au format de votre choix comme 123-45-678"
                },
                icon: "fas fa-phone",
                next: null,
                result: {
                    wwObjectType: "ww-form-input",
                    wwObjectData: {
                        config: {
                            name: "phone",
                            type: "phone",
                            placeholder: {
                                en: "Enter phone number...",
                                fr: "Entrez un numéro de téléphone..."
                            }
                        }
                    }
                }
            },
            TEXTAREA: {
                title: {
                    en: "Textarea",
                    fr: "Zone de texte"
                },
                desc: {
                    en: "For large texts like messages",
                    fr: "Pour de grand texte comme des messages"
                },
                icon: "fas fa-align-justify",
                next: null,
                result: {
                    wwObjectType: "ww-form-textarea"
                }
            },
            NUMBER: {
                title: {
                    en: "Number",
                    fr: "Nombre"
                },
                desc: {
                    en: "To select an integer",
                    fr: "Pour choisir un nombre"
                },
                icon: "fas fa-square-root-alt",
                next: null,
                result: {
                    wwObjectType: "ww-form-input",
                    wwObjectData: {
                        config: {
                            name: "number",
                            type: "number",
                            placeholder: {
                                en: "Enter a number...",
                                fr: "Entrez un nombre..."
                            }
                        }
                    }
                }
            },
            CHECKBOX: {
                separator: {
                    en: "Selectors",
                    fr: "Sélecteurs"
                },
                title: {
                    en: "Checkbox",
                    fr: "Case à cocher"
                },
                desc: {
                    en: "To pick a proposition",
                    fr: "Pour choisir une proposition"
                },
                icon: "far fa-check-square",
                next: null,
                result: {
                    wwObjectType: "ww-form-checkbox"
                }
            },
            RADIO: {
                title: {
                    en: "Radio",
                    fr: "Radio"
                },
                desc: {
                    en: "To select one proposition",
                    fr: "Pour choisir une propositions"
                },
                icon: "far fa-dot-circle",
                next: null,
                result: {
                    wwObjectType: "ww-form-radio"
                }
            },
            DROPDOWN: {
                title: {
                    en: "Dropdown",
                    fr: "Menu déroulant"
                },
                desc: {
                    en: "To pick a value from a menu",
                    fr: "Pour choisir une valeur depuis un menu déroulant"
                },
                icon: "wwi wwi-chevron-down",
                next: null,
                result: {
                    wwObjectType: "ww-form-dropdown"
                }
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
                    en: "Spécific",
                    fr: "Spécifique"
                },
                title: {
                    en: "Date",
                    fr: "Date"
                },
                desc: {
                    en: "Open a date picker popup",
                    fr: "Ouvre un sélecteur de date"
                },
                icon: "far fa-calendar-minus",
                next: null,
                result: {
                    wwObjectType: "ww-form-input",
                    wwObjectData: {
                        config: {
                            name: "date",
                            type: "date",
                            placeholder: {
                                en: "Enter a date...",
                                fr: "Entrez une date..."
                            }
                        }
                    }
                }
            },
            TIME: {
                title: {
                    en: "Time",
                    fr: "Heure"
                },
                desc: {
                    en: "Open a time picker popup",
                    fr: `Ouvre un sélecteur d'heure`
                },
                icon: "far fa-clock",
                next: null,
                result: {
                    wwObjectType: "ww-form-input",
                    wwObjectData: {
                        config: {
                            name: "time",
                            type: "time",
                            placeholder: {
                                en: "Enter a time...",
                                fr: "Entrez une heure..."
                            }
                        }
                    }
                }
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
            CAPTCHA_V2: {
                title: {
                    en: "Captcha v2 Google",
                    fr: "Captcha v2 Google"
                },
                desc: {
                    en: "To prevent robot from sending you a message",
                    fr: "Pour empêcher des robots de vous envoyer un message"
                },
                icon: "far fa-square",
                next: null,
                result: {
                    wwObjectType: "ww-form-captcha"
                }
            }
        }
    }
});

import wwFormConfigPopup from "./popup/wwFormConfigPopup.vue";
import wwFormIdPopup from "./popup/wwFormIdPopup.vue";
import wwFormClassPopup from "./popup/wwFormClassPopup.vue";
wwLib.wwPopups.addPopup("wwFormConfigPopup", wwFormConfigPopup);
wwLib.wwPopups.addPopup("wwFormIdPopup", wwFormIdPopup);
wwLib.wwPopups.addPopup("wwFormClassPopup", wwFormClassPopup);

wwLib.wwPopups.addStory("WW_FORM_CONFIG_POPUP", {
    title: {
        en: "Form Configuration",
        fr: `Configuration du formulaire`
    },
    type: "wwFormConfigPopup",
    buttons: {
        OK: {
            text: {
                en: "Ok",
                fr: "Valider"
            },
            next: false
        }
    }
});

wwLib.wwPopups.addStory("WW_FORM_ID_POPUP", {
    title: {
        en: "Form Id",
        fr: `Id du formulaire`
    },
    type: "wwFormIdPopup",
    buttons: {
        OK: {
            text: {
                en: "Ok",
                fr: "Valider"
            },
            next: false
        }
    }
});

wwLib.wwPopups.addStory("WW_FORM_CLASS_POPUP", {
    title: {
        en: "Form Class",
        fr: `Class du formulaire`
    },
    type: "wwFormClassPopup",
    buttons: {
        OK: {
            text: {
                en: "Ok",
                fr: "Valider"
            },
            next: false
        }
    }
});

wwLib.wwPopups.addStory("WW_FORM_OPTIONS", {
    title: {
        en: "Edit Form",
        fr: "Editer le formulaire"
    },
    type: "wwPopupEditWwObject",
    buttons: null,
    storyData: {
        list: {
            ACTION_API: {
                separator: {
                    en: "CONFIGURATION",
                    fr: "CONFIGURATION"
                },
                title: {
                    en: "Form Configuration",
                    fr: "Configuration du formulaire"
                },
                desc: {
                    en: "",
                    fr: ""
                },
                icon: "wwi wwi-config",
                next: "WW_FORM_CONFIG_POPUP"
            },
            ID: {
                title: {
                    en: "Form Id",
                    fr: "Id du formulaire"
                },
                desc: {
                    en: "Edit the attribute ID",
                    fr: "Modifier l'attribut ID"
                },
                icon: "wwi wwi-icon",
                next: "WW_FORM_ID_POPUP"
            },
            CLASS: {
                title: {
                    en: "Form Class",
                    fr: "Classes du formulaire"
                },
                desc: {
                    en: "Edit the class list",
                    fr: "Modifier la liste de classe"
                },
                icon: "wwi wwi-edit",
                next: "WW_FORM_CLASS_POPUP"
            }
        }
    }
});
/* wwManager:end */

export default {
    name: "ww-form-container",
    props: {
        wwObjectCtrl: Object
    },
    data() {
        return {
            status: "default",
            storeConfig: {
                additionalOptions: {
                    WWFORM_SUBMIT: {
                        separator: {
                            en: "Form elements",
                            fr: "Elements de formulaire"
                        },
                        title: {
                            en: "Form elements",
                            fr: "Elements de formulaire"
                        },
                        icon: "wwi wwi-newsletter",
                        shortcut: "s",
                        next: "WWFORM_ELEMENTS"
                    }
                }
            }
        };
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        }
    },
    mounted() {
        this.init();
        this.$emit("ww-loaded", this);
    },
    methods: {
        init() {
            this.wwObject.content.data.content = this.wwObject.content.data.content || [];
            this.wwObject.content.data.config = this.wwObject.content.data.config || {};

            this.migrateData();
            this.wwObjectCtrl.update(this.wwObject);
        },
        migrateData() {
            /* wwManager:start */
            if (this.wwObject.content.data.config.type === "weweb-email") {
                const designName = wwLib.wwWebsiteData.getWebsiteNameFromRoute();
                this.wwObject.content.data.config.recipients = this.wwObject.content.data.config.recipients || [{ address: { email: wwLib.$store.getters["manager/getUser"].email } }];
                this.wwObject.content.data.config.hiddenData = [
                    { name: "ww-type", value: "form" },
                    { name: "ww-from", value: designName },
                    { name: "ww-recipients", value: JSON.stringify(this.wwObject.content.data.config.recipients) },
                    { name: "ww-color", value: this.wwObject.content.data.config.color || "#ce003b" }
                ];
            } else {
                this.wwObject.content.data.config.hiddenData = this.wwObject.content.data.config.hiddenData || [];
            }
            /* wwManager:end */
            if (!this.wwObject.content.data.config.headers) {
                this.wwObject.content.data.config.headers = [{ name: "Content-Type", value: this.wwObject.content.data.config.encType }];
            }
            if (!this.wwObject.content.data.config.redirect) {
                this.wwObject.content.data.config.redirect = {
                    enabled: true,
                    linkPage: this.wwObject.content.data.config.linkPage
                };
            }
            if (this.wwObject.content.data.isNew) {
                this.wwObject.content.data.content = [
                    wwLib.wwObject.getDefault({
                        type: "ww-form-input",
                        data: {
                            config: {
                                name: "email",
                                type: "email",
                                required: true,
                                placeholder: {
                                    en: "Email",
                                    fr: "Entrez une adresse email..."
                                }
                            }
                        }
                    }),
                    wwLib.wwObject.getDefault({ type: "ww-form-submit" })
                ];

                const designId = wwLib.wwWebsiteData.getInfo().id;
                const apiUrl = wwLib.wwApiRequests._getApiUrl();
                this.wwObject.content.data.config.action = this.wwObject.content.data.config || `${apiUrl}/design/${designId}/send_form_info`;

                delete this.wwObject.content.data.isNew;
            }
        },
        defaultStatus() {
            this.status = "default";
            wwLib.$emit(`ww-form-status`, this.status);
            this.wwObjectCtrl.update(this.wwObject);
        },
        loadingStatus() {
            this.status = "loading";
            wwLib.$emit(`ww-form-status`, this.status);
            this.wwObjectCtrl.update(this.wwObject);
        },
        successStatus() {
            this.status = "success";
            wwLib.$emit(`ww-form-status`, this.status);
            this.wwObjectCtrl.update(this.wwObject);
        },
        errorStatus() {
            this.status = "error";
            wwLib.$emit(`ww-form-status`, this.status);
            this.wwObjectCtrl.update(this.wwObject);
        },
        goToPage(pageId) {
            wwLib.wwLinkPopups.closeAll();
            const path = wwLib.wwWebsiteData.getPageRoute(pageId, true) || "/";
            wwLib.$router.push(path);
            this.$emit("next", null);
        },
        async submit(form) {
            try {
                // CHANGE STATUS
                this.loadingStatus();

                // INIT DATA
                const headers = {};
                const data = new FormData();

                // ADD HEADERS REQUEST
                for (const elem of this.wwObject.content.data.config.headers) {
                    headers[elem.name] = elem.value;
                }
                // ADD HIDDEN DATA REQUEST
                for (const elem of this.wwObject.content.data.config.hiddenData) {
                    data.append(elem.name, elem.value);
                }
                // ADD DATA REQUEST
                for (const elem of form.srcElement.elements) {
                    if (elem.nodeName === "INPUT" || elem.nodeName === "TEXTAREA" || elem.nodeName === "SELECT") {
                        data.append(elem.name, elem.value);
                    }
                }
                // ADD QUERY VAR
                for (const elem of this.wwObject.content.data.config.queryVar) {
                    const value = this.$route.query[elem];
                    if (value) data.append(elem, value);
                }

                // REQUEST
                await axios({
                    method: this.wwObject.content.data.config.method || "POST",
                    url: this.wwObject.content.data.config.action,
                    data,
                    headers
                });

                //RUN JS
                if (this.wwObject.content.data.config.js && this.wwObject.content.data.config.js.length) {
                    eval(this.wwObject.content.data.config.js);
                }

                // REDIRECT
                if (this.wwObject.content.data.config.redirect.enabled) {
                    this.goToPage(this.wwObject.content.data.config.redirect.linkPage);
                }

                // CHANGE STATUS
                this.successStatus();
            } catch (err) {
                // CHANGE STATUS
                this.errorStatus();
                wwLib.wwLog.error("ERROR:", err);
            }
        },
        /* wwManager:start */
        add(list, options) {
            try {
                list.splice(options.index, 0, options.wwObject);
                this.wwObjectCtrl.update(this.wwObject);
            } catch (error) {
                wwLib.wwLog.error("ERROR : ", error);
            }
        },
        remove(list, options) {
            try {
                list.splice(options.index, 1);
                this.wwObjectCtrl.update(this.wwObject);
            } catch (error) {
                wwLib.wwLog.error("ERROR:", error);
            }
        },
        async options() {
            let copyObj = JSON.parse(JSON.stringify(this.wwObject)); // to clean
            copyObj.uniqueId += 1;
            let options = {
                firstPage: "WW_FORM_OPTIONS",
                data: {
                    wwObject: copyObj
                }
            };
            try {
                const result = await wwLib.wwPopups.open(options);
                wwLib.wwObjectHover.setLock(this);

                if (typeof result.config != "undefined") {
                    this.wwObject.content.data.config.type = result.config.type;
                    if (result.config.type === "weweb-email") {
                        this.wwObject.content.data.config.recipients = result.config.recipients;
                        this.wwObject.content.data.config.color = result.config.color;
                    }

                    this.wwObject.content.data.config.name = result.config.name;
                    this.wwObject.content.data.config.autocomplete = result.config.autocomplete;
                    this.wwObject.content.data.config.action = result.config.action;
                    this.wwObject.content.data.config.method = result.config.method;
                    this.wwObject.content.data.config.headers = result.config.headers;
                    this.wwObject.content.data.config.hiddenData = result.config.hiddenData;
                    this.wwObject.content.data.config.redirect = result.config.redirect;
                    this.wwObject.content.data.config.queryVar = result.config.queryVar;
                    this.wwObject.content.data.config.js = result.config.js;

                    console.log(this.wwObject.content.data.config.js);
                }
                if (typeof result.id != "undefined") {
                    this.wwObject.content.data.id = result.id;
                }
                if (typeof result.class != "undefined") {
                    this.wwObject.content.data.class = result.class;
                }
                this.wwObjectCtrl.update(this.wwObject);
            } catch (err) {
                wwLib.wwLog.error("ERROR", err);
            }
            wwLib.wwObjectHover.removeLock();
        }
        /* wwManager:end */
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
    .ww-form-status {
        position: absolute;
        top: 0;
        left: 20px;
        transform: translate(0%, -50%);
        z-index: 1;
        color: white;
        padding: 2px 5px;
        border-radius: 2px;
        font-size: 12px;
        background-image: linear-gradient(90deg, #2e85c2, #1763a9);
        &.error {
            background: linear-gradient(90deg, #e02a4d 0, #ce003b);
        }
        &.success {
            background-image: linear-gradient(90deg, #49b9b3, #19947c);
        }
        &.loading {
            background: linear-gradient(90deg, #ea5e1c 0, #ef811a);
        }
    }
    /* wwManager:end */
}
</style>
