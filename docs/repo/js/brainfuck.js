// https://www.npmjs.com/package/brainfuck-javascript
// 0.1.7
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.brainfuck = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var brainfuck = function(source, input) {
	var output = [];
	var input_cur = 0;
	var source_cur = 0;
	var prev_source_cur = -1;
	var data = new Array(30000);
	var data_cur = 0;
	var pointers = [];
	var search = 0;

	data[0] = 0;

	reader: while ( source_cur < source.length ) {
		var chunk = source[source_cur];

		if ( search > 0 ) {
			switch ( chunk ) {
				case '[':
					search++;
					break;
				case ']':
					if ( search > 0 ) {
						search--;
					}
					break;
			}

			source_cur++;
			continue reader;
		}

		switch ( chunk ) {
			case '+':
				data[data_cur]++;
				break
			case '-':
				if ( data[data_cur] > 0 ) {
					data[data_cur]--;
				}
				break;
			case '>':
				data_cur++;
				if ( data[data_cur] == null ) {
					data[data_cur] = 0;
				}
				break;
			case '<':
				if ( data_cur > 0 ) {
					data_cur--;
				}
				break;
			case ',':
				data[data_cur] = input[input_cur] || -1;
				input_cur++;
				break;
			case '.':
				output.push(data[data_cur]);
				break;
			case '[':
				if ( data[data_cur] != 0 ) {
					pointers.push(source_cur);
				}
				else if ( prev_source_cur > -1 ) {
					source_cur = prev_source_cur;
					prev_source_cur = -1;
				}
				else {
					search = 1;
				}
				break;
			case ']':
				//prev_source_cur = source_cur;
				source_cur = pointers.pop();
				continue reader;
				break;
		}

		source_cur++;
	}

	return output;
};

var interface = function(source, input) {
	var a_source = source.replace(/[^\[\].,><+-]/g, '').split('');
	var a_input = !input ? [] : input.split('').map(function(char) {
		return char.charCodeAt(0);
	}).filter(function(cc) {
		return cc > 0 && cc < 256;
	});

	return brainfuck(a_source, a_input);
};

interface.text = function(source, input) {
	return interface(source, input).map(function(cc) {
		return String.fromCharCode(cc);
	}).join('');
};

module.exports = interface;

},{}]},{},[1])(1)
});
