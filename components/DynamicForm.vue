<script setup lang="ts"  generic="T extends yup.Maybe<U>, U extends yup.AnyObject, F extends keyof U">
import * as yup from "yup";
// Props
interface DataProp {
  icon: string;
  name: string;
}

const props = defineProps<{
  schema: yup.ObjectSchema<T>,
  disabled?: boolean
  data?: DataProp[]
}>();

const { disabled, schema } = toRefs(props);

const state = reactive<U>({} as U)

// Emits
const emits = defineEmits<{
  (e: "submit", event: U): void;
}>();


// Get Fields
const fields = computed(() => Object.keys(schema.value.fields));

const setField = <F>(name: F, value: any) => {
    state.value[name] = value;
}

const getField = <F>(name: F) : any => {
  return state.value[name];
}

// Submit
const onsubmit = (value: U) => {
  emits('submit', value);
}

</script>

<template>
  <Form :schema="schema" :state="state" @submit="onsubmit" >
    <Field v-for="f in fields" :key="f" :name="f"  >
      <Input :label="f" :model-value="getField(f)" @update:model-value="v => setField(f, v)" />
    </Field>

    <slot name="submit">
      <PrimeButton label="Submit" color="green" severity="success" type="submit" />
    </slot>
  </Form>
</template>

<style lang="scss" scoped>

</style>