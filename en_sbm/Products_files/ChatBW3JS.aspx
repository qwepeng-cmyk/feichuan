



if (/Chrome|Firefox|rv:11\.0/.test(navigator.userAgent)) c13 = c19[18];
c3 = c3.replace(/%p%/g, c50);
if (v3 != '') v3 = addhttp(v3);

if (v4 != '') v4 = addhttp(v4);

function addhttp(a) {
    if (a.indexOf("://") == -1) a = LR_imgurl + a;
    return a;
}

if (!savechat(1)) c38 = 0;
if (navigator.appVersion.indexOf("MSIE") == -1) c69 = 0;

var isFocus = false;

var shortcut = "Enter";

var fontobj = new Object();
if (lng == 'en') fontname = 'Tahoma';
fontobj.fontname = fontname;

fontobj.isbold = false;

fontobj.isitalic = false;

fontobj.isunderline = false;

fontobj.fontsize = 14;

var MaxID = 0;

var wordscheckstring = "|";

var timerID = null;

var newtext = "";

var newtext1 = "";

var sendingtext = "";

var presendtext = "";

var sendedtemptext = "";

var sending = 0;

var autoanswer0_time = 0;

var autoanswer1_time = 0;

var autoanswer2_time = 0;

var autoanswer3_time = 0;

var chatendcheck = 1;

var Intervalid = null;
var owordscount = 0;



function showtel(a) {
    var obj = $("telephone").style;
    if (a) { obj.display = 'none'; return; }
    if (c75 && Telurl == '') obj.display = "block";
}
var rgstarted = 0;
function RGStart() {
    if (rgstarted) return;
    rgstarted = 1;
    if (typeof PostCall0 != "undefined") PostCall0 = setInterval("PostCall1();", 1e4);
    f8("start");


}
function LastFunction() {
    setTimeout("resizeChatWin();", 500);
    if (typeof f18_out() == "undefined") {
        setTimeout("LastFunction();", 50);
        return;
    }

    showtel();
    if (c36) {
        if (v10) {
            f20(c10, 3, c85 + "&nbsp;" + GetNowTime(), true);
            f21(c6[0]);
            return;
        }
        if (LR_msg != '') {
            var _msg = CheckSendFormHis(LR_msg);
            f20(_msg, 2, "", true);
        }

        RGStart();
    } else {
        f21(c19[22]);
        f20(c5 + '<br>' + c19[9] + '<p style="margin-top:5px;">' + offbtn() + '</p>', 1, "", true);
        if (c11 == 1) robot();
    }
}
function LY_end(a, b) {
    if (a == 0) {
        f20(b ? n3 : c6[17], 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
    $('tel').value = t3;
}
function offbtn() {
    return '';
}
function robot() {
    f20(c10, 3, c85 + "&nbsp;" + GetNowTime(), true);
    f21(c6[0]);
}

function Trim(a) {
    return a.replace(/(^\s*)|(\s*$)/g, '');
}
function isTel(a) {
    if (lng != 'cn' && lng != 'big5') return true;
    var isPhone = /^0([0-9]{2,3}-|[1-9]{2,3})?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|(\(\+86\)))?(1[3456789][0123456789][0-9]{8})$/;
    var isHKPhone = /^([\\+]852\s*[69]|(852)\s*[69]|[69])\d{3}\s*\d{4}$/;
    var isTWPhone = /^(09)\d{8}$/;
    var isTWTel = /^0([0-9]{1,2})([\\-]|\s*)\d{6,8}$/;

    var isTGPhone = /^(0[89])([\\-]|\s*)\d{4}([\\-]|\s*)\d{4}$/;
    var isTGTel = /^(0[23])([\\-]|\s*)\d{3}([\\-]|\s*)\d{4}$/;

    var isYNPhone = /^0(9([\\-]|\s*)|1([\\-]|\s*)[0-9]{1})\d{8}$/;
    var isYNTel = /^(04)([\\-]|\s*)\d{3}([\\-]|\s*)\d{4}$/;

    var isNoAreaTel = /^\d{8}$/;

    return (isMob.test(a) || isPhone.test(a) || isHKPhone.test(a) || isTWPhone.test(a) || isTWTel.test(a) || isTGPhone.test(a) || isTGTel.test(a) || isYNPhone.test(a) || isYNTel.test(a) || isNoAreaTel.test(a));

}
function LY_check1(obj) {
    var tel = Trim(obj.value); if (tel == t3) { return; }
    if (!isTel(tel)) {
        return;
    }
    GuestTel = '|' + encodeURIComponent(tel);
    var bb = 'tel=' + escape(tel);
    if ($('ccode1')) bb += '&ccode=' + escape(Trim($('ccode1').value));
    bb += '&id=' + escape(LR_websiteid) + '&sid=' + escape(LR_sid) + '&cid=' + escape(LR_cid) + '&lng=' + escape(lng) + '&p=' + escape(c50) + '&e=' + escape(LR_ex) + '&un=' + escape(LR_un) + '&ud=' + escape(LR_ud);
    LR_hcloopJS(LR_sysurl + 'lr/sendnote160711.aspx', bb);
}

function updateIMg1() { $('telephone').style.display = 'none'; }
function inputfocus(obj, a) {
    if (obj.value == getAttributeValue(obj, 'defaultval')) obj.value = "";
    obj.style.color = 'black';
    if (!a) obj.style.border = "2px solid #82C6ED";
}
function inputblur(obj, a) {
    if (obj.value == '') {
        obj.value = getAttributeValue(obj, 'defaultval');
        obj.style.color = 'rgb(153, 153, 153)';
    }
    if (!a) obj.style.border = "1px solid #D5D5D5";
    if ($('LY_pmt')) $('LY_pmt').innerHTML = c6[1];
    if ($('tel_P')) $('tel_P').innerHTML = c6[13];
}



function hiddenC1(wy, sobj) {
    sobj.style.backgroundPosition = wy + "px -50px";
}

function showC1(wy, sobj) {
    sobj.style.backgroundPosition = wy + "px -100px";
}
function getAttributeValue(o, a) {
    if (!o.attributes) {
        return null
    }
    var b = o.attributes;
    for (var i = 0; i < b.length; i++) {
        if (a.toLowerCase() == b[i].name.toLowerCase()) {
            return b[i].value
        }
    }
    return null
}

var if_list = new Array();


var uploadtype = 0;

function showContent(i) {
    var tar = $("toolsbar1");
    tar.style.display = "block";
    tar.style.right = "";
    tar.style.left = "181px";
    resizeChatWin();

    if (i == 1) {
        tar.style.height = "210px";
        tar.style.width = "360px";
        if (if_list[i] == null) {
            if_list[i] = document.createElement("DIV");
            with (if_list[i].style) {
                width = "100%";
                height = "100%";
                overflow = "hidden";
            }
            tar.appendChild(if_list[i]);
            if_list[i].innerHTML = '<iframe style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none;  BORDER-BOTTOM-STYLE: none; HEIGHT: 100%;width:100%" frameborder="0" hspace="0" scrolling="no" src="Smile2_cn.aspx"></iframe>';
        } else {
            if (if_list[i].style.display != "none") {
                hiddenContent();
                return;
            }
            if_list[i].style.display = "block";
        }
        hiddenContent(i);
    }
    if (i == 5) {
        tar.style.left = "";
        tar.style.right = "136px";
        resizeChatWin();
        tar.style.height = t0 + "px";
        tar.style.width = t1 + "px";
        if (if_list[i] == null) {
            if_list[i] = document.createElement("DIV");
            with (if_list[i].style) {
                width = "100%";
                height = "100%";
                overflow = "hidden";
            }
            tar.appendChild(if_list[i]);
            if_list[i].innerHTML = t2;
        } else {
            if_list[i].style.display = "block";
        }
        hiddenContent(i);
    }
    if (i == 4) {
        if ($("weixin_img") == null) {
            tar.style.height = "210px";
            tar.style.width = "300px";
        } else {
            tar.style.height = $("weixin_img").height + 35 + "px";
            tar.style.width = $("weixin_img").width + 20 + "px";
        }
        if (if_list[i] == null) {
            if_list[i] = document.createElement("DIV");
            with (if_list[i].style) {
                width = "100%";
                height = "100%";
                overflow = "hidden";
            }
            tar.appendChild(if_list[i]);
            if_list[i].innerHTML = '<center><img id="weixin_img" src="' + l1 + '" border="0" onload="$(\'toolsbar1\').style.height=(this.height+35)+\'px\';$(\'toolsbar1\').style.width=(this.width+20)+\'px\';" style="margin: 10px 10px 3px 10px;"><br><INPUT type="button" value="' + c40 + '" ID="Button3" NAME="Button2" onclick="hiddenContent();" style="cursor: pointer;"></center>';
        } else {
            if (if_list[i].style.display != "none") {
                hiddenContent();
                return;
            }
            if_list[i].style.display = "block";
        }
        hiddenContent(i);
    }
    if (i == 2 || i == 3) {
        if (wordscheckstring == null || wordscheckstring == '|') {
            hiddenContent();
            return;
        }
        if (uploading) {
            alert(c19[17]); hiddenContent();
            return;
        }
        tar.style.height = "90px";
        tar.style.width = "350px";
        if (if_list[i] != null && if_list[i].style.display != "none") {
            hiddenContent();
            return;
        }
        for (n = 2; n < 4; n++) {
            if (if_list[n] != null) {
                tar.removeChild(if_list[n]);
                if_list[n] = null;
            }
        }
        if_list[i] = document.createElement("DIV");
        with (if_list[i].style) {
            width = "100%";
            height = "100%";
            overflow = "hidden";
        }
        tar.appendChild(if_list[i]);
        if_list[i].innerHTML = '<iframe id="uploadFrame" name="uploadFrame" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none;  BORDER-BOTTOM-STYLE: none; HEIGHT: 100%;width:100%" scrolling="no" frameborder="0" hspace="0" ' + if_src() + '></iframe>';

        var up = "";
        if (uploadURL && uploadURL.length > 0) {
            up = '<table cellspacing=1 cellpadding=0 width=100% border=0 ID="Table1"><form action="' + uploadURL + "/api/fu.ashx?action=up&user=" + LR_sid + "&siteid=" + LR_websiteid + "&lng=" + lng + '" method="post" enctype="multipart/form-data" name="Form1" ID="Form1" target="_self"><tr><td style="WIDTH: 60px;" noWrap>' + c27 + ":</td><td>" + c37 + '</td><td style="width:10px;"><INPUT type="button" value="' + c40 + '" ID="Button2" NAME="Button2" onclick="parent.hiddenContent();"></td></tr><tr><td noWrap>' + c41 + ':</td><td colspan=2><INPUT type="file" ID="File1" NAME="File1" style="width:100%;"></td></tr><tr><td noWrap>' + c42 + ':</td><td><INPUT type="text" ID="filenote" NAME="filenote" style="WIDTH: 100%;"></td><td><INPUT type="submit" value="' + c43 + '" ID="Button1" NAME="Button1" onclick="return parent.f29();"></td></tr></form></table>';
        }
        else {
            up = '<table cellspacing=1 cellpadding=0 width=100% border=0 ID="Table1"><form action="' + LR_sysurl + "lr/ClientUpload.aspx?uploadId=" + LR_sid + "&siteid=" + LR_websiteid + "&lng=" + lng + '" method="post" enctype="multipart/form-data" name="Form1" ID="Form1" target="_self"><tr><td style="WIDTH: 60px;" noWrap>' + c27 + ":</td><td>" + c37 + '</td><td style="width:10px;"><INPUT type="button" value="' + c40 + '" ID="Button2" NAME="Button2" onclick="parent.hiddenContent();"></td></tr><tr><td noWrap>' + c41 + ':</td><td colspan=2><INPUT type="file" ID="File1" NAME="File1" style="width:100%;"></td></tr><tr><td noWrap>' + c42 + ':</td><td><INPUT type="text" ID="filenote" NAME="filenote" style="WIDTH: 100%;"></td><td><INPUT type="submit" value="' + c43 + '" ID="Button1" NAME="Button1" onclick="return parent.f29();"></td></tr></form></table>';
        }
        uploadtype = i;

        var obj = uploadFrame.document;
        obj.open();
        obj.write('<html><head><style>*{font-size:9pt;}</style></head><body style="background-color: #fff;" scroll=no>' + up + "</body></html>");
        obj.close();
        hiddenContent(i);
        if (uploadURL && uploadURL.length > 0) {
            AddEventListener();
        }
    }
}


var CheckSendForm = function (m) {
    if (m.indexOf("lr_form|") != 0) {
        return (m);
    }

    var mf = m.split("|");

    if (mf.length > 1) {
        var cmd = {};
        cmd.a = "show_form";

        var _lr_data = null;
        try {
            _lr_data = eval('(' + m.replace("lr_form|", "") + ')');
        }
        catch (e) {
            _lr_data = null;
        }

        if (_lr_data != null) {
            //cmd.b = _lr_data;
            //window.parent.postMessage(cmd, '*');
            LR_Talk_Form(_lr_data);
        }
    }
    return ("");
}


var CheckSendFormHis = function (m) {
    if (m.indexOf("lr_form|") == 0) {
        return ("");
    }
    var lr_m_strMin = String.fromCharCode(8);
    var lr_m_strMax = String.fromCharCode(27);
    if (m.indexOf("_lr_form_data|") == 0 || m.toLowerCase().indexOf("_lr_form_data%7c") == 0) {

        var _lr_form_data;

        if (m.toLowerCase().indexOf("_lr_form_data%7c" == 0)) {
            _lr_form_data = decodeURIComponent(m).replace("_lr_form_data|", "").split("|");
        }
        else {
            _lr_form_data = m.replace("_lr_form_data|", "").split("|");
        }

        var _lr_form_html = "";

        for (var i = 0; i < _lr_form_data.length; i++) {
            var _data = _lr_form_data[i].split(lr_m_strMax);

            if (_data.length == 2)
                _lr_form_html += decodeURIComponent(_data[0]) + ":" + decodeURIComponent(_data[1]).replace(new RegExp(lr_m_strMin, 'g'), "|") + "<br>";
        }
        return (_lr_form_html);
    }

    return (m);
}


if (window.addEventListener)
{
    window.addEventListener('message', function (e) {
        try {
            var lr_cmd = e.data;
            if (lr_cmd.a == "lr_form") {
                SendMsg(encodeURIComponent(lr_cmd.c), nSendMsgID);
                var _msg = CheckSendFormHis(lr_cmd.c);
                f20(_msg, 2, "",true, nSendMsgID);
                nSendMsgID++;
            }
            else (lr_cmd.a == "lr_restart")
            {
                if (c8 == null)
                    window.location.reload();
            }

        }
        catch (e) {
        }
    }, false);
}
else
{
    try
    {
        window.onmessage = function(event)
        {
            var lr_cmd = event.data;
            if (lr_cmd.a == "lr_form") {
                SendMsg(encodeURIComponent(lr_cmd.c), nSendMsgID);
                var _msg = CheckSendFormHis(lr_cmd.c);
                f20(_msg, 2, "",true, nSendMsgID);
                nSendMsgID++;
            }
        }
    }
    catch (e) {
    }
}

var getimghtml = function (m, t) {
    if (m.indexOf("filemsg|") != 0) {
        return (m);
    }

    var imgMsg = "";
    var mf = m.split("|");
    if (mf.length == 2) {
        var filesrc = decodeURIComponent(mf[1]);
        var strFileType = "";
        var strFileName = "";
        var filepara = filesrc.split("&");
        for (var i = 0; i < filepara.length; i++) {
            if (filepara[i].indexOf("filename") == 0) {
                strFileName = filepara[i].replace("filename=", "");
            }
            else if (filepara[i].indexOf("filetype") == 0) {
                strFileType = filepara[i].replace("filetype=", "");
            }
        }
        filesrc = filesrc + "&dt=5";
        if (strFileType == "0") {
            imgMsg = "<img border=\"0\"  onload=\"f20_2_img1(this);\" src=\"" + filesrc + "\" style=\"max-width:240px\">";
        }
        else {
            if (t == 3)
                imgMsg = '<div style="display: flex;align-items: center;"><a href=' + filesrc + '><img border="0" src="/LR/fileimg/wenjian.png" style="width:24px;float:left;"><div style="font-family: 微软雅黑;font-weight: normal;font-style: normal;font-size: 10pt;text-decoration: none;float: left;margin-left: 5px;">' + strFileName + '</div></a></div>';
            else
                imgMsg = '<div style="display: flex;align-items: center;"><img border="0" src="/LR/fileimg/wenjian.png" style="width:24px;float:left;"><div style="font-family: 微软雅黑;font-weight: normal;font-style: normal;font-size: 10pt;text-decoration: none;float: left;margin-left: 5px;">' + strFileName + '</div></div>';
        }
    }

    return (imgMsg);
}


var uploading = false;
var AddEventListener = function () {
    uploadFrame.document.forms['Form1'].addEventListener('submit', function (event) {
        event.preventDefault();
        var input = uploadFrame.document.getElementById("File1");
        var fd = new FormData()
        fd.append('file', input.files[0])
        var xhr = new XMLHttpRequest()
        xhr.open('POST', event.target.action, true)
        xhr.send(fd)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                uploading = false;
                if (xhr.responseText == "1" || xhr.responseText == "2" || xhr.responseText == "3" || xhr.responseText == "4")
                    return;

                var strfileMsg = "filemsg|" + xhr.responseText;
                SendMsg(encodeURIComponent(strfileMsg), nSendMsgID);
                f20(strfileMsg, 2, "", true, nSendMsgID);
                nSendMsgID++;
            }
        }
    });
}

function f29() {
    var obj = uploadFrame.document.getElementById("File1");
    var v = obj.value;
    if (v == "") {
        alert(c18);
        obj.focus();
        return false;
    }
    var objNote = uploadFrame.document.getElementById("filenote");
    var v1 = objNote.value;
    if (v1 == "") {
        objNote.value = v.substring(v.lastIndexOf("\\") + 1);
    }
    if (uploadURL && uploadURL.length > 0) {


        if (obj.files.length == 0) {
            return false;
        }

        var strFileSize = obj.files[0].size;
        strFileName = obj.files[0].name;
        var strFileType = (uploadtype == 2) ? 0 : 1;

        uploadFrame.document.getElementById("Form1").action += "&upt=5&filesize=" + strFileSize + "&filename=" + strFileName + "&filetype=" + strFileType + "&userid=" + LR_sid + "&filedescription=" + objNote.value;
    }
    hiddenContent();
    uploading = true;
    return true;
}



function hiddenContent(ii) {
    for (i = 0; i < if_list.length; i++) {
        if (if_list[i] != null) if_list[i].style.display = i != ii ? "none" : "block";
    }
    if (typeof ii == "undefined") {
        $("toolsbar1").style.display = "none";
    }
}

function SetFont1(fontobj1) {
    var obj = FreeTextBox1_editor.document;
    if (!fontobj1) return;
    fontobj = fontobj1;
    f22();
    f7();
}

function SelSmile1(smilesrc) {
    if (smilesrc) {
        if (f18_out() == c13) {
            f19("", false);
        }
        var ele = document.createElement("img");
        ele.src = smilesrc;
        ele.border = 0;
        var obj = FreeTextBox1_editor.document.body;
        var targetEl = obj.lastChild;
        var parentEl = targetEl != null ? targetEl.parentNode : null;
        if (parentEl == null) {
            obj.appendChild(ele);
        }
        else if (parentEl.lastChild == targetEl) {
            parentEl.appendChild(ele);
        } else {
            parentEl.insertBefore(ele, targetEl.nextSibling);
        }

        f7();
    }
}

function f19(text, add) {
    var obj = FreeTextBox1_editor.document.body;
    if (add) {
        obj.innerHTML += text;
    } else {
        if (!obj) return;
        if (text == c13) {
            obj.style.color = 'rgb(153, 153, 153)';
        }
        else {
            obj.style.color = 'black';
        }
        obj.innerHTML = text;
    }
}

function ConvertFontsize(size) {
    return "10pt";
}

function f22() {
    var obj = FreeTextBox1_editor.document.body.style;
    obj.fontFamily = fontobj.fontname;
    obj.fontWeight = fontobj.isbold ? "bold" : "normal";
    obj.fontStyle = fontobj.isitalic ? "italic" : "normal";
    obj.fontSize = ConvertFontsize(fontobj.fontsize);
    obj.textDecoration = fontobj.isunderline ? "underline" : "none";
}

function showSendSel() {
    var o = $("ocSendMsgDiv");
    o.style.display = o.style.display == "block" ? "none" : "block";
}
var shortcutstring = "";

function send_c_click(o, t) {
    var es = o.getElementsByTagName("div");
    if (es && es[0]) es[0].className = "cur";
    var shortcut1 = "";
    if (t == 0) {
        o.nextSibling.getElementsByTagName("div")[0].className = "";
        shortcut1 = "Enter";
    } else {
        o.previousSibling.getElementsByTagName("div")[0].className = "";
        shortcut1 = "Ctrl + Enter";
    }
    if (shortcut == shortcut1) return;
    shortcut = shortcut1;
    shortcutstring = c21 + ":" + shortcut;
    f10(shortcutstring);
    f7();
}

function send_c_over(o) {
    o.className = "over";
    o.childNodes[0].className = "";
}

function send_c_out(o) {
    o.className = "";
    o.childNodes[0].className = "left";
}


var lr_read_maxid = 0;
var SendRead = function () {
    if (typeof (c137) != "undefined" && c137) {
        if (parseInt(MaxID) > parseInt(lr_read_maxid)) {
            newtext += ",ACT_RD|" + MaxID;
            lr_read_maxid = parseInt(MaxID) + 1;

            setTimeout("LR_Check_Read()", 1000);
        }
    }
};

var LR_Check_Read = function () {
    if (isFocus&& timerID != null) {
        SendRead();
        setTimeout("LR_Check_Read()", 1000);
    }
};



function closeme(end) {
    if (c8 == null) return;
    if (end == 1) {
        if (pj == "" && c82) {
            pingjia(2);
            return;
        } else {
            if (!confirm(n0)) {
                return;
            }
        }
        f13();
    } else if (end == 2) {
        if (!confirm(n0)) {
            return;
        }
        f13();
    }
    wordscheckstring = null;
    if (Intervalid != null) {
        clearInterval(Intervalid);
        Intervalid = null;
    }
    if (timerID != null) {
        clearTimeout(timerID);
        timerID = null;
    }
    if (timerID_answermore != null) {
        clearTimeout(timerID_answermore);
        timerID_answermore = null;
    }

    EndCheckNum();

    $("msgArea").innerHTML = $("msgArea").innerHTML.replace(/onclick/g, "ronclick");
    f21(c0);
    if (c8 != null) {
        f20(c8, 1, "", true);
        c8 = null;
        f20('<input type="button" onmouseout="filter1(this);" onmouseover="filter0(this);" value="' + n2 + '" style="background: ' + v2 + ' none repeat scroll 0 0;margin-left: 20px;" class="btn1" onclick="window.location.reload();">' + offbtn(), 1, "", true);

    }

    resize();
}

function editclick(e) {
    if (f18_out() == c13) {
        f19("", false);
    }
}

function editfocus() {
    isFocus = true;
    SendRead();
}

function editblur() {
    isFocus = false;
    var c = "a" + f18_out() + "b";
    if (f18_out() == "" && f18().toLowerCase().indexOf("img") < 0) {
        f19(c13, false);
    }
}

function f20(html, type11, oname11, add, nMsgID) {

    html = getimghtml(html, type11, oname11);

    if (type11 > 1) newmsg(html, v3, oname11);
    //html = f20_1(html, type11, oname11, nMsgID);

    var eDom = f20_d(html, type11, oname11, nMsgID);

    if (eDom == null)
        return;

    if (!isFocus) {
        window.focus();
    }
    if (add) {
        //$("msgArea").innerHTML += html;
        $("msgArea").appendChild(eDom);
    } else {
        //$("msgArea").innerHTML = html;
        $("msgArea").innerHTML = "";
        $("msgArea").appendChild(eDom);
    }
    $("chatContent").scrollTop = 999999;
    setTimeout(' $("chatContent").scrollTop = 999999;', 700);
}

function f20_bak(html, type11, oname11, add, nMsgID) {

    html = getimghtml(html, type11, oname11);

    if (type11 > 1) newmsg(html, v3, oname11);
    html = f20_1(html, type11, oname11, nMsgID);
    if (!isFocus) {
        window.focus();
    }
    if (add) {
        $("msgArea").innerHTML += html;
    } else {
        $("msgArea").innerHTML = html;
    }
    $("chatContent").scrollTop = 999999;
    setTimeout(' $("chatContent").scrollTop = 999999;', 700);
}


var s_tpc = 0; var currentimg;
function closeimgdiv(id) {
    LR_m_f(LR_m_d, true, false, false);
    document.body.removeChild($("modalDiv_" + id));
}
function imgclick(n, w, h) {
    var id = 'tp' + n; currentimg = id;
    LR_m_d = LR_m_e(true, false, true);
    if (w + 36 > getw()) w = getw() - 54;
    if (h + 52 > geth()) h = geth() - 52;
    AddmodalDiv(id, '<center><img src="' + $(id).src + '" onload="this.width=' + w + ';this.height=' + h + ';"></center><a id="mbCloseLink" href="javascript:void(0)" onclick="closeimgdiv(\'' + id + '\');return false;"></a>', w + 34, h + 32);
}
function f20_2_img1(obj) {
    if (obj.width <= 300) return;
    s_tpc++;
    var t = document.createElement("DIV");
    var href = '<a href="javascript:void(0)" onClick="imgclick(' + s_tpc + ',' + obj.width + ',' + obj.height + ');return false;">' + c19[20] + '</a><br>';
    if (obj.parentNode.href) {
        href += '<a href="' + obj.parentElement.href + '" target="_blank">';
    }
    else {
        href += '<a href="javascript:void(0)" onClick="imgclick(' + s_tpc + ',' + obj.width + ',' + obj.height + ');return false;">';
    }

    obj.parentElement.replaceChild(t, obj);
    t.innerHTML = href + '<img id="tp' + s_tpc + '" src="' + obj.src + '" width="300"></a>';
}

function f20_2_img(strhtml) {
    var arr, ptn, s, arr1, t;
    ptn = /<a.*?><img((?!onload=|width|>).)*>|<img((?!onload=|width|>).)*>/gi;
    arr = strhtml.match(ptn);
    if (arr != null) {
        for (i = 0; i < arr.length; i++) {
            s = arr[i];
            t = s.replace(/<img /gi, '<img onload="f20_2_img1(this);" ');
            strhtml = strhtml.replace(s, t);
        }
    }
    return strhtml;
}

var w_icon = "撤回";
if (lng != "cn")
    w_icon = "withdraw";

function f20_1(content, pclass, ona, nMsgID) {
    if (content.replace(/[\s\u3000]*/g, "") == "") return "";
    var str = "";
    if (pclass == 0) {
        str += '<div id="welcom1">';
        str += content;
        str += "</div>";
    } else if (pclass == 1) {
        str = '<div class="other_msg">' + content + "</div>";
    } else if (pclass == 3) {

        var strMsgIDHtml = "";
        if (nMsgID) {
            strMsgIDHtml = "id=\"lr_msg" + nMsgID + "\"";
        }

        str = '<div class="msg-box" ' + strMsgIDHtml + '>';
        str += '<div class="msg-agent">';
        if (v3 != "") str += '<div class="agent-avatar"><img src="' + v3 + '" style="width:24px;"></div>';
        str += '<div class="arrow_box_left" style="margin-left:' + (v3 != "" ? "10" : "20") + 'px;">   ' + (ona ? '<div class="text1">' + ona + "</div>" : "") + '<div class="text">';
        str += f20_2_img(content);
        str += "</div></div>";
        str += "</div>";
        str += "</div>";
    } else {
        var strMsgIDHtml = "";
        var strWithDrawMsgHtml = "";
        if (nMsgID) {

            if (nMsgID < nSendMsgID) {
                strMsgIDHtml = "id=\"lr_msg" + nMsgID + "\"";
            }
            else {
                strMsgIDHtml = "id=\"sending" + nMsgID + "\"";
            }

            if (typeof (c136) != "undefined" && c136)
                strWithDrawMsgHtml = "<a href =\"javascript:void(0)\" target=\"_self\" onclick=\"WithDrawMsg(this);\" class=\"chehui\" title=\"" + w_icon + "\"><i class=\"icon iconfont iconchehui3\"></i></a>";
        }


        str = '<div class="msg-box" ' + strMsgIDHtml + '>';
        str += '<div class="msg-client">';
        if (v4 != "") str += '<div class="client-avatar"><img src="' + v4 + '" style="width:24px;"></div>';
        str += '<div class="arrow_box" style="margin-right:' + (v4 != "" ? "20" : "20") + 'px;">';
        str += '<div class="text">';
        str += f20_2_img(content);
        str += "</div>";
        str += "</div>";
        str += strWithDrawMsgHtml;
        str += "</div>";
        str += "</div>";
    }
    return str;
}


var w_sending = "发送中";
var w_arrived = "已送达";
if (lng != "cn") {
    w_sending = "Sending";
    w_arrived = "Arrived";
}

function f20_d(content, pclass, ona, nMsgID) {
    if (content.replace(/[\s\u3000]*/g, "") == "") return null;

    var eDom = document.createElement("div");
    if (pclass == 0) {
        eDom.id = "welcom1";
        eDom.innerHTML = content;

    } else if (pclass == 1) {

        eDom.className = "other_msg";
        eDom.innerHTML = content;
    } else if (pclass == 3) {

        eDom.className = "msg-box";
        if (nMsgID) {

            eDom.id = "lr_msg" + nMsgID;
        }

        var strInnerHTML = "";

        strInnerHTML += '<div class="msg-agent">';
        if (v3 != "") strInnerHTML += '<div class="agent-avatar"><img src="' + v3 + '" style="width:24px;"></div>';
        strInnerHTML += '<div class="arrow_box_left" style="margin-left:' + (v3 != "" ? "10" : "20") + 'px;">   ' + (ona ? '<div class="text1">' + ona + "</div>" : "") + '<div class="text">';
        strInnerHTML += f20_2_img(content);
        strInnerHTML += "</div></div>";
        strInnerHTML += "</div>";

        eDom.innerHTML = strInnerHTML;

    } else {
        eDom.className = "msg-box";
        var strWithDrawMsgHtml = "";
        var strSending = "";
        var bsend_his = false;
        if (nMsgID) {
            if (nMsgID < nSendMsgID) {
                eDom.id = "lr_msg" + nMsgID;
                bsend_his = true;
            }
            else {
                eDom.id = "sending" + nMsgID;
            }

            strSending = "send" + nMsgID;

            if (typeof (c136) != "undefined" && c136)
                strWithDrawMsgHtml = "<a href =\"javascript:void(0)\" target=\"_self\" onclick=\"WithDrawMsg(this);\" class=\"chehui\" title=\"" + w_icon + "\"><i class=\"icon iconfont iconchehui3\"></i></a>";
        }
 else {
            bsend_his = true;
        }

        var strInnerHTML = "";

        strInnerHTML += '<div class="msg-client">';
        if (v4 != "") strInnerHTML += '<div class="client-avatar"><img src="' + v4 + '" style="width:24px;"></div>';
        strInnerHTML += '<div class="arrow_box" style="margin-right:' + (v4 != "" ? "20" : "20") + 'px;">';
        strInnerHTML += '<div class="text">';
        strInnerHTML += f20_2_img(content);
        strInnerHTML += "</div>";

        strInnerHTML += '<div class="text" ' + (strSending.length > 0 ? ("id=" + strSending) : "") + ' name="send_msg" style="float: right;font-size: 12px !important;transform: scale(0.7);margin-top: 5px;margin-bottom: -7px;margin-right: -10px;color: #6f7383;">' + (bsend_his ? w_arrived: w_sending) + '</div>';

        strInnerHTML += "</div>";
        strInnerHTML += strWithDrawMsgHtml;
        strInnerHTML += "</div>";

        eDom.innerHTML = strInnerHTML;
    }

    return eDom;
}


function f20_11(html, type11, oname11) {
    if (type11 == 1) {
        html = '<div class="other_msg">' + html + "</div>";
    } else if (type11 == 2) {
        html = ' <div class="msg_cus"><div class="msg"><div class="after k_s_ol_pngFix"></div><span  style="font-size:14px;">' + html + "</span></div></div>";
    } else if (type11 == 3) {
        html = ' <div class="msg_cs"><div class="img1"></div><div class="msg"><div class="before k_s_ol_pngFix"></div>' + (oname11 ? '<div style="margin-top: -4px;color:#9a9a9a;">' + oname11 + "</div>" : "") + '<div style="margin-top: 3px;font-size:14px;">' + html + "</div></div></div>";
    } else if (type11 == 0) {
        html = '  <div class="welcom1">' + html + "</div>";
    }
    return html;
}

function if_src() {
    if (/rv:11.0;|SE 2.X MetaSr 1.0/.test(navigator.userAgent)) {
        return "";
    }
    return 'src="about:blank"';
}

function f21(html) {
    if (!isFocus) {
        window.focus();
    }
    $("prompttop").innerHTML = "&nbsp;" + html;
    floatleft(html.length <= 35);
}
var Interval1 = null;
function floatleft(a) {
    var b, c, d;
    return a && null != Interval1 ? (clearInterval(Interval1), Interval1 = null, void 0) : (b = $("prompttop"),
        c = b.parentNode, b.parentNode.style.overflow = "hidden", b.style.textOverflow = "",
        b.style.overflow = "visible", d = 1, Interval1 = setInterval(function () {
            var a, e, f;
            return 3 > d && d > 0 ? (d++ , void 0) : (a = b.scrollWidth, e = b.parentNode.clientWidth,
                f = c.scrollLeft, f = f ? f : 0, a > e + f ? (c.scrollLeft = f + 15, d = 0) : (c.scrollLeft = 0,
                    d++), void 0);
        }, 700), void 0);
}
var serverkind = 0;

var serverkindname = "";

function testclick(n, s) {
    serverkind = n;
    serverkindname = unescape(s.replace("+", " "));
    if ($("servicekindlist") != null) $("servicekindlist").innerHTML = "<P>&nbsp;</p>";
    f21(c2.replace("%s1%", serverkindname));
}

function showChatpre() {
    LR_m_d = LR_m_e(true, false, true);
    AddmodalDiv("Chatpreobj", chatpre_show_content, 450);
    f7();
}

function closechat() {
    _BeforeWinExit = 1;
    window.location = "closeandcheckinvite.aspx?id=" + LR_siteid + "&sid=" + LR_sid + "&lng=" + lng + "&d=" + new Date().getTime();
}










function f2(n) {
    if (n < 10) {
        return "0" + n;
    } else {
        return n.toString();
    }
}

function GetNowTime() {
    var d = new Date();
    return f2(d.getHours()) + ":" + f2(d.getMinutes()) + ":" + f2(d.getSeconds());
}



function f14() {
    if (isstarted == 0) {
        f8("start");
        return;
    }
    if (serverkindname != "") {
        newtext += ",ACT_SERVERKIND|" + serverkind + "|" + encodeURIComponent(serverkindname);
        serverkindname = "";
    }
    if (GuestTel != "") {
        newtext += ",ACT_TEL|" + GuestTel;
        GuestTel = "";
    }
    if (pj != "" && pj != "1") {
        newtext += ",ACT_PJ|" + pj;
        pj = "1";
    }
    if (typeof reservecontent != "undefined" && reservecontent != "" && reservecontent != "1") {
        newtext += ",ACT_YY|" + reservecontent;
        reservecontent = "1";
    }
    f8("check");
}

var LRppid = "";

function showTime() {
    obj = $("pmtdiv");
    if (obj.style.display == "none") {
        obj.style.display = "";
        resize();
        c113 = unescape(c113.replace(/\\+/g, "%20"));
    }
    $("pmtdiv1").innerHTML = c113.replace("%s%", c112.toString());
    if (c112 == 0) {
        if (Intervalid != null) {
            clearInterval(Intervalid);
            Intervalid = null;
        }
        f8("end1");
    }
    c112--;
}

var timerID_answermore = null; var _oname = null;
var chated_own = 0;
function autoanswermore() {
    if (c118 == "" || wordscheckstring == null) {
        if (timerID_answermore != null) {
            clearTimeout(timerID_answermore);
            timerID_answermore = null;
        }
        return;
    }
    if (c130 == 1) {
        if (LR_getCookie('chated') == '1') {
            if (chated_own == 0) return;
        }
        else {
            LR_SetCookie('chated', '1', 60); chated_own = 1;
        }
    }
    if (autoanswer0_time == 0) {
        timerID_answermore = setTimeout("autoanswermore()", 1e3);
        return;
    }
    var ntime = new Date().getTime();
    var n = c118.indexOf(",");
    if (n > 0) {
        var s = c118.substring(0, n);
        var wtime = ntime - autoanswer0_time;
        var wtime1 = parseInt(s) * 1e3;
        if (wtime >= wtime1) {
            c118 = c118.substring(n + 1, c118.length);
            n = c118.indexOf("|");
            var tt = c118.substring(0, n).replace(/\+/g, "%20");
            c118 = c118.substring(n + 1, c118.length);


            var ka = tt.split("%7B%23%23%7D");
            var kat = tt;
            if (ka.length > 1) {
                if (typeof (LR_skey) == "string" && LR_skey.length > 0) {
                    if (ka[1].length > 0)
                        kat = ka[1].replace(/%7Bkeyword%7D/g, LR_skey);
                    else
                        kat = ka[0];
                }
                else {
                    kat = ka[0];
                }
            }

            if (l0.length > 0)
            {
                  kat = kat.replace(/%7Bphonenumber%7D/g, l0);
            }

            if (_oper_wx.length > 0)
            {
                  kat = kat.replace(/%7Bwxnumber%7D/g, _oper_wx);
            }

        if(parseInt(s)>0)
        {
             addnewtext(",ACT_AR|" + kat);
            kat = decodeURIComponent(kat);
            f20(kat, 3, '', true);
        }

        }
    }
    timerID_answermore = setTimeout("autoanswermore()", 1e3);
}

function addnewtext(_text0) {
    if (newtext1.indexOf(_text0) == -1) newtext1 += _text0;
}

function autoanswer() {
    if (parseInt(c93) > 0 && parseInt(autoanswer0_time) > 0 && new Date().getTime() - parseInt(autoanswer0_time) > parseInt(c93) * 1e3) {
        c93 = 0;
        var tt = c94;

        var ka = tt.split("{##}");
        var kat = tt;
        if (ka.length > 1) {
            if (typeof (LR_skey) == "string" && LR_skey.length > 0) {
                if (ka[1].length > 0)
                    kat = ka[1].replace(/{keyword}/g, decodeURIComponent(LR_skey));
                else
                    kat = ka[0];
            }
            else {
                kat = ka[0];
            }
        }

            if (l0.length > 0)
          {
             kat = kat.replace(/{7Bphonenumber}/g, l0);
          }

          if (_oper_wx.length > 0)
          {
             kat = kat.replace(/{7Bwxnumber}/g, _oper_wx);
          }


        addnewtext(",ACT_AR|" + escape(kat));
        f20(kat, 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
    if (parseInt(c95) > 0 && parseInt(autoanswer1_time) > 0 && new Date().getTime() - parseInt(autoanswer1_time) > parseInt(c95) * 1e3 * 60) {
        autoanswer1_time = 0;
        var tt = c96;

        var ka = tt.split("{##}");
        var kat = tt;
        if (ka.length > 1) {
            if (typeof (LR_skey) == "string" && LR_skey.length > 0) {
                if (ka[1].length > 0)
                    kat = ka[1].replace(/{keyword}/g, decodeURIComponent(LR_skey));
                else
                    kat = ka[0];
            }
            else {
                kat = ka[0];
            }
        }

            if (l0.length > 0)
          {
             kat = kat.replace(/{phonenumber}/g, l0);
          }

          if (_oper_wx.length > 0)
          {
             kat = kat.replace(/{wxnumber}/g, _oper_wx);
          }


        addnewtext(",ACT_AR|" + escape(kat));
        f20(kat, 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
    if (parseInt(c97) > 0 && parseInt(autoanswer2_time) > 0 && new Date().getTime() - parseInt(autoanswer2_time) > parseInt(c97) * 1e3 * 60) {
        autoanswer2_time = 0;
        var tt = c98;

        var ka = tt.split("{##}");
        var kat = tt;
        if (ka.length > 1) {
            if (typeof (LR_skey) == "string" && LR_skey.length > 0) {
                if (ka[1].length > 0)
                    kat = ka[1].replace(/{keyword}/g, decodeURIComponent(LR_skey));
                else
                    kat = ka[0];
            }
            else {
                kat = ka[0];
            }
        }

            if (l0.length > 0)
          {
             kat = kat.replace(/{phonenumber}/g, l0);
          }

          if (_oper_wx.length > 0)
          {
             kat = kat.replace(/{wxnumber}/g, _oper_wx);
          }


        addnewtext(",ACT_AR|" + escape(kat));
        f20(kat, 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
    if (parseInt(c99) > 0 && parseInt(autoanswer3_time) > 0 && new Date().getTime() - parseInt(autoanswer3_time) > parseInt(c99) * 1e3) {
        autoanswer3_time = 0;
        var tt = c100;

        var ka = tt.split("{##}");
        var kat = tt;
        if (ka.length > 1) {
            if (typeof (LR_skey) == "string" && LR_skey.length > 0) {
                if (ka[1].length > 0)
                    kat = ka[1].replace(/{keyword}/g, decodeURIComponent(LR_skey));
                else
                    kat = ka[0];
            }
            else {
                kat = ka[0];
            }
        }
        
            if (l0.length > 0)
          {
             kat = kat.replace(/{phonenumber}/g, l0);
          }

          if (_oper_wx.length > 0)
          {
             kat = kat.replace(/{wxnumber}/g, _oper_wx);
          }

        addnewtext(",ACT_AR|" + escape(kat));
        f20(kat, 3, c101 + "&nbsp;" + GetNowTime(), true);
    }
}

var lurl = "";

var isstarted = 0;

function start2(o) {
    autoanswer0_time = new Date().getTime();
    LRppid = o[5];
    LRppid = Hwd8F9(LRppid);
    if (o[0] != "1") timerID_answermore = setTimeout("autoanswermore()", 1e3);
    if (typeof (Xststartchat) != 'undefined') { Xststartchat(); } else if (typeof (SogouStartchat) != 'undefined') { SogouStartchat(); } else if (typeof (ALiOcpcStartchat) != 'undefined') { ALiOcpcStartchat(); } else if (typeof (OcpcTecentStartchat) != 'undefined') { OcpcTecentStartchat(); }

    StartCheckNum();
}

                        if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

        function _check_lr_msg(_check_msg) {
    if (_check_msg == null || _check_msg == undefined || _check_msg.length <7)
        return (false);

    if (_check_msg.startsWith("LR") && _check_msg[6] == "_")
        return (true);

    return (false);
}

var _oper_wx = "";

function getReady(returnvalue) {
    sending = 0;
    var isstart = 0;
    if (returnvalue == "r") {
        if (sendingtext != "") sendingtext = "";
        if (wordscheckstring != null) {
            clearTimeout(timerID);
            timerID = null;
            timerID = setTimeout("f14()", 2e3);
        }
        autoanswer();
        return;
    }
    if (returnvalue == "" || returnvalue == null || returnvalue.indexOf("err") == 0) {
        if (returnvalue.indexOf("err4") == 0 && sendingtext.length > 20000) sendingtext = "";
        if (wordscheckstring != null) {
            clearTimeout(timerID);
            timerID = null;
            timerID = setTimeout("f14()", 2e3);
        }
        autoanswer();
        return;
    }
    isstarted = 1;
    var rr = returnvalue.split(",");
    for (w = 0; w < rr.length; w++) {
        if (rr[w] == "") {
            continue;
        }
        if (rr[w] == "noinput") {
            f10(shortcutstring == "" ? c15 : shortcutstring);
            continue;
        }
        var o = rr[w].split("|");
        if (o.length > 1 && o[0] == "inputting") {
            f10(c86.replace("{0}", unescape(o[1].replace(/\+/g, "%20"))));
            continue;
        }
        if (o.length > 1 && o[0] == "upload") {
            if (o[1] == "ReceivingData") {
                continue;
            }
            uploading = false;
            return;
        }
        if (o.length != 6) continue;
        if (sendingtext != "") sendingtext = "";
        o[1] = o[1].replace(/\+/g, "%20");
        o[5] = o[5].replace(/\+/g, "%20");
        o[1] = f15(unescape(o[1]));
        o[4] = o[4].replace(/\+/g, "%20");
        o[4] = unescape(o[4]);
        o[5] = unescape(o[5]);
        if (o[0] == "-1") {
            if (timerID != null) {
                clearTimeout(timerID);
                timerID = null;
            }
            getReady("r");
            _BeforeWinExit = 1;
            f21(o[1]);

            return;
        }
        if (o[3] != "") {
            if (o[4].indexOf("start") != 0) {
                if (wordscheckstring != null && wordscheckstring.indexOf("|" + o[3] + "|") != -1) {
                    continue;
                }
                wordscheckstring += o[3] + "|";
                MaxID = o[3];
            }
            switch (o[2]) {
                case "1":
                    if (o[1].toString().indexOf("%name%") > -1) {
                        o[1] = o[1].toString().replace("%name%", "<b>" + o[5] + "</b>");
                    }
                    f21(o[1]);
                    break;

                case "17":
                    uploading = false;
                    f20(o[1], 2, "", true);
                    break;

                case "16":
                    uploading = false;
                    o[1] = o[1].toString().replace("%c%", "<b>" + c23 + "</b>");
                    f20(o[1], 1, "", true);
                    break;

                case "18":
                    o[1] = o[1].toString().replace("%c%", "<b>" + c23 + "</b>");
                    f20(o[1], 2, "", true);
                    break;

                case "43":
                    pingjia();
                    break;

                case '49':
                   l0 = o[1];
                   break;

                case "37":
                    var ooo = o[1].split("|");
                    for (ww = 0; ww < ooo.length; ww++) {
                        ooo[ww] = ooo[ww].replace(/\+/g, "%20");
                        ooo[ww] = unescape(ooo[ww]);
                    }
                    if (ooo.length < 6) break;
                    if (ooo[0].length > 0) title0 = window.document.title = ooo[0];
                    if (ooo[1].length > 0 && $("rightDiv1")) $("rightDiv1").innerHTML = SetLogo(ooo[1], ooo[2], "right");
                    if (ooo[3].length > 0) {
                        l1 = ooo[3];
                        $("tbut2").style.display = "";
                    }
                    if (ooo[4].length > 0) {
                        l2 = ooo[4];
                        $("tbut3h").href = 'tencent://message/?uin=' + l2 + '&Site=&Menu=yes';
                        $("tbut3").style.display = "";
                    }
                    if (ooo[5].length > 0) {
                        v3 = ooo[5];
                        if ($("topimg")) $("topimg").src = v3;
                    }

                   if (ooo.length > 6 && ooo[6].length > 0) {
                       _oper_wx =  ooo[6];
                   }

                    break;

                case "46":
                    LR_oname0530 = o[5];
                    YuYue();
                    break;

                case "50":
                    IFrameOpen(o[1]);
                    break;

                case "-3":
                    c93 = -1;
                    autoanswer3_time = 0;
                    autoanswer2_time = autoanswer1_time = new Date().getTime();
                    o[5] = o[5].replace("HTTP/1.1 100 Continue", "");
                    if (o[5] == c85) o[1] = o[1] + RB1();

                    var _msg = CheckSendFormHis(o[1]);
                    if(o[5]!='托管机器人')
                        _oname = o[5];

           if (_check_lr_msg(_msg))
       _msg = "";

                    f20(_msg, 3,_oname + "&nbsp; " + o[0], true, o[3]); 
                    play();
                    break;

                case "-2":
                    var _msg = CheckSendFormHis(o[1]);
        
                  try {
                        if (o[3] != '') {
                            if (parseInt(o[3]) > nSendMsgID)
                                nSendMsgID = parseInt(o[3]) + 1;
                        }
                    }
                    catch (e) { }

                    f20(_msg, 2, "", true, o[3]);
                    break;

                case "3":
                    if (o[5] == "") break;
                    if (chatendcheck && c112 > 0) {
                        chatendcheck = 0;
                        Intervalid = window.setInterval("showTime()", 1e3);
                    }
                    c93 = -1;
                    autoanswer3_time = 0;
                    autoanswer2_time = autoanswer1_time = new Date().getTime();
                    o[5] = o[5].replace("HTTP/1.1 100 Continue", "");
                    if (o[5] == c85) o[1] = o[1] + RB1();

                    var _msg = CheckSendForm(o[1]);

            if(o[5]!='托管机器人')
_oname = o[5];

           if (_check_lr_msg(_msg))
       _msg = "";

                    f20(_msg, 3, _oname + "&nbsp;" + GetNowTime(), true, o[3]);
                    LR_Check_Read();
                    owordscount++; 
                    play();
                    break;

                case "20":
                    autoanswer3_time = 0;
                    autoanswer2_time = autoanswer1_time = new Date().getTime();
                    f20(o[1], 0, "", true);
                    break;

                case "4":
                    autoanswer3_time = 0;
                    autoanswer2_time = autoanswer1_time = new Date().getTime();
                    var oooo = o[1].split("|");
                    if (oooo.length == 2) {
                        if (oooo[0] != "") {
                            alert(unescape(oooo[0].replace(/\\+/g, "%20")));
                        }
                        f8("end");

                        lurl = unescape(oooo[1]);
                        if (lurl.substring(0, 9) == "transfer:") {
                            lurl = lurl.substring(9, lurl.length);
                        } else {
                            lurl = "custom_url.aspx?url=" + unescape(oooo[1]);
                        }
                        setTimeout("window.location=lurl;", 1500);
                    } else if (oooo.length == 1) {
                        window.open(o[1], o[3], "");
                    }
                    break;

                case "22":

                    window.location = o[1];
                    break;


                case "-5":
                    DeleteMsg(o[1]);
                    break;

                case "-4":
                    DeleteMsg(o[1]);
                    break;

                default:
                    break;
            }
        }
        switch (o[4]) {
            case "start":
                start2(o);
                isstart = 1;
                break;

            case "start1":
                c93 = 0; _oname = o[1];
                start2(o);
                isstart = 1;
                break;

            case "restart":
                f8("start");
                return;

            case "end":
                closeme();
                return;

            case "print":
                f21(o[1]);
                break;

            case "direct":
                alert(o[1]);
                f21(o[1]);
                closeme();
                return;

            case "exit":
                closeme();
                return;
        }
    }
    if (sendingtext != "") {
        sendingtext = "";
    }
    if (wordscheckstring != null) {
        clearTimeout(timerID);
        timerID = null;
        timerID = setTimeout("f14()", !isstart ? 2e3 : 1);
    }
    autoanswer();
}

var GuestTel = "";

function Freecall() {
    if (wordscheckstring == null) return;
    OpenDialog("freecall_" + lng + ".aspx", 348, 230);
}

function Freecall1(guestname, tel) {
    GuestTel = encodeURIComponent(guestname) + "|" + encodeURIComponent(tel);
}

function f10(text) {
    if (text == "") {
        $("swtlogo").innerHTML = c15;
        return;
    }
    //	if (c44) text = '<img src="imgs/secure.gif"  alt="SSL 128 bit"> ' + text;
    if ($("swtlogo").innerHTML != text) $("swtlogo").innerHTML = text;
}

var clearhtml = false;

function AddLine() {
    var doc = frames["FreeTextBox1_editor"].document,
        sel = doc.selection,
        rng;
    if (sel) {
        rng = sel.createRange();
        rng.pasteHTML("<br>");
        rng.move("character ", 1);
        rng.select();
        rng.collapse(true);
    } else {
        sel = doc.getSelection();
        rng = sel.getRangeAt(0);
        var br = doc.createElement("br");
        var nrng = doc.createRange();
        w = doc.createTextNode("​");
        rng.insertNode(w);
        rng.insertNode(br);
        nrng.selectNode(w);
        sel.removeAllRanges();
        sel.addRange(nrng);
        sel.collapse(w, 1);
    }
}

function f11(evt) {
    if (f18_out() == c13) {
        f19("", false);
    }
    evt = evt || window.event;
    var keyCode = evt.keyCode;
    var ctrlKey = evt.ctrlKey;
    var altKey = evt.altKey;
    if (altKey && evt.keyCode == 37) {
        evt.cancelBubble = true;
        evt.returnValue = false;
        return;
    }
    if (keyCode == 13 && shortcut == "Enter" && ctrlKey) {
        AddLine();
        return false;
    }
    if (keyCode == 13 && shortcut == "Enter") {
        clearhtml = User_Send(evt);
        evt.cancelBubble = true;
        evt.returnValue = false;
        if (evt.preventDefault && evt.stopPropagation) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        return false;
    }
    if (ctrlKey && keyCode == 13 && shortcut == "Ctrl + Enter") {
        clearhtml = User_Send(evt);
        evt.cancelBubble = true;
        evt.returnValue = false;
        if (evt.preventDefault && evt.stopPropagation) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        return false;
    }
    return true;
}

function excludeE(strhtml) {
    var arr, ptn, s, t;
    ptn = /<.*?onresize.*?>/gi;
    arr = strhtml.match(ptn);
    if (arr == null) return strhtml;
    for (i = 0; i < arr.length; i++) {
        s = arr[i];
        t = s.replace(/onresize/gi, "onresize" + i);
        strhtml = strhtml.replace(s, t);
    }
    return strhtml;
}

function f18() {
    var obj = FreeTextBox1_editor.document.body;
    return obj ? '<div style="' + obj.style.cssText.replace(/color: black;/i, '') + '">' + excludeE(obj.innerHTML) + "</div>" : "";
}

function f18_out() {
    var obj = FreeTextBox1_editor.document.body;
    return obj ? obj.outerText : "";
}

var c74 = 0;

var nSendMsgID = 10000;

function PostCallNew(url, poststr, callbackmethod) {
    if (LR_xmlHttp != null) {
        trypost++;
        if (trypost > 20) { getReady('err2'); LR_xmlHttp = null; return; } Ajax_timerID = setTimeout("PostCallNew('" + url + "','" + poststr + "'," + callbackmethod + ")", 1000);
        return;
    }
    trypost = 0;

    try {
        LR_XmlHttp = GetXmlHttpObject(callbackmethod);
        if (typeof (LR_XmlHttp.setrequestheader) != 'undefined') {
            LR_XmlHttp.open('POST', url, true);
            LR_XmlHttp.setrequestheader('content-length', poststr.length);
            LR_XmlHttp.setrequestheader('content-type', 'application/x-www-form-urlencoded');
            LR_XmlHttp.send(poststr);
        }
        else if (typeof (LR_XmlHttp.setRequestHeader) != 'undefined') {
            LR_XmlHttp.open('POST', url, true);
            LR_XmlHttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            LR_XmlHttp.send(poststr);
        }
        else {
            LR_XmlHttp.open('GET', url + (url.indexOf('?') == -1 ? '?' : '&') + poststr, true);
            LR_XmlHttp.send(null);
        }
    }
    catch (e) {
        LR_XmlHttp = null;
    }
}

function Dictionary() {
    this.add = add;
    this.datastore = new Array();
    this.find = find;
    this.remove = remove;
}
function add(key, value) {
    this.datastore[key] = value;
}
function find(key) {
    return this.datastore[key];
}
function remove(key) {
    delete this.datastore[key];
}

var _lr_push_msg = new Dictionary();

//发送消息
function SendMsg(strMsg, strMsgID, strPushMsg) {
    if (strMsg.length == 0) return;

    //if (strPushMsg)
    //_lr_push_msg.add(strMsgID, strPushMsg);


    if (strMsg)
        _lr_push_msg.add(strMsgID, strMsg);

    var url = LR_sysurl + "NR/c_send.aspx?sid1=" + LR_sid + "&siteid1=" + LR_websiteid.substr(3, 8) + "&type=6";
    var poststr = "id=" + LR_websiteid.substr(3, 8) + "&sid=" + LR_sid + "&msgid=" + strMsgID + "&_text=" + escape(strMsg) + "&lng=" + lng + "&pp=" + LRppid;
    PostCallNew(url, poststr, SendMsgCallback);
}

//发送消息回执
function SendMsgCallback() {
    if (LR_XmlHttp == null) {
        return;
    }
    if (LR_XmlHttp.readyState == 4 || LR_XmlHttp.readyState == 'complete') {
        if (LR_XmlHttp.status == 200) {
            var responseText = LR_XmlHttp.responseText;
            LR_XmlHttp = null;

            if (responseText && responseText.length > 0) {
                var strIDs = responseText.split("|");

                if (strIDs.length == 2) {
                    var eMsg = document.getElementById("sending" + strIDs[1]);

                    var _lr_push_item = _lr_push_msg.find(strIDs[1]);
                    if (_lr_push_item) {

                        if (LRppid) {
                            if (typeof (XstSendmsg) != 'undefined') { XstSendmsg(_lr_push_item); } else if (typeof (SoGouSendmsg) != 'undefined') { SoGouSendmsg(_lr_push_item); } else if (typeof (ALiOcpcSendmsg) != 'undefined') { ALiOcpcSendmsg(_lr_push_item); }
                            else if (typeof (Ocpc360SyncDataFunc) != 'undefined') { Ocpc360SyncDataFunc(1, _lr_push_item); } else if (typeof (OcpcTecentSyncDataFunc) != 'undefined') { OcpcTecentSyncDataFunc(1, _lr_push_item); }
                        }
                        _lr_push_msg.remove(strIDs[1]);
                    }

                    if (eMsg) {
                        eMsg.id = "lr_msg" + strIDs[0];
                    }

                    var eSendMsg = document.getElementById("send" + strIDs[1]);
                    if (eSendMsg)
                        eSendMsg.innerHTML = w_arrived;
                }
            }


        }
    }
}


var w_msg = "消息已撤回";
if (lng != "cn")
    w_msg = "Message was withdrawn";

//撤回
var WithDrawMsg = function (obj) {
    if (typeof (c136) != "undefined" && c136) {
        var eMsg = obj.parentElement.parentElement;
        if (eMsg) {
            if (eMsg.id) {
                var strMsgID = eMsg.id.replace("lr_msg", "");
                RemoveMsg(strMsgID);
            }

            eMsg.querySelector(".text").innerHTML = "<div class=\"chehuifont\">【" + w_msg + "】</div>";
            obj.style.display = "none";
        }
    }
}

var DeleteMsg = function (strMsgID) {
    if (typeof (c136) != "undefined" && c136) {
        var eMsg = document.getElementById("lr_msg" + strMsgID);
        if (eMsg) {
            eMsg.querySelector(".text").innerHTML = "<div class=\"chehuifont\">【" + w_msg + "】</div>";

            if (eMsg.querySelector(".chehui"))
                eMsg.querySelector(".chehui").style.display = "none";
        }
    }
};

var RemoveMsg = function (strMsgID) {
    var url = LR_sysurl + "NR/c_cancel.aspx?sid1=" + LR_sid;
    var poststr = "id=" + LR_websiteid.substr(3, 8) + "&sid=" + LR_sid + "&msgid=" + strMsgID + "&lng=" + lng + "&pp=" + LRppid;
    PostCall(url, poststr, SendMsgCallback);
};

function User_Send(e) {


    var tempouttext = Trim(f18_out().replace(/\\n/g, ""));
    var temphtml = f15(f18());
    if ((tempouttext == c13 || tempouttext == "") && temphtml.toLowerCase().indexOf("img") == -1) {
        f10(c4);
        f7();
        return false;
    }
    var ml = 8e3;
    if (kindget == 1) ml = 2e3;
    var imgStr = temphtml.replace(/<\s?img.+?src=[\""]data:image\/png;base64,[^>]*>/gi, "");
    if (escape(imgStr).length > ml) {
        f10(c120.replace("{0}", imgStr.length.toString()));
        return false;
    }

    if (v10) {
        f20(temphtml, 2, "", true);
        var bb = 'id=' + escape(LR_siteid) + '&sid=' + escape(LR_sid) + '&lng=' + escape(lng) + '&_text=' + encodeURIComponent(temphtml);
        LR_hcloopJS(LR_sysurl + 'lr/RobotCheck160728.aspx', bb);
        f19("", false);
        return;
    }


    if ((wordscheckstring == null || !c36) && c85 == null) {
        var txt = temphtml.replace(/<br>/g, '\r\n');
        f19(txt, false);
        f19("", false);
        return;
    }

    if (wordscheckstring == null) return false;

    f19("", false);
    f7();
    //      if (LRppid)
    //       {
    //    if (typeof (XstSendmsg) != 'undefined') { XstSendmsg(tempouttext); } else if (typeof (SoGouSendmsg) != 'undefined') { SoGouSendmsg(tempouttext); }else if (typeof (ALiOcpcSendmsg) != 'undefined'){ALiOcpcSendmsg(tempouttext);}
    //         }

    //if (newtext != "") {
    //    newtext += "," + encodeURIComponent(temphtml);
    //} else {
    //    presendtext += "," + encodeURIComponent(temphtml);
    //}
    //if (MaxID != 0) f20(temphtml, 2, "", true);

    SendMsg(encodeURIComponent(temphtml), nSendMsgID, tempouttext);
    f20(temphtml, 2, "", true, nSendMsgID);
    nSendMsgID++;

    if (c73 > -1 && pj == "") {
        c74++;
        if (c74 >= c73) pingjia();
    }
    if (c93 == -1) autoanswer3_time = new Date().getTime();
    clearTimeout(timerID_answermore);
    timerID_answermore = null;

    if (c134 > 0) {

        setTimeout('addnewtext(",ACT_AR|" + escape(c135));f20(c135, 3, _oname==null?c101:_oname + "&nbsp;" + GetNowTime(), true);', c134 * 1000);
        c134 = 0;
    }
    return true;
}

function HidePingjiaobj(end) {
    LR_m_f(LR_m_d, true, false, false);
    var div = $("modalDiv_Pingjiaobj");
    div.style.display = "none";
    if (end == 2) closeme(2);
}

var pj = "";

function pingjia(end) {
    if (wordscheckstring == null) return;
    var div = $("modalDiv_Pingjiaobj");
    if (div != null && div.style.display != "none") return;
    LR_m_d = LR_m_e(true, false, false);
    if (div == null) {
        var mainhtm = '<table id="Table_pingjia" cellSpacing="8" cellPadding="0" align="center" border="0"><tr><td height="25"><b>' + n1 + "</b></td></tr><tr><td >" + c77 + "</td></tr><tr><td>";
        var pj_rr = c72.split("|");
        for (w = 0; w < pj_rr.length; w++) {
            if (pj_rr[w] == "") {
                continue;
            }
            mainhtm += '<input type="radio" id="pj' + w.toString() + '" name="pj"   value="' + pj_rr[w] + '" ' + (w == 0 ? "checked" : "") + " />" + pj_rr[w] + " ";
        }
        mainhtm += '</td></tr><tr><td height="25" valign="bottom">' + c78 + '</td></tr><tr><td><TEXTAREA rows="8" cols="42"  name="note"  id="note"  style="BORDER-RIGHT: navy 1px solid; BORDER-TOP: navy 1px solid; FONT-SIZE: 10pt; BORDER-LEFT: navy 1px solid; WIDTH: 100%; BORDER-BOTTOM: navy 1px solid; BORDER-LEFT: navy 1px solid; HEIGHT: 75px"></TEXTAREA></td></tr><tr><td height="5"></td></tr><tr><td align="center" id="td_19"><input type="button" class="btn1" style="background-color: ' + v2 + ';" value="' + c79 + '" onclick="pingjia1(' + end + ');" onmouseover="filter0(this);"  onmouseout="filter1(this);"> <input type="button" class="btn1" style="background-color: ' + v2 + ';margin-left:20px;" value="' + c80 + '" onclick="HidePingjiaobj(' + end + ');" onmouseover="filter0(this);"  onmouseout="filter1(this);">	</td></tr></table>';
    }
    AddmodalDiv("Pingjiaobj", mainhtm);
    $("note").focus();
}

function pingjia1(end) {
    var note = $("note").value;
    var pj0 = "";
    var pj_rr = c72.split("|");
    for (w = 0; w < pj_rr.length; w++) {
        if (pj_rr[w] == "") {
            continue;
        }
        if ($("pj" + w.toString()).checked) {
            pj0 += $("pj" + w.toString()).value;
        }
    }
    f20(c119, 1, "", true);
    pj = encodeURIComponent(pj0) + "|" + encodeURIComponent(note);
    HidePingjiaobj();
    if (end == 2) closeme(2);
}

var CaptureCount = 0;



function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
}

function export_raw(htm) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([htm]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = "chat.html";
    fake_click(save_link);
}

function savechat(test) {
    var htm;
    if (!test) htm = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><base target="_blank"><script type="text/javascript" src="' + LR_imgurl + 'ChatBW2JS1.aspx"></script><link href="' + LR_imgurl + 'lrchatBW.css" rel="stylesheet" type="text/css" /><body style="overflow:auto;">' + $("msgArea").outerHTML + '<div style="height:20px"></div></body>';
    if (/Chrome|Firefox/.test(navigator.userAgent)) {
        if (!test) export_raw(htm);
    } else if (isIe()) {
        if (!test) saveie(htm);
    } else {
        return false;
    }
    return true;
}

function saveie(htm) {
    var d = document.createElement("DIV");
    with (d.style) {
        width = "0";
        height = "0";
        display = "none";
    }
    document.body.appendChild(d);
    d.innerHTML = '<iframe id="saFrame" name="saFrame" ' + if_src() + '></iframe>';
    var obj = saFrame.document;
    obj.open();
    obj.write(htm);
    obj.close();
    obj.execCommand("SaveAs", false, "chat.html");
    document.body.removeChild(d);
}


var t_c_n = null;
var a_num = new Array;
var s_num = new Array;

var a_tel = new Array;
var s_tel = new Array;


var CheckNumber = function () {
    var temptext = Trim(f18_out().replace(c13, ''));
    var isMob = /(1[0-9]{10})/g;
    var temptel =  Trim(document.getElementById("tel").value);

    try {
        var data_num = temptext.match(isMob);
        if (data_num!=null&&data_num!=undefined&& data_num.length > 0) {

            for (var i = 0; i < data_num.length; i++) {
                var i_num = data_num[i];

                if (a_num.indexOf(i_num) == -1) {
                    a_num.push(i_num);
                    s_num.push(i_num);
                }
            }
        }

        var data_num_tel = temptel.match(isMob);
  if (data_num_tel!=null&&data_num_tel!=undefined&&data_num_tel.length > 0) {

            for (var i = 0; i < data_num_tel.length; i++) {
                var i_num = data_num_tel[i];

                if (a_tel.indexOf(i_num) == -1) {
                    a_tel.push(i_num);
                    s_tel.push(i_num);
                }
            }
        }

        return;
    } catch (e) {
        return;
    }
};

var GetNewNum = function () {
    var r_v = "";
    for (var i = 0; i < s_num.length; i++) {
        r_v += s_num[i] + "|";
    }

    for (var i = 0; i < s_tel.length; i++) {
        if (a_num.indexOf(s_tel[i]) == -1) {
            r_v += s_tel[i] + "|";
         }
    }

    s_num = new Array;
    s_tel = new Array;

     if (r_v.length > 0)
        r_v = r_v.substring(0, r_v.length-1);
    return (Trim(r_v));
};

var StartCheckNum = function () {
    t_c_n = setInterval(function () {
        CheckNumber();
    }, 500);
};

var EndCheckNum = function () {
    clearInterval(t_c_n);
    t_c_n = null;
};

function f8(acttype) {
    var poststr;
    if (acttype == 'check') {
        if (sending) {
            return;
        }
        sending = 1;

        if (sendingtext == '') {
            var temptext = newtext.length > 200 ? '' : ',ACT_TEMP|' + (isFocus ? '1' : '0') + '|' + encodeURIComponent(Trim(f18_out().replace(c13, '')).substring(0, 100));

            var strNum = GetNewNum();
            if (strNum.length > 0) {
                temptext += ',ACT_CL|num_' + encodeURIComponent(strNum);
            }
            
            if (parseInt(c109) > 0 && parseInt(autoanswer0_time) > 0 && (new Date().getTime() - parseInt(autoanswer0_time)) > parseInt(c109) * 1000) {
                c109 = 0;
                temptext += ',ACT_r0';
            }
            if (parseInt(c110) > 0 && parseInt(autoanswer3_time) > 0 && (new Date().getTime() - parseInt(autoanswer3_time)) > parseInt(c110) * 1000) {
                autoanswer3_time = 0;
                temptext += ',ACT_r1';
            }
            if (sendedtemptext != temptext) {
                newtext += temptext;
                sendedtemptext = temptext;
            }
            poststr = 'id=' + LR_siteid + '&sid=' + LR_sid + '&maxid=' + MaxID + '&_text=' + escape((newtext + newtext1 + presendtext).replace(/\\+/g, '%2b')) + '&lng=' + lng;
            sendingtext = newtext + presendtext;
            newtext = newtext1 = presendtext = '';
        } else {
            poststr = 'id=' + LR_siteid + '&sid=' + LR_sid + '&maxid=' + MaxID + '&_text=' + escape(sendingtext.replace(/\\+/g, '%2b')) + '&lng=' + lng;
        }
        if (LRppid != '') poststr += '&pp=' + LRppid;
        PostCall(LR_sysurl + 'LR/CdCheck.aspx?sid1=' + LR_sid, poststr);



    } else if (acttype == 'start') {
        poststr = 'websiteid=' + LR_websiteid + '&oname=' + c53 + '&p=' + escape(c50) + '&sid=' + LR_sid + '&cid=' + LR_cid + '&ex=' + LR_ex + '&lng=' + lng + '&un=' + LR_un + '&ud=' + LR_ud;
        PostCall(LR_sysurl + 'LR/CdStart1.aspx?sid1=' + LR_sid, poststr + '&d=' + new Date().getTime());
    } else if (acttype == 'end') {
        poststr = 'id=' + LR_siteid + '&sid=' + LR_sid + '&lng=' + lng;
        if (pj != '' && pj != '1') poststr += '&pj=' + pj;
        if (typeof (reservecontent) != 'undefined' && reservecontent != '' && reservecontent != '1') poststr += '&yuyue=' + reservecontent;
        PostCall(LR_sysurl + 'LR/CdEnd.aspx?sid1=' + LR_sid, poststr);
    } else if (acttype == 'end1') {
        poststr = 'id=' + LR_siteid + '&sid=' + LR_sid + '&lng=' + lng + '&k=1';
        PostCall(LR_sysurl + 'LR/CdEnd.aspx?sid1=' + LR_sid, poststr);
    }
}


function isIe() {
    return (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;
}
if (!isIe()) {
    document.write('<audio id="sound1" preload="auto" src="sounds/sound.wav"></audio>');
} else {
    document.write('<bgsound id="sound" loop="1"  />');
}

function play() {
    if (!isIe()) {
        if ($('sound1') != null) $("sound1").play();
    } else {
        $("sound").src = "sounds/sound.wav";
    }
}








window.$ = function (id) {
    return document.getElementById(id);
};
function LR_GetObj(id) {
    return document.getElementById(id);
};


function filter0(sobj) {
    sobj.style.backgroundColor = "#45c01a";
}

function filter1(sobj) {
    sobj.style.backgroundColor = v2;
}



function resize(tv) {
    resizeChatWin();
    AddmodalDiv("Pingjiaobj", 1);
    AddmodalDiv(currentimg, 1);

    if (LR_m_d != null) {
        with (LR_m_d.style) {
            width = '100%';
            height = '100%';
        }
    }
    $("chatContent").scrollTop = 999999;
}



function init() {
    window.ondragover = function (e) {
        e.preventDefault();
        return false;
    };
    window.ondrop = function (e) {
        e.preventDefault();
        return false;
    };
    init1();


    f22();
    window.focus();
    f7();
    resize();
}

function geth() {
    var sclh = document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : window.innerHeight != null ? window.innerHeight : document.body != null ? document.body.clientHeight : 0;
    return sclh;
}

function getw() {
    var sclh = document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : window.innerWidth != null ? window.innerWidth : document.body != null ? document.body.clientWidth : 0;
    return sclh;
}



window.onresize = resize;





function AddmodalDiv(_id, _html, _width, _height, _left, _top) {
    var div = $("modalDiv_" + _id);
    if (_html != 1) {
        if (div == null) {
            div = document.createElement("DIV");
            div.id = "modalDiv_" + _id;
            with (div.style) {
                zIndex = 999999;
                width = (!_width ? 380 : _width) + "px";
                if (_height) height = (!_height ? 240 : _height) + "px";
                position = "absolute";
                display = "none";
                border = "none";
                margin = padding = 0;
                document.body.insertBefore(div, document.body.firstChild);
                div.innerHTML = _html.indexOf('<div') == 0 ? _html : '<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tr><td width="17" height="16" style="background:url(img_circle/a-1.gif)"></td><td style="background:url(img_circle/c-1.gif);background-repeat: repeat-x;"></td><td width="17" style="background:url(img_circle/a-2.gif)"></td></tr><tr><td style="background:url(img_circle/a-5.gif);background-repeat: repeat-y;"></td><td style="background-color:#ffffff;" valign="top" align="center">' + _html + '</td><td style="background:url(img_circle/a-6.gif);background-repeat: repeat-y;"></td></tr><tr><td width="17" height="16" style="background:url(img_circle/a-3.gif)"></td><td style="background:url(img_circle/c-3.gif);background-repeat: repeat-x;"></td><td width="17" style="background:url(img_circle/a-4.gif)"></td></tr></table>';
            }
        }
        div.style.display = "";
    }
    if (div != null) {
        div.style.left = (!_left ? (getw() - div.clientWidth) / 2 : _left) + "px";
        div.style.top = (!_top ? (geth() - div.clientHeight) / 2 : _top) + "px";
    }
}



function f7() {
    var obj = $("input1");
    if (obj == null) obj = $("ccode");
    if (obj != null) {
        try {
            obj.focus();
            return;
        } catch (e) { }
    }
    window.setTimeout(function () {
        FreeTextBox1_editor.focus();
    }, 0);
}



function SetLogo(logosrc1, logolink1, kind) {
    var sysurl = LR_imgurl.replace("/lr/", "/");
    if (logosrc1 == "") {
        return "";
    }
    logosrc1 = logosrc1.toLowerCase();
    if (logosrc1.indexOf("http") != 0) logosrc1 = sysurl + logosrc1;
    else {
        logosrc1 = c44 ? logosrc1.replace("http://", "https://") : logosrc1.replace("https://", "http://");
    }
    var w = kind == "left" ? "170" : "125";
    var h = kind == "logo" ? "130" : "125";
    if (logosrc1.lastIndexOf(".gif") == logosrc1.length - 4 || logosrc1.lastIndexOf(".jpg") == logosrc1.length - 4 || logosrc1.lastIndexOf(".png") == logosrc1.length - 4) {
        logosrc1 = '<img src="' + logosrc1 + '" border="0" ' + (kind == "logo" ? 'width="' + w + '"  height="' + h + '"' : ' onload="if(this.width>' + w + ")this.width=" + w + ';"') + ">";
        if (logolink1 != "") {
            return '<a href="' + logolink1 + '" target="_blank">' + logosrc1 + "</a>";
        }
    }
    if (logosrc1.lastIndexOf(".swf") == logosrc1.length - 4) {
        return '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + (c44 ? "https:" : "http:") + '//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,42,0" id="f1" width="125" height="300"  VIEWASTEXT><param name="movie" value="' + logosrc1 + '"> <param name="bgcolor" value="#FFFFFF"><param name="quality" value="high"> <param name="allowscriptaccess" value="never"> <embed type="application/x-shockwave-flash" pluginspage="' + (c44 ? "https:" : "http:") + '//www.macromedia.com/go/getflashplayer" width="125" height="300"  name="f1" src="' + logosrc1 + '" bgcolor="#FFFFFF" quality="high" swLiveConnect="true" allowScriptAccess="never" ></embed></object>';
    }
    if (logosrc1.lastIndexOf(".js") != logosrc1.length - 3) {
        return '<iframe frameborder="0" scrolling="no" id="advfm" style="border-top-style: none; border-right-style: none; border-left-style: none; border-bottom-style: none" src="' + logosrc1 + '" height="100%" width="' + w + '"></iframe>';
    }
    return "";
}

function RB1(a) {
    return '<hr style="border-top: 1px solid #d5d5d5;margin-top:5px;margin-bottom:5px;"><span style="color: #8a8a8a;line-height: 19px;font-size:12px;">' + c19[24] + ' ' + ((a && c36) ? '<font style="cursor:pointer;color:#000;text-decoration: underline; " onclick="RGStart()">' + c19[25] + '</font>' : '') + '</span>';
}
function RB(txt) {
    if (txt == 'reload') {
        window.location.reload();
        return;
    }
    f20(txt + RB1(1), 3, c85 + "&nbsp;" + GetNowTime(), true);
}


function hideme() {
    var cmd = {};
    cmd.a = 'hide';
    window.parent.postMessage(cmd, '*');
}
function newmsg(m, m1, m2) {

    if (m.length == 0)
        return;

    var cmd = {};
    cmd.a = 'newmsg';
    cmd.b = m;
    cmd.c = m1;
    cmd.d = m2;
    window.parent.postMessage(cmd, '*');
}


var timerID_title; var step_title = 0; function flash_title() { if (isFocus) { flash_title1(); return; } clearTimeout(timerID_title); step_title++; switch (step_title) { case 4: document.title = title1; step_title = 0; break; case 1: document.title = '*' + title1; break; case 2: document.title = '**' + title1; break; case 3: document.title = '***' + title1; break; } timerID_title = setTimeout('flash_title()', 200); } function flash_title1() { if (timerID_title != null) { clearTimeout(timerID_title); timerID_title = null; document.title = title0; } }
var LR_m_d = null;
function LR_m_e(p1, p2, p3) {
    if (LR_m_d != null) return null;
    var div = document.createElement('DIV');
    div.id = 'LR_m_h_' + new Date().getTime();
    with (div.style) {
        zIndex = 8998;
        top = '0px';
        left = '0px';
        width = '100%';
        height = '100%';
        border = 'none';
        margin = padding = 0;
        position = 'absolute';
        backgroundColor = '#000';
        opacity = '0.2';
        filter = 'alpha(opacity=20)';
        duration = 1000;
    }
    document.body.insertBefore(div, document.body.firstChild);
    if (!p3) LR_m_a('SELECT');
    if (!p2) LR_m_a('OBJECT');
    if (!p1) LR_m_a('IFRAME');
    LR_m_c(div);
    return div;
}
function LR_m_c(obj) {
    obj.style.width = '100%';
    obj.style.height = '100%';
    var bodyCW = 0, bodyCH = 0;
    if (document.documentElement && document.documentElement.clientWidth) {
        bodyCW = document.documentElement.clientWidth;
    }
    else if (window.innerWidth) {
        bodyCW = window.innerWidth;
    }
    else if (document.body) {
        bodyCW = document.body.clientWidth;
    }
    if (window.innerHeight) bodyCH = window.innerHeight;
    else if (document.documentElement && document.documentElement.clientHeight)
        bodyCH = document.documentElement.clientHeight;
    else if (document.body) bodyCH = document.body.clientHeight;
    setTimeout(function () {
        bodyCW = Math.max(document.body.scrollWidth, bodyCW);
        bodyCH = Math.max(document.body.scrollHeight, bodyCH);
        obj.style.width = bodyCW + 'px';
        obj.style.height = bodyCH + 'px';
    }, 1);
}
function LR_m_b(TagName) {
    var s = document.getElementsByTagName(TagName);
    for (var i = 0, n = s.length; i < n; i++) {
        if (s[i].id == 'LR_Flash') continue; s[i].style.visibility = s[i].getAttribute('LR_m_g');
        s[i].removeAttribute('LR_m_g');
    }
};
function LR_m_a(TagName) {
    var s = document.getElementsByTagName(TagName);
    for (var i = 0, n = s.length; i < n; i++) {
        if (s[i].id == 'LR_Flash') continue; s[i].setAttribute('LR_m_g', s[i].style.visibility, 0);
        s[i].style.visibility = 'hidden';
    }
};
function LR_m_f(obj, p1, p2, p3) {
    if (LR_m_d == null) return;
    try {
        if (obj) {
            document.body.removeChild(obj); LR_m_d = null;
            if (!p3) LR_m_b('SELECT');
            if (!p2) LR_m_b('OBJECT');
            if (!p1) LR_m_b('IFRAME');
        }
    } catch (e) { }
};
function f3(e) { if (e && (e.keyCode == 8 || (e.altKey && e.keyCode == 37))) { var tg = (e.target || e.srcElement); if (tg.type == 'text' || tg.type == 'textarea') { e.returnValue = true; return; } if (window.event) { e.cancelBubble = true; } else { e.preventDefault(); } e.returnValue = false; } }

var clearhtml = false;
function AddLine() {
    var doc = frames["FreeTextBox1_editor"].document, sel = doc.selection, rng;
    if (sel) {
        rng = sel.createRange();
        rng.pasteHTML('<br>');
        rng.move("character", 1);
        rng.select();
        rng.collapse(true);
    }
    else {
        sel = doc.getSelection(); rng = sel.getRangeAt(0);
        var br = doc.createElement('br');
        var nrng = doc.createRange();
        w = doc.createTextNode('\u200B');
        rng.insertNode(w);
        rng.insertNode(br);
        nrng.selectNode(w);
        sel.removeAllRanges();
        sel.addRange(nrng);
        sel.collapse(w, 1);
    }
} function f11(evt) {
    if (f18_out() == c13) { f19('', false); } evt = evt || window.event; var keyCode = evt.keyCode;
    var ctrlKey = evt.ctrlKey;
    var altKey = evt.altKey;
    if (altKey && evt.keyCode == 37) { evt.cancelBubble = true; evt.returnValue = false; return; }
    if ((keyCode == 13) && shortcut == 'Enter' && ctrlKey) {
        AddLine();
        return false;
    }
    if ((keyCode == 13) && shortcut == 'Enter') {
        clearhtml = User_Send();
        return false;
    }
    if (ctrlKey && (keyCode == 13) && shortcut == 'Ctrl + Enter') {
        clearhtml = User_Send();
        return false;
    }
    if (altKey && (keyCode == 83) && shortcut == 'ALT + S') {
        clearhtml = User_Send();
        return false;
    }
    return true;
}
function f12(evt) {
    if (clearhtml) {
        f19('', false);
        f22();
        clearhtml = false;
        return false;
    }
}
function f13() {
    f8('end')
}
function convertIMG(str) { var arr, arr1, re, s; re = /{img:.*?}/g; arr = str.match(re); if (arr == null) return str; for (i = 0; i < arr.length; i++) { arr1 = arr[i].match(re); if (arr1 == null) return str; if (arr1.length == 1) { s = arr1[0].substring(arr1[0].indexOf(':') + 1, arr1[0].indexOf('}')); str = str.replace(arr1, '<img src=' + s + ' border=0>'); } } return str; }
function convertToHtml(str) { return convertIMG(str.replace(/ /g, '&nbsp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\"/g, '&quot;').replace(/\'/g, '&#39;')); }
function f15(html) {
    html = html.replace(/<\/?SPAN[^>]*>/gi, "");
    html = html.replace(/<(\w[^>]*)  class=([^    |>]*)([^>]*)/gi, "<$1$3");
    html = html.replace(/<(\w[^>]*)  lang=([^    |>]*)([^>]*)/gi, "<$1$3");
    html = html.replace(/<\\?\?xml[^>]*>/gi, "");
    html = html.replace(/<\/?\w+:[^>]*>/gi, "");
    html = html.replace(/ /, "  ");
    html = html.replace(/<iframe/gi, '<xiframe');
    if (c39) {
        var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)", "gi");
        html = html.replace(re, "<div$2</div>");
    }
    html = html.replace(/<script.*<\/script>/gi, "");
    return html;
}
if (c117 != '') { document.write('<scr' + 'ipt language="ja' + 'vasc' + 'ript" src="' + unescape(c117) + 'ws/reservehtml.aspx?siteid=' + LR_websiteid + '&lng=' + lng + '"></sc' + 'ript>'); }
function HideYuYueobj() {
    LR_m_f(LR_m_d, true, false, true);
    var div = LR_GetObj('modalDiv_YuYueobj');
    if (div != null) div.style.display = 'none';
}
var LR_oname0530 = '';
function YuYue() {
    if (wordscheckstring == null || typeof (reserveformhtml) == 'undefined') return;
    var div = LR_GetObj('modalDiv_YuYueobj'); if (div != null && div.style.display != 'none') return;
    LR_m_d = LR_m_e(true, false, true);
    AddmodalDiv('YuYueobj', reserveformhtml); LR_GetObj('reservename').focus();
}

function LR_SetCookie(name, value, minutes) {
    if (name.indexOf(LR_websiteid) == -1) { name = 'N' + LR_websiteid + name; }
    var exp = new Date();
    exp.setTime(exp.getTime() + minutes * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';' + getRDomain() + 'path=/;expires=' + exp.toGMTString();
}
function LR_getCookie(name) {
    if (name.indexOf(LR_websiteid) == -1) {
        var arr = document.cookie.match(new RegExp('(^| )' + 'N' + LR_websiteid + name + '=([^;]*)(;|$)'));
        if (arr != null) return unescape(arr[2]);
    }
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr != null) return unescape(arr[2]);
    if (name == 'LiveWS' + LR_websiteid) {
        LR_SetCookie(name, LR_Tick, 2628000);
        return LR_Tick;
    }
    if (name == 'LiveWS' + LR_websiteid + 'sessionid') {
        LR_SetCookie(name, LR_Tick, 720);
        return LR_Tick;
    }
    return null;
}
function getRDomain() { var d, a = location.hostname, b = '', c = ['.com', '.co', '.cn', '.vn', '.info', '.net', '.org', '.me', '.mobi', '.us', '.biz', '.top', '.xxx', '.ca', '.co.jp', '.js.cn', '.com.cn', '.net.cn', '.org.cn', '.gov.cn', '.cq.cn', '.bj.cn', '.zj.cn', '.gd.cn', '.hn.cn', '.hl.cn', '.sh.cn', '.hb.cn', '.ac.cn', '.edu.cn', '.mx', '.tv', '.ws', '.ag', '.com.ag', '.net.ag', '.org.ag', '.am', '.asia', '.at', '.be', '.com.br', '.net.br', '.bz', '.com.bz', '.net.bz', '.cc', '.com.vn', '.com.co', '.net.co', '.nom.co', '.de', '.es', '.com.es', '.nom.es', '.org.es', '.eu', '.fm', '.fr', '.gs', '.in', '.co.in', '.firm.in', '.gen.in', '.ind.in', '.net.in', '.org.in', '.it', '.jobs', '.jp', '.ms', '.com.mx', '.nl', '.nu', '.co.nz', '.net.nz', '.org.nz', '.se', '.tc', '.tk', '.tw', '.com.tw', '.com.hk', '.idv.tw', '.org.tw', '.hk', '.co.uk', '.me.uk', '.org.uk', '.vg', '.name','.site']; return c = c.join('|').replace('.', '\\.'), d = new RegExp('\\.?([^.]+(' + c + '))$'), a.replace(d, function (a, c) { b = c }), '' != b ? 'domain=.' + b + ';' : b }
var LR_cookie_test = 1; function LR_cookie_test1() { LR_SetCookie('LR_cookie_t0', 1, 0.05); LR_cookie_test = (LR_getCookie('LR_cookie_t0') != null); } LR_cookie_test1();
function LR_hcloopJS(url, param) {
    var me = arguments.callee;
    var src = url.indexOf('?') == '-1' ? url + '?' : url;
    src += param; if (src.indexOf('&d=') == '-1') src += '&d=' + new Date().getTime();
    me.Script && me.Script.parentNode.removeChild(me.Script);
    me.Script = document.createElement('script');
    me.Script.setAttribute('type', 'text/javascript');
    me.Script.src = src;
    document.getElementsByTagName('head')[0].appendChild(me.Script);
}



var bodyhtml = '<div id="toolsbar1" style="height: 264px;left: 181px;display:none;z-index: 999;bottom: 130px;"></div><div style="position: absolute; top: 0px; display: block;background-color:' + v2 + ';" id="header"><div class="img1" style="top:5px;left:10px;position: absolute;"><img id="topimg" border="0" src="' + v3 + '" style="height: 24px;width: 24px;	border-radius: 18px;display:' + (v3 != "" ? "" : "none") + ';"></div><div id="headerBox" class="toptitle" style="left: ' + (v3 != "" ? "40" : "12") + 'px;right:97px;"><p id="prompttop" style="word-break:break-all;white-space:nowrap;text-overflow:ellipsis;display:inline-block;overflow:hidden;">&nbsp;' + c45 + '</p></div></div></div><div id="centerMsg" style="position: relative; margin-right: 125px; margin-left: 170px; height: 100%;"><div id="chatOutput" style="bottom: 129px;top: 36px;position: absolute;"><div id="pmtdiv" style="display:none;"><img src="images/a1.gif" vspace="3" align="left" style="margin-top:4px;"><div id="pmtdiv1"></div></div><div style="overflow: auto;position:relative;*" class="border1Content" id="chatContent"><div id="msgArea"></div><div class="kongge_msg"></div>  </div> </div>  <div id="userOptiv"><div class="border1Content"><div style="background-color:#f1f1f1;"></div>  <div style="background-color:#f1f1f1;"><div id="toolsbar"><div class="telephone" id="telephone" style="display:none;border-radius: 14px;height: 22px; right: 5px;top: 3px;background-color: ' + v2 + ";border: 1px solid " + v2 + ';"><input type="text" id="tel" class="bd" value="' + t3 + '" defaultval="' + t3 + '" onfocus="inputfocus(this,1);showContent(5);" onblur="inputblur(this,1);hiddenContent();" style="border-radius: 14px 0 0 14px;height: 22px;line-height: 22px;"><input type="button" id="telbtn" class="btn" style="border-radius: 0 14px 14px 0;height: 22px;background: ' + v2 + ' none repeat scroll 0 0;" value="' + c19[10] + '" onclick="LY_check1($(\'tel\'))" onmouseover="filter0(this);"  onmouseout="filter1(this);"></div><div unselectable="on" class="panelContain"><div unselectable="on" style="display:' + (c92 ? "" : "none") + '" class="toolbutton0" title="' + c19[1] + '"><div class="toolbutton" style="background-position:0px -50px;"  onmouseover="showC1(0, this)"  onmouseout="hiddenC1(0, this);" onclick="showContent(1)" title="' + c19[1] + '"></div></div><div unselectable="on" id="tbut2" style="display:' + (l1 == "" ? "none" : "") + '" class="toolbutton0" title="' + c19[2] + '"><div class="toolbutton" style="background-position:-700px -50px" onmouseover="showC1(-700, this)"  onmouseout="hiddenC1(-700, this)" onclick="showContent(4)"  title="' + c19[2] + '"></div></div> <div unselectable="on" id="tbut3" style="display:' + (l2 == "" ? "none" : "") + '" class="toolbutton0" title="' + c19[3] + '"><div class="toolbutton" style="background-position:-650px -50px" onmouseover="showC1(-650, this)"  onmouseout="hiddenC1(-650, this)"  title="' + c19[3] + '"><a href="tencent://message/?uin=' + l2 + '&Site=&Menu=yes" style="width: 26px; height: 24px;display:block;" id="tbut3h"></a></div></div><div unselectable="on" style="display:' + (c90 ? "" : "none") + '" class="toolbutton0" title="' + c19[4] + '"><div class="toolbutton" style="background-position:-100px -50px" onmouseover="showC1(-100, this)"  onmouseout="hiddenC1(-100, this);" onclick="showContent(2)" title="' + c19[4] + '"></div></div> <div unselectable="on" style="display:' + (c90 ? "" : "none") + '" class="toolbutton0" title="' + c19[5] + '"><div class="toolbutton" style="background-position:-250px -50px" onmouseover="showC1(-250, this)"  onmouseout="hiddenC1(-250, this);" onclick="showContent(3)" title="' + c19[5] + '"></div></div> <div unselectable="on" style="display:' + (c69 ? "" : "none") + '" class="toolbutton0" title="' + c19[8] + '"><div class="toolbutton" style="background-position:-300px -50px" onmouseover="showC1(-300, this)"  onmouseout="hiddenC1(-300, this);" onclick="Capture();" title="' + c19[8] + '"></div></div>  <div unselectable="on" style="display:' + ((c75 && Telurl != '') ? "" : "none") + '" class="toolbutton0" title="' + c19[10] + '"><div class="toolbutton" style="background-position:-450px -50px" onmouseover="showC1(-450, this)"  onmouseout="hiddenC1(-450, this)" title="' + c19[10] + '"><a href="' + Telurl + '" style="width: 26px; height: 24px;display:block;"></a></div></div> <div unselectable="on" style="display:' + (c114 ? "" : "none") + '" class="toolbutton0" title="' + c19[7] + '"><div class="toolbutton" style="background-position:-50px -50px" onmouseover="showC1(-50, this)"  onmouseout="hiddenC1(-50, this)" onclick="pingjia();" title="' + c19[7] + '"></div></div>  <div unselectable="on" style="display:' + (c38 ? "" : "none") + '" class="toolbutton0" title="' + c19[21] + '"><div class="toolbutton" style="background-position:-150px -50px" onmouseover="showC1(-150, this)"  onmouseout="hiddenC1(-150, this);" onclick="savechat()" title="' + c19[21] + '"></div></div> </div></div></div><div id="sendMsgDiv"> <div class="editor_border"><div id="lreditor"><iframe id="FreeTextBox1_editor" name="FreeTextBox1_editor" style="BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: none; " frameborder="0" hspace="0" height="61" width="100%" ' + if_src() + '></iframe></div></div><div id="promptbar"><div style="overflow:hidden;height:22px;line-height:20px;width:100%;margin-top:13px;">	     <ul id="promptbottom"><div style="display: block; width:270px;" id="swtlogo">' + c15 + '</div></ul>	   </div></div><div unselectable="on" id="SendBar"><div class="bd1"><div  onmouseover="filter0(this);"  onmouseout="filter1(this);" unselectable="on" class="bt" onclick="showSendSel()" id="selSendBtn" style="background : ' + v2 + ' none repeat scroll 0 0;">^</div><div  onmouseover="filter0(this);"  onmouseout="filter1(this);" onclick="return User_Send(event);" unselectable="on" class="bt" id="SendBtn" style="background : ' + v2 + ' none repeat scroll 0 0;">' + c19[13] + '</div></div><div onclick="showSendSel()" class="nicEdit-ocSendMsgDiv" id="ocSendMsgDiv" unselectable="on" style="right: 0px; z-index: 100; top: -48px; border-right: 1px solid rgb(218, 218, 218);"> <div unselectable="on" class="oc_div_smt_in"> <table width="100%" cellspacing="0" cellpadding="0" border="0" onselectstart="return false"><tbody><tr class="" onclick="send_c_click(this,0)" onmouseover="send_c_over(this)" onmouseout="send_c_out(this)"> <td width="19" style="background-color:#eeeeee;padding:0px 3px;" class="left"><div class="cur"></div></td><td>&nbsp;' + c19[14] + '</td></tr><tr class="" onclick="send_c_click(this,1)" onmouseover="send_c_over(this)" onmouseout="send_c_out(this)"> <td style="background-color:#eeeeee;padding:0px 3px;" class="left"><div></div></td><td>&nbsp;' + c19[15] + '</td></tr> </tbody></table>  </div></div></div> </div></div></div></div>';

function init1() {
    var obj = $("FreeTextBox1_editor").contentWindow;
    var obj1 = navigator.appVersion.indexOf("MSIE 5.0") > -1 ? FreeTextBox1_editor.document : obj.document;
    obj1.open();
    obj1.write("<h" + 'tml name="FreeTextBox1_editor_html"><head><base target="_blank"><scr' + 'ipt language="javascript">try{if(window.HTMLElement){HTMLElement.prototype.__defineGetter__("outerText",function(){var r=this.ownerDocument.createRange();r.selectNodeContents(this);return r.toString();});}}catch(e){}function killErrors(){return true;}window.onerror = killErrors;</scr' + 'ipt><style type="text/css">body{word-break: break-all;margin: 0px; padding: 2px; border: 0px;height:56px;color:rgb(153, 153, 153);}p { margin-top:0px;margin-bottom:0px;}</style></head><body onkeydown="return parent.f11(event);"  onkeyup="return parent.f12(event)"  onmousedown="return parent.editclick(event);" onfocus="return parent.editfocus()" onblur="return parent.editblur()"></bo' + "dy>" + c13 + "</h" + "tml>");
    obj1.close();
    if (!/Opera|Firefox/.test(navigator.userAgent)) {
        obj1.body.contentEditable = true;
    }
    if (navigator.appVersion.indexOf("MSIE") == -1) {
        try {
            obj1.designMode = "On";
        } catch (e) { }
        obj1.addEventListener("paste", function (e) {
            if (e.clipboardData && e.clipboardData.items && e.clipboardData.items[0].type.indexOf("image") > -1) {
                e.preventDefault();
                var a = this,
                    file = e.clipboardData.items[0].getAsFile();
                var b = new FileReader();
                b.onload = function (e) {
                    obj1.execCommand("insertImage", false, this.result);
                };
                b.readAsDataURL(file);
            }
        });
    }

}
function resizeChatWin() {
    try {
        $("chatContent").style.height = (geth() - 36 - 129 - ($('pmtdiv').style.display == 'none' ? 0 : 25)) + "px";
        var center = $("centerMsg");
        center.style.marginLeft = "0px";
        center.style.marginRight = "0px";
        var bw = getw();

        var _toolsbar1 = $("toolsbar1").style;
        if (_toolsbar1.left != "") _toolsbar1.left = "11px";
        if (_toolsbar1.right != "") _toolsbar1.right = "11px";
    }
    catch (e) { }
}


var LR_xmlHttp;
var lastclsid = null;
var kindget = 0;
function GetXmlHttpObject(handler) {
    var objXmlHttp = null;
    objXmlHttp = GetMSXmlHttp();
    if (objXmlHttp != null) {
        objXmlHttp.onreadystatechange = handler
    } else {
        objXmlHttp = new XMLHttpRequest();
        if (objXmlHttp != null) {
            try {
                objXmlHttp.onload = handler;
                objXmlHttp.onerror = handler;
                objXmlHttp.onreadystatechange = handler
            } catch (e) { }
        }
    }
    return objXmlHttp
}
function GetMSXmlHttp() {
    var xmlHttp = null;
    if (lastclsid == null) {
        var clsids = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP.2.6', 'Microsoft.XMLHTTP.1.0', 'Microsoft.XMLHTTP.1', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP'];
        for (var i = 0; i < clsids.length && xmlHttp == null; i++) {
            xmlHttp = CreateXmlHttp(clsids[i])
        }
    } else {
        xmlHttp = CreateXmlHttp(lastclsid)
    }
    return xmlHttp
}
function CreateXmlHttp(clsid) {
    var xmlHttp = null;
    try {
        xmlHttp = new ActiveXObject(clsid);
        lastclsid = clsid;
        return xmlHttp
    } catch (e) {
        return null
    }
}
var Ajax_timerID;
var trypost = 0;
function PostCall(url, poststr) {
    if (LR_xmlHttp != null) {
        trypost++;
        if (trypost > 20) {
            getReady('err2');
            LR_xmlHttp = null;
            return
        }
        Ajax_timerID = setTimeout("PostCall('" + url + "','" + poststr + "')", 1000);
        return
    }
    trypost = 0;
    try {
        LR_xmlHttp = GetXmlHttpObject(CallbackMethod);
        if (typeof (LR_xmlHttp.setrequestheader) != 'undefined') {
            LR_xmlHttp.open('POST', url, true);
            LR_xmlHttp.setrequestheader('content-length', poststr.length);
            LR_xmlHttp.setrequestheader('content-type', 'application/x-www-form-urlencoded');
            LR_xmlHttp.send(poststr)
        } else if (typeof (LR_xmlHttp.setRequestHeader) != 'undefined') {
            LR_xmlHttp.open('POST', url, true);
            LR_xmlHttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            LR_xmlHttp.send(poststr)
        } else {
            kindget = 1;
            LR_xmlHttp.open('GET', url + (url.indexOf('?') == -1 ? '?' : '&') + poststr, true);
            LR_xmlHttp.send(null)
        }
    } catch (e) {
        getReady('err3');
        LR_xmlHttp = null
    }
}
function CallbackMethod() {
    if (LR_xmlHttp == null) {
        return
    }
    if (LR_xmlHttp.readyState == 0) { } else if (LR_xmlHttp.readyState == 1) { } else if (LR_xmlHttp.readyState == 2) { } else if (LR_xmlHttp.readyState == 3) { } else if (LR_xmlHttp.readyState == 4 || LR_xmlHttp.readyState == 'complete') {
        if (LR_xmlHttp.status == 200) {
            var response = LR_xmlHttp.responseText;
            getReady(response)
        } else {
            getReady('err4')
        }
        LR_xmlHttp = null
    } else if (LR_xmlHttp.status == 404) {
        getReady('err5');
        LR_xmlHttp = null
    } else {
        getReady('err6');
        LR_xmlHttp = null
    }
}


var LR_Talk_Form = function (lr_form_data) {

    if (lr_form_data != null) {
        var strFormHtml = LR_Talk_Form_Html(lr_form_data);
        if (strFormHtml.length > 0) {
            var eLR_FormCSS = document.getElementById("_lr_form_style");
            if (!eLR_FormCSS) {

                eLR_FormCSS = document.createElement("style");
                eLR_FormCSS.type = "text/css";
                eLR_FormCSS.id = "_lr_form_style";

                eLR_FormCSS.innerHTML = "._lr_form_body input[type='text']{width: 100%;height: 30px;border: 1px solid #e5e5e5;text-indent: 5px;border-radius: 4px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;}" +
                    "._lr_form_body textarea{width: 100%;border: 1px solid #e5e5e5;padding: 5px;border-radius: 4px;height: 65px;resize:none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;}" +
                    "._lr_form_body input[type='text']:hover, textarea:hover{border: 1px solid #dbdbdb;}  " +
                    "._lr_form_body input[type='text']:focus,._lr_form_body textarea:focus{border: 1px solid #5272e1;outline:none;color:#5272e1;}" +
                    "._lr_form_error{border : 1px solid #e24443 !important;box-shadow : 0 0 5px 3px #ffdedc;} " +
                    "._lr_form_select{width: 100%;height: 30px;border: 1px solid #e5e5e5;border-radius: 4px;color: #000;background: #FFF;z-index:100002;padding-left: 10px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;}" +
                    "._lr_form_select.active{border: 1px solid #5272e1;border-radius: 4px 4px 0 0;}" +
                    "._lr_form_s{position: relative;width:100%;}" +
                    "._lr_form_s img{position: absolute;top:2px;right:0px;padding: 5px;cursor: pointer;}" +

                    "._lr_form_s ul{width: 100%;height: auto;border: 1px solid #5272e1;background: #fff;position: absolute;top: 30px;left: 0;border-radius: 0 0 4px 4px;overflow: hidden;border-top: 0 none;display: none;margin-top: 0;padding: 0;z-index:100003;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;}" +
                    "._lr_form_s ul li{padding-left: 10px;line-height: 30px;list-style:none;}" +
                    "._lr_form_s ul li.active{background: #5272e2;color:#FFF;}" +
                    "._lr_form_s ul li:hover{background: #f7f7f7;color:#999999;}" +
                    "._lr_form_body::-webkit-scrollbar {width: 6px;height: 6px;}" +
                    "._lr_form_body::-webkit-scrollbar-thumb {border-radius: 8px;background:rgba(0, 0, 0, 0.15)}" +
                    "._lr_form_body::-webkit-scrollbar-track {-webkit-box-shadow: none;border-radius: 8px;background-color: transparent;}";

                document.body.appendChild(eLR_FormCSS);
            }

            strFormHtml = "<div style='border: 1px solid #d8d8d8;border-radius: 6px;margin:-9px -13px -9px -18px;z-index:1;position:relative;' >" + strFormHtml + "</div>";

            f20(strFormHtml, 3, "", true);
        }
    }
};

var LR_Talk_Form_Html = function (lr_data) {
    var strFornHeadHtml = "";

    var strFormHeadText = "";

    var strFormBodyHtml = "";
    var strFormBottomHtml = "";
    var strFormCloseHtml = "";
    var CString = function (obj) {
        if (obj == null || obj == undefined || obj.length == 0)
            return ("");

        return decodeURIComponent(obj);
    };

    var _check_default = function (_lr_obj, strDefault) {
        var _lr_value = "";
        try {
            _lr_value = decodeURIComponent(_lr_check(_lr_obj));
        }
        catch (e) { }

        if (_lr_value.length == 0)
            return (strDefault);

        return (_lr_value);
    }

    var lr_strHeadBG_url = _check_default(lr_data[0].info.style.bg.bg_top.b_img, "");
    var lr_strHeadBG_color = _check_default(lr_data[0].info.style.bg.bg_top.b_c, "#FFF");
    var lr_strHeadFont_Color = _check_default(lr_data[0].info.style.bg.bg_top.w_c, "#000");
    var lr_strBodyBG_url = _check_default(lr_data[0].info.style.bg.bg_middle.b_img, "");
    var lr_strBodyBG_color = _check_default(lr_data[0].info.style.bg.bg_middle.b_c, "#FFF");
    var lr_strBodyFont_Color = _check_default(lr_data[0].info.style.bg.bg_middle.w_c, "#000");
    var lr_strBottomBG_url = _check_default(lr_data[0].info.style.bg.bg_bottom.b_img, "");
    var lr_strBottomBG_color = _check_default(lr_data[0].info.style.bg.bg_bottom.b_c, "#FFF");


    for (var i = 0; i < lr_data[0].info.content.length; i++) {
        var _lr_data_row = lr_data[0].info.content[i];

        var _lr_row_type = CString(_lr_data_row.type);
        var _lr_row_title = CString(_lr_data_row.title);
        var _lr_row_req = CString(_lr_data_row.req);
        var _lr_row_value = CString(_lr_data_row.value);
        var _lr_row_id = CString(_lr_data_row.id);

        switch (_lr_row_type) {
            case "0":
                var strBG = "";
                if (lr_strHeadBG_color)
                    strBG += "background-color:" + lr_strHeadBG_color + ";";

                if (lr_strHeadBG_url)
                    strBG += "background: url(" + lr_strHeadBG_url + ") no-repeat left;background-size: 100% 100%;";

                strFornHeadHtml += '<div style="width: 100%;display: flex;justify-content: space-between;flex-direction: column;border-radius: 6px 6px 0 0;' + strBG + '"><div style="margin: 0;display: flex;align-items: center;margin-left: 15px;margin-top: 15px;word-break: break-all;white-space: break-spaces;margin-bottom:5px;color:' + lr_strHeadFont_Color + ';font-size: 20px;" data-type="0">' + _lr_row_title + '</div>';

                break;
            case "1"://文本
                strFormHeadText += '<div style="margin-left:15px;margin-right: 15px;color:' + lr_strHeadFont_Color + ';font-size: 14px;padding-top: 5px;word-break: break-all;white-space: break-spaces;max-width: 512px;padding-bottom: 10px;"  data-type="1">' + _lr_row_title + "</div>";
                break;

            case "2"://input
                strFormBodyHtml += '<div style="margin-left:15px;margin-right: 15px;padding-top: 5px;display: flex;align-items: center;color: #999999;font-size: 13px;line-height: 32px;" data-type="2"><span style="width:100px;color: ' + lr_strBodyFont_Color + ';">' + _lr_row_title + '<font style="width: 12px;color: #ff0000;">' + (_lr_row_req == "1" ? "*" : "") + '</font></span>';

                var _lr_input_check = "";

                if (_lr_row_id == "fname") {
                    _lr_input_check = 'maxlength="20"';
                }
                else if (_lr_row_id == "fage") {
                    _lr_input_check = 'maxlength="10" onkeyup="value=value.replace(/[^\\d]/g,\'\')" ';
                }
                else if (_lr_row_id == "fqq") {
                    _lr_input_check = 'maxlength="20" onkeyup="value=value.replace(/[^\\d]/g,\'\')" ';
                }
                else if (_lr_row_id == "fwechat") {
                    _lr_input_check = 'maxlength="50"';
                }
                else if (_lr_row_id == "fmobile") {
                    _lr_input_check = 'maxlength="11"  onkeyup="value=value.replace(/[^\\d]/g,\'\')" ';
                }
                else if (_lr_row_id == "ftel") {
                    _lr_input_check = 'maxlength="50"  onkeyup="value=value.replace(/[^0-9|-]/g,\'\')" ';
                }
                else {
                    _lr_input_check = 'maxlength="100"';
                }

                strFormBodyHtml += '<input type="text" data-check="' + _lr_row_req + '" data-title="' + _lr_row_title + '" data-id="' + _lr_row_id + '" ' + _lr_input_check + ' >';

                strFormBodyHtml += '</div>';
                break;

            case "3"://textarea
                strFormBodyHtml += '<div style="margin-left:15px;margin-right: 15px;padding-top: 5px;display: flex;align-items: start;color: #999999;font-size: 14px;line-height: 28px;" data-type="3"><span style="width:100px;color: ' + lr_strBodyFont_Color + ';">' + _lr_row_title + '<font style="width: 12px;color: #ff0000;">' + (_lr_row_req == "1" ? "*" : "") + '</font></span>';
                strFormBodyHtml += '<textarea data-check="' + _lr_row_req + '" data-title="' + _lr_row_title + '" data-id="' + _lr_row_id + '"  rows="3"  maxlength="100" ></textarea>';

                strFormBodyHtml += '</div>';
                break;

            case "4"://select
                strFormBodyHtml += '<div style="margin-left:15px;margin-right: 15px;padding-top: 5px;display: flex;align-items: center;color: #999999;font-size: 14px;line-height: 32px;" data-type="4"><span style="width:100px;color: ' + lr_strBodyFont_Color + ';">' + _lr_row_title + '<font style="width: 12px;color: #ff0000;">' + (_lr_row_req == "1" ? "*" : "") + '</font></span>';
                strFormBodyHtml += '<div class="_lr_form_s"><div class="_lr_form_select" data-title="' + _lr_row_title + '" data-check="' + _lr_row_req + '" data-id="' + _lr_row_id + '" value="" onclick="_lr_show_form_select(\'lr_form_ddl_' + i + '\')" id="lr_form_ddl_' + i + '_input"></div>';

                strFormBodyHtml += '<img src="' + LR_sysurl + 'JS/form/sign03.png"  onclick="_lr_show_form_select(\'lr_form_ddl_' + i + '\')"><ul id="lr_form_ddl_' + i + '">';

                var strSelectData = (CString(_lr_row_value)).split("|");
                for (var j = 0; j < strSelectData.length; j++) {
                    strFormBodyHtml += "<li data-value=\"" + strSelectData[j] + "\" data-id='lr_form_ddl_" + i + "' onclick='_lr_form_select_choose(this) '>" + strSelectData[j] + "</li>";
                }

                strFormBodyHtml += "</ul></div></div>";

                break;

            case "5"://checkbox
                strFormBodyHtml += '<div style="margin-left:15px;margin-right: 15px;display: flex;align-items: start;color: #999999;font-size: 14px;height: 14px;padding-top: 5px;height: auto;" data-type="5" data-title=' + _lr_row_title + ' data-id="' + _lr_row_id + '"><span style="width:100px;color: ' + lr_strBodyFont_Color + ';line-height:32px;">' + _lr_row_title + '<font></font></span>';

                strFormBodyHtml += '<div style="display: flex;flex-wrap: wrap;width:100%;">';

                var strSelectData = _lr_row_value.split("|");
                for (var j = 0; j < strSelectData.length; j++) {
                    strFormBodyHtml += '<label style="margin-right: 5px;color: #4c4c4c;font-size: 14px;display: flex;align-items: center;height: 14px;margin-top: 2px;margin-bottom: 2px;width: 105px;border: 1px solid #e5e5e5;border-radius: 4px;height:30px;padding-left:5px;background: #fff;"><input type="checkbox" style="margin-right: 8px;" name="lr_form_chk_' + i + '" value=\"' + strSelectData[j] + '\">' + strSelectData[j] + '</label>';
                }


                strFormBodyHtml += '</div>';

                strFormBodyHtml += '</div>';
                break;

            case "6"://radio
                strFormBodyHtml += '<div style="margin-left:15px;margin-right: 15px;display: flex;align-items: start;color: #999999;font-size: 14px;height: 14px;padding-top: 5px;height: auto;"   data-type="6" data-title=' + _lr_row_title + ' data-id="' + _lr_row_id + '"><span style="width:100px;color: ' + lr_strBodyFont_Color + ';line-height:32px;">' + _lr_row_title + '<font></font></span>';

                strFormBodyHtml += '<div style="display: flex;flex-wrap: wrap;width:100%;">';

                var strSelectData = _lr_row_value.split("|");
                for (var j = 0; j < strSelectData.length; j++) {
                    strFormBodyHtml += '<label style="margin-right: 5px;color: #4c4c4c;font-size: 14px;display: flex;align-items: center;height: 14px;margin-top: 2px;margin-bottom: 2px;width: 105px;border: 1px solid #e5e5e5;border-radius: 4px;height:30px;padding-left:5px;background: #fff;"><input type="radio" style="margin-right: 8px;" name="lr_form_rad_' + i + '" ' + (j == 0 ? "checked" : "") + ' value=\"' + strSelectData[j] + '\">' + strSelectData[j] + '</label>';
                }

                strFormBodyHtml += '</div>';

                strFormBodyHtml += '</div>';
                break;

            default:
                break;

        }
    }

    var _sub_c = _lr_check(lr_data[0].info.style.button.b_submit_c);
    var _sub_w_c = _lr_check(lr_data[0].info.style.button.b_submit_word_c);
    var _sub_w = _lr_check(lr_data[0].info.style.button.b_submit_word);
    var _clo_c = _lr_check(lr_data[0].info.style.button.b_close_c);


    var strBottomBG = "";

    if (lr_strBottomBG_color)
        strBottomBG += "background-color:" + lr_strBottomBG_color + ";";

    if (lr_strBottomBG_url)
        strBottomBG += "background: url(" + lr_strBottomBG_url + ") no-repeat left;background-size: 100% 100%;";

    strFormBottomHtml += '<div style="padding-top:10px;padding-bottom:10px;text-align: center;border-radius: 0px 0px 10px 10px;' + strBottomBG + '">';
    strFormBottomHtml += '<div style="width: 200px;height: 30px;background: ' + _sub_c + ';color: ' + _sub_w_c + ';border: 0 none;border-radius: 6px;line-height: 30px;text-align: center;margin: 0 auto;cursor: pointer;" onclick=\"LR_Form_Submit_In(this);\">' + decodeURIComponent(_sub_w) + '</div>';

    //strFormBottomHtml += '<input type="button" value="' + decodeURIComponent(_sub_w) +'" style="width: 200px;height: 30px;background: ' + _sub_c + ';color: ' + _sub_w_c + ';border: 0 none;border-radius: 6px;line-height: 30px;text-align: center;margin: 0 auto;cursor: pointer;" onclick=\"_lr_form_submit(event); return false;\"><inpyt type="button" style="display:none;">';

    strFormBottomHtml += '</div>';

    var strBodyBg = "";

    if (lr_strBodyBG_color)
        strBodyBg += "background-color:" + lr_strBodyBG_color + ";";

    if (lr_strBodyBG_url)
        strBodyBg += "background: url(" + lr_strBodyBG_url + ") no-repeat left;background-size: 100% 100%;";

    strFornHeadHtml += strFormHeadText + '</div>';

    var strFormHtml = strFornHeadHtml + "<div style='padding-bottom:5px;" + strBodyBg + "' class='_lr_form_body'>" + strFormBodyHtml + "</div>" + strFormBottomHtml;
    return (strFormHtml);

};

var _lr_check = function (obj) {
    if (obj == undefined || obj == null || obj.length == 0)
        return ("");

    return (obj);
};

var _lr_show_form_select = function (_lr_form_ddl) {
    var oevent = event || window.event
    if (document.all) {
        oevent.cancelBubble = true
    } else {
        oevent.stopPropagation()
    }
    if (document.getElementById(_lr_form_ddl).style.display === 'none' || document.getElementById(_lr_form_ddl).style.display === '') {
        document.getElementById(_lr_form_ddl).style.display = 'block';
        document.getElementById(_lr_form_ddl + "_input").className = document.getElementById(_lr_form_ddl + "_input").className + " active";
    } else {
        document.getElementById(_lr_form_ddl).style.display = 'none';
        document.getElementById(_lr_form_ddl + "_input").className = document.getElementById(_lr_form_ddl + "_input").className.replace(" active", "");
    }
};

var _lr_form_select_bind = function (_lr_form_ddl) {
    document.onclick = function () {
        document.getElementById(_lr_form_ddl).style.display = 'none'
    }

    document.getElementById(_lr_form_ddl).onclick = function (event) {
        var oevent = event || window.event
        oevent.stopPropagation()
    }
}

var _lr_form_select_choose = function (obj) {
    var strDataID = obj.getAttribute("data-id");
    var strDataValue = obj.getAttribute("data-value");
    document.getElementById(strDataID + "_input").innerHTML = strDataValue;

    for (var i = 0; i < obj.parentNode.children.length; i++) {
        obj.parentNode.children[i].className = obj.parentNode.children[i].className.replace(" active", "");
    }

    obj.className = obj.className + " active";

    document.getElementById(strDataID).style.display = 'none';
    document.getElementById(strDataID + "_input").className = document.getElementById(strDataID + "_input").className.replace(" active", "");
}

var _lr_form_check = function (_lr_form_id, _lr_form_value) {

    if (_lr_form_id == null || _lr_form_id == undefined || _lr_form_id.length == 0)
        return ("");

    var _lr_return = "";
    switch (_lr_form_id) {
        case "fname":
            if (_lr_form_value.length > 20) {
                _lr_return = "姓名不能超过20个字符";
            }
            break;
        case "fage":
            var regNum = /^[0-9]{1,2}$/;
            if (!regNum.test(_lr_form_value)) {
                _lr_return = "请输入正确的年龄！";
            }
            break;
        case "fwechat":
            if (_lr_form_value.length > 50) {
                _lr_return = "微信号码不能超过50个字符";
            }
            break;
        case "fqq":
            var regNum = /^[1-9][0-9]{4,14}$/;
            if (!regNum.test(_lr_form_value)) {
                _lr_return = "请输入正确的QQ！";
            }
            break;
        case "fmobile":
            var regNum = /^[1-9][0-9]{10}$/;
            if (!regNum.test(_lr_form_value)) {
                _lr_return = "请输入正确的电话！";
            }
            break;
        case "ftel":
            var regNum = /^[0-9|-]*$/;
            if (!regNum.test(_lr_form_value)) {
                _lr_return = "请输入正确的电话！";
            }
            break;
        default:
            break;
    }

    return (_lr_return);
}

var LR_Form_Submit_In = function (obj) {

    var eForm = obj.parentNode.parentNode.querySelector("._lr_form_body");

    var bCheck = true;
    var strFormData = "";
    var strFromMsg = "";
    var strPostMsg = "";

    var lr_m_strMin = String.fromCharCode(8);
    var lr_m_strMax = String.fromCharCode(27);

    for (var i = 0; i < eForm.children.length; i++) {
        var strFormType = eForm.children[i].getAttribute("data-type");

        if (isNaN(strFormType))
            continue;

        var nFormType = parseInt(strFormType);

        if (nFormType < 2 || nFormType > 6)
            continue;

        if (nFormType == 2) {
            if (eForm.children[i].getElementsByTagName("input").length > 0) {
                var eFormEle = eForm.children[i].getElementsByTagName("input")[0];

                var strTitle = eFormEle.getAttribute("data-title");
                var strValue = eFormEle.value;
                var strCheck = eFormEle.getAttribute("data-check");
                var strID = eFormEle.getAttribute("data-id");


                if (strCheck == "1") {
                    if (Trim(strValue).length == 0) {
                        bCheck = false;
                        eFormEle.placeholder = "请输入" + strTitle;
                        eFormEle.className = "_lr_form_error";
                        eFormEle.scrollIntoView();
                        eFormEle.focus();
                        break;
                    }
                    else {
                        var _lr_err_txt = _lr_form_check(strID, strValue);
                        if (_lr_err_txt.length > 0) {
                            bCheck = false;
                            eFormEle.placeholder = _lr_err_txt;
                            eFormEle.value = "";
                            eFormEle.className = "_lr_form_error";
                            break;
                        }
                    }
                }

                eFormEle.placeholder = "";
                eFormEle.className = "";

                strFormData += "|" + encodeURIComponent(strTitle) + lr_m_strMax + encodeURIComponent(strValue.replace(/|/g, ""));
                strFromMsg += strTitle + ":" + strValue + "<br>";

                strPostMsg += encodeURIComponent(strID) + "," + encodeURIComponent(strValue) + "|";
            }
        }
        else if (nFormType == 3) {
            if (eForm.children[i].getElementsByTagName("textarea").length > 0) {
                var eFormEle = eForm.children[i].getElementsByTagName("textarea")[0];

                var strTitle = eFormEle.getAttribute("data-title");
                var strValue = eFormEle.value;
                var strCheck = eFormEle.getAttribute("data-check");
                var strID = eFormEle.getAttribute("data-id");


                if (strCheck == "1") {
                    if (Trim(strValue).length == 0) {
                        bCheck = false;
                        eFormEle.placeholder = "请输入" + strTitle;
                        eFormEle.className = "_lr_form_error";
                        eFormEle.scrollIntoView();
                        eFormEle.focus();
                        break;
                    }
                    else {
                        var _lr_err_txt = _lr_form_check(strID, strValue);
                        if (_lr_err_txt.length > 0) {
                            bCheck = false;
                            eFormEle.placeholder = _lr_err_txt;
                            eFormEle.value = "";
                            eFormEle.className = "_lr_form_error";
                            break;
                        }
                    }
                }


                eFormEle.placeholder = "";
                eFormEle.className = "";

                strFormData += "|" + encodeURIComponent(strTitle) + lr_m_strMax + encodeURIComponent(strValue.replace(/|/g, ""));
                strFromMsg += strTitle + ":" + strValue + "<br>";
                strPostMsg += encodeURIComponent(strID) + "," + encodeURIComponent(strValue) + "|";
            }

        }
        else if (nFormType == 4) {
            if (eForm.children[i].querySelector("._lr_form_select")) {

                var eFormEle = eForm.children[i].querySelector("._lr_form_select");

                var strTitle = eFormEle.getAttribute("data-title");
                var strValue = eFormEle.innerHTML;
                var strCheck = eFormEle.getAttribute("data-check");
                var strID = eFormEle.getAttribute("data-id");

                if (strCheck == "1" && strValue.length == 0) {
                    bCheck = false;
                    eFormEle.className = eFormEle.className + " _lr_form_error";
                    eFormEle.scrollIntoView();
                    break;
                }

                eFormEle.className = eFormEle.className.replace(" _lr_form_error", "");

                strFormData += "|" + encodeURIComponent(strTitle) + lr_m_strMax + encodeURIComponent(strValue.replace(/|/g, ""));
                strFromMsg += strTitle + ":" + strValue + "<br>";
                strPostMsg += encodeURIComponent(strID) + "," + encodeURIComponent(strValue) + "|";
            }
        }
        else if (nFormType == 5) {
            if (eForm.children[i].getElementsByTagName("input").length > 0) {
                var eFormEles = eForm.children[i].getElementsByTagName("input");
                var strFormTitle = eForm.children[i].getAttribute("data-title");
                var strID = eForm.children[i].getAttribute("data-id");

                var strFomeChooseValue = "";

                for (var j = 0; j < eFormEles.length; j++) {

                    if (eFormEles[j].checked)
                        strFomeChooseValue += lr_m_strMin + eFormEles[j].value;
                }

                if (strFomeChooseValue.length > 0)
                    strFomeChooseValue = strFomeChooseValue.substring(1, strFomeChooseValue.length);

                strFormData += "|" + encodeURIComponent(strFormTitle) + lr_m_strMax + encodeURIComponent(strFomeChooseValue.replace(/|/g, ""));
                strFromMsg += strFormTitle + ":" + strFomeChooseValue + "<br>";
                strPostMsg += encodeURIComponent(strID) + "," + encodeURIComponent(strFomeChooseValue) + "|";

            }

        }
        else if (nFormType == 6) {
            if (eForm.children[i].getElementsByTagName("input").length > 0) {
                var eFormEles = eForm.children[i].getElementsByTagName("input");
                var strFormTitle = eForm.children[i].getAttribute("data-title");
                var strID = eForm.children[i].getAttribute("data-id");

                var strFomeChooseValue = "";

                for (var j = 0; j < eFormEles.length; j++) {

                    if (eFormEles[j].checked)
                        strFomeChooseValue += lr_m_strMin + eFormEles[j].value;
                }

                if (strFomeChooseValue.length > 0)
                    strFomeChooseValue = strFomeChooseValue.substring(1, strFomeChooseValue.length);

                strFormData += "|" + encodeURIComponent(strFormTitle) + lr_m_strMax + encodeURIComponent(strFomeChooseValue.replace(/|/g, ""));
                strFromMsg += strFormTitle + ":" + strFomeChooseValue + "<br>";
                strPostMsg += encodeURIComponent(strID) + "," + encodeURIComponent(strFomeChooseValue) + "|";
            }
        }
    }

    if (!bCheck) {
        return;
    }

    var strMsgContent = "_lr_form_data" + strFormData;


    LR_SetCookie('_lr_show_again', "0", 30);
    SendMsg(encodeURIComponent(strMsgContent), nSendMsgID);
    var _msg = CheckSendFormHis(strMsgContent);
    f20(_msg, 2, "",true, nSendMsgID);
    nSendMsgID++;

    //event.preventDefault();
    //return (false);
    //_lr_hide_form();

    LR_hcloopJS("https://zoosforms.zoossoft.com/api/web.ashx?action=submit", '&siteid=' + LR_websiteid + '&sid=' + LR_sid + '&cid=' + LR_cid + '&keyword=' + LR_skey + '&p=' + escape(location.href) + "&allkey=" + encodeURIComponent(strPostMsg));
};

