// Generated by Haxe 3.4.2
(function () { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var AppMain = function() {
	this.shortCuts = JSON.parse(haxe_Resource.getString("key"));
	this.markdowExample2 = haxe_Resource.getString("markdown02");
	this.isElectron = false;
	window.console.info("This project is a WIP-sideproject written in Haxe (www.haxe.org)");
	window.console.info("For more info about this markdown editor check https://github.com/MatthijsKamstra/hx-markdown-editor");
	this.isElectron = true;
	haxe_Log.trace("electron",{ fileName : "AppMain.hx", lineNumber : 70, className : "AppMain", methodName : "new", customParams : ["electron " + process.versions["electron"]]});
	haxe_Log.trace("node",{ fileName : "AppMain.hx", lineNumber : 71, className : "AppMain", methodName : "new", customParams : ["node " + process.version]});
	haxe_Log.trace("system",{ fileName : "AppMain.hx", lineNumber : 72, className : "AppMain", methodName : "new", customParams : [process.platform + " " + process.arch]});
	this.init();
};
AppMain.__name__ = true;
AppMain.main = function() {
	var app = new AppMain();
};
AppMain.prototype = {
	init: function() {
		var _gthis = this;
		$(function() {
			_gthis.initEditors();
			_gthis.initShortcuts();
			window.document.getElementById("btn-open").addEventListener("click",$bind(_gthis,_gthis.openHandler),false);
			window.document.getElementById("file-upload").addEventListener("change",$bind(_gthis,_gthis.openHandler));
			window.document.getElementById("btn-save").addEventListener("click",$bind(_gthis,_gthis.saveHandler),false);
			window.document.getElementById("btn-fullscreen").addEventListener("click",$bind(_gthis,_gthis.fullscreenHandler),false);
			window.document.getElementById("btn-preview").addEventListener("click",$bind(_gthis,_gthis.previewHandler),false);
			_gthis.toggleOpenBtn();
			window.addEventListener("resize",$bind(_gthis,_gthis.resizeHandler));
			_gthis.resizeHandler(null);
			_gthis.setMonkDocumentTitle("Monk Markdown Editor");
		});
	}
	,setMonkDocumentTitle: function(title) {
		var widowtitle = window.document.getElementsByClassName("window-title")[0];
		widowtitle.innerText = title;
	}
	,toggleOpenBtn: function() {
		var electronContainer = window.document.getElementById("container-btn-open-electron");
		var browserContainer = window.document.getElementById("container-btn-open-browser");
		electronContainer.style.display = "initial";
		browserContainer.style.display = "none";
	}
	,resizeHandler: function(e) {
		var myWidth = window.innerWidth;
		var myHeight = window.innerHeight;
		var offset = 23;
		window.document.getElementById("monk_markdown_container").setAttribute("data-comment","w:" + myWidth + "px, h:" + myHeight + "px");
		window.document.getElementById("workbench_parts_title");
		window.document.getElementById("workbench_parts_editor_container").setAttribute("style","width:100%; height:" + (myHeight - offset) + "px;");
		window.document.getElementById("workbench_parts_editor_container").setAttribute("data-comment","w:" + myWidth + "px, h:" + (myHeight - offset) + "px");
		haxe_Log.trace("width: " + myWidth + ", height: " + myHeight,{ fileName : "AppMain.hx", lineNumber : 136, className : "AppMain", methodName : "resizeHandler"});
	}
	,initEditors: function() {
		this.inMarkdown = window.document.createElement("textarea");
		this.inMarkdown.id = "in_markdown_default";
		this.inMarkdown.className = "in-markdown";
		this.inMarkdown.cols = 30;
		this.inMarkdown.rows = 10;
		window.document.getElementById("workbench_parts_editor_one").appendChild(this.inMarkdown);
		this.outMarkdown = window.document.createElement("div");
		this.outMarkdown.id = "out_markdown_default";
		this.outMarkdown.className = "out-markdown";
		if(window.document.getElementById("workbench_parts_editor_two") != null) {
			window.document.getElementById("workbench_parts_editor_two").appendChild(this.outMarkdown);
		}
		var md = this.markdowExample2;
		this.set_inMarkdownValue(md);
		this.set_outMarkdownValue(md);
		this.editor = CodeMirror.fromTextArea(this.inMarkdown,{ tabSize : "2", indentWithTabs : true, lineWrapping : true, extraKeys : { "Enter" : "newlineAndIndentContinueMarkdownList"}, mode : "markdown", tabMode : "indent", theme : "monk"});
	}
	,initShortcuts: function(keys) {
		var _gthis = this;
		this.keyMarkdown = "Keyboard Shortcuts\n\n";
		this.keyMarkdown += "| Command | Keybinding | Shortcut OsX | Electron | CodeMirror |\n";
		this.keyMarkdown += "| ------- | ---------- | :----------: | :------: | :--------: |\n";
		var map = { "Alt-Space" : function(cm) {
			_gthis.onKeyMappedHandler("boo");
		}};
		var _g1 = 0;
		var _g = this.shortCuts.length;
		while(_g1 < _g) {
			var i = _g1++;
			var item = [this.shortCuts[i]];
			map[item[0].key] = (function(item1) {
				return function(cm1) {
					_gthis.onKeyMappedHandler(item1[0].action);
				};
			})(item);
			this.keyMarkdown += "| " + item[0].action + " | " + item[0].key + " | " + this.replaceString2Symbols(item[0].key) + " | x | " + item[0].key + " |\n";
		}
		this.editor.addKeyMap(map);
	}
	,replaceString2Symbols: function(keybinding) {
		var str = "`" + StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(keybinding,"Cmd","⌘"),"Alt","⌥"),"Ctrl","⌃"),"Shift","⇧"),"-","` `") + "`";
		return StringTools.replace(str,"``","`");
	}
	,onKeyMappedHandler: function(value) {
		switch(value) {
		case "blockquote":
			this.insertBefore("> ",3);
			break;
		case "bold":
			this.insertAround("**","**");
			break;
		case "codeblock":
			this.insertAround("```\r\n","\r\n```");
			break;
		case "comment":
			this.insertAround("<!-- "," -->");
			break;
		case "fullscreen":
			this.fullscreenHandler();
			break;
		case "header0":
			this.insertBefore("",2);
			break;
		case "header1":
			this.insertBefore("# ",2);
			break;
		case "header2":
			this.insertBefore("## ",3);
			break;
		case "header3":
			this.insertBefore("### ",4);
			break;
		case "header4":
			this.insertBefore("#### ",5);
			break;
		case "header5":
			this.insertBefore("##### ",6);
			break;
		case "header6":
			this.insertBefore("###### ",7);
			break;
		case "hr":
			this.insert("\n\n----\n\n");
			break;
		case "image":
			this.insertBefore("![](http://)",2);
			break;
		case "inlinecode":
			this.insertAround("`","`");
			break;
		case "italic":
			this.insertAround("_","_");
			break;
		case "link":
			this.insertAround("[","](http://)");
			break;
		case "open":
			haxe_Log.trace(value,{ fileName : "AppMain.hx", lineNumber : 231, className : "AppMain", methodName : "onKeyMappedHandler"});
			break;
		case "orderedlist":
			this.insertBefore("1. ",3);
			break;
		case "preview":
			haxe_Log.trace(value,{ fileName : "AppMain.hx", lineNumber : 233, className : "AppMain", methodName : "onKeyMappedHandler"});
			break;
		case "save":
			this.saveHandler(null);
			break;
		case "table":
			this.insert("| colum 1 | colum 2 |\n| :--: | :--: |\n| a | b |\n| c | d |\n");
			break;
		case "unorderedlist":
			this.insertBefore("* ",3);
			break;
		default:
			haxe_Log.trace("not sure what you want: " + value,{ fileName : "AppMain.hx", lineNumber : 264, className : "AppMain", methodName : "onKeyMappedHandler"});
		}
	}
	,saveHandler: function(e) {
		this.onSaveHandler();
	}
	,openHandler: function(e) {
		this.onFolderOpenHandler();
	}
	,previewHandler: function() {
		haxe_Log.trace("previewHandler",{ fileName : "AppMain.hx", lineNumber : 285, className : "AppMain", methodName : "previewHandler"});
	}
	,fullscreenHandler: function() {
		haxe_Log.trace("fullscreenHandler",{ fileName : "AppMain.hx", lineNumber : 291, className : "AppMain", methodName : "fullscreenHandler"});
		var doc = window.document;
		var el = window.document.documentElement;
		if(!AppMain.IS_FULL_SCREEN) {
			if($bind(el,el.requestFullscreen) != null) {
				el.requestFullscreen();
			} else if(el.webkitRequestFullscreen) {
				el.webkitRequestFullscreen();
			} else if(el.mozRequestFullScreen) {
				el.mozRequestFullScreen();
			} else if(el.msRequestFullscreen) {
				el.msRequestFullscreen();
			}
			AppMain.IS_FULL_SCREEN = true;
		} else {
			if(doc.cancelFullScreen) {
				doc.cancelFullScreen();
			} else if(doc.mozCancelFullScreen) {
				doc.mozCancelFullScreen();
			} else if(doc.webkitCancelFullScreen) {
				doc.webkitCancelFullScreen();
			}
			AppMain.IS_FULL_SCREEN = false;
		}
	}
	,insert: function(insertion) {
		var doc = this.editor.getDoc();
		var cursor = doc.getCursor();
		doc.replaceRange(insertion,{ line : cursor.line, ch : cursor.ch});
	}
	,insertAround: function(start,end) {
		var doc = this.editor.getDoc();
		var cursor = doc.getCursor();
		if(doc.somethingSelected()) {
			var selection = doc.getSelection();
			doc.replaceSelection(start + selection + end);
		} else {
			doc.replaceRange(start + end,{ line : cursor.line, ch : cursor.ch});
			doc.setCursor({ line : cursor.line, ch : cursor.ch + start.length});
		}
	}
	,insertBefore: function(insertion,cursorOffset) {
		var doc = this.editor.getDoc();
		var cursor = doc.getCursor();
		if(doc.somethingSelected()) {
			var selections = doc.listSelections();
			haxe_Log.trace(selections,{ fileName : "AppMain.hx", lineNumber : 359, className : "AppMain", methodName : "insertBefore"});
			var pos = [selections[0].head.line,selections[0].anchor.line];
			pos.sort(function(a,b) {
				if(a < b) {
					return -1;
				} else if(a > b) {
					return 1;
				}
				return 0;
			});
			var _g1 = pos[0];
			var _g = pos[1] + 1;
			while(_g1 < _g) {
				var i = _g1++;
				doc.replaceRange(insertion,{ line : i, ch : 0});
			}
			doc.setCursor({ line : pos[0], ch : cursorOffset != null ? cursorOffset : 0});
		} else {
			haxe_Log.trace("check hier",{ fileName : "AppMain.hx", lineNumber : 371, className : "AppMain", methodName : "insertBefore"});
			doc.setSelection({ line : cursor.line, ch : cursor.ch},{ line : cursor.line, ch : 0});
			var selection = doc.getSelection();
			doc.replaceSelection(insertion + StringTools.trim(StringTools.replace(StringTools.replace(selection,"#",""),insertion,"")));
		}
	}
	,onFolderOpenHandler: function() {
		var _gthis = this;
		electron_renderer_IpcRenderer.send("OpenDialog",function() {
			haxe_Log.trace("OpenDialog",{ fileName : "AppMain.hx", lineNumber : 521, className : "AppMain", methodName : "onFolderOpenHandler"});
		});
		electron_renderer_IpcRenderer.on("SEND_FILE_CONTENT",function(event,filepath,data) {
			_gthis.currentFile = filepath;
			_gthis.set_inMarkdownValue(data);
		});
	}
	,onSaveHandler: function() {
		if(this.currentFile == null) {
			return;
		}
		electron_renderer_IpcRenderer.send("SAVE_FILE",this.currentFile,this.get_inMarkdownValue(),function() {
			haxe_Log.trace("SAVE_FILE",{ fileName : "AppMain.hx", lineNumber : 533, className : "AppMain", methodName : "onSaveHandler"});
		});
	}
	,get_inMarkdownValue: function() {
		this.set_inMarkdownValue(this.inMarkdown.innerText);
		return this.inMarkdownValue;
	}
	,set_inMarkdownValue: function(value) {
		this.inMarkdown.innerHTML = value;
		return this.inMarkdownValue = value;
	}
	,set_outMarkdownValue: function(value) {
		this.outMarkdown.innerHTML = this.convertToMarkdown(value);
		return this.outMarkdownValue = value;
	}
	,convertToMarkdown: function(md) {
		var result = markdownit().render(md);
		return result;
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
Math.__name__ = true;
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var electron_renderer_IpcRenderer = require("electron").ipcRenderer;
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Resource = function() { };
haxe_Resource.__name__ = true;
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) {
				return x.str;
			}
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		}
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) {
					break;
				}
				s += fcc(c);
			} else if(c < 224) {
				s += fcc((c & 63) << 6 | b[i++] & 127);
			} else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
};
var haxe_crypto_Base64 = function() { };
haxe_crypto_Base64.__name__ = true;
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) {
		complement = true;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
haxe_crypto_BaseCode.__name__ = true;
haxe_crypto_BaseCode.prototype = {
	initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe_io_Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) {
					throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255 & 255;
		}
		return out;
	}
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	var tmp;
	if(typeof(document) != "undefined") {
		d = document.getElementById("haxe:trace");
		tmp = d != null;
	} else {
		tmp = false;
	}
	if(tmp) {
		d.innerHTML += js_Boot.__unhtml(msg) + "<br/>";
	} else if(typeof console != "undefined" && console.log != null) {
		console.log(msg);
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_node_buffer_Buffer = require("buffer").Buffer;
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
haxe_Resource.content = [{ name : "markdown00", data : "IyBBbiBleGhpYml0IG9mIE1hcmtkb3duCgpUaGlzIG5vdGUgZGVtb25zdHJhdGVzIHNvbWUgb2Ygd2hhdCBbTWFya2Rvd25dWzFdIGlzIGNhcGFibGUgb2YgZG9pbmcuCgoqTm90ZTogRmVlbCBmcmVlIHRvIHBsYXkgd2l0aCB0aGlzIHBhZ2UuIFVubGlrZSByZWd1bGFyIG5vdGVzLCB0aGlzIGRvZXNuJ3QgYXV0b21hdGljYWxseSBzYXZlIGl0c2VsZi4qCgojIyBCYXNpYyBmb3JtYXR0aW5nCgpQYXJhZ3JhcGhzIGNhbiBiZSB3cml0dGVuIGxpa2Ugc28uIEEgcGFyYWdyYXBoIGlzIHRoZSBiYXNpYyBibG9jayBvZiBNYXJrZG93bi4gQSBwYXJhZ3JhcGggaXMgd2hhdCB0ZXh0IHdpbGwgdHVybiBpbnRvIHdoZW4gdGhlcmUgaXMgbm8gcmVhc29uIGl0IHNob3VsZCBiZWNvbWUgYW55dGhpbmcgZWxzZS4KClBhcmFncmFwaHMgbXVzdCBiZSBzZXBhcmF0ZWQgYnkgYSBibGFuayBsaW5lLiBCYXNpYyBmb3JtYXR0aW5nIG9mICppdGFsaWNzKiBhbmQgKipib2xkKiogaXMgc3VwcG9ydGVkLiBUaGlzICpjYW4gYmUgKipuZXN0ZWQqKiBsaWtlKiBzby4KCiMjIExpc3RzCgojIyMgT3JkZXJlZCBsaXN0CgoxLiBJdGVtIDEKMi4gQSBzZWNvbmQgaXRlbQozLiBOdW1iZXIgMwo0LiDihaMKCipOb3RlOiB0aGUgZm91cnRoIGl0ZW0gdXNlcyB0aGUgVW5pY29kZSBjaGFyYWN0ZXIgZm9yIFtSb21hbiBudW1lcmFsIGZvdXJdWzJdLioKCiMjIyBVbm9yZGVyZWQgbGlzdAoKKiBBbiBpdGVtCiogQW5vdGhlciBpdGVtCiogWWV0IGFub3RoZXIgaXRlbQoqIEFuZCB0aGVyZSdzIG1vcmUuLi4KCiMjIFBhcmFncmFwaCBtb2RpZmllcnMKCiMjIyBDb2RlIGJsb2NrCgogICAgQ29kZSBibG9ja3MgYXJlIHZlcnkgdXNlZnVsIGZvciBkZXZlbG9wZXJzIGFuZCBvdGhlciBwZW9wbGUgd2hvIGxvb2sgYXQgY29kZSBvciBvdGhlciB0aGluZ3MgdGhhdCBhcmUgd3JpdHRlbiBpbiBwbGFpbiB0ZXh0LiBBcyB5b3UgY2FuIHNlZSwgaXQgdXNlcyBhIGZpeGVkLXdpZHRoIGZvbnQuCgpZb3UgY2FuIGFsc28gbWFrZSBgaW5saW5lIGNvZGVgIHRvIGFkZCBjb2RlIGludG8gb3RoZXIgdGhpbmdzLgoKIyMjIFF1b3RlCgo+IEhlcmUgaXMgYSBxdW90ZS4gV2hhdCB0aGlzIGlzIHNob3VsZCBiZSBzZWxmIGV4cGxhbmF0b3J5LiBRdW90ZXMgYXJlIGF1dG9tYXRpY2FsbHkgaW5kZW50ZWQgd2hlbiB0aGV5IGFyZSB1c2VkLgoKIyMgSGVhZGluZ3MKClRoZXJlIGFyZSBzaXggbGV2ZWxzIG9mIGhlYWRpbmdzLiBUaGV5IGNvcnJlc3BvbmQgd2l0aCB0aGUgc2l4IGxldmVscyBvZiBIVE1MIGhlYWRpbmdzLiBZb3UndmUgcHJvYmFibHkgbm90aWNlZCB0aGVtIGFscmVhZHkgaW4gdGhlIHBhZ2UuIEVhY2ggbGV2ZWwgZG93biB1c2VzIG9uZSBtb3JlIGhhc2ggY2hhcmFjdGVyLgoKIyMjIEhlYWRpbmdzICpjYW4qIGFsc28gY29udGFpbiAqKmZvcm1hdHRpbmcqKgoKIyMjIFRoZXkgY2FuIGV2ZW4gY29udGFpbiBgaW5saW5lIGNvZGVgCgpPZiBjb3Vyc2UsIGRlbW9uc3RyYXRpbmcgd2hhdCBoZWFkaW5ncyBsb29rIGxpa2UgbWVzc2VzIHVwIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIHBhZ2UuCgpJIGRvbid0IHJlY29tbWVuZCB1c2luZyBtb3JlIHRoYW4gdGhyZWUgb3IgZm91ciBsZXZlbHMgb2YgaGVhZGluZ3MgaGVyZSwgYmVjYXVzZSwgd2hlbiB5b3UncmUgc21hbGxlc3QgaGVhZGluZyBpc24ndCB0b28gc21hbGwsIGFuZCB5b3UncmUgbGFyZ2VzdCBoZWFkaW5nIGlzbid0IHRvbyBiaWcsIGFuZCB5b3Ugd2FudCBlYWNoIHNpemUgdXAgdG8gbG9vayBub3RpY2VhYmx5IGxhcmdlciBhbmQgbW9yZSBpbXBvcnRhbnQsIHRoZXJlIHRoZXJlIGFyZSBvbmx5IHNvIG1hbnkgc2l6ZXMgdGhhdCB5b3UgY2FuIHVzZS4KCiMjIFVSTHMKClVSTHMgY2FuIGJlIG1hZGUgaW4gYSBoYW5kZnVsIG9mIHdheXM6CgoqIEEgbmFtZWQgbGluayB0byBbTWFya0l0RG93bl1bM10uIFRoZSBlYXNpZXN0IHdheSB0byBkbyB0aGVzZSBpcyB0byBzZWxlY3Qgd2hhdCB5b3Ugd2FudCB0byBtYWtlIGEgbGluayBhbmQgaGl0IGBDdHJsK0xgLgoqIEFub3RoZXIgbmFtZWQgbGluayB0byBbTWFya0l0RG93bl0oaHR0cDovL3d3dy5tYXJraXRkb3duLm5ldC8pCiogU29tZXRpbWVzIHlvdSBqdXN0IHdhbnQgYSBVUkwgbGlrZSA8aHR0cDovL3d3dy5tYXJraXRkb3duLm5ldC8+LgoKIyMgSG9yaXpvbnRhbCBydWxlCgpBIGhvcml6b250YWwgcnVsZSBpcyBhIGxpbmUgdGhhdCBnb2VzIGFjcm9zcyB0aGUgbWlkZGxlIG9mIHRoZSBwYWdlLgoKLS0tCgpJdCdzIHNvbWV0aW1lcyBoYW5keSBmb3IgYnJlYWtpbmcgdGhpbmdzIHVwLgoKIyMgSW1hZ2VzCgpNYXJrZG93biBjYW4gYWxzbyBjb250YWluIGltYWdlcy4gSSdsbCBuZWVkIHRvIGFkZCBzb21ldGhpbmcgaGVyZSBzb21ldGltZS4KCiMjIEZpbmFsbHkKClRoZXJlJ3MgYWN0dWFsbHkgYSBsb3QgbW9yZSB0byBNYXJrZG93biB0aGFuIHRoaXMuIFNlZSB0aGUgb2ZmaWNpYWwgW2ludHJvZHVjdGlvbl1bNF0gYW5kIFtzeW50YXhdWzVdIGZvciBtb3JlIGluZm9ybWF0aW9uLiBIb3dldmVyLCBiZSBhd2FyZSB0aGF0IHRoaXMgaXMgbm90IHVzaW5nIHRoZSBvZmZpY2lhbCBpbXBsZW1lbnRhdGlvbiwgYW5kIHRoaXMgbWlnaHQgd29yayBzdWJ0bHkgZGlmZmVyZW50bHkgaW4gc29tZSBvZiB0aGUgbGl0dGxlIHRoaW5ncy4KCgogIFsxXTogaHR0cDovL2RhcmluZ2ZpcmViYWxsLm5ldC9wcm9qZWN0cy9tYXJrZG93bi8KICBbMl06IGh0dHA6Ly93d3cuZmlsZWZvcm1hdC5pbmZvL2luZm8vdW5pY29kZS9jaGFyLzIxNjMvaW5kZXguaHRtCiAgWzNdOiBodHRwOi8vd3d3Lm1hcmtpdGRvd24ubmV0LwogIFs0XTogaHR0cDovL2RhcmluZ2ZpcmViYWxsLm5ldC9wcm9qZWN0cy9tYXJrZG93bi9iYXNpY3MKICBbNV06IGh0dHA6Ly9kYXJpbmdmaXJlYmFsbC5uZXQvcHJvamVjdHMvbWFya2Rvd24vc3ludGF4Cg"},{ name : "markdown02", data : "IyBNb25rIE1hcmtkb3duIEVkaXRvcgoKbGluZSBvbmUKbGluZSB0d28KbGluZSB0aHJlZQpsaW5lIGZvdXIKCgojIGxpc3RzCgpxdWljayAodW5vcmRlcmVkKSBsaXN0OiBgY21kYCArIGBsYAoKdW5vcmRlcmVkIGxpc3Q6IGBzaGlmdGAgKyBgY21kYCArIGB1YAoKb3JkZXJlZCBsaXN0OiBgc2hpZnRgICsgYGNtZGAgKyBgb2AKCgpqdXN0IGJlY2F1c2Ugd2UgY2FuCgpsaW5lIG9uZQpsaW5lIHR3bwpsaW5lIHRocmVlCmxpbmUgZm91cgoKCiMgaGVhZGluZwoKVGVzdCB0aGUga2V5Ym9hcmQgc2hvcnRjdXRzIGZvciBoZWFkaW5nczogYGNtZGAgKyBgMWAgKDEsMiwzLDQsNSw2KQoKaGVhZGluZyAxCgpoZWFkaW5nIDIKCmhlYWRpbmcgMwoKaGVhZGluZyA0CgpoZWFkaW5nIDUKCmhlYWRpbmcgNgoKIyBiYXNpYyBmb3JtYXQKClRlc3QgdGhlIGtleWJvYXJkIHNob3J0Y3V0cwoKLSBib2xkIChzdHJvbmcpOiBgY21kYCArIGBiYAotIGl0YWxpYyAoZW1waGFzaXMpOiBgY21kYCArIGBpYAotIGlubGluZSBjb2RlOiBgY21kYCArIGBrYAotIGNvbW1lbnQ6IGBjbWRgICsgYC9gCgojIGxpc3RzCgpxdWljayAodW5vcmRlcmVkKSBsaXN0OiBgY21kYCArIGBsYAoKdW5vcmRlcmVkIGxpc3Q6IGBzaGlmdGAgKyBgY21kYCArIGB1YAoKb3JkZXJlZCBsaXN0OiBgc2hpZnRgICsgYGNtZGAgKyBgb2AKCgpqdXN0IGJlY2F1c2Ugd2UgY2FuCgpsaW5lIG9uZQpsaW5lIHR3bwpsaW5lIHRocmVlCmxpbmUgZm91cgoKIyBibG9jayBxdW90ZQoKYmxvY2sgcXVvdGU6IGBzaGlmdGAgKyBgY21kYCArIGBiYAoKdGhpcyBpcyBhIHF1b3RlCgojIGxpbmsKCmNyZWF0ZSBhIGxpbms6IGBzaGlmdGAgKyBgY21kYCArIGBsYAoKaHR0cDovL3d3dy5tYXR0aGlqc2thbXN0cmEubmwKCiMgaW1hZ2UKCmNyZWF0ZSBhIGltYWdlOiBgc2hpZnRgICsgYGNtZGAgKyBgaWAKCmh0dHA6Ly9tYXR0aGlqc2thbXN0cmEubmwvcGhvdG9zL2JvdHMvNjQwLzEwX0lNR180MTY1LmpwZwoKCg"},{ name : "markdown01", data : "IyBoZWFkaW5nIDEKCnRoaXMgaXMgYSB0ZXN0IHBpZWNlIG9mIHRleHQganVzdCBmb3IgdGVzdGluZwoKIyMgaGVhZGluZyAyCgpqdXN0IGJlY2F1c2Ugd2UgY2FuCi0gb25lCi0gdHdvCgo"},{ name : "key", data : "WwoKCXsKCQkia2V5IiA6ICJDbWQtUyIsCgkJImFjdGlvbiIgOiAic2F2ZSIsCgkJImljb24iIDogImZhIGZhLWZsb3BweS1vIgoJfSx7CgkJImtleSIgOiAiQ21kLU8iLAoJCSJhY3Rpb24iIDogIm9wZW4iLAoJCSJpY29uIiA6ICJmYSBmYS1maWxlLXRleHQtbyIKCX0sewoJCSJrZXkiIDogIkNtZC1DdHJsLUYiLAoJCSJhY3Rpb24iIDogImZ1bGxzY3JlZW4iLAoJCSJpY29uIiA6ICJmYS1hcnJvd3MtYWx0IgoJfSx7CgkJImtleSIgOiAiQ21kLUUiLAoJCSJhY3Rpb24iIDogInByZXZpZXciLAoJCSJpY29uIiA6ICJmYS1leWUiCgl9LAoKCgl7CgkJImtleSIgOiAiQ21kLTEiLAoJCSJhY3Rpb24iIDogImhlYWRlcjEiCgl9LHsKCQkia2V5IiA6ICJDbWQtMiIsCgkJImFjdGlvbiIgOiAiaGVhZGVyMiIKCX0sewoJCSJrZXkiIDogIkNtZC0zIiwKCQkiYWN0aW9uIiA6ICJoZWFkZXIzIgoJfSx7CgkJImtleSIgOiAiQ21kLTQiLAoJCSJhY3Rpb24iIDogImhlYWRlcjQiCgl9LHsKCQkia2V5IiA6ICJDbWQtNSIsCgkJImFjdGlvbiIgOiAiaGVhZGVyNSIKCX0sewoJCSJrZXkiIDogIkNtZC02IiwKCQkiYWN0aW9uIiA6ICJoZWFkZXI2IgoJfSx7CgkJImtleSIgOiAiQ21kLTAiLAoJCSJhY3Rpb24iIDogImhlYWRlcjAiCgl9LHsKCQkia2V5IiA6ICJDbWQtQiIsCgkJImFjdGlvbiIgOiAiYm9sZCIKCX0sewoJCSJrZXkiIDogIkNtZC1JIiwKCQkiYWN0aW9uIiA6ICJpdGFsaWMiCgl9LHsKCQkia2V5IiA6ICJDbWQtSyIsCgkJImFjdGlvbiIgOiAiaW5saW5lY29kZSIKCX0sewoJCSJrZXkiIDogIlNoaWZ0LUNtZC1LIiwKCQkiYWN0aW9uIiA6ICJjb2RlYmxvY2siCgl9LHsKCQkia2V5IiA6ICJDbWQtLyIsCgkJImFjdGlvbiIgOiAgImNvbW1lbnQiCgl9LHsKCQkia2V5IiA6ICJDbWQtSCIsCgkJImFjdGlvbiIgOiAiaHIiCgl9LHsKCQkia2V5IiA6ICJDbWQtTCIsCgkJImFjdGlvbiIgOiAidW5vcmRlcmVkbGlzdCIKCX0sewoJCSJrZXkiIDogIlNoaWZ0LUNtZC1PIiwKCQkiYWN0aW9uIiA6ICJvcmRlcmVkbGlzdCIKCX0sewoJCSJrZXkiIDogIkNtZC1BbHQtTCIsCgkJImFjdGlvbiIgOiAib3JkZXJlZGxpc3QiCgl9LHsKCQkia2V5IiA6ICJTaGlmdC1DbWQtVSIsCgkJImFjdGlvbiIgOiAidW5vcmRlcmVkbGlzdCIKCX0sewoJCSJrZXkiIDogIkNtZC0nIiwKCQkiYWN0aW9uIiA6ICJibG9ja3F1b3RlIgoJfSx7CgkJImtleSIgOiAiU2hpZnQtQ21kLUIiLAoJCSJhY3Rpb24iIDogImJsb2NrcXVvdGUiCgl9LHsKCQkia2V5IiA6ICJTaGlmdC1DbWQtQyIsCgkJImFjdGlvbiIgOiAiYmxvY2txdW90ZSIKCX0sewoJCSJrZXkiIDogIlNoaWZ0LUNtZC1JIiwKCQkiYWN0aW9uIiA6ICJpbWFnZSIKCX0sewoJCSJrZXkiIDogIlNoaWZ0LUNtZC1MIiwKCQkiYWN0aW9uIiA6ICJsaW5rIgoJfSx7CgkJImtleSIgOiAiU2hpZnQtQ21kLVQiLAoJCSJhY3Rpb24iIDogInRhYmxlIgoJfQpd"}];
AppMain.IS_FULL_SCREEN = false;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
AppMain.main();
})();

//# sourceMappingURL=hxmarkdowneditor.js.map