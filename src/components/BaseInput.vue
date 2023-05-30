<script setup lang="ts">
    
    defineProps({
        name: {
            type: String
        },
        id: {
            type: String
        },
        label: {
            type: String
        },
        modelValue: {
            type: [String, Number]
        },
        type: {
            type: String
        },
        className: {
            type: String
        },
        placeholder: {
            type: String
        }
    });

    defineEmits(['update:modelValue']);

</script>

<template>
    <div>
        <label v-if="label" :for="id" class="font-bold block">{{ label }}</label>
        <input :type="type" :name="name" :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="className" :placeholder="placeholder" />
    </div>
</template>