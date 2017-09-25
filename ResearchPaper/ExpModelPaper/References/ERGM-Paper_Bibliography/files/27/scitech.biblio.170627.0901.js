function citationDetails(){if($("#citation-addl").attr("data-doload")=="1"){$("#citation-addl").show();$.ajax({url:$("body").attr("data-context")+"/biblio/"+$("div.biblio-page").attr("data-ostiid")+"/filesize",success:function(f){$("#citation-fulltext-sidebar-sizetext").html("("+(f/1024/1024).toFixed(2)+" MB)")}});if(words.length>0){var b=[];var c=1;var a="";var e="";words=words.sort(function(g,f){return f.c-g.c}).slice(0,50);var d=words[0].c;words=words.sort(function(g,f){return g.w>f.w?1:-1});for(i=0;i<(words.length-1);i++){wordWeight=words[i].c/d;if(wordWeight<=0.5){wordWeight=0.5}if(wordWeight>=0.8){wordWeight=0.8}a="font-size:"+(wordWeight)*1.8*c+"em;";e="rgb("+Math.floor(Math.random()*150)+","+Math.floor(Math.random()*150)+","+Math.floor(Math.random()*150)+")";htmlString=" <a href='"+$("body").attr("data-context")+"/search/term:"+words[i].w+"'><span style='"+a;htmlString+="color:"+e+"'>";htmlString+=words[i].w+"</span></a> ";b.push(htmlString)}$("<div/>",{"class":"my-new-list padding",html:b.join("")}).appendTo("#tab-wc")}else{$("#tab-wc").html("<div style='text-align:center;padding:30px;'>word cloud not available for this document</div>")}}}function moreLikeThis(){if($("#citation-mlt").data("loaded")!="1"){$("#citation-mlt").html('<div class="padding item-list-loading">Getting similar document suggestions ... <img src="'+$("body").attr("data-context")+'/img/ui/loading.gif" alt="Loading ... please wait" class="results-loading"/></div>');$("#citation-mlt").load($("body").attr("data-context")+"/search.mlt/?osti_id="+$("div.biblio-page").attr("data-ostiid"),function(){$("#citation-mlt").data("loaded","1")})}}function citeModalContent(b,a){$(a).html('<div class="padding item-list-loading">Generating citation ... <img src="'+$("body").attr("data-context")+'/img/ui/loading.gif" alt="Loading ... please wait" class="results-loading"/></div>');$.get($("body").attr("data-context")+"/biblio/"+$("div.biblio-page").attr("data-ostiid")+"/cite/"+b,function(c){$(a).html(c)})}function docSearch(){var a=$("#doc-search-query").val();$("#citation-searchresults").removeClass("hide");$("#citation-searchresults-numpages").text("0");$("#citation-searchresults-terms").text(a);if(a!=""){$("#docsearch-results").html('<div class="padding item-list-loading">Searching full text pages for "'+a+'" ... <img src="'+$("body").attr("data-context")+'/img/ui/loading.gif" alt="Loading ... please wait" class="results-loading"/></div>');$("#docsearch-results").load($("body").attr("data-context")+"/search.singlepage/?osti_id="+$("div.biblio-page").attr("data-ostiid")+"&q="+escape(a),function(){$("#citation-searchresults-numpages").text($("div.item-info").length)})}}function docSearchPreview(d){var b=$("#"+d);$("#docsearch-preview_label").text(b.attr("data-title"));$("#docsearch-preview_body").html('<img src="'+b.attr("data-href")+'" border="0"/>');var a=b.attr("id").replace("ds-preview-","")*1;var c="";if(a==1){c=c+'<a href="#" class="btn btn-sm btn-default disabled" onclick="return false;">&laquo; Prev</a>'}else{c=c+'<a href="#" class="btn btn-sm btn-default" onclick="docSearchPreview(\'ds-preview-'+(a-1)+"');return false;\">&laquo; Prev</a>"}if($("#ds-preview-"+(a+1)).attr("id")==null){c=c+'<a href="#" class="btn btn-sm btn-default disabled" onclick="return false;">Next &raquo;</a>'}else{c=c+'<a href="#" class="btn btn-sm btn-default" onclick="docSearchPreview(\'ds-preview-'+(a+1)+"');return false;\">Next &raquo;</a>"}$("#docsearch-preview_pager").html(c)}$(document).ready(function(){citationDetails();MathJax.Hub.Queue(["Typeset",MathJax.Hub]);$("#tab-toggle-search").on("show.bs.tab",function(a){if($("#doc-search-query").val()!=""&&$("#citation-searchresults").hasClass("hide")){docSearch()}});$("#tab-mlt-tab").on("show.bs.tab",function(a){moreLikeThis()});$("#cite-mla").on("show.bs.modal",function(){citeModalContent("modern-language-association","#cite-mla_body")});$("#cite-apa").on("show.bs.modal",function(){citeModalContent("apa","#cite-apa_body")});$("#cite-chi").on("show.bs.modal",function(){citeModalContent("chicago-author-date","#cite-chi_body")});$("#cite-bib").on("show.bs.modal",function(){citeModalContent("bibtex","#cite-bib_body")});$("#savedoc").on("show.bs.modal",function(){$("#savedoc_submit").show()});$("#savedoc-form").submit(function(){$.post($("body").attr("data-context")+"/account-savedoc.jsp",$("#savedoc-form").serialize(),function(a){$("#savedoc").modal("hide");$("#savedoc_submit").hide();$("#savedoc_body").html(a);$("#savedoc-link").addClass("text-muted").html('<small>Save to My Library <span class="text-success">(saved)</span></small>')});return false});$("#shareemail").on("show.bs.modal",function(){$("#shareemail_submit").show()}).on("shown.bs.modal",function(){$("#sendtoemail-email").focus()}).on("hidden.bs.modal",function(){$("#sendtoemail-email").val("");$("#shareemail_submit").show();$("div.modal-body-default").removeClass("hide");$("div.modal-body-submitted").html("").addClass("hide")});$("#sendtoemail-form").submit(function(){var c=$("#citation-pagetitle").clone();c.find("div").remove();var d=$.trim(c.text().trim().replace("Title: ",""));var a=$("#citation-details").clone();a.find("div.affiliation_toggle, ul.dropdown-menu, img.icon-orcid").remove();var b=a.html().replace(/(<\s*\/?\s*)a(\s*([^>]*)?\s*>)/gi,"$1span$2");$("#sendtoemail-body").val(d+"<p><a href='"+$("body").attr("data-baseurl")+$("body").attr("data-context")+"/biblio/"+$("div.biblio-page").attr("data-ostiid")+"'>"+$("body").attr("data-baseurl")+$("body").attr("data-context")+"/biblio/"+$("div.biblio-page").attr("data-ostiid")+"</a></p>"+b);$("#sendtoemail-subject").val("SciTech Connect Document Details: "+d);$.post($("body").attr("data-context")+"/email.jsp",$("#sendtoemail-form").serialize(),function(e){$("#shareemail_submit").hide();$("div.modal-body-default").addClass("hide");$("div.modal-body-submitted").html(e).removeClass("hide")});return false});$("#savedoc-btn-disabled, #tab-toggle-search-disabled").popover({container:"body",html:true}).click(function(a){a.preventDefault()});$("#docsearch-form").submit(function(){docSearch();return false});$("#docsearch-results").on("click","a.preview-page",function(){docSearchPreview($(this).attr("id"))})});