<template>
    <el-row :gutter="48" class="h-full">
        <el-col :span="12">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium interdum
                sodales. Cras eget arcu fermentum, tincidunt ex nec, commodo justo. Etiam ultricies
                blandit mi non pharetra. Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
            </p>
        </el-col>
        <el-col :span="12" class="flex">
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                label-width="auto"
                :rules="rules"
                :label-position="labelPosition"
                :size="size"
                class="w-full"
            >
                <el-form-item label="Email">
                    <el-input v-model="ruleForm.email" size="large" />
                </el-form-item>
                <el-form-item label="N° de commande">
                    <el-input v-model="ruleForm.order" size="large" />
                </el-form-item>
                <el-form-item label="Raison">
                    <el-input v-model="ruleForm.subject" size="large" />
                </el-form-item>
                <el-form-item label="Mesage">
                    <el-input
                        v-model="ruleForm.message"
                        type="textarea"
                        :autosize="{ minRows: 14, maxRows: 14 }"
                        resize="none"
                    />
                </el-form-item>
                <div class="flex justify-end">
                    <el-button type="primary" size="large" class="button" @click="onSubmit"
                        >Envoyer le message</el-button
                    >
                </div>
            </el-form></el-col
        >
    </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormProps, FormInstance, FormRules } from 'element-plus'

const size = ref<ComponentSize>('default')
const labelPosition = ref<FormProps['labelPosition']>('right')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    email: '',
    order: '',
    subject: '',
    message: '',
})

interface RuleForm {
    email: string
    order: string
    subject: string
    message: string
}
const rules = reactive<FormRules<RuleForm>>({
    email: [
        { required: true, message: 'Email obligatoire', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    order: [
        { required: true, message: 'Email obligatoire', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
})

function onSubmit() {
    console.log('submit!')
}
</script>

<style>
.el-radio-group {
    margin-right: 12px;
}

.button {
    border-radius: 12px !important;
}
.el-input {
    --el-input-border-color: transparent;
    --el-input-border-radius: 12px;
    --el-input-bg-color: #f1f1f1;
}
.el-textarea__inner {
    background-color: #f1f1f1;
    box-shadow: none;
    --el-input-border-radius: 12px;
}
</style>
