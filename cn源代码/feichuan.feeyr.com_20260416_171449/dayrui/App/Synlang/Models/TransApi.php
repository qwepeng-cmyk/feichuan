<?php namespace Phpcmf\Model\Synlang;

class TransApi extends \Phpcmf\Model
{
    private $config;
    public function __construct()
    {
        parent::__construct();
        $this->config = \Phpcmf\Service::M('app')->get_config('Synlang');
    }

    public function Ext($html, $from='auto', $to='en', $field=[]) {
        if($field["fieldtype"]=='Editor' || $field["fieldtype"]=='Ueditor'){
            $pre = dr_code2html($html);
            $html = \Phpcmf\Service::M('HtmlTranslator', 'synlang')->Htmlextract($pre, 'auto', $to);// 翻译

        }else{
            $html = dr_synlang($html, $to, 'auto');
        }
        return $html;
    }


}