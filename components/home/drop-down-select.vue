<template>
    <div class="drop-down">
      <select class="LanguageSelector_dropdown" @change="langSelect" v-model="selected">
        <option value="ru" >Pусский</option>
        <option value="jp" >日本語</option>
        <option value="kr" >한국어</option>
      </select>
    </div>
</template>

<script>
    export default {
        name: "drop-down-select",
        data(){
        return{
          langCode: this.$store.state.locale,
          selected:this.$store.state.locale
        }
      },
      methods: {
        langSelect(){
          window.location.href = window.location.origin +'/'+this.selected;
        }
      }
    }
</script>

<style lang="less" scoped>

.drop-down{
  /*width: 60px;*/
  /*height: 30px;*/
  position: absolute;
  right: 35px;
  top:31%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  cursor: pointer;
  .LanguageSelector_dropdown {
    width: 60px;
    color: #B4B3B3;
    /*padding: .1rem .35rem .1rem .1rem;*/
    padding: 2px 5px 2px 2px;
    border: 1px solid rgba(180, 179, 179, 0.4);
    background-color: #FFFFFF;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: 12px;
    background-image: url('~assets/img/icon_drop_down_arrow.svg');
    background-position: 100%;
    background-repeat: no-repeat;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
