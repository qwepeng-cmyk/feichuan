<?php namespace Phpcmf\Controllers;

class Lang extends \Phpcmf\App
{

    public function index() {

        $lang = XR_L('input')->get('lang');

        $Texts = [
            "没有引用jquery库",
            "确定",
            "取消",
            "提示",
            "查看",
            "系统崩溃，请检查错误日志",
            "用户注册协议",
            "这是一个自定义函数",
            "表单id属性已重复定义",
            "表单id属性不存在",
            "有必填字段未填写，确认提交吗？",
            "最多输入500个字数",
            "当前图片地址异常<br>是否继续查看下一张？",
            "下一张",
            "不看了",
            "退出成功"
        ];

        $data = [];
        foreach ($Texts as $v) {
            $data[$v] = dr_synlang($v, $lang);
        }


        $this->_json(1,'ok', $data);
    }


    public function tips() {
        
        $data = XR_L('input')->post('data');
        $lang = XR_L('input')->get('lang');

        if($lang && $lang!='pc'){
            $data = dr_synlang($data, $lang);
        }
        
        $this->_json(1,'ok', $data);
    }

}
