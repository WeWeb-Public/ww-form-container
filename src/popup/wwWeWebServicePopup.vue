<template>
    <div class="ww-popup-config">
        <div class="content">
            <div class="elem">
                <div class="title">Enabled</div>
                <wwManagerRadio class="radio" v-model="result.wewebService.enabled"></wwManagerRadio>
            </div>

            <div class="elem">
                <div class="title">Recipients</div>
                <div class="email" v-for="(recipient, index) in result.wewebService.recipients" :key="recipient.id">
                    <wwManagerInput class="input" color="green" v-model="recipient.address.email" label="Email"></wwManagerInput>
                    <wwManagerButton class="close" center color="red" @click="removeRecipient(index)">&times;</wwManagerButton>
                </div>
                <wwManagerButton center color="orange" @click="addRecipient">Add recipient</wwManagerButton>
            </div>

        </div>
    </div>
</template>

<script> 
export default {
    name: "wwWeWebServicePopup",
    props: {
        options: {
            type: Object,
            default: function () {
                return {}
            }
        },
    },
    data() {
        return {
            wwObject: this.options.data.wwObject,
            result: {
                wewebService: {
                    enabled: false,
                    recipients: []
                }
            }
        }
    },
    methods: {
        initList (list) {
            const defaultValue = [{ address: { email: '' } }]
            if (!list || !list.length)
                list = defaultValue
            return list
        },
        addRecipient() {
            this.wwObject.content.data.config.weweb.recipients.push({
                address: { email: '' }
            })
        },
        removeRecipient(index) {
            this.wwObject.content.data.config.weweb.recipients.splice(index, 1)
        },
        init() {
            this.wwObject.content.data.config.weweb = this.wwObject.content.data.config.weweb || {}
            this.result.wewebService.enabled = this.wwObject.content.data.config.weweb.enabled || false
            this.result.wewebService.recipients = this.initList(this.wwObject.content.data.config.weweb.recipients)
            this.options.result = this.result
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
        padding: 20px;
        flex-wrap: wrap;
        overflow: auto;
        width: 100%;
        justify-content: center;
        font-family: "Monserrat", sans-serif;
        .elem {
            margin: 20px 33%;
            width: 33%;
            .input {
                width: 100%;
            }
        }
        .title {
            color: #e02a4d;
            font-family: "Monserrat", sans-serif;
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
            }
        }
    }
}
</style>