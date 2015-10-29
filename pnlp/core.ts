/// <reference path="../Scripts/typings/sha1/sha1.d.ts" />

//////////////////////////////////////////////////////////////////////////////////////////
//////Enumerations////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

enum ContentType{
	TXT,
}

//////////////////////////////////////////////////////////////////////////////////////////
//////Core Data Types/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

import sha1 = require('sha1');

interface IBtcAddress {
	
}

class BtcAddress implements IBtcAddress {
	
}

interface IUser {
	address: IBtcAddress;
	name: string;
	email: string;
	
	Hash(): string;
}

class User implements IUser {
	constructor(address: IBtcAddress, name:string, email: string) {
		this.address = address;
		this.name = name;
		this.email = email;
	}
	address: IBtcAddress;
	name: string;
	email: string;
	Hash() {
		return " ";
	}
}

interface IMedia {
	constructor(type: ContentType, content: string)
	user_sig: string; //Signature of User
	channel_sig: string; //Signature of Channel
	type: ContentType;
	content: string;
	parent: string; //IChannelUserMedia.Hash()
	
	Hash();
}

interface IChannelUserMedia {
	channel: IBtcAddress;
	user: IBtcAddress;
	media: IMedia;
	
	Hash(): string;
	Verify():boolean;
}

interface IChannelInfo {
	address: IBtcAddress;
	name: string;
	desc: {};
	
	Hash();
}

//////////////////////////////////////////////////////////////////////////////////////////
//////Channel-User-Media Aggregation//////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


interface IChannelUserMediaCache {
	[id: string]:IChannelUserMedia;
}

interface IChannelUserMediaBlock {
	
	[id: string]:IChannelUserMedia;
}

interface IChannelUserMediaProof {
	proof: {}
	channelUserMediaBlock: IChannelUserMediaBlock;
}

//////////////////////////////////////////////////////////////////////////////////////////
//////Channel & User Management //////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

interface IChannelManager {
	
}

interface IUserManager {
	
}

//////////////////////////////////////////////////////////////////////////////////////////
//////Top Level Players///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

interface IBtcAccessLayer {
	SaveBlock(channelUserMediaBlock: IChannelUserMediaBlock): IChannelUserMediaProof;
	QuickVerify(channelUserMediaProof: IChannelUserMediaProof): boolean;
	SlowVerify(channelUserMediaBlock: IChannelUserMediaBlock): boolean;
	SnailVerify(channelUserMedia: IChannelUserMedia): boolean;
}

interface ICommunicationController {
	local_address: string;
	neighbors: {[id: string]:URL}
	
	Ping(address?: URL);
	Disconnect(address?: URL);
	BroadcastChannelUserMediaBlock(channelUserMediaBlock: IChannelUserMediaBlock, address?:URL);
	BroadcastChannelUserMedia(channelUserMedia: IChannelUserMedia, address?:URL);
	BroadcastChannelUserMediaProof(channelUserMediaProof: IChannelUserMediaProof, address?:URL)
}


//////////////////////////////////////////////////////////////////////////////////////////
//////Core//////////////////////////d/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

interface ICore {
	communicationController: ICommunicationController;
	
	channelManager: IChannelManager;
	userManager: IUserManager;
	
	channelUserMediaCache: IChannelUserMediaCache;
	unpublishedChannelUserMediaBlock: IChannelUserMediaBlock;
	unsignedChannelUserMediaBlock: IChannelUserMediaBlock;
	
	btcAccessLayer: IBtcAccessLayer;
	
	GetChannelUserMedia(filter:(channelUserMedia: IChannelUserMedia)=>boolean):IChannelUserMedia;
	PostChannelUserMedia(channelUserMedia:IChannelUserMedia):string;
	VerifyChannelUserMedia(channelUserMedia: IChannelUserMedia):boolean;
	RequestSignature(channelUserMedia:IChannelUserMedia):IChannelUserMedia;
	Ping():boolean;
	DisconnectNotice():boolean;
}