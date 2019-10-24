<template>
    <div class="ww-popup-config">
        <!-- DEFAULT CONFIGURATION -->
        <div class="content">
            <div class="elem">
                <div class="title">Form Name</div>
                <wwManagerInput class="input" :color="getInputColor(result.config.name, 'green')" v-model="result.config.name" label="Name (ex: newsletter, etc...)"></wwManagerInput>
            </div>
            <div class="elem">
                <div class="title">Autocomplete</div>
                <wwManagerRadio :value="result.config.autocomplete" @change="result.config.autocomplete = $event"></wwManagerRadio>
            </div>
            <div class="elem">
                <div class="title">Form Preset</div>
                <wwManagerSelect :options="typeOptions" :value="type" @change="type = $event"></wwManagerSelect>
            </div>
        </div>
        <!-- WEWEB-EMAIL CONFIGURATION -->
        <div class="content" v-if="result.config.type === 'weweb-email'">
            <div class="elem" >
                <div class="title">Recipients</div>
                <div class="email" v-for="(recipient, index) in result.config.recipients" :key="recipient.id">
                    <wwManagerInput class="input" :color="getInputColor(recipient.address.email, 'green')" v-model="recipient.address.email" :validation="validateEmail" label="Email"></wwManagerInput>
                    <wwManagerButton class="close" center color="red" @click="removeRecipient(index)">&times;</wwManagerButton>
                </div>
                <wwManagerButton class="add-recipient" center color="blue" @click="addRecipient">Add recipient</wwManagerButton>
            </div>
        </div>
        <!-- CUSTOM-API CONFIGURATION -->
        <div class="content" v-else-if="result.config.type === 'custom-api'">
            <div class="elem">
                <div class="title">Method</div>
                <wwManagerSelect :options="methodOptions" :value="result.config.method" @change="result.config.method = $event"></wwManagerSelect>
            </div>
            <div class="elem">
                <div class="title">Api Url</div>
                <wwManagerInput class="input" :color="getInputColor(result.config.action, 'green')" v-model="result.config.action" label="Url" :validation="validateUrl"></wwManagerInput>
            </div>
            <div class="elem">
                <div class="title">Target</div>
                <wwManagerSelect :options="targetOptions" :value="result.config.target" @change="result.config.target = $event"></wwManagerSelect>
            </div>
            <div class="elem">
                <div class="title">Enctype</div>
                <wwManagerSelect :options="encTypeOptions" :value="result.config.enctype" @change="result.config.enctype = $event"></wwManagerSelect>
            </div>
            <div class="elem">
                <div class="title">Accept Charset</div>
                <wwManagerInput class="input" color="blue" v-model="result.config.acceptCharset" label="accept-charset"></wwManagerInput>
            </div>
        </div>
    </div>
</template>

<script> 
export default {
    name: "wwFormConfigPopup",
    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            // WEBSITE DATA
            designName: wwLib.wwWebsiteData.getWebsiteNameFromRoute(),
            designId: wwLib.wwWebsiteData.getInfo().id,
            apiUrl: wwLib.wwApiRequests._getApiUrl(),
            // WWOBJECT
            wwObject: this.options.data.wwObject,
            // DATA
            type: '',
            result: {
                config: {
                    name: '',
                    autocomplete: true,
                    type: 'weweb-email',
                    action: '',
                    method: '',
                    target: '',
                    enctype: '',
                    acceptCharset: '',
                    recipients: []
                }
            },
            // SELECT OPTIONS
            typeOptions: {
                type: 'text',
                values: [{
                    value: 'weweb-email',
                    default: true,
                    text: {
                        en: 'Weweb email service',
                        fr: `Service d'email Weweb`
                    }
                }, {
                    value: 'custom-api',
                    text: {
                        en: 'Custom Api',
                        fr: 'Api personnalisé'
                    }
                }]
            },
            methodOptions: {
                type: 'text',
                values: [{
                    value: 'GET',
                    text: {
                        en: 'GET',
                        fr: 'GET'
                    }
                }, {
                    value: 'POST',
                    default: true,
                    text: {
                        en: 'POST',
                        fr: 'POST'
                    }
                }, {
                    value: 'PUT',
                    text: {
                        en: 'PUT',
                        fr: 'PUT'
                    }
                }, {
                    value: 'PATCH',
                    text: {
                        en: 'PATCH',
                        fr: 'PATCH'
                    }
                }, {
                    value: 'DELETE',
                    text: {
                        en: 'DELETE',
                        fr: 'DELETE'
                    }
                }]
            },
            encTypeOptions: {
                type: 'text',
                values: [{
                    value: 'application/x-www-form-urlencoded',
                    default: true,
                    text: {
                        en: 'application/x-www-form-urlencoded',
                        fr: 'application/x-www-form-urlencoded'
                    }
                }, {
                    value: 'multipart/form-data',
                    text: {
                        en: 'multipart/form-data',
                        fr: 'multipart/form-data'
                    }
                }, {
                    value: 'text/plain',
                    text: {
                        en: 'text/plain',
                        fr: 'text/plain'
                    }
                }]
            },
            targetOptions: {
                type: 'text',
                values: [{
                    value: '_self',
                    default: true,
                    text: {
                        en: 'self',
                        fr: 'self'
                    }
                }, {
                    value: '_parent',
                    text: {
                        en: 'parent',
                        fr: 'parent'
                    }
                }, {
                    value: '_top',
                    text: {
                        en: 'top',
                        fr: 'top'
                    }
                }, {
                    value: '_blank',
                    text: {
                        en: 'blank',
                        fr: 'blank'
                    }
                }]
            },
            // INPUT VALISATION
            validateUrl: {
                regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&//=\,]*)$/gi,
                message: {
                    en: 'URL is in incorrect format.',
                    fr: 'L\'url est dans un format incorrect.',
                }
            },
            validateEmail: {
                regex: /^$/gi,
                message: {
                    en: 'Email is in incorrect format.',
                    fr: 'L\'email est dans un format incorrect.',
                }
            }
        }
    },
    watch: {
        type() {
            this.result.config.type = this.type
            if (this.type === 'weweb-email') { // WEWEB-EMAIL CONFIGURATION
                this.result.config.action = `${this.apiUrl}/design/${this.designId}/send_form_info`
                this.result.config.method = 'POST'
                this.result.config.encType = 'multipart/form-data'
                this.result.config.recipients = this.result.config.recipients || []
                this.result.config.from = this.designName
                this.result.config.target = '_self'
            } else { // DEFAULT CONFIGURATION
                this.result.config.action = ''
                this.result.config.method = ''
                this.result.config.enctype = ''
                this.result.config.acceptCharset = ''
                this.result.config.target = ''
            }
        }
    },
    methods: {
        // INIT CONFIGURATION
        init() {
            // DEFAULT CONFIGURATION
            this.wwObject.content.data.config = this.wwObject.content.data.config || {}
            this.result.config.type = this.wwObject.content.data.config.type || this.result.config.type
            this.result.config.name = this.wwObject.content.data.config.name || this.result.config.name
            this.result.config.autocomplete = this.wwObject.content.data.config.autocomplete || this.result.config.autocomplete
            this.result.config.action = this.wwObject.content.data.config.action || this.result.config.action
            this.result.config.method = this.wwObject.content.data.config.method || this.result.config.method
            this.result.config.target = this.wwObject.content.data.config.target || this.result.config.target
            this.result.config.enctype = this.wwObject.content.data.config.enctype || this.result.config.enctype
            this.result.config.acceptCharset = this.wwObject.content.data.config.acceptCharset || this.result.config.acceptCharset

            // WEWEB-EMAIL CONFIGURATION
            this.result.config.recipients = this.initList(this.wwObject.content.data.config.recipients)
            
            this.options.result = this.result
            this.type = this.result.config.type
        },
        // WEWEB-EMAIL CONFIGURATION
        initList(list) {
            const defaultValue = [{ address: { email: '' } }]
            if (!list || !list.length)
                list = defaultValue
            return list
        },
        addRecipient() {
            this.result.config.recipients.push({
                address: { email: '' }
            })
        },
        removeRecipient(index) {
            this.result.config.recipients.splice(index, 1)
        },
        // UTILS
        getInputColor(inputValue, defaultColor = 'green') {
            return (inputValue) ? defaultColor : 'orange'
        }
    },
    created() {
        this.init()
    },
    beforeDestroy() {
    }
};
</script>

<style scoped lang="scss">
.ww-popup-config {
    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        overflow: auto;
        width: 90%;
        margin: 10px auto;
        .elem {
            margin: 10px auto;
            width: 100%;
            .input {
                width: 100%;
            }
        }
        .title {
            color: #e02a4d;
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .email {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            .close {
                margin-left: 10px;
                font-size: 25px;
                .content {
                    padding: 0px 10px;
                }   
            }
        }
    }
}

@media (min-width: 1024px) {
    .ww-popup-config {
        .content {
            width: 40%;
        }
    }
}
</style>