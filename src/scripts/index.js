/**
 * INIT CODE EDITOR
 */
var $ = window.$;
var codeEditor = ace.edit("codeEditor");
codeEditor.getSession().setMode("ace/mode/json");

/**
 * INIT JSON EDITOR
 */
var container = document.getElementById('jsoneditor');
var options = {};
var editor = new JSONEditor(container, options);


/**
 * avariable
 */
var rexFormatJson = function(text){
    return /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))
}

/**
 * FORMAT CODE TO JSON
 */
$(".format-code-to-json").on("click" , function(){
    if (!rexFormatJson(codeEditor.getValue())) {
        alert("format json invalid!!");
        return;
    }
    editor.set(JSON.parse(codeEditor.getValue()) );
});

/**
 * FORMAT JSON TO CODE
 */
$(".format-json-to-code").on("click" , function(){
    codeEditor.setValue(JSON.stringify(editor.get() ,null ,'\t' ) );
});


/**
 * RESIZE WIDTH
 */
var A = parseInt($('.codeEditor').width(), 10),
    B = parseInt($('#jsoneditor').width(), 10),
    Z = parseInt($('#Z').width(), 10),
    minw = parseInt((A + B + Z) * 10 / 100, 10),
    offset = $('#container').offset(),
    splitter = function(event, ui){
        var aw = parseInt(ui.position.left - 30),
            bw = A + B - aw;
        //set widths and information...
        $(".tool-action").css({left : aw + 30});
        $('.codeEditor').css({width : aw});
        $('#jsoneditor').css({width : bw});
    };
$('#Z').draggable({
    axis : 'x',
    containment : [
        offset.left + minw,
        offset.top,
        offset.left + A + B - minw,
        offset.top + $('#container').height()
        ],
    drag : splitter
});

/**
 * Collapse and expand json
 */
$(".codeEditor-expand").on("click" , function(){
    var e = codeEditor.getValue();
    var t = JSON.stringify( JSON.parse(e)  );
    codeEditor.setValue(t);
});
$(".codeEditor-format").on("click" , function(){
    var e = codeEditor.getValue();
    e  = JSON.parse(e);
    codeEditor.setValue(JSON.stringify(e,null ,'\t' ) );
});