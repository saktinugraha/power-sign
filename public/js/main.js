function cekall()
{
	if($("#mainbox").prop("checked") == true)
		{$(".chk").prop("checked",true);}
	else
		{$(".chk").prop("checked",false);}
}
// fungsi untuk menghapus data query menggunakan ajax. sehingga langsung memanggil fungsi dibawah ini.
// fungsi hapus ini sudah dinamis, jadi tinggal memanggil variable yang sesuai dengan nama module dan file
function hapus(mod,id,rowid) {
	if (confirm('Apakah anda yakin ingin menghapus data?'))
		{
			$.ajax({
				type: 'DELETE',
				url: "/cms/"+mod+"/"+id,
				success:function(result,status){
					response = result;
					if(response.affected >= 1)
					{
						$(".notification").html(response.message);
						toast("Data Terpilih berhasil dihapus");
						$("#"+rowid+id).fadeOut();
					}
					else
					{
						$(".notification").html(response.message);
					}
				}
			});
		}
	else
		{return false;}
}
// delete masal
function clickCheck()
{
	var numPost = $(".chk:checked").length;
	if(numPost > 0)
	{
		$("#buttonDelete").fadeIn('fast');
		$("#buttonRestore").fadeIn('fast');
		$("#buttonExport").fadeIn('fast');
	}
	else
	{
		$("#buttonDelete").fadeOut('fast');
		$("#buttonRestore").fadeOut('fast');
		$("#buttonExport").fadeOut('fast');
	}
}
function delChecked(modul)
{
	url_page = "/cms/"+modul+"/multi/";

	var numPost = $(".chk:checked").length;
	var arPost  = new Array();
	if(numPost > 0)
	{
		for(i=0;i<numPost;i++)
		{
			arPost.push($(".chk:checked:eq("+i+")").val());
		}

		$.ajax({
			type: 'DELETE',
			url: url_page+arPost,
			success:function(result,status) {
				response = result;
				if(response.affected >= 1)
				{
					for(i=0;i<numPost;i++)
					{
						$("#"+modul+arPost[i]).remove();
					}
					$(".notification").html(response.message);
					toast(response.message);
					$("#buttonDelete").fadeOut('fast');
				}
				else
				{
					$(".notification").html(response.message);
					$("#buttonDelete").fadeOut('fast');
				}
			}
		});
	}
	else
	{
		toast("Tidak ada data yang dipilih");
	}
}
// untuk memanggil fungsi alert konfimasi pas hapus.
function konfirmasi(name)
{
	if (confirm('Apakah anda yakin ingin menghapus '+ name +' ?'))
		{return true;}
	else
		{return false;}
}
function delfile(el)
{
	if (confirm('Apakah anda yakin ingin menghapus file ?'))
	{
		$("#"+el).hide();
		return true;
	}
	else
	{
		return false;
	}
}
// show loading circle
function loading(opt) {
	if(opt) {
		$('.blackflash').show();
		$('.loading-pop').show();
	}
	else {
		$('.blackflash').fadeOut();
		$('.loading-pop').fadeOut();
	}

}

// fungsi untuk membuka pop up seperti view data, dll
function addpop(opt, id)
{
	if(opt)
	{
		// semua nama class sudah fix untuk pop up
		//$(".loading-pop").show();
		$(".title").hide();
		$(".chk").attr("checked", false);
		$("#"+id).show();
		$(".canvasshow").css('margin-top','6%');
		$(".canvasshow").fadeIn(200).animate({'margin-top':'5%'},{queue:false,duration:200});
		$(".blackout").show();
		$(".blackflash").show();
	}
	else
	{
		$('[type="hidden"]').val("");
		$('[type="text"]').val("");
		$('[type="number"]').val("");
		$("#fotoproduk").html('');
		$('textarea').val("");
		$('[name="filled-in"]').attr("checked", false);
		$(".blackout").fadeOut(200);
		$(".blackflash").hide();
		$(".canvasshow").hide();
		$(".loading-pop").hide();
	}
}
function collapse()
{
	if($("#sidebar").css("width") == '200px')
	{
		$("#sidebar").addClass('collapse');
		$("#navbar").fadeIn(100).animate({'left':'60px'},{queue:false,duration:200});
		$("#main").fadeIn(100).animate({'left':'60px'},{queue:false,duration:200});
	}
	else
	{
		$("#navbar").fadeIn(100).animate({'left':'200px'},{queue:false,duration:200});
		$("#main").fadeIn(100).animate({'left':'200px'},{queue:false,duration:200});
		$("#sidebar").removeClass('collapse');

		$.ajax({
			url: 'module/setting/action.php?type=collapse&coll=0',
			success:function(result,status) {
			}
		});
	}
}
function validate(type, evt) {
	var regex;
	if(type == "number")
	{
		var regex = /[0123456789.,\b]/;
	}
	else if(type == "phone")
	{
		var regex = /[+0123456789 \b]/;
	}
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	if( !regex.test(key) ) {
	theEvent.returnValue = false;
	if(theEvent.preventDefault) theEvent.preventDefault();
	}
}
function toast(opt)
{
	if(opt)
	{
		$(".toast").css('bottom','30px');
		$(".toast").hide();
		$(".toast").fadeIn();
		$(".toast").html(opt);
		$(".toast").delay(8000).fadeOut(1000);
	}
	else if(opt == false)
	{
		$(".toast").hide();
	}
}
// untuk main ink
$(function(){
	var ink, d, x, y;
	$(".file, .nav-user").click(function(e){
	    if($(this).find(".ink").length === 0){
	        $(this).prepend("<span class='ink'></span>");
	    }

	    ink = $(this).find(".ink");
	    ink.removeClass("animate");

	    if(!ink.height() && !ink.width()){
	        d = Math.max($(this).outerWidth(), $(this).outerHeight());
	        ink.css({height: d, width: d});
	    }

	    x = e.pageX - $(this).offset().left - ink.width()/2;
	    y = e.pageY - $(this).offset().top - ink.height()/2;

	    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
	});
});
$(function(){
	var ink, d, x, y;
	$(".action, .scroll").click(function(e){
	    if($(this).find(".ink-grey").length === 0){
	        $(this).prepend("<span class='ink-grey'></span>");
	    }

	    ink = $(this).find(".ink-grey");
	    ink.removeClass("animate");

	    if(!ink.height() && !ink.width()){
	        d = Math.max($(this).outerWidth(), $(this).outerHeight());
	        ink.css({height: d, width: d});
	    }

	    x = e.pageX - $(this).offset().left - ink.width()/2;
	    y = e.pageY - $(this).offset().top - ink.height()/2;

	    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
	});
});
$(function(){
	var ink, d, x, y;
	$(".list-option").click(function(e){
	    if($(this).find(".ink-dark").length === 0){
	        $(this).prepend("<span class='ink-dark'></span>");
	    }

	    ink = $(this).find(".ink-dark");
	    ink.removeClass("animate");

	    if(!ink.height() && !ink.width()){
	        d = Math.max($(this).outerWidth(), $(this).outerHeight());
	        ink.css({height: d, width: d});
	    }

	    x = e.pageX - $(this).offset().left - ink.width()/2;
	    y = e.pageY - $(this).offset().top - ink.height()/2;

	    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
	});
});
$(function(){
	var ink, inks, d, x, y;
	$(".data-search").click(function(e){
	    if($(this).find(".search-area").length === 0){
	        $(this).addClass("search-area");
	        var plc = $("#search-by").val();
	        $("#text-search").attr('placeholder',plc);
	        $("#text-search").show();
	        $("#text-search").focus();
	        $(".icon-close").show();
	        $(".search-holder").hide();
	    }

	    inks = $(this).find(".search-area");

	    if($(this).find(".ink-grey").length === 0){
	        $(this).prepend("<span class='ink-grey'></span>");
	    }

	    ink = $(this).find(".ink-grey");
	    ink.removeClass("animate");

	    if(!ink.height() && !ink.width()){
	        d = Math.max($(this).outerWidth(), $(this).outerHeight());
	        ink.css({height: d, width: d});
	    }

	    x = e.pageX - $(this).offset().left - ink.width()/2;
	    y = e.pageY - $(this).offset().top - ink.height()/2;

	    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
	});
});
// ============== date picker ================= //
$(function() {
	$( ".date-input" ).datepicker({ dateFormat: "yy-mm-dd" });
});

// =============== VALIDATION ================== //

Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
