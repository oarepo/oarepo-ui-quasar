<template>
  <router-view/>
</template>
<script lang="ts" setup>
import {useUIContext} from "../api/ui_context";

const {load} = useUIContext()
load('default')
</script>