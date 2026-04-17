$(function () {
    console.log("go");
    $(".imtypeBox select")
        .off("change")
        .on("change", function () {
            var optionVal = $(".imtypeBox option:selected").val();
            $(".imtypeBox span").html(optionVal);
            if (optionVal.indexOf("WeChat") != -1) {
                $(".imvalueBox-1").hide();
                $(".imvalueBox-2").show();
                $(".pn,.cc").val("");
            } else {
                $(".imvalueBox-2").hide();
                $(".imvalueBox-1").show();
                $(".inp-box").val("");
            }
        });
    function fnCheck() {
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        // var capacity = $("#capacity").val().trim();
        var content = $("#content").val().trim();

        // name
        if (name.length == 0) {
            alert("Please write your name!");
            return false;
        }
        // email
        var reMail = /^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd]{2,}$/;
        if (email.length == 0) {
            alert("Please write your email!");
            return false;
        } else if (!reMail.test(email)) {
            alert("Please check your email format!");
            return false;
        }
        //contact
        var optionVal = $("#imtype option:selected").val();
        if (optionVal.indexOf("WeChat") == -1) {
            var countryCode = $(".cc").val().trim();
            var phoneNum = $(".pn").val().trim();
            var str = countryCode + "+" + phoneNum;

            if (str.trim().length > 1) {
                if (countryCode.length == 0 && phoneNum.length > 0) {
                    alert("Please fill the country code!");
                    return false;
                }
                if (countryCode.length > 0 && phoneNum.length == 0) {
                    alert("Please fill in the telephone number!");
                    return false;
                }
                $(".imvalueBox-2 #imvalue").val(str);
            } else {
                alert("Please write your phone number, WeChat or WhatsApp!");
                return false;
            }
        } else {
            var imvalue = $(".inp-box").val().trim();
            if (imvalue.length == 0) {
                alert("Please write your phone number, WeChat or WhatsApp!");
                return false;
            } else {
                $(".imvalueBox-2 #imvalue").val(imvalue);
            }
        }

        //capacity
        // if (capacity.length == 0) {
        //     alert("Please fill in capacity!");
        //     return false;
        // }

        // //content
        if (content.length == 0) {
            alert("Please write your requirements!");
            return false;
        }
        return true;
    }

    $(".btn-submit").click(function () {
        return fnCheck();
    });

    var url = window.location.href;

    if (url.indexOf("shibangmac") != -1) {
        var inp_obj = $('input[name="capacity"]');
        if (inp_obj) {
            inp_obj.parent().remove();
        }
        $("form textarea").attr("placeholder", "Which product are you interested in?");
    }
});