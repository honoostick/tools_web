<template>
  <div class="container">
    <div class="main-content">
      <el-input type="textarea" :autosize="{ minRows: 5 }" v-model="parseParams.input" />
      <el-form class="parse-form" :model="parseParams" label-width="150px">
        <el-alert title="必填项" type="info" :closable="false" style="margin-bottom: 20px"></el-alert>
        <el-form-item label="字段名集合：">
          <el-input v-model="parseParams.names" @input="onUpdateFormatSelect" />
        </el-form-item>
        <el-form-item label="字段名格式：">
          <el-input v-model="parseParams.nameFormats" />
        </el-form-item>
        <el-form-item label="记录分隔符：">
          <el-input v-model="parseParams.split1" />
        </el-form-item>
        <el-form-item label="字段分隔符：">
          <el-input v-model="parseParams.split2" />
        </el-form-item>
        <el-alert title="格式化字段" type="info" :closable="false" style="margin-bottom: 20px"></el-alert>
        <div class="format-opt">
          <el-upload
            class="format-opt-import"
            accept="json"
            :on-change="importFormat"
            :file-list="formatFileArr"
            :show-file-list="false"
            :auto-upload="false"
            :limit="3"
            action
          >
            <el-button size="mini">导入</el-button>
          </el-upload>
          <el-button class="format-opt-export" size="mini" @click="exportFormat">导出</el-button>
        </div>
        <el-form-item style="margin-bottom: 10px" label="新增格式化字段：">
          <el-select v-model="parseParams.selectFormatName" style="margin-right: 20px">
            <el-option
              v-for="item in parseParams.formatNames"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-button size="small" circle icon="el-icon-plus" @click="onAddFormat"></el-button>
        </el-form-item>
        <el-form-item :label="item.name" v-for="(item, index) in parseParams.formats" :key="index">
          <el-input v-model="item.value" placeholder="匹配文本" style="width: 45%" />
          <el-input v-model="item.modify" placeholder="替换文本" style="width: 45%; margin-left: 2%;" />
          <el-button
            size="mini"
            circle
            icon="el-icon-minus"
            style="margin-left: 3%"
            @click="() => onDelFormat(index)"
          ></el-button>
        </el-form-item>
        <el-form-item label="启用列举模式">
          <el-checkbox v-model="isEnumMode"></el-checkbox>
        </el-form-item>
        <el-form-item label="格式化结果">
          <el-checkbox v-model="isResFormatted"></el-checkbox>
        </el-form-item>
      </el-form>
      <div class="main-opts">
        <el-button @click="() => onClickParse(FormatType.JSON)">转换JSON</el-button>
        <el-button @click="() => onClickParse(FormatType.XML)">转换XML</el-button>
      </div>
      <div v-if="res">
        <el-alert title="格式化结果" type="success" :closable="false" style="margin: 80px 0 30px"></el-alert>
        <div class="res-opt">
          <el-button class="res-opt-copy" size="mini" @click="copyRes">复制结果</el-button>
          <el-button class="res-opt-file" size="mini" @click="exportFile">导出文件</el-button>
        </div>
        <p id="res" style="white-space: pre-wrap; outline: solid 1px whitesmoke">{{res}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { FormatType } from '@/utils/index'

export default {
  name: 'parser',
  components: {},
  data() {
    return {
      FormatType: FormatType,
      formatFileArr: [],
      parseParams: {
        input: '',
        names: 'name,location,size,n_date,s_date,time,price',
        nameFormats: 'string,number,number,array,array,array,number',
        split1: '\\n',
        split2: '\\s',
        selectFormatName: '',
        formatNames: [],
        formats: [],
      },
      isEnumMode: false,
      isResFormatted: true,
      res: '',
    };
  },
  filters: {},
  methods: {
    onAddFormat() {
      const { names, formats, selectFormatName } = this.parseParams;
      if (selectFormatName !== '') {
        formats.push({ name: selectFormatName, value: '' });
      }
    },
    onDelFormat(index) {
      const { formats } = this.parseParams;
      formats.splice(index, 1);
    },
    onUpdateFormatSelect() {
      const { names, formatNames } = this.parseParams;
      const arr = names.split(',');
      arr.splice(0, 0, '--- 全部 ---');
      this.parseParams.formatNames = arr;
      this.parseParams.selectFormatName = '';
    },
    copyRes() {
      const res = document.getElementById("res");
      const tempInput = document.createElement('input');
      tempInput.value = res.innerText || ' ';
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("Copy");
      tempInput.remove();
    },
    exportFile() {
      const res = document.getElementById("res").innerText || ' ';
      var urlObject = window.URL || window.webkitURL || window;
      var downloadData = new Blob([res]);
      var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
      save_link.href = urlObject.createObjectURL(downloadData);
      save_link.download = this.curFormatType === FormatType.JSON ? 'data.json' : 'data.xml';
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
      );
      save_link.dispatchEvent(ev);
    },
    importFormat(e) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        try {
          const { result } = event.target;
          const parsed = JSON.parse(result);
          this.parseParams.formats.push(...parsed);
        } catch (e) {
          message.error('上传失败');
        }
      };
      fileReader.readAsText(e.raw);

    },
    exportFormat() {
      var urlObject = window.URL || window.webkitURL || window;
      var downloadData = new Blob([JSON.stringify(this.parseParams.formats)]);
      var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
      save_link.href = urlObject.createObjectURL(downloadData);
      save_link.download = 'format.json';
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
      );
      save_link.dispatchEvent(ev);
    },
    onClickParse(type = FormatType.JSON) {
      const { input, names, nameFormats, split1, split2, formats } = this.parseParams;
      if (!input) {
        return;
      }

      this.curFormatType = type;
      const isJSON = type === FormatType.JSON;
      try {
        const res = [];
        let resStr = '';
        const origin = input.replace(/\n/gm, '\n')
        const records = origin.split(RegExp(split1));

        const nameArr = names.split(',');
        const nameFormatArr = nameFormats.split(',');
        if (nameArr.length != nameFormatArr.length) {
          this.$message.error('字段名集合 与 字段名格式 的个数不一致');
          return;
        }
        if (isJSON) {
          resStr += this.isEnumMode ? '' : '[\n';
        } else {
          resStr += '<?xml version="1.0" encoding="UTF-8" ?>\n<data>\n';
        }
        for (let i = 0; i < records.length; i++) {
          const item = {};
          res.push(item);
          const fields = records[i].split(RegExp(split2));
          resStr += isJSON ? '\t{\n' : '\t<item>\n';
          for (let j = 0; j < fields.length; j++) {
            // format
            // const find = formats.findAll(v => v.name === nameArr[j]);
            // let modifiedData = fields[j];
            // if (find) {
            //   modifiedData = fields[j].replace(RegExp(find.value, 'gm'), String(find.modify));
            // }
            let modifiedData = fields[j];
            formats.map(v => {
              if (v.name === '--- 全部 ---') {
                modifiedData = modifiedData.replace(RegExp(v.value, 'gm'), String(v.modify));
              }
              if (v.name === nameArr[j]) {
                modifiedData = modifiedData.replace(RegExp(v.value, 'gm'), String(v.modify));
              }
              return v;
            })

            item[nameArr[j]] = modifiedData;
            const nameFormat = nameFormatArr[j].toLowerCase();
            if (nameFormat === 'array' || nameFormat === 'a') {
              resStr += isJSON ? `\t\t"${nameArr[j]}": [${modifiedData}],\n` : `\t\t<${nameArr[j]}>${modifiedData}</${nameArr[j]}>\n`;
            } else if (nameFormat === 'number' || nameFormat === 'n') {
              resStr += isJSON ? `\t\t"${nameArr[j]}": ${modifiedData},\n` : `\t\t<${nameArr[j]}>${modifiedData}</${nameArr[j]}>\n`;
            } else {
              resStr += isJSON ? `\t\t"${nameArr[j]}": "${modifiedData}",\n` : `\t\t<${nameArr[j]}>${modifiedData}</${nameArr[j]}>\n`;
            }
          }
          // 清除最后一项末尾的冒号
          if (isJSON) {
            resStr = resStr.slice(0, -2);
          }
          if (isJSON) {
            resStr += this.isEnumMode ? '\n\t}\n' : '\n\t},\n';
          } else {
            resStr += '\t</item>\n';
          }
        }
        // 清除最后一项末尾的冒号
        if (isJSON) {
          resStr = resStr.slice(0, -2);
          resStr += this.isEnumMode ? '}' : '\n]';
        } else {
          resStr += '</data>';
        }

        if (!this.isResFormatted) {
          resStr = resStr.replace(/[\t\n]/gi, '');
        }

        this.res = resStr;
      } catch (e) {
        this.$message.error('转换出错：详请见控制台');
        console.log(e)
      }
    },
  },
  mounted() {
    this.onUpdateFormatSelect();
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>