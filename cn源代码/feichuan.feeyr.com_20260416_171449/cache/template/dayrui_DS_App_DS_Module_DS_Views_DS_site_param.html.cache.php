<?php if ($fn_include = $this->_include("header.html")) include($fn_include); ?>


<form action="" class="form-horizontal" method="post" name="myform" id="myform">
    <?php echo $form; ?>
    <div class="myfbody">
        <div class="portlet bordered light ">
            <div class="portlet-title tabbable-line">
                <ul class="nav nav-tabs" style="float:left;">
                    <li class="<?php if ($page==0) { ?>active<?php } ?>">
                        <a toid="dr_default" iid="0" data-toggle="tab"> <?php echo dr_lang('网站信息'); ?> </a>
                    </li>
                    <?php if (isset($mymerge) && is_array($mymerge) && $mymerge) { $key_t=-1;$count_t=dr_count($mymerge);foreach ($mymerge as $i=>$t) { $key_t++; $is_first=$key_t==0 ? 1 : 0;$is_last=$count_t==$key_t+1 ? 1 : 0; ?>
                    <li class="<?php if ($page==($i+1)) { ?>active<?php } ?>">
                        <a toid="dr_row_<?php echo $t; ?>" iid="<?php echo $i+1; ?>" data-toggle="tab"><?php echo $field[$t]['name']; ?></a>
                    </li>
                    <?php } }  if ($mymerge) { ?>
                    <script type="text/javascript">
                        $(function () {
                            $('.myfield-main .portlet').hide();
                            $('#dr_default').show();
                            $('.nav-tabs a').click(function () {
                                var tid = $(this).attr('toid');
                                var iid = $(this).attr('iid');
                                $('#dr_page').val(iid);
                                $('.myfield-main .portlet').hide();
                                $('#'+tid).show();
                            });
                            $('.mytitle').hide();
                            <?php if ($page>0) { ?>
                            $('.myfield-main .portlet').hide();
                            $('#dr_row_<?php echo $mymerge[$page-1]; ?>').show();
                            <?php } ?>
                            });
                    </script>
                    <?php } ?>
                </ul>
            </div>
            <div class="portlet-body">
                <div class="myfield-main">

                    <div class="portlet light bordered" id="dr_default">
                        <div class="portlet-body">
                            <div class="form-body">



                                <div class="form-group" id="dr_row_logo">
                                    <label class="col-md-2 control-label"><?php echo dr_lang('LOGO'); ?></label>
                                    <div class="col-md-9">
                                        <?php echo $logofield; ?>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-2 control-label"><?php echo dr_lang('网站名称'); ?></label>
                                    <div class="col-md-9">
                                        <label><input class="form-control input-large" type="text" name="data[SITE_NAME]" id="dr_name" value="<?php echo htmlspecialchars((string)$data['SITE_NAME']); ?>"></label>
                                    </div>
                                </div>
                                <div class="form-group" id="dr_row_icp">
                                    <label class="col-md-2 control-label"><?php echo dr_lang('ICP备案信息'); ?></label>
                                    <div class="col-md-9">
                                        <label><input class="form-control input-large" type="text" name="data[SITE_ICP]" value="<?php echo htmlspecialchars((string)$data['SITE_ICP']); ?>"></label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-2 control-label"><?php echo dr_lang('第三方统计代码'); ?></label>
                                    <div class="col-md-9">
                                        <textarea class="form-control" style="height:100px" name="data[SITE_TONGJI]"><?php echo $data['SITE_TONGJI']; ?></textarea>
                                    </div>
                                </div>


                                <?php if ($my_site_info) {  if ($fn_include = $this->_load("$my_site_info")) include($fn_include);  }  echo $myfield; ?>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="portlet-body form myfooter">
        <div class="form-actions text-center">
            <label><button type="button" onclick="dr_ajax_submit('<?php echo dr_now_url(); ?>&page='+$('#dr_page').val(), 'myform', '2000')" class="btn blue"> <i class="fa fa-save"></i> <?php echo dr_lang('保存'); ?></button></label>
            <?php if (dr_is_app('mbdy') && $ci->_is_admin_auth()) { ?><label><a class="btn  yellow" href="javascript:dr_iframe_show('show', '<?php echo dr_url('mbdy/site/cms'); ?>');"> <i class="fa fa-code"></i>
            <?php echo dr_lang('前端调用'); ?></a></label><?php } ?>
        </div>
    </div>
</form>

<?php if ($fn_include = $this->_include("footer.html")) include($fn_include); ?>