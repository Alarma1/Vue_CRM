import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import tooltipDirective from '@/directive/tooltip.directive';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin';
import Loader from '@/components/app/Loader';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin)
Vue.use(Vuelidate);
Vue.use(VueMeta)
Vue.filter('date', dateFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective)
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyDmCbripVPeYTpft3f2Sm1uoHarnThckzs",
  authDomain: "work-kk.firebaseapp.com",
  projectId: "work-kk",
  storageBucket: "work-kk.appspot.com",
  messagingSenderId: "771396107516",
  appId: "1:771396107516:web:34f50920e97ecfff96eb79",
  measurementId: "G-1JTWYSPFCC"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router: router,
      store,
      render: (h) => h(App),
    }).$mount('#app')
  }
  })
