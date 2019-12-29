<template>
  <div class="menu-wrapper">
    <div v-if="!item.hasChild">
      <Menu-item :name="item.menuEng" :to="item.menuUrl">
        <span class="layout-text" >{{item.menuName}}</span>
      </Menu-item>
    </div>
    <Submenu v-else :name="item.menuEng" >
      <template slot="title">
        {{item.menuName}}
      </template>
      <sidebar-item
        v-for="child in item.menuVoList"
        :key="child.path"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </Submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods:{
  }
}
</script>
