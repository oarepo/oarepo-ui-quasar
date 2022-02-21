<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggle"
        />

        <q-toolbar-title> Quasar App</q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="sidebarVisibleInternal" show-if-above bordered>
      <div id="sidebar" class="q-mt-md q-mb-md"></div>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>

import {useSidebar} from "../services/sidebar";

const {sidebarVisibleInternal, toggle} = useSidebar()

</script>
