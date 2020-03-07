<template>
  <div style="display:flex;">
    <modal v-model="showCropper"
           @on-ok="finish"
           @on-cancel="cancel"
    >
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :fixed="option.fixed"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixedNumber="option.fixedNumber"
        :centerBox="option.centerBox"
        :infoTrue="option.infoTrue"
        :fixedBox="option.fixedBox"
        class="cropper"
      ></vueCropper>
    </modal>
  </div>
</template>

<script>
  import PictureUpload from '@/api/picture-api'
  export default {
    data() {
      return {
        showCropper:true,
        option: {
          img: 'http://localhost:8089/image/d49eeeb66efd46fa92b3d2a2cc11938e.jpg', // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 1, // 裁剪生成图片的质量
          outputType: 'jpeg', // 裁剪生成图片的格式
          canScale: false, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 300, // 默认生成截图框宽度
          autoCropHeight: 200, // 默认生成截图框高度
          fixedBox: true, // 固定截图框大小 不允许改变
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [4, 1], // 截图框的宽高比例
          full: true, // 是否输出原图比例的截图
          canMoveBox: false, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: false, // 截图框是否被限制在图片里面
          infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        }
      }
    },
    components: {
    },
    methods: {
      finish(){
        let param = new FormData();
        this.$refs.cropper.getCropData((data)=>{
          let width = 0;
          let height = 0;
          let image = new Image();
          image.onload = ()=>{
            width = image.width;
            height = image.height;
            let param = new FormData();
            let picBlob=this.dataURLtoBlob(data)
            param.append('size',picBlob.size)
            param.append('width',width)
            param.append('height',height)
            param.append('fileName','test.jpeg')
            param.append('file',picBlob)
            PictureUpload.uploadPicByManual(param).then((res)=>{
              if (res.code===200){
                this.$emit('uploadSuccess',res.result)
              }
            })
          }
          image.src=data
        })
      },
      cancel(){
        this.$emit('cancel')
      },
      dataURLtoBlob(dataurl) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      }
    }

  }
</script>

<style scoped>
  .cropper {
    width: auto;
    height: 300px;
  }
</style>
