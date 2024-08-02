import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type CreateActivity = {
    $$type: 'CreateActivity';
    duration: bigint;
    minValue: bigint;
}

export function storeCreateActivity(src: CreateActivity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(199643919, 32);
        b_0.storeInt(src.duration, 257);
        b_0.storeInt(src.minValue, 257);
    };
}

export function loadCreateActivity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 199643919) { throw Error('Invalid prefix'); }
    let _duration = sc_0.loadIntBig(257);
    let _minValue = sc_0.loadIntBig(257);
    return { $$type: 'CreateActivity' as const, duration: _duration, minValue: _minValue };
}

function loadTupleCreateActivity(source: TupleReader) {
    let _duration = source.readBigNumber();
    let _minValue = source.readBigNumber();
    return { $$type: 'CreateActivity' as const, duration: _duration, minValue: _minValue };
}

function storeTupleCreateActivity(source: CreateActivity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.duration);
    builder.writeNumber(source.minValue);
    return builder.build();
}

function dictValueParserCreateActivity(): DictionaryValue<CreateActivity> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateActivity(src)).endCell());
        },
        parse: (src) => {
            return loadCreateActivity(src.loadRef().beginParse());
        }
    }
}

export type CreateActivityDo = {
    $$type: 'CreateActivityDo';
    activityId: bigint;
    duration: bigint;
    minValue: bigint;
}

export function storeCreateActivityDo(src: CreateActivityDo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3525543503, 32);
        b_0.storeInt(src.activityId, 257);
        b_0.storeInt(src.duration, 257);
        b_0.storeInt(src.minValue, 257);
    };
}

export function loadCreateActivityDo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3525543503) { throw Error('Invalid prefix'); }
    let _activityId = sc_0.loadIntBig(257);
    let _duration = sc_0.loadIntBig(257);
    let _minValue = sc_0.loadIntBig(257);
    return { $$type: 'CreateActivityDo' as const, activityId: _activityId, duration: _duration, minValue: _minValue };
}

function loadTupleCreateActivityDo(source: TupleReader) {
    let _activityId = source.readBigNumber();
    let _duration = source.readBigNumber();
    let _minValue = source.readBigNumber();
    return { $$type: 'CreateActivityDo' as const, activityId: _activityId, duration: _duration, minValue: _minValue };
}

function storeTupleCreateActivityDo(source: CreateActivityDo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.activityId);
    builder.writeNumber(source.duration);
    builder.writeNumber(source.minValue);
    return builder.build();
}

function dictValueParserCreateActivityDo(): DictionaryValue<CreateActivityDo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateActivityDo(src)).endCell());
        },
        parse: (src) => {
            return loadCreateActivityDo(src.loadRef().beginParse());
        }
    }
}

export type DoBuy = {
    $$type: 'DoBuy';
    amount: bigint;
    activityId: bigint;
}

export function storeDoBuy(src: DoBuy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(500584771, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeInt(src.activityId, 257);
    };
}

export function loadDoBuy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 500584771) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _activityId = sc_0.loadIntBig(257);
    return { $$type: 'DoBuy' as const, amount: _amount, activityId: _activityId };
}

function loadTupleDoBuy(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _activityId = source.readBigNumber();
    return { $$type: 'DoBuy' as const, amount: _amount, activityId: _activityId };
}

function storeTupleDoBuy(source: DoBuy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.activityId);
    return builder.build();
}

function dictValueParserDoBuy(): DictionaryValue<DoBuy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDoBuy(src)).endCell());
        },
        parse: (src) => {
            return loadDoBuy(src.loadRef().beginParse());
        }
    }
}

export type DoEnd = {
    $$type: 'DoEnd';
    activityId: bigint;
}

export function storeDoEnd(src: DoEnd) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2295491454, 32);
        b_0.storeInt(src.activityId, 257);
    };
}

export function loadDoEnd(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2295491454) { throw Error('Invalid prefix'); }
    let _activityId = sc_0.loadIntBig(257);
    return { $$type: 'DoEnd' as const, activityId: _activityId };
}

function loadTupleDoEnd(source: TupleReader) {
    let _activityId = source.readBigNumber();
    return { $$type: 'DoEnd' as const, activityId: _activityId };
}

function storeTupleDoEnd(source: DoEnd) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.activityId);
    return builder.build();
}

function dictValueParserDoEnd(): DictionaryValue<DoEnd> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDoEnd(src)).endCell());
        },
        parse: (src) => {
            return loadDoEnd(src.loadRef().beginParse());
        }
    }
}

export type ActivityData = {
    $$type: 'ActivityData';
    activityId: bigint;
    totalAmount: bigint;
    activityMain: Address;
    lastTime: bigint;
    lastAddress: Address;
    duration: bigint;
    isEnd: boolean;
}

export function storeActivityData(src: ActivityData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.activityId, 257);
        b_0.storeInt(src.totalAmount, 257);
        b_0.storeAddress(src.activityMain);
        let b_1 = new Builder();
        b_1.storeInt(src.lastTime, 257);
        b_1.storeAddress(src.lastAddress);
        b_1.storeInt(src.duration, 257);
        b_1.storeBit(src.isEnd);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadActivityData(slice: Slice) {
    let sc_0 = slice;
    let _activityId = sc_0.loadIntBig(257);
    let _totalAmount = sc_0.loadIntBig(257);
    let _activityMain = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _lastTime = sc_1.loadIntBig(257);
    let _lastAddress = sc_1.loadAddress();
    let _duration = sc_1.loadIntBig(257);
    let _isEnd = sc_1.loadBit();
    return { $$type: 'ActivityData' as const, activityId: _activityId, totalAmount: _totalAmount, activityMain: _activityMain, lastTime: _lastTime, lastAddress: _lastAddress, duration: _duration, isEnd: _isEnd };
}

function loadTupleActivityData(source: TupleReader) {
    let _activityId = source.readBigNumber();
    let _totalAmount = source.readBigNumber();
    let _activityMain = source.readAddress();
    let _lastTime = source.readBigNumber();
    let _lastAddress = source.readAddress();
    let _duration = source.readBigNumber();
    let _isEnd = source.readBoolean();
    return { $$type: 'ActivityData' as const, activityId: _activityId, totalAmount: _totalAmount, activityMain: _activityMain, lastTime: _lastTime, lastAddress: _lastAddress, duration: _duration, isEnd: _isEnd };
}

function storeTupleActivityData(source: ActivityData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.activityId);
    builder.writeNumber(source.totalAmount);
    builder.writeAddress(source.activityMain);
    builder.writeNumber(source.lastTime);
    builder.writeAddress(source.lastAddress);
    builder.writeNumber(source.duration);
    builder.writeBoolean(source.isEnd);
    return builder.build();
}

function dictValueParserActivityData(): DictionaryValue<ActivityData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeActivityData(src)).endCell());
        },
        parse: (src) => {
            return loadActivityData(src.loadRef().beginParse());
        }
    }
}

export type AccountInfoData = {
    $$type: 'AccountInfoData';
    owner: Address;
    activity: Address;
    amount: bigint;
    lasTime: bigint;
}

export function storeAccountInfoData(src: AccountInfoData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.activity);
        b_0.storeInt(src.amount, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.lasTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAccountInfoData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _activity = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _lasTime = sc_1.loadIntBig(257);
    return { $$type: 'AccountInfoData' as const, owner: _owner, activity: _activity, amount: _amount, lasTime: _lasTime };
}

function loadTupleAccountInfoData(source: TupleReader) {
    let _owner = source.readAddress();
    let _activity = source.readAddress();
    let _amount = source.readBigNumber();
    let _lasTime = source.readBigNumber();
    return { $$type: 'AccountInfoData' as const, owner: _owner, activity: _activity, amount: _amount, lasTime: _lasTime };
}

function storeTupleAccountInfoData(source: AccountInfoData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.activity);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.lasTime);
    return builder.build();
}

function dictValueParserAccountInfoData(): DictionaryValue<AccountInfoData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAccountInfoData(src)).endCell());
        },
        parse: (src) => {
            return loadAccountInfoData(src.loadRef().beginParse());
        }
    }
}

export type AccountInfoBuy = {
    $$type: 'AccountInfoBuy';
    amount: bigint;
    lasTime: bigint;
}

export function storeAccountInfoBuy(src: AccountInfoBuy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2524003178, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeInt(src.lasTime, 257);
    };
}

export function loadAccountInfoBuy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2524003178) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _lasTime = sc_0.loadIntBig(257);
    return { $$type: 'AccountInfoBuy' as const, amount: _amount, lasTime: _lasTime };
}

function loadTupleAccountInfoBuy(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _lasTime = source.readBigNumber();
    return { $$type: 'AccountInfoBuy' as const, amount: _amount, lasTime: _lasTime };
}

function storeTupleAccountInfoBuy(source: AccountInfoBuy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.lasTime);
    return builder.build();
}

function dictValueParserAccountInfoBuy(): DictionaryValue<AccountInfoBuy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAccountInfoBuy(src)).endCell());
        },
        parse: (src) => {
            return loadAccountInfoBuy(src.loadRef().beginParse());
        }
    }
}

 type ActivityMain_init_args = {
    $$type: 'ActivityMain_init_args';
    owner: Address;
}

function initActivityMain_init_args(src: ActivityMain_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function ActivityMain_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECHQEABKcAART/APSkE/S88sgLAQIBYgIDAtzQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZAoEBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVBcEAgEgCwwC3AGSMH/gcCHXScIflTAg1wsf3iCCEAvmUw+6jp4w0x8BghAL5lMPuvLggYEBAdcAgQEB1wBZbBLbPH/gghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwBQYD8FrbPCGkURLbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHBwUHmAQgnIVSCCENIjhk9QBMsfEoEBAc8AgQEBzwCBAQHPAMkWFRBIEDdQcgcaCAE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwJABL4QlIQxwXy4IQBDhBGEEXbPAEJAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAoAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCEb4o7tnm2eNhDBcNAgEgDg8AAiACASAQEQIBSBMUAhG1xZtnm2eNhDAXEgDdt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQTggZzq084r86ShYDrC3EyPZQAAIhABGwr7tRNDSAAGACASAVFgITrtftnixtnjYQwBcYAHWs3caGrS4MzmdF5eotqk9GLmaHBk8ojKxI7apoiUZOZubuyI8pCuluqE3GqG2s7wtJZipNzghs6OgwQAHE7UTQ1AH4Y9IAAY4ngQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR2zwZAYbbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIGgAEcQEBEvhD+ChUQxPbPBsBigPQ9AQwbSGBYzMBgBD0D2+h8uCHAYFjMyICgBD0FwKBcOYBgBD0D2+h8uCHEoFw5gECgBD0F8gByPQAyQHMcAHKAFUgBBwAiFog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJ');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initActivityMain_init_args({ $$type: 'ActivityMain_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ActivityMain_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    26960: { message: `Not end` },
    55362: { message: `min value` },
    62384: { message: `end` },
}

const ActivityMain_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateActivity","header":199643919,"fields":[{"name":"duration","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minValue","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateActivityDo","header":3525543503,"fields":[{"name":"activityId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"duration","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"minValue","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DoBuy","header":500584771,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"activityId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DoEnd","header":2295491454,"fields":[{"name":"activityId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ActivityData","header":null,"fields":[{"name":"activityId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"activityMain","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lastAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"duration","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isEnd","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"AccountInfoData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"activity","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lasTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AccountInfoBuy","header":2524003178,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lasTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const ActivityMain_getters: ABIGetter[] = [
    {"name":"get_activity_address","arguments":[{"name":"activityId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_next_id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const ActivityMain_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateActivity"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class ActivityMain implements Contract {
    
    static async init(owner: Address) {
        return await ActivityMain_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await ActivityMain_init(owner);
        const address = contractAddress(0, init);
        return new ActivityMain(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ActivityMain(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ActivityMain_types,
        getters: ActivityMain_getters,
        receivers: ActivityMain_receivers,
        errors: ActivityMain_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateActivity | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateActivity') {
            body = beginCell().store(storeCreateActivity(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetActivityAddress(provider: ContractProvider, activityId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(activityId);
        let source = (await provider.get('get_activity_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetNextId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_next_id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}