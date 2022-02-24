<template>
  <div class="wrapper">
    <notifications></notifications>
    <sidebar-fixed-toggle-button />
   
    <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
    <!-- <sidebar-share :background-color.sync="sidebarBackground"> </sidebar-share> -->
    <div class="main-panel" >
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import SidebarShare from './SidebarSharePlugin';
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}




import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import SidebarFixedToggleButton from './SidebarFixedToggleButton.vue';
import { ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    DashboardNavbar,
   // ContentFooter,
    //SidebarFixedToggleButton,
   // ZoomCenterTransition,
   // SidebarShare
  },
  data() {
    return {
     // sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    
   
  },
 
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}



@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}


</style>
