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

 type Activity_init_args = {
    $$type: 'Activity_init_args';
    owner: Address;
    activityMain: Address;
    activityId: bigint;
}

function initActivity_init_args(src: Activity_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.activityMain);
        b_0.storeInt(src.activityId, 257);
    };
}

async function Activity_init(owner: Address, activityMain: Address, activityId: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initActivity_init_args({ $$type: 'Activity_init_args', owner, activityMain, activityId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Activity_errors: { [key: number]: { message: string } } = {
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

const Activity_types: ABIType[] = [
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

const Activity_getters: ABIGetter[] = [
    {"name":"get_account_info_address","arguments":[{"name":"ownerAdd","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_data","arguments":[],"returnType":{"kind":"simple","type":"ActivityData","optional":false}},
]

const Activity_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateActivityDo"}},
    {"receiver":"internal","message":{"kind":"text","text":"buy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DoBuy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DoEnd"}},
]

export class Activity implements Contract {
    
    static async init(owner: Address, activityMain: Address, activityId: bigint) {
        return await Activity_init(owner, activityMain, activityId);
    }
    
    static async fromInit(owner: Address, activityMain: Address, activityId: bigint) {
        const init = await Activity_init(owner, activityMain, activityId);
        const address = contractAddress(0, init);
        return new Activity(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Activity(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Activity_types,
        getters: Activity_getters,
        receivers: Activity_receivers,
        errors: Activity_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateActivityDo | 'buy' | DoBuy | DoEnd) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateActivityDo') {
            body = beginCell().store(storeCreateActivityDo(message)).endCell();
        }
        if (message === 'buy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DoBuy') {
            body = beginCell().store(storeDoBuy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DoEnd') {
            body = beginCell().store(storeDoEnd(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetAccountInfoAddress(provider: ContractProvider, ownerAdd: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(ownerAdd);
        let source = (await provider.get('get_account_info_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_data', builder.build())).stack;
        const result = loadTupleActivityData(source);
        return result;
    }
    
}