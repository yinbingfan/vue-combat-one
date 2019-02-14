<template>
    <div>
      <loading v-if="loading"/>
      <intermediate-content/>
    </div>
</template>

<script>
  import intermediateContent from '~/components/common/intermediate-content.vue'
  import loading from '~/components/common/loading.vue'
    export default {
        name: "intermediate_page",
        components: {
          intermediateContent,
          loading
        },
        data(){
          return{
            loading:false
          }
        },
        head () {
          return {
            title:'Dbit',
            script: [
              {
                type: 'text/javascript',
                charset:"UTF-8" ,
                src:"//res.cdn.openinstall.io/openinstall.js"
              }
            ]
          }
        },
        methods:{
          isLoading(){
            this.loading=true
            setTimeout(() => this.loading=false, 600)
          }
        },
        mounted() {
          //openinstall初始化时将与openinstall服务器交互，应尽可能早的调用
          /*web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的android/ios api可以获取此数据*/
          var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
          new OpenInstall({
                /*appKey必选参数，openinstall平台为每个应用分配的ID*/
                appKey : "s0kwei",
                /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
                //apkFileName : 'com.fm.openinstalldemo-v2.2.0.apk',
                /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
                //preferWakeup:true,
                /*自定义遮罩的html*/
                //mask:function(){
                //  return "<div id='openinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
                //},
                /*openinstall初始化完成的回调函数，可选*/
                onready : function() {
                  var m = this, button = document.getElementById("downloadButton");
                  button.style.visibility = "visible";

                  /*在app已安装的情况尝试拉起app*/
                  m.schemeWakeup();
                  /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
                  button.onclick = function() {
                    m.wakeupOrInstall();
                    return false;
                  }
                }
           }, data);
        },
        created(){
          this.isLoading()
        }
    }
</script>

<style lang="less" scoped>

</style>
