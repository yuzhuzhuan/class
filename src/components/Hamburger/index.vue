
<template>
    <div
        :class="[{'is-active': isActive}]"
        @click="toggleClick"
    >
        <SpIcon
            icon="bi:text-indent-left"
          />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({
      name: 'Hamburger'
    })
export default class extends Vue {
        @Prop({ default: false }) public isActive!: boolean

        public toggleClick () {
          this.$emit('toggleClick')
        }
}
</script>

<style lang="scss" scoped>
    .svg-icon {
        vertical-align: middle;
    }

    .is-active {
        transform: rotate(180deg);
    }
</style>
