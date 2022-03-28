<template>
  <div>
    <Loader v-if="loading" />
  <div class="app-main-layout">

    <NavBar @click="isOpen = !isOpen" />

    <SideBar v-model="isOpen" :key="locale"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Create a new entry'">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
import NavBar from '@/components/app/NavBar.vue';
import SideBar from '@/components/app/SideBar.vue';
import messages from '@/utils/messages';
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!this.$store.getters.info.bill || !this.$store.getters.info.name) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  components: {
    NavBar, SideBar
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || localizeFilter('Something went wrong'))
    }
  }
};
</script>
