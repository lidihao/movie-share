<template>
  <div class="uploader-main">
    <div class="uploader-content">
      <h2 class="uploader-header">上传文件</h2>
      <uploader :options="options" class="uploader-example">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <p><strong>拖拽文件到此或者</strong></p>
          <uploader-btn class="uploader-btn">
            选择文件
          </uploader-btn>
        </uploader-drop>
        <uploader-list class="uploader-list"></uploader-list>
      </uploader>
    </div>
    <div class="video-base-info">
      <h2>基本信息</h2>
      <!--图片上传div-->
      <div class="base-info-item">
        <h3 class="item-header">上传封面图片</h3>
        <div class="img-upload-list" v-for="item in uploadList">
          <template v-if="item.status === 'finished'">
            <img :src="item.url" alt="">
            <div class="img-upload-list-cover">
              <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon>
              <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
          v-ref:upload
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          style="display: inline-block;width:200px;">
          <div class="img-uploader">
            <Icon type="ios-camera" size="40"></Icon>
          </div>
        </Upload>
        <Modal title="查看图片" :visible.sync="visible">
          <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
      </div>
    </div>
    <!--其他信息-->
    <div class="base-info-item">
      <div class="base-info-form">
        <i-form :model="formTop" label-position="top">
          <Form-item label="视频分类">
            <Cascader :data="data" :value.sync="formTop.input1" style="width: 30%"></Cascader>
          </Form-item>
          <Form-item label="视频标题">
            <i-input :value.sync="formTop.input2"></i-input>
          </Form-item>
          <Form-item label="视频标签">
            <i-select :model.sync="model10" multiple style="width:260px">
              <i-option v-for="item in cityList" :value="item.value">{{ item.label }}</i-option>
            </i-select>
          </Form-item>
          <Form-item label="简介">
            <i-input :value.sync="formTop.input3" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="简介信息"></i-input>
          </Form-item>
          <Form-item>
            <i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
            <i-button type="warning" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
          </Form-item>
        </i-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "upload-item",
    data () {
      return {
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
            'status': 'finished'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
            'status': 'finished'
          }
        ],
        imgName: '',
        visible: false,
        formTop: {
          input1: '',
          input2: '',
          input3: ''
        },
      cityList: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        },
        {
          value: 'shenzhen',
          label: '深圳市'
        },
        {
          value: 'hangzhou',
          label: '杭州市'
        },
        {
          value: 'nanjing',
          label: '南京市'
        },
        {
          value: 'chongqing',
          label: '重庆市'
        }
      ],
          model10: []
      }
    },
    computed: {
      uploadList () {
        return this.$refs.upload ? this.$refs.upload.fileList : [{
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
          'status': 'finished'
        },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
            'status': 'finished'
          }];
      }
    },
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 5 张图片。'
          });
        }
        return check;
      }
    }
  }
</script>

<style scoped>
  /* 上传视频csss*/
  .uploader-main{
    margin: auto auto;
  }
  .uploader-main .uploader-content{

  }
  .uploader-content .uploader-header{
    margin-top: 20px;
    text-align: center;
  }
  .uploader-example {
    width: 880px;
    margin: 40px auto 0;
    font-size: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
    background-color: #00a1d6;
    margin-top: 20px;
    color: #ffffff;
  }
  uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  /* 上传csss*/
  .video-base-info{
    margin: 40px auto 0px;
    border-top-style: outset;
    border-top-color: gray;
  }

  .video-base-info h2{
    text-align: center;
    margin: 30px auto 30px;
  }
  .base-info-item{
    width: 880px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    margin: 40px auto 0;
    padding-left: 10px;
  }
  .base-info-item .item-header{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .img-upload-list{
    display: inline-block;
    width: 200px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .img-upload-list img{
    width: 100%;
    height: 100%;
  }
  .img-uploader{
    width:200px;
    height: 100px;
    line-height: 100px;
  }
  .img-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .img-upload-list:hover .img-upload-list-cover{
    display: block;
  }
  .img-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .base-info-form{
    width: 50%;
    padding-bottom: 10px;
    padding-top: 40px;
  }

</style>
