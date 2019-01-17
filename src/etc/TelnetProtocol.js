/**
 * All valid telnet protocol codes.
 * @readonly
 * @enum {Number}
 */
const TelnetProtocol = {
	TRANSMIT_BINARY:		0,
	ECHO:					1,
	RECONNECTION:			2,
	SUPPRESSGA:				3,
	MESSAGE_SIZE_NEG:		4,
	STATUS:					5,
	TIMING_MARK:			6,
	REMOTE_TRANS_ECHO:		7,
	OUTPUT_LINE_WIDTH:		8,
	OUTPUT_PAGE_SIZE:		9,
	OUTPUT_CARRIAGE_RETURN:	10,
	OUTPUT_H_TABSTOP:		11,
	OUTPUT_H_TAB:			12,
	OUTPUT_FORMFEED:		13,
	OUTPUT_V_TABSTOP:		14,
	OUTPUT_V_TAB:			15,
	OUTPUT_LINEFEED:		16,
	EXTENDED_ASCII:			17,
	LOGOUT:					18,
	BYTE_MACRO:				19,
	DATA_ENTRY_TERMINAL:	20,
	SUPDUP:					21,
	SUPDUP_OUT:				22,
	SEND_LOCATION:			23,
	TTYPE:					24,
	EOR:					25,
	TACACS:					26,
	OUTPUT_MARKINGS:		27,
	TERMINAL_LOCATION_NUM:	28,
	TELNET_3270_REGIME:		29,
	X3_PAD:					30,
	NAWS:					31,
	TERMINAL_SPEED:			32,
	REMOTE_FLOW_CONTROL:	33,
	LINEMODE:				34,
	X_DISPLAY_LOCATION:		35,
	TELNET_AUTH_OPT:		37,
	ENCRYPT:				38,
	TELNET_ENV_OPT:			39,
	MSDP:					69,
	MSSP:					70,
	MCCP:					85,
	MCCP2:					86
};

TelnetProtocol.names = Object.keys(TelnetProtocol);

TelnetProtocol.name = function(command){
	for(let key in TelnetProtocol){
		if(TelnetProtocol[key] === command) return key;
	}

	return undefined;
};

module.exports = TelnetProtocol;