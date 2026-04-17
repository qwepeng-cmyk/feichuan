<?php namespace Phpcmf\Controllers\Admin;


class Api extends \Phpcmf\Common
{



    // 后台复制模块内容
    public function content_edit() {

        $dir = dr_safe_filename($_GET['dir']);
        $this->_module_init($dir);

        $id = intval(\Phpcmf\Service::L('Input')->get('id'));
        list($data, $tables, $cdata) = $this->content_model->get_data($id, 1);
        if (!$data) {
            $this->_json(0, dr_lang('数据#%s不存在', $id));
        }

        $save = [
            1 => [],
            0 => [],
        ];
        foreach ($cdata as $table => $data) {
            foreach ($data as $i => $t) {
                if (strpos($table, '_data_') !== false) {
                    if (\Phpcmf\Service::M()->db->fieldExists($i, \Phpcmf\Service::M()->dbprefix(SITE_ID.'_'.$dir.'_data_0'))) {
                        $save[0][$i] = $t;
                    }
                } else {
                    if (\Phpcmf\Service::M()->db->fieldExists($i, \Phpcmf\Service::M()->dbprefix(SITE_ID.'_'.$dir))) {
                        $save[1][$i] = $t;
                    }
                }
            }
        }

        $save[1]['updatetime'] = $save[1]['inputtime'] = SYS_TIME;
        //$save[1]['title'].= '_'.dr_lang('复制');

        $rt = $this->content_model->save_content(0, $save);
        if (!$rt['code']) {
            $this->_json(0, $rt['msg']);
        }

        // 联动操作
        $this->content_model->_content_copy_after($rt['code'], $save);

        $this->_json(1, dr_lang('内容复制成功'), ['url' => dr_url($dir.'/home/index')]);
    }



    // 后台复制表单内容
    public function form_edit() {

        $dir = dr_safe_filename($_GET['dir']);
        $cache = \Phpcmf\Service::L('cache')->get('form-'.SITE_ID);
        !$cache[$dir] && $this->_admin_msg(0, dr_lang('网站表单【%s】不存在', $dir));

        $table = SITE_ID.'_form_'.$dir;

        $id = intval(\Phpcmf\Service::L('Input')->get('id'));
        $data = \Phpcmf\Service::M()->table($table)->get($id);
        if (!$data) {
            $this->_json(0, dr_lang('数据#%s不存在', $id));
        }

        $data['title'].= '_'.dr_lang('复制');
        $data['inputtime'] = SYS_TIME;
        unset($data['id']);
        $rt = \Phpcmf\Service::M()->table($table)->insert($data);
        if (!$rt['code']) {
            $this->_json(0, $rt['msg']);
        }


        $data2 = \Phpcmf\Service::M()->table($table.'_data_'.intval($data['tableid']))->get($id);
        if ($data2) {
            $data2['id'] = $rt['code'];
            $rt = \Phpcmf\Service::M()->table($table.'_data_'.intval($data['tableid']))->insert($data2);
            if (!$rt['code']) {
                $this->_json(0, $rt['msg']);
            }
        }

        $this->_json(1, dr_lang('内容复制成功'), ['url' => dr_url('form/'.$dir.'/index')]);
    }



    // 后台复制模块表单内容
    public function mform_edit() {

        $dir = dr_safe_filename($_GET['dir']);
        $cid = dr_safe_filename($_GET['cid']);
        $mid = dr_safe_filename($_GET['mid']);
        $this->_module_init($mid);

        $this->form = $this->module['form'][$dir];
        !$this->form && $this->_admin_msg(0, dr_lang('模块表单【%s】不存在', $dir));

        $table = dr_module_table_prefix($mid).'_form_'.$this->form['table'];

        $id = intval(\Phpcmf\Service::L('Input')->get('id'));
        $data = \Phpcmf\Service::M()->table($table)->get($id);
        if (!$data) {
            $this->_json(0, dr_lang('数据#%s不存在', $id));
        }

        $data['title'].= '_'.dr_lang('复制');
        $data['inputtime'] = SYS_TIME;
        unset($data['id']);
        $rt = \Phpcmf\Service::M()->table($table)->insert($data);
        if (!$rt['code']) {
            $this->_json(0, $rt['msg']);
        }


        $data2 = \Phpcmf\Service::M()->table($table.'_data_'.intval($data['tableid']))->get($id);
        if ($data2) {
            $data2['id'] = $rt['code'];
            $rt = \Phpcmf\Service::M()->table($table.'_data_'.intval($data['tableid']))->insert($data2);
            if (!$rt['code']) {
                $this->_json(0, $rt['msg']);
            }
        }

        $this->_json(1, dr_lang('内容复制成功'), ['url' => dr_url($mid.'/'.$dir.'/index', ['cid'=>$cid])]);
    }

}
