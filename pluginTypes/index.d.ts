/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-input/@scom/scom-token-modal/@ijstech/eth-wallet/index.d.ts" />
/// <amd-module name="@scom/scom-tip-me/interface.tsx" />
declare module "@scom/scom-tip-me/interface.tsx" {
    import { INetwork } from "@ijstech/eth-wallet";
    import { INetworkConfig } from "@scom/scom-network-picker";
    import { ITokenObject } from "@scom/scom-token-list";
    import { IWalletPlugin } from "@scom/scom-wallet-modal";
    export interface ICustomToken extends ITokenObject {
        chainId: number;
    }
    export interface ITipMe {
        logo: string;
        description: string;
        tokens: ICustomToken[];
        recipient: string;
        defaultChainId: number;
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
        showHeader?: boolean;
    }
    export interface IEmbedData extends Partial<ITipMe> {
        logo?: string;
        description?: string;
        defaultChainId: number;
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
        showHeader?: boolean;
    }
    export interface IExtendedNetwork extends INetwork {
        shortName?: string;
        isDisabled?: boolean;
        isMainChain?: boolean;
        isCrossChainSupported?: boolean;
        explorerName?: string;
        explorerTxUrl?: string;
        explorerAddressUrl?: string;
        isTestnet?: boolean;
    }
}
/// <amd-module name="@scom/scom-tip-me/store/index.ts" />
declare module "@scom/scom-tip-me/store/index.ts" {
    import { IExtendedNetwork } from "@scom/scom-tip-me/interface.tsx";
    export const enum EventId {
        ConnectWallet = "connectWallet",
        IsWalletConnected = "isWalletConnected",
        IsWalletDisconnected = "IsWalletDisconnected",
        chainChanged = "chainChanged",
        Paid = "Paid"
    }
    export enum WalletPlugin {
        MetaMask = "metamask",
        WalletConnect = "walletconnect"
    }
    export const getNetworkInfo: (chainId: number) => IExtendedNetwork;
    export const getSupportedNetworks: () => IExtendedNetwork[];
    export const state: {
        defaultChainId: number;
        networkMap: {
            [key: number]: IExtendedNetwork;
        };
        ipfsGatewayUrl: string;
        rpcWalletId: string;
    };
    export const setDataFromSCConfig: (options: any) => void;
    export const setIPFSGatewayUrl: (url: string) => void;
    export const getIPFSGatewayUrl: () => string;
    export const setDefaultChainId: (chainId: number) => void;
    export const getDefaultChainId: () => number;
    export const getImageIpfsUrl: (url: string) => string;
    export function isClientWalletConnected(): boolean;
    export function isRpcWalletConnected(): boolean;
    export function getChainId(): number;
    export function initRpcWallet(defaultChainId: number): string;
    export function getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
    export function getClientWallet(): import("@ijstech/eth-wallet").IClientWallet;
}
/// <amd-module name="@scom/scom-tip-me/utils/token.ts" />
declare module "@scom/scom-tip-me/utils/token.ts" {
    import { BigNumber, IWallet, ISendTxEventsOptions } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    export const getERC20Amount: (wallet: IWallet, tokenAddress: string, decimals: number) => Promise<BigNumber>;
    export const getTokenBalance: (token: ITokenObject) => Promise<BigNumber>;
    export const registerSendTxEvents: (sendTxEventHandlers: ISendTxEventsOptions) => void;
}
/// <amd-module name="@scom/scom-tip-me/utils/approvalModel.ts" />
declare module "@scom/scom-tip-me/utils/approvalModel.ts" {
    import { BigNumber } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    export enum ApprovalStatus {
        TO_BE_APPROVED = 0,
        APPROVING = 1,
        NONE = 2
    }
    export const getERC20Allowance: (token: ITokenObject, spenderAddress: string) => Promise<BigNumber>;
    export const getERC20ApprovalModelAction: (spenderAddress: string, options: IERC20ApprovalEventOptions) => IERC20ApprovalAction;
    interface IERC20ApprovalEventOptions {
        sender: any;
        payAction: () => Promise<void>;
        onToBeApproved: (token: ITokenObject) => Promise<void>;
        onToBePaid: (token: ITokenObject) => Promise<void>;
        onApproving: (token: ITokenObject, receipt?: string, data?: any) => Promise<void>;
        onApproved: (token: ITokenObject, data?: any) => Promise<void>;
        onPaying: (receipt?: string, data?: any) => Promise<void>;
        onPaid: (data?: any) => Promise<void>;
        onApprovingError: (token: ITokenObject, err: Error) => Promise<void>;
        onPayingError: (err: Error) => Promise<void>;
    }
    export interface IERC20ApprovalOptions extends IERC20ApprovalEventOptions {
        spenderAddress: string;
    }
    export interface IERC20ApprovalAction {
        setSpenderAddress: (value: string) => void;
        doApproveAction: (token: ITokenObject, inputAmount: string, data?: any) => Promise<void>;
        doPayAction: (data?: any) => Promise<void>;
        checkAllowance: (token: ITokenObject, inputAmount: string) => Promise<void>;
    }
}
/// <amd-module name="@scom/scom-tip-me/utils/index.ts" />
declare module "@scom/scom-tip-me/utils/index.ts" {
    export const formatNumber: (value: any, decimals?: number) => string;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export function parseContractError(oMessage: any): string;
    export { getERC20Amount, getTokenBalance, registerSendTxEvents } from "@scom/scom-tip-me/utils/token.ts";
    export { ApprovalStatus, getERC20Allowance, getERC20ApprovalModelAction, IERC20ApprovalOptions, IERC20ApprovalAction } from "@scom/scom-tip-me/utils/approvalModel.ts";
}
/// <amd-module name="@scom/scom-tip-me/index.css.ts" />
declare module "@scom/scom-tip-me/index.css.ts" {
    export const dappContainerStyle: string;
    export const buttonStyle: string;
}
/// <amd-module name="@scom/scom-tip-me/alert/index.tsx" />
declare module "@scom/scom-tip-me/alert/index.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-tip-me-alert']: ControlElement;
            }
        }
    }
    export interface IAlertMessage {
        status: 'warning' | 'success' | 'error' | 'loading';
        title?: string;
        content?: string;
        onClose?: any;
    }
    export class Alert extends Module {
        private mdAlert;
        private pnlMain;
        private _message;
        get message(): IAlertMessage;
        set message(value: IAlertMessage);
        private get iconName();
        private get color();
        closeModal(): void;
        showModal(): void;
        private renderUI;
        private renderContent;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/OpenSwap.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/OpenSwap.json.ts" {
    const _default: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/OpenSwap.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/OpenSwap.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        minter: string;
        initSupplyTo: string;
        initSupply: number | BigNumber;
        totalSupply: number | BigNumber;
    }
    export interface IAllowanceParams {
        owner: string;
        spender: string;
    }
    export interface IApproveParams {
        spender: string;
        amount: number | BigNumber;
    }
    export interface IDecreaseAllowanceParams {
        spender: string;
        subtractedValue: number | BigNumber;
    }
    export interface IIncreaseAllowanceParams {
        spender: string;
        addedValue: number | BigNumber;
    }
    export interface IMintParams {
        account: string;
        amount: number | BigNumber;
    }
    export interface ITransferParams {
        recipient: string;
        amount: number | BigNumber;
    }
    export interface ITransferFromParams {
        sender: string;
        recipient: string;
        amount: number | BigNumber;
    }
    export class OpenSwap extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): OpenSwap.ApprovalEvent[];
        decodeApprovalEvent(event: Event): OpenSwap.ApprovalEvent;
        parseTransferEvent(receipt: TransactionReceipt): OpenSwap.TransferEvent[];
        decodeTransferEvent(event: Event): OpenSwap.TransferEvent;
        allowance: {
            (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: IApproveParams, options?: TransactionOptions) => Promise<string>;
        };
        balanceOf: {
            (account: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        cap: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        decreaseAllowance: {
            (params: IDecreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IDecreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: IDecreaseAllowanceParams, options?: TransactionOptions) => Promise<string>;
        };
        increaseAllowance: {
            (params: IIncreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IIncreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: IIncreaseAllowanceParams, options?: TransactionOptions) => Promise<string>;
        };
        mint: {
            (params: IMintParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IMintParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IMintParams, options?: TransactionOptions) => Promise<string>;
        };
        minter: {
            (options?: TransactionOptions): Promise<string>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        totalSupply: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transfer: {
            (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferParams, options?: TransactionOptions) => Promise<string>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module OpenSwap {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_ERC20.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_ERC20.json.ts" {
    const _default_1: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_ERC20.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_ERC20.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAllowanceParams {
        param1: string;
        param2: string;
    }
    export interface IApproveParams {
        spender: string;
        value: number | BigNumber;
    }
    export interface IPermitParams {
        owner: string;
        spender: string;
        value: number | BigNumber;
        deadline: number | BigNumber;
        v: number | BigNumber;
        r: string;
        s: string;
    }
    export interface ITransferParams {
        to: string;
        value: number | BigNumber;
    }
    export interface ITransferFromParams {
        from: string;
        to: string;
        value: number | BigNumber;
    }
    export class OSWAP_ERC20 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): OSWAP_ERC20.ApprovalEvent[];
        decodeApprovalEvent(event: Event): OSWAP_ERC20.ApprovalEvent;
        parseTransferEvent(receipt: TransactionReceipt): OSWAP_ERC20.TransferEvent[];
        decodeTransferEvent(event: Event): OSWAP_ERC20.TransferEvent;
        EIP712_TYPEHASH: {
            (options?: TransactionOptions): Promise<string>;
        };
        NAME_HASH: {
            (options?: TransactionOptions): Promise<string>;
        };
        PERMIT_TYPEHASH: {
            (options?: TransactionOptions): Promise<string>;
        };
        VERSION_HASH: {
            (options?: TransactionOptions): Promise<string>;
        };
        allowance: {
            (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: IApproveParams, options?: TransactionOptions) => Promise<string>;
        };
        balanceOf: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        nonces: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        permit: {
            (params: IPermitParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IPermitParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IPermitParams, options?: TransactionOptions) => Promise<string>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        totalSupply: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transfer: {
            (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferParams, options?: TransactionOptions) => Promise<string>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module OSWAP_ERC20 {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Factory.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Factory.json.ts" {
    const _default_2: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_2;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Factory.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Factory.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        governance: string;
        pairCreator: string;
        tradeFee: number | BigNumber;
        protocolFee: number | BigNumber;
        protocolFeeTo: string;
    }
    export interface ICreatePairParams {
        tokenA: string;
        tokenB: string;
    }
    export interface IGetPairParams {
        param1: string;
        param2: string;
    }
    export interface ISetLiveForPairParams {
        pair: string;
        live: boolean;
    }
    export class OSWAP_Factory extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parsePairCreatedEvent(receipt: TransactionReceipt): OSWAP_Factory.PairCreatedEvent[];
        decodePairCreatedEvent(event: Event): OSWAP_Factory.PairCreatedEvent;
        parsePairRestartedEvent(receipt: TransactionReceipt): OSWAP_Factory.PairRestartedEvent[];
        decodePairRestartedEvent(event: Event): OSWAP_Factory.PairRestartedEvent;
        parsePairShutdownedEvent(receipt: TransactionReceipt): OSWAP_Factory.PairShutdownedEvent[];
        decodePairShutdownedEvent(event: Event): OSWAP_Factory.PairShutdownedEvent;
        parseParamSetEvent(receipt: TransactionReceipt): OSWAP_Factory.ParamSetEvent[];
        decodeParamSetEvent(event: Event): OSWAP_Factory.ParamSetEvent;
        parseParamSet2Event(receipt: TransactionReceipt): OSWAP_Factory.ParamSet2Event[];
        decodeParamSet2Event(event: Event): OSWAP_Factory.ParamSet2Event;
        parseRestartedEvent(receipt: TransactionReceipt): OSWAP_Factory.RestartedEvent[];
        decodeRestartedEvent(event: Event): OSWAP_Factory.RestartedEvent;
        parseShutdownedEvent(receipt: TransactionReceipt): OSWAP_Factory.ShutdownedEvent[];
        decodeShutdownedEvent(event: Event): OSWAP_Factory.ShutdownedEvent;
        allPairs: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        allPairsLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        createPair: {
            (params: ICreatePairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
            txData: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
        };
        getPair: {
            (params: IGetPairParams, options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        pairCreator: {
            (options?: TransactionOptions): Promise<string>;
        };
        protocolFee: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeParams: {
            (options?: TransactionOptions): Promise<{
                _protocolFee: BigNumber;
                _protocolFeeTo: string;
            }>;
        };
        protocolFeeTo: {
            (options?: TransactionOptions): Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setLiveForPair: {
            (params: ISetLiveForPairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<string>;
        };
        setProtocolFee: {
            (protocolFee: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (protocolFee: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (protocolFee: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        setProtocolFeeTo: {
            (protocolFeeTo: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (protocolFeeTo: string, options?: TransactionOptions) => Promise<void>;
            txData: (protocolFeeTo: string, options?: TransactionOptions) => Promise<string>;
        };
        setTradeFee: {
            (tradeFee: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tradeFee: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (tradeFee: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        tradeFee: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        private assign;
    }
    export module OSWAP_Factory {
        interface PairCreatedEvent {
            token0: string;
            token1: string;
            pair: string;
            newSize: BigNumber;
            _event: Event;
        }
        interface PairRestartedEvent {
            pair: string;
            _event: Event;
        }
        interface PairShutdownedEvent {
            pair: string;
            _event: Event;
        }
        interface ParamSetEvent {
            name: string;
            value: string;
            _event: Event;
        }
        interface ParamSet2Event {
            name: string;
            value1: string;
            value2: string;
            _event: Event;
        }
        interface RestartedEvent {
            _event: Event;
        }
        interface ShutdownedEvent {
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Pair.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Pair.json.ts" {
    const _default_3: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_3;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Pair.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Pair.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAllowanceParams {
        param1: string;
        param2: string;
    }
    export interface IApproveParams {
        spender: string;
        value: number | BigNumber;
    }
    export interface IGetAmountInParams {
        tokenOut: string;
        amountOut: number | BigNumber;
    }
    export interface IGetAmountOutParams {
        tokenIn: string;
        amountIn: number | BigNumber;
    }
    export interface IInitializeParams {
        token0: string;
        token1: string;
    }
    export interface IPermitParams {
        owner: string;
        spender: string;
        value: number | BigNumber;
        deadline: number | BigNumber;
        v: number | BigNumber;
        r: string;
        s: string;
    }
    export interface ISwapParams {
        amount0Out: number | BigNumber;
        amount1Out: number | BigNumber;
        to: string;
        data: string;
    }
    export interface ITransferParams {
        to: string;
        value: number | BigNumber;
    }
    export interface ITransferFromParams {
        from: string;
        to: string;
        value: number | BigNumber;
    }
    export class OSWAP_Pair extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): OSWAP_Pair.ApprovalEvent[];
        decodeApprovalEvent(event: Event): OSWAP_Pair.ApprovalEvent;
        parseBurnEvent(receipt: TransactionReceipt): OSWAP_Pair.BurnEvent[];
        decodeBurnEvent(event: Event): OSWAP_Pair.BurnEvent;
        parseMintEvent(receipt: TransactionReceipt): OSWAP_Pair.MintEvent[];
        decodeMintEvent(event: Event): OSWAP_Pair.MintEvent;
        parseProtocolFeeSetEvent(receipt: TransactionReceipt): OSWAP_Pair.ProtocolFeeSetEvent[];
        decodeProtocolFeeSetEvent(event: Event): OSWAP_Pair.ProtocolFeeSetEvent;
        parseSwapEvent(receipt: TransactionReceipt): OSWAP_Pair.SwapEvent[];
        decodeSwapEvent(event: Event): OSWAP_Pair.SwapEvent;
        parseSyncEvent(receipt: TransactionReceipt): OSWAP_Pair.SyncEvent[];
        decodeSyncEvent(event: Event): OSWAP_Pair.SyncEvent;
        parseTradeFeeSetEvent(receipt: TransactionReceipt): OSWAP_Pair.TradeFeeSetEvent[];
        decodeTradeFeeSetEvent(event: Event): OSWAP_Pair.TradeFeeSetEvent;
        parseTransferEvent(receipt: TransactionReceipt): OSWAP_Pair.TransferEvent[];
        decodeTransferEvent(event: Event): OSWAP_Pair.TransferEvent;
        EIP712_TYPEHASH: {
            (options?: TransactionOptions): Promise<string>;
        };
        MINIMUM_LIQUIDITY: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        NAME_HASH: {
            (options?: TransactionOptions): Promise<string>;
        };
        PERMIT_TYPEHASH: {
            (options?: TransactionOptions): Promise<string>;
        };
        VERSION_HASH: {
            (options?: TransactionOptions): Promise<string>;
        };
        allowance: {
            (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: IApproveParams, options?: TransactionOptions) => Promise<string>;
        };
        balanceOf: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        burn: {
            (to: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (to: string, options?: TransactionOptions) => Promise<{
                amount0: BigNumber;
                amount1: BigNumber;
            }>;
            txData: (to: string, options?: TransactionOptions) => Promise<string>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getReserves: {
            (options?: TransactionOptions): Promise<{
                _reserve0: BigNumber;
                _reserve1: BigNumber;
                _blockTimestampLast: BigNumber;
            }>;
        };
        initialize: {
            (params: IInitializeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IInitializeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IInitializeParams, options?: TransactionOptions) => Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        kLast: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        mint: {
            (to: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (to: string, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (to: string, options?: TransactionOptions) => Promise<string>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        nonces: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        permit: {
            (params: IPermitParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IPermitParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IPermitParams, options?: TransactionOptions) => Promise<string>;
        };
        price0CumulativeLast: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        price1CumulativeLast: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFee: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        skim: {
            (to: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (to: string, options?: TransactionOptions) => Promise<void>;
            txData: (to: string, options?: TransactionOptions) => Promise<string>;
        };
        swap: {
            (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapParams, options?: TransactionOptions) => Promise<string>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        sync: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        token0: {
            (options?: TransactionOptions): Promise<string>;
        };
        token1: {
            (options?: TransactionOptions): Promise<string>;
        };
        totalSupply: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        tradeFee: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transfer: {
            (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferParams, options?: TransactionOptions) => Promise<string>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        updateFee: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        updateProtocolFee: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module OSWAP_Pair {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface BurnEvent {
            sender: string;
            amount0: BigNumber;
            amount1: BigNumber;
            to: string;
            _event: Event;
        }
        interface MintEvent {
            sender: string;
            amount0: BigNumber;
            amount1: BigNumber;
            _event: Event;
        }
        interface ProtocolFeeSetEvent {
            protocolFee: BigNumber;
            _event: Event;
        }
        interface SwapEvent {
            sender: string;
            amount0In: BigNumber;
            amount1In: BigNumber;
            amount0Out: BigNumber;
            amount1Out: BigNumber;
            to: string;
            _event: Event;
        }
        interface SyncEvent {
            reserve0: BigNumber;
            reserve1: BigNumber;
            _event: Event;
        }
        interface TradeFeeSetEvent {
            tradeFee: BigNumber;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_PairCreator.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_PairCreator.json.ts" {
    const _default_4: {
        abi: {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        }[];
        bytecode: string;
    };
    export default _default_4;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_PairCreator.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_PairCreator.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_PairCreator extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        createPair: {
            (salt: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (salt: string, options?: TransactionOptions) => Promise<string>;
            txData: (salt: string, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Router.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Router.json.ts" {
    const _default_5: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_5;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Router.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Router.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        factory: string;
        WETH: string;
    }
    export interface IAddLiquidityParams {
        tokenA: string;
        tokenB: string;
        amountADesired: number | BigNumber;
        amountBDesired: number | BigNumber;
        amountAMin: number | BigNumber;
        amountBMin: number | BigNumber;
        to: string;
        deadline: number | BigNumber;
    }
    export interface IAddLiquidityETHParams {
        token: string;
        amountTokenDesired: number | BigNumber;
        amountTokenMin: number | BigNumber;
        amountETHMin: number | BigNumber;
        to: string;
        deadline: number | BigNumber;
    }
    export interface IGetAmountInParams {
        amountOut: number | BigNumber;
        tokenIn: string;
        tokenOut: string;
    }
    export interface IGetAmountOutParams {
        amountIn: number | BigNumber;
        tokenIn: string;
        tokenOut: string;
    }
    export interface IGetAmountsInParams {
        amountOut: number | BigNumber;
        path: string[];
    }
    export interface IGetAmountsOutParams {
        amountIn: number | BigNumber;
        path: string[];
    }
    export interface IGetReservesParams {
        tokenA: string;
        tokenB: string;
    }
    export interface IQuoteParams {
        amountA: number | BigNumber;
        reserveA: number | BigNumber;
        reserveB: number | BigNumber;
    }
    export interface IRemoveLiquidityParams {
        tokenA: string;
        tokenB: string;
        liquidity: number | BigNumber;
        amountAMin: number | BigNumber;
        amountBMin: number | BigNumber;
        to: string;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityETHParams {
        token: string;
        liquidity: number | BigNumber;
        amountTokenMin: number | BigNumber;
        amountETHMin: number | BigNumber;
        to: string;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityETHSupportingFeeOnTransferTokensParams {
        token: string;
        liquidity: number | BigNumber;
        amountTokenMin: number | BigNumber;
        amountETHMin: number | BigNumber;
        to: string;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityETHWithPermitParams {
        token: string;
        liquidity: number | BigNumber;
        amountTokenMin: number | BigNumber;
        amountETHMin: number | BigNumber;
        to: string;
        deadline: number | BigNumber;
        approveMax: boolean;
        v: number | BigNumber;
        r: string;
        s: string;
    }
    export interface IRemoveLiquidityETHWithPermitSupportingFeeOnTransferTokensParams {
        token: string;
        liquidity: number | BigNumber;
        amountTokenMin: number | BigNumber;
        amountETHMin: number | BigNumber;
        to: string;
        deadline: number | BigNumber;
        approveMax: boolean;
        v: number | BigNumber;
        r: string;
        s: string;
    }
    export interface IRemoveLiquidityWithPermitParams {
        tokenA: string;
        tokenB: string;
        liquidity: number | BigNumber;
        amountAMin: number | BigNumber;
        amountBMin: number | BigNumber;
        to: string;
        deadline: number | BigNumber;
        approveMax: boolean;
        v: number | BigNumber;
        r: string;
        s: string;
    }
    export interface ISwapETHForExactTokensParams {
        amountOut: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
    }
    export interface ISwapExactETHForTokensParams {
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
    }
    export interface ISwapExactETHForTokensSupportingFeeOnTransferTokensParams {
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
    }
    export interface ISwapExactTokensForETHParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
    }
    export interface ISwapExactTokensForETHSupportingFeeOnTransferTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
    }
    export interface ISwapExactTokensForTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
    }
    export interface ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
    }
    export interface ISwapTokensForExactETHParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
    }
    export interface ISwapTokensForExactTokensParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
    }
    export class OSWAP_Router extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<{
                amountA: BigNumber;
                amountB: BigNumber;
                liquidity: BigNumber;
            }>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        addLiquidityETH: {
            (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                amountToken: BigNumber;
                amountETH: BigNumber;
                liquidity: BigNumber;
            }>;
            txData: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountsIn: {
            (params: IGetAmountsInParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        getAmountsOut: {
            (params: IGetAmountsOutParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        getReserves: {
            (params: IGetReservesParams, options?: TransactionOptions): Promise<{
                reserveA: BigNumber;
                reserveB: BigNumber;
            }>;
        };
        quote: {
            (params: IQuoteParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<{
                amountA: BigNumber;
                amountB: BigNumber;
            }>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETH: {
            (params: IRemoveLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<{
                amountToken: BigNumber;
                amountETH: BigNumber;
            }>;
            txData: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETHSupportingFeeOnTransferTokens: {
            (params: IRemoveLiquidityETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: IRemoveLiquidityETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETHWithPermit: {
            (params: IRemoveLiquidityETHWithPermitParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHWithPermitParams, options?: TransactionOptions) => Promise<{
                amountToken: BigNumber;
                amountETH: BigNumber;
            }>;
            txData: (params: IRemoveLiquidityETHWithPermitParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETHWithPermitSupportingFeeOnTransferTokens: {
            (params: IRemoveLiquidityETHWithPermitSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHWithPermitSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: IRemoveLiquidityETHWithPermitSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityWithPermit: {
            (params: IRemoveLiquidityWithPermitParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityWithPermitParams, options?: TransactionOptions) => Promise<{
                amountA: BigNumber;
                amountB: BigNumber;
            }>;
            txData: (params: IRemoveLiquidityWithPermitParams, options?: TransactionOptions) => Promise<string>;
        };
        swapETHForExactTokens: {
            (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactETHForTokens: {
            (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactETHForTokensSupportingFeeOnTransferTokens: {
            (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactTokensForETH: {
            (params: ISwapExactTokensForETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForETHSupportingFeeOnTransferTokens: {
            (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForTokens: {
            (params: ISwapExactTokensForTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForTokensSupportingFeeOnTransferTokens: {
            (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapTokensForExactETH: {
            (params: ISwapTokensForExactETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<string>;
        };
        swapTokensForExactTokens: {
            (params: ISwapTokensForExactTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_VotingExecutor1.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_VotingExecutor1.json.ts" {
    const _default_6: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
        } | {
            inputs: any[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_6;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_VotingExecutor1.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_VotingExecutor1.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_VotingExecutor1 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(factory: string, options?: TransactionOptions): Promise<string>;
        execute: {
            (params: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: string[], options?: TransactionOptions) => Promise<void>;
            txData: (params: string[], options?: TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_FactoryBase.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_FactoryBase.json.ts" {
    const _default_7: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_7;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_FactoryBase.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_FactoryBase.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        governance: string;
        pairCreator: string;
    }
    export interface ICreatePairParams {
        tokenA: string;
        tokenB: string;
    }
    export interface IGetPairParams {
        param1: string;
        param2: string;
    }
    export interface ISetLiveForPairParams {
        pair: string;
        live: boolean;
    }
    export class OSWAP_FactoryBase extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parsePairCreatedEvent(receipt: TransactionReceipt): OSWAP_FactoryBase.PairCreatedEvent[];
        decodePairCreatedEvent(event: Event): OSWAP_FactoryBase.PairCreatedEvent;
        parsePairRestartedEvent(receipt: TransactionReceipt): OSWAP_FactoryBase.PairRestartedEvent[];
        decodePairRestartedEvent(event: Event): OSWAP_FactoryBase.PairRestartedEvent;
        parsePairShutdownedEvent(receipt: TransactionReceipt): OSWAP_FactoryBase.PairShutdownedEvent[];
        decodePairShutdownedEvent(event: Event): OSWAP_FactoryBase.PairShutdownedEvent;
        parseRestartedEvent(receipt: TransactionReceipt): OSWAP_FactoryBase.RestartedEvent[];
        decodeRestartedEvent(event: Event): OSWAP_FactoryBase.RestartedEvent;
        parseShutdownedEvent(receipt: TransactionReceipt): OSWAP_FactoryBase.ShutdownedEvent[];
        decodeShutdownedEvent(event: Event): OSWAP_FactoryBase.ShutdownedEvent;
        allPairs: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        allPairsLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        createPair: {
            (params: ICreatePairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
            txData: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
        };
        getPair: {
            (params: IGetPairParams, options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        pairCreator: {
            (options?: TransactionOptions): Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setLiveForPair: {
            (params: ISetLiveForPairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module OSWAP_FactoryBase {
        interface PairCreatedEvent {
            token0: string;
            token1: string;
            pair: string;
            newSize: BigNumber;
            _event: Event;
        }
        interface PairRestartedEvent {
            pair: string;
            _event: Event;
        }
        interface PairShutdownedEvent {
            pair: string;
            _event: Event;
        }
        interface RestartedEvent {
            _event: Event;
        }
        interface ShutdownedEvent {
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausableFactory.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausableFactory.json.ts" {
    const _default_8: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: any[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_8;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausableFactory.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausableFactory.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface ISetLiveForPairParams {
        pair: string;
        live: boolean;
    }
    export class OSWAP_PausableFactory extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(governance: string, options?: TransactionOptions): Promise<string>;
        parsePairRestartedEvent(receipt: TransactionReceipt): OSWAP_PausableFactory.PairRestartedEvent[];
        decodePairRestartedEvent(event: Event): OSWAP_PausableFactory.PairRestartedEvent;
        parsePairShutdownedEvent(receipt: TransactionReceipt): OSWAP_PausableFactory.PairShutdownedEvent[];
        decodePairShutdownedEvent(event: Event): OSWAP_PausableFactory.PairShutdownedEvent;
        parseRestartedEvent(receipt: TransactionReceipt): OSWAP_PausableFactory.RestartedEvent[];
        decodeRestartedEvent(event: Event): OSWAP_PausableFactory.RestartedEvent;
        parseShutdownedEvent(receipt: TransactionReceipt): OSWAP_PausableFactory.ShutdownedEvent[];
        decodeShutdownedEvent(event: Event): OSWAP_PausableFactory.ShutdownedEvent;
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setLiveForPair: {
            (params: ISetLiveForPairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module OSWAP_PausableFactory {
        interface PairRestartedEvent {
            pair: string;
            _event: Event;
        }
        interface PairShutdownedEvent {
            pair: string;
            _event: Event;
        }
        interface RestartedEvent {
            _event: Event;
        }
        interface ShutdownedEvent {
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausablePair.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausablePair.json.ts" {
    const _default_9: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: any[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_9;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausablePair.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausablePair.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_PausablePair extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Administrator.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Administrator.json.ts" {
    const _default_10: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_10;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Administrator.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Administrator.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IExecutePairRestartParams {
        factory: string;
        pair: string;
    }
    export interface IExecutePairShutdownParams {
        factory: string;
        pair: string;
    }
    export interface IFactoryRestartParams {
        factory: string;
        YorN: boolean;
    }
    export interface IFactoryRestartVoteParams {
        param1: string;
        param2: string;
    }
    export interface IFactoryShutdownParams {
        factory: string;
        YorN: boolean;
    }
    export interface IFactoryShutdownVoteParams {
        param1: string;
        param2: string;
    }
    export interface IPairRestartParams {
        pair: string;
        YorN: boolean;
    }
    export interface IPairRestartVoteParams {
        param1: string;
        param2: string;
    }
    export interface IPairShutdownParams {
        pair: string;
        YorN: boolean;
    }
    export interface IPairShutdownVoteParams {
        param1: string;
        param2: string;
    }
    export interface IVetoVotingParams {
        votingContract: string;
        YorN: boolean;
    }
    export interface IVetoVotingVoteParams {
        param1: string;
        param2: string;
    }
    export class OAXDEX_Administrator extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(governance: string, options?: TransactionOptions): Promise<string>;
        parseAddAdminEvent(receipt: TransactionReceipt): OAXDEX_Administrator.AddAdminEvent[];
        decodeAddAdminEvent(event: Event): OAXDEX_Administrator.AddAdminEvent;
        parseRemoveAdminEvent(receipt: TransactionReceipt): OAXDEX_Administrator.RemoveAdminEvent[];
        decodeRemoveAdminEvent(event: Event): OAXDEX_Administrator.RemoveAdminEvent;
        parseSetMaxAdminEvent(receipt: TransactionReceipt): OAXDEX_Administrator.SetMaxAdminEvent[];
        decodeSetMaxAdminEvent(event: Event): OAXDEX_Administrator.SetMaxAdminEvent;
        parseVotedFactoryRestartEvent(receipt: TransactionReceipt): OAXDEX_Administrator.VotedFactoryRestartEvent[];
        decodeVotedFactoryRestartEvent(event: Event): OAXDEX_Administrator.VotedFactoryRestartEvent;
        parseVotedFactoryShutdownEvent(receipt: TransactionReceipt): OAXDEX_Administrator.VotedFactoryShutdownEvent[];
        decodeVotedFactoryShutdownEvent(event: Event): OAXDEX_Administrator.VotedFactoryShutdownEvent;
        parseVotedPairRestartEvent(receipt: TransactionReceipt): OAXDEX_Administrator.VotedPairRestartEvent[];
        decodeVotedPairRestartEvent(event: Event): OAXDEX_Administrator.VotedPairRestartEvent;
        parseVotedPairShutdownEvent(receipt: TransactionReceipt): OAXDEX_Administrator.VotedPairShutdownEvent[];
        decodeVotedPairShutdownEvent(event: Event): OAXDEX_Administrator.VotedPairShutdownEvent;
        parseVotedVetoEvent(receipt: TransactionReceipt): OAXDEX_Administrator.VotedVetoEvent[];
        decodeVotedVetoEvent(event: Event): OAXDEX_Administrator.VotedVetoEvent;
        addAdmin: {
            (admin: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (admin: string, options?: TransactionOptions) => Promise<void>;
            txData: (admin: string, options?: TransactionOptions) => Promise<string>;
        };
        admins: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        adminsIdx: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        allAdmins: {
            (options?: TransactionOptions): Promise<string[]>;
        };
        executeFactoryRestart: {
            (factory: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (factory: string, options?: TransactionOptions) => Promise<void>;
            txData: (factory: string, options?: TransactionOptions) => Promise<string>;
        };
        executeFactoryShutdown: {
            (factory: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (factory: string, options?: TransactionOptions) => Promise<void>;
            txData: (factory: string, options?: TransactionOptions) => Promise<string>;
        };
        executePairRestart: {
            (params: IExecutePairRestartParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IExecutePairRestartParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IExecutePairRestartParams, options?: TransactionOptions) => Promise<string>;
        };
        executePairShutdown: {
            (params: IExecutePairShutdownParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IExecutePairShutdownParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IExecutePairShutdownParams, options?: TransactionOptions) => Promise<string>;
        };
        executeVetoVoting: {
            (votingContract: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (votingContract: string, options?: TransactionOptions) => Promise<void>;
            txData: (votingContract: string, options?: TransactionOptions) => Promise<string>;
        };
        factoryRestart: {
            (params: IFactoryRestartParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IFactoryRestartParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IFactoryRestartParams, options?: TransactionOptions) => Promise<string>;
        };
        factoryRestartVote: {
            (params: IFactoryRestartVoteParams, options?: TransactionOptions): Promise<boolean>;
        };
        factoryShutdown: {
            (params: IFactoryShutdownParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IFactoryShutdownParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IFactoryShutdownParams, options?: TransactionOptions) => Promise<string>;
        };
        factoryShutdownVote: {
            (params: IFactoryShutdownVoteParams, options?: TransactionOptions): Promise<boolean>;
        };
        getFactoryRestartVote: {
            (factory: string, options?: TransactionOptions): Promise<boolean[]>;
        };
        getFactoryShutdownVote: {
            (factory: string, options?: TransactionOptions): Promise<boolean[]>;
        };
        getPairRestartVote: {
            (pair: string, options?: TransactionOptions): Promise<boolean[]>;
        };
        getPairShutdownVote: {
            (pair: string, options?: TransactionOptions): Promise<boolean[]>;
        };
        getVetoVotingVote: {
            (votingContract: string, options?: TransactionOptions): Promise<boolean[]>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        maxAdmin: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        pairRestart: {
            (params: IPairRestartParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IPairRestartParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IPairRestartParams, options?: TransactionOptions) => Promise<string>;
        };
        pairRestartVote: {
            (params: IPairRestartVoteParams, options?: TransactionOptions): Promise<boolean>;
        };
        pairShutdown: {
            (params: IPairShutdownParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IPairShutdownParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IPairShutdownParams, options?: TransactionOptions) => Promise<string>;
        };
        pairShutdownVote: {
            (params: IPairShutdownVoteParams, options?: TransactionOptions): Promise<boolean>;
        };
        removeAdmin: {
            (admin: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (admin: string, options?: TransactionOptions) => Promise<void>;
            txData: (admin: string, options?: TransactionOptions) => Promise<string>;
        };
        setMaxAdmin: {
            (maxAdmin: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (maxAdmin: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (maxAdmin: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        vetoVoting: {
            (params: IVetoVotingParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IVetoVotingParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IVetoVotingParams, options?: TransactionOptions) => Promise<string>;
        };
        vetoVotingVote: {
            (params: IVetoVotingVoteParams, options?: TransactionOptions): Promise<boolean>;
        };
        private assign;
    }
    export module OAXDEX_Administrator {
        interface AddAdminEvent {
            admin: string;
            _event: Event;
        }
        interface RemoveAdminEvent {
            admin: string;
            _event: Event;
        }
        interface SetMaxAdminEvent {
            maxAdmin: BigNumber;
            _event: Event;
        }
        interface VotedFactoryRestartEvent {
            admin: string;
            factory: string;
            YorN: boolean;
            _event: Event;
        }
        interface VotedFactoryShutdownEvent {
            admin: string;
            factory: string;
            YorN: boolean;
            _event: Event;
        }
        interface VotedPairRestartEvent {
            admin: string;
            pair: string;
            YorN: boolean;
            _event: Event;
        }
        interface VotedPairShutdownEvent {
            admin: string;
            pair: string;
            YorN: boolean;
            _event: Event;
        }
        interface VotedVetoEvent {
            admin: string;
            votingContract: string;
            YorN: boolean;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Governance.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Governance.json.ts" {
    const _default_11: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_11;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Governance.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Governance.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        oaxToken: string;
        votingToken: string;
        names: string[];
        minExeDelay: (number | BigNumber)[];
        minVoteDuration: (number | BigNumber)[];
        maxVoteDuration: (number | BigNumber)[];
        minOaxTokenToCreateVote: (number | BigNumber)[];
        minQuorum: (number | BigNumber)[];
        minStakePeriod: number | BigNumber;
    }
    export interface IAddVotingConfigParams {
        name: string;
        minExeDelay: number | BigNumber;
        minVoteDuration: number | BigNumber;
        maxVoteDuration: number | BigNumber;
        minOaxTokenToCreateVote: number | BigNumber;
        minQuorum: number | BigNumber;
    }
    export interface IGetVotingConfigProfilesParams {
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetVotingsParams {
        start: number | BigNumber;
        count: number | BigNumber;
    }
    export interface INewVoteParams {
        vote: string;
        isExecutiveVote: boolean;
    }
    export interface ISetVotingConfigParams {
        configName: string;
        paramName: string;
        paramValue: number | BigNumber;
    }
    export interface ISetVotingExecutorParams {
        votingExecutor: string;
        bool: boolean;
    }
    export interface IVotedParams {
        poll: boolean;
        account: string;
        option: number | BigNumber;
    }
    export class OAXDEX_Governance extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseAddVotingConfigEvent(receipt: TransactionReceipt): OAXDEX_Governance.AddVotingConfigEvent[];
        decodeAddVotingConfigEvent(event: Event): OAXDEX_Governance.AddVotingConfigEvent;
        parseExecutedEvent(receipt: TransactionReceipt): OAXDEX_Governance.ExecutedEvent[];
        decodeExecutedEvent(event: Event): OAXDEX_Governance.ExecutedEvent;
        parseNewPollEvent(receipt: TransactionReceipt): OAXDEX_Governance.NewPollEvent[];
        decodeNewPollEvent(event: Event): OAXDEX_Governance.NewPollEvent;
        parseNewVoteEvent(receipt: TransactionReceipt): OAXDEX_Governance.NewVoteEvent[];
        decodeNewVoteEvent(event: Event): OAXDEX_Governance.NewVoteEvent;
        parseOwnershipTransferredEvent(receipt: TransactionReceipt): OAXDEX_Governance.OwnershipTransferredEvent[];
        decodeOwnershipTransferredEvent(event: Event): OAXDEX_Governance.OwnershipTransferredEvent;
        parseParamSetEvent(receipt: TransactionReceipt): OAXDEX_Governance.ParamSetEvent[];
        decodeParamSetEvent(event: Event): OAXDEX_Governance.ParamSetEvent;
        parseParamSet2Event(receipt: TransactionReceipt): OAXDEX_Governance.ParamSet2Event[];
        decodeParamSet2Event(event: Event): OAXDEX_Governance.ParamSet2Event;
        parsePollEvent(receipt: TransactionReceipt): OAXDEX_Governance.PollEvent[];
        decodePollEvent(event: Event): OAXDEX_Governance.PollEvent;
        parseSetVotingConfigEvent(receipt: TransactionReceipt): OAXDEX_Governance.SetVotingConfigEvent[];
        decodeSetVotingConfigEvent(event: Event): OAXDEX_Governance.SetVotingConfigEvent;
        parseStakeEvent(receipt: TransactionReceipt): OAXDEX_Governance.StakeEvent[];
        decodeStakeEvent(event: Event): OAXDEX_Governance.StakeEvent;
        parseUnstakeEvent(receipt: TransactionReceipt): OAXDEX_Governance.UnstakeEvent[];
        decodeUnstakeEvent(event: Event): OAXDEX_Governance.UnstakeEvent;
        parseVetoEvent(receipt: TransactionReceipt): OAXDEX_Governance.VetoEvent[];
        decodeVetoEvent(event: Event): OAXDEX_Governance.VetoEvent;
        parseVoteEvent(receipt: TransactionReceipt): OAXDEX_Governance.VoteEvent[];
        decodeVoteEvent(event: Event): OAXDEX_Governance.VoteEvent;
        addVotingConfig: {
            (params: IAddVotingConfigParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddVotingConfigParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IAddVotingConfigParams, options?: TransactionOptions) => Promise<string>;
        };
        admin: {
            (options?: TransactionOptions): Promise<string>;
        };
        allVotings: {
            (options?: TransactionOptions): Promise<string[]>;
        };
        closeVote: {
            (vote: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (vote: string, options?: TransactionOptions) => Promise<void>;
            txData: (vote: string, options?: TransactionOptions) => Promise<string>;
        };
        executed: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        freezedStake: {
            (param1: string, options?: TransactionOptions): Promise<{
                amount: BigNumber;
                timestamp: BigNumber;
            }>;
        };
        getNewVoteId: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<BigNumber>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        getVotingConfigProfiles: {
            (params: IGetVotingConfigProfilesParams, options?: TransactionOptions): Promise<string[]>;
        };
        getVotingCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getVotingParams: {
            (name: string, options?: TransactionOptions): Promise<{
                _minExeDelay: BigNumber;
                _minVoteDuration: BigNumber;
                _maxVoteDuration: BigNumber;
                _minOaxTokenToCreateVote: BigNumber;
                _minQuorum: BigNumber;
            }>;
        };
        getVotings: {
            (params: IGetVotingsParams, options?: TransactionOptions): Promise<string[]>;
        };
        initAdmin: {
            (admin: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (admin: string, options?: TransactionOptions) => Promise<void>;
            txData: (admin: string, options?: TransactionOptions) => Promise<string>;
        };
        initVotingExecutor: {
            (votingExecutor: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (votingExecutor: string[], options?: TransactionOptions) => Promise<void>;
            txData: (votingExecutor: string[], options?: TransactionOptions) => Promise<string>;
        };
        isVotingContract: {
            (votingContract: string, options?: TransactionOptions): Promise<boolean>;
        };
        isVotingExecutor: {
            (param1: string, options?: TransactionOptions): Promise<boolean>;
        };
        minStakePeriod: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        newVote: {
            (params: INewVoteParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: INewVoteParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: INewVoteParams, options?: TransactionOptions) => Promise<string>;
        };
        oaxToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        owner: {
            (options?: TransactionOptions): Promise<string>;
        };
        renounceOwnership: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        setAdmin: {
            (admin: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (admin: string, options?: TransactionOptions) => Promise<void>;
            txData: (admin: string, options?: TransactionOptions) => Promise<string>;
        };
        setMinStakePeriod: {
            (minStakePeriod: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (minStakePeriod: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (minStakePeriod: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        setVotingConfig: {
            (params: ISetVotingConfigParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetVotingConfigParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetVotingConfigParams, options?: TransactionOptions) => Promise<string>;
        };
        setVotingExecutor: {
            (params: ISetVotingExecutorParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetVotingExecutorParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetVotingExecutorParams, options?: TransactionOptions) => Promise<string>;
        };
        setVotingRegister: {
            (votingRegister: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (votingRegister: string, options?: TransactionOptions) => Promise<void>;
            txData: (votingRegister: string, options?: TransactionOptions) => Promise<string>;
        };
        stake: {
            (value: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (value: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (value: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        stakeOf: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        totalStake: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transferOwnership: {
            (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
            txData: (newOwner: string, options?: TransactionOptions) => Promise<string>;
        };
        unlockStake: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        unstake: {
            (value: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (value: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (value: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        veto: {
            (voting: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (voting: string, options?: TransactionOptions) => Promise<void>;
            txData: (voting: string, options?: TransactionOptions) => Promise<string>;
        };
        voteCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        voted: {
            (params: IVotedParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IVotedParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IVotedParams, options?: TransactionOptions) => Promise<string>;
        };
        votingConfigProfiles: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        votingConfigProfilesLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        votingConfigs: {
            (param1: string, options?: TransactionOptions): Promise<{
                minExeDelay: BigNumber;
                minVoteDuration: BigNumber;
                maxVoteDuration: BigNumber;
                minOaxTokenToCreateVote: BigNumber;
                minQuorum: BigNumber;
            }>;
        };
        votingExecutor: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        votingExecutorInv: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        votingExecutorLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        votingIdx: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        votingRegister: {
            (options?: TransactionOptions): Promise<string>;
        };
        votingToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        votings: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module OAXDEX_Governance {
        interface AddVotingConfigEvent {
            name: string;
            minExeDelay: BigNumber;
            minVoteDuration: BigNumber;
            maxVoteDuration: BigNumber;
            minOaxTokenToCreateVote: BigNumber;
            minQuorum: BigNumber;
            _event: Event;
        }
        interface ExecutedEvent {
            vote: string;
            _event: Event;
        }
        interface NewPollEvent {
            poll: string;
            _event: Event;
        }
        interface NewVoteEvent {
            vote: string;
            _event: Event;
        }
        interface OwnershipTransferredEvent {
            previousOwner: string;
            newOwner: string;
            _event: Event;
        }
        interface ParamSetEvent {
            name: string;
            value: string;
            _event: Event;
        }
        interface ParamSet2Event {
            name: string;
            value1: string;
            value2: string;
            _event: Event;
        }
        interface PollEvent {
            account: string;
            poll: string;
            option: BigNumber;
            _event: Event;
        }
        interface SetVotingConfigEvent {
            configName: string;
            paramName: string;
            minExeDelay: BigNumber;
            _event: Event;
        }
        interface StakeEvent {
            who: string;
            value: BigNumber;
            _event: Event;
        }
        interface UnstakeEvent {
            who: string;
            value: BigNumber;
            _event: Event;
        }
        interface VetoEvent {
            vote: string;
            _event: Event;
        }
        interface VoteEvent {
            account: string;
            vote: string;
            option: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingContract.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingContract.json.ts" {
    const _default_12: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_12;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingContract.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingContract.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        governance: string;
        executor: string;
        id: number | BigNumber;
        name: string;
        options: string[];
        quorum: number | BigNumber;
        threshold: number | BigNumber;
        voteEndTime: number | BigNumber;
        executeDelay: number | BigNumber;
        executeParam: string[];
    }
    export class OAXDEX_VotingContract extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        _executeParam: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        _options: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        _optionsWeight: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        accountVoteOption: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        accountVoteWeight: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        execute: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        executeDelay: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        executeParam: {
            (options?: TransactionOptions): Promise<string[]>;
        };
        executed: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        executor: {
            (options?: TransactionOptions): Promise<string>;
        };
        getParams: {
            (options?: TransactionOptions): Promise<{
                executor_: string;
                id_: BigNumber;
                name_: string;
                options_: string[];
                voteStartTime_: BigNumber;
                voteEndTime_: BigNumber;
                executeDelay_: BigNumber;
                status_: boolean[];
                optionsWeight_: BigNumber[];
                quorum_: BigNumber[];
                executeParam_: string[];
            }>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        id: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        options: {
            (options?: TransactionOptions): Promise<string[]>;
        };
        optionsCount: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        optionsWeight: {
            (options?: TransactionOptions): Promise<BigNumber[]>;
        };
        quorum: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        threshold: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        totalVoteWeight: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        totalWeight: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        updateWeight: {
            (account: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (account: string, options?: TransactionOptions) => Promise<void>;
            txData: (account: string, options?: TransactionOptions) => Promise<string>;
        };
        veto: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        vetoed: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        vote: {
            (option: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (option: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (option: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        voteEndTime: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        voteStartTime: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingExecutor.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingExecutor.json.ts" {
    const _default_13: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: any[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_13;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingExecutor.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingExecutor.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        governance: string;
        admin: string;
    }
    export class OAXDEX_VotingExecutor extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        admin: {
            (options?: TransactionOptions): Promise<string>;
        };
        execute: {
            (params: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: string[], options?: TransactionOptions) => Promise<void>;
            txData: (params: string[], options?: TransactionOptions) => Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingRegistry.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingRegistry.json.ts" {
    const _default_14: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: any[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_14;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingRegistry.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingRegistry.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface INewVoteParams {
        executor: string;
        name: string;
        options: string[];
        quorum: number | BigNumber;
        threshold: number | BigNumber;
        voteEndTime: number | BigNumber;
        executeDelay: number | BigNumber;
        executeParam: string[];
    }
    export class OAXDEX_VotingRegistry extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(governance: string, options?: TransactionOptions): Promise<string>;
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        newVote: {
            (params: INewVoteParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: INewVoteParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: INewVoteParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/libraries/ERC20.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/libraries/ERC20.json.ts" {
    const _default_15: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_15;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/libraries/ERC20.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/libraries/ERC20.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        name: string;
        symbol: string;
    }
    export interface IAllowanceParams {
        owner: string;
        spender: string;
    }
    export interface IApproveParams {
        spender: string;
        amount: number | BigNumber;
    }
    export interface IDecreaseAllowanceParams {
        spender: string;
        subtractedValue: number | BigNumber;
    }
    export interface IIncreaseAllowanceParams {
        spender: string;
        addedValue: number | BigNumber;
    }
    export interface ITransferParams {
        recipient: string;
        amount: number | BigNumber;
    }
    export interface ITransferFromParams {
        sender: string;
        recipient: string;
        amount: number | BigNumber;
    }
    export class ERC20 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseApprovalEvent(receipt: TransactionReceipt): ERC20.ApprovalEvent[];
        decodeApprovalEvent(event: Event): ERC20.ApprovalEvent;
        parseTransferEvent(receipt: TransactionReceipt): ERC20.TransferEvent[];
        decodeTransferEvent(event: Event): ERC20.TransferEvent;
        allowance: {
            (params: IAllowanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        approve: {
            (params: IApproveParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IApproveParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: IApproveParams, options?: TransactionOptions) => Promise<string>;
        };
        balanceOf: {
            (account: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        decreaseAllowance: {
            (params: IDecreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IDecreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: IDecreaseAllowanceParams, options?: TransactionOptions) => Promise<string>;
        };
        increaseAllowance: {
            (params: IIncreaseAllowanceParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IIncreaseAllowanceParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: IIncreaseAllowanceParams, options?: TransactionOptions) => Promise<string>;
        };
        name: {
            (options?: TransactionOptions): Promise<string>;
        };
        symbol: {
            (options?: TransactionOptions): Promise<string>;
        };
        totalSupply: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transfer: {
            (params: ITransferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferParams, options?: TransactionOptions) => Promise<string>;
        };
        transferFrom: {
            (params: ITransferFromParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ITransferFromParams, options?: TransactionOptions) => Promise<boolean>;
            txData: (params: ITransferFromParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module ERC20 {
        interface ApprovalEvent {
            owner: string;
            spender: string;
            value: BigNumber;
            _event: Event;
        }
        interface TransferEvent {
            from: string;
            to: string;
            value: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_CertiKSecurityOracle.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_CertiKSecurityOracle.json.ts" {
    const _default_16: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_16;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_CertiKSecurityOracle.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_CertiKSecurityOracle.ts" {
    import { IWallet, Contract as _Contract, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_CertiKSecurityOracle extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(oracleAddress: string, options?: TransactionOptions): Promise<string>;
        getSecurityScore: {
            (oracle: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        oracleAddress: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleFactory.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleFactory.json.ts" {
    const _default_17: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_17;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleFactory.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleFactory.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        governance: string;
        pairCreator: string;
        tradeFee: number | BigNumber;
        protocolFee: number | BigNumber;
        feePerDelegator: number | BigNumber;
        protocolFeeTo: string;
    }
    export interface IAddOldOracleToNewPairParams {
        tokenA: string;
        tokenB: string;
        oracle: string;
    }
    export interface ICheckAndGetOracleParams {
        tokenA: string;
        tokenB: string;
    }
    export interface ICheckAndGetOracleSwapParamsParams {
        tokenA: string;
        tokenB: string;
    }
    export interface ICreatePairParams {
        tokenA: string;
        tokenB: string;
    }
    export interface IGetPairParams {
        param1: string;
        param2: string;
    }
    export interface IOraclesParams {
        param1: string;
        param2: string;
    }
    export interface ISetLiveForPairParams {
        pair: string;
        live: boolean;
    }
    export interface ISetMinLotSizeParams {
        token: string;
        minLotSize: number | BigNumber;
    }
    export interface ISetOracleParams {
        tokenA: string;
        tokenB: string;
        oracle: string;
    }
    export interface ISetOracleLiquidityProviderParams {
        oracleRouter: string;
        oracleLiquidityProvider: string;
    }
    export interface ISetSecurityScoreOracleParams {
        securityScoreOracle: string;
        minOracleScore: number | BigNumber;
    }
    export interface ISetWhiteListParams {
        who: string;
        allow: boolean;
    }
    export class OSWAP_OracleFactory extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseOracleAddedEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.OracleAddedEvent[];
        decodeOracleAddedEvent(event: Event): OSWAP_OracleFactory.OracleAddedEvent;
        parseOracleScoresEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.OracleScoresEvent[];
        decodeOracleScoresEvent(event: Event): OSWAP_OracleFactory.OracleScoresEvent;
        parseOwnershipTransferredEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.OwnershipTransferredEvent[];
        decodeOwnershipTransferredEvent(event: Event): OSWAP_OracleFactory.OwnershipTransferredEvent;
        parsePairCreatedEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.PairCreatedEvent[];
        decodePairCreatedEvent(event: Event): OSWAP_OracleFactory.PairCreatedEvent;
        parsePairRestartedEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.PairRestartedEvent[];
        decodePairRestartedEvent(event: Event): OSWAP_OracleFactory.PairRestartedEvent;
        parsePairShutdownedEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.PairShutdownedEvent[];
        decodePairShutdownedEvent(event: Event): OSWAP_OracleFactory.PairShutdownedEvent;
        parseParamSetEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.ParamSetEvent[];
        decodeParamSetEvent(event: Event): OSWAP_OracleFactory.ParamSetEvent;
        parseParamSet2Event(receipt: TransactionReceipt): OSWAP_OracleFactory.ParamSet2Event[];
        decodeParamSet2Event(event: Event): OSWAP_OracleFactory.ParamSet2Event;
        parseRestartedEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.RestartedEvent[];
        decodeRestartedEvent(event: Event): OSWAP_OracleFactory.RestartedEvent;
        parseShutdownedEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.ShutdownedEvent[];
        decodeShutdownedEvent(event: Event): OSWAP_OracleFactory.ShutdownedEvent;
        parseWhitelistedEvent(receipt: TransactionReceipt): OSWAP_OracleFactory.WhitelistedEvent[];
        decodeWhitelistedEvent(event: Event): OSWAP_OracleFactory.WhitelistedEvent;
        addOldOracleToNewPair: {
            (params: IAddOldOracleToNewPairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddOldOracleToNewPairParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IAddOldOracleToNewPairParams, options?: TransactionOptions) => Promise<string>;
        };
        allPairs: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        allPairsLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        allWhiteListed: {
            (options?: TransactionOptions): Promise<{
                list: string[];
                allowed: boolean[];
            }>;
        };
        checkAndGetOracle: {
            (params: ICheckAndGetOracleParams, options?: TransactionOptions): Promise<string>;
        };
        checkAndGetOracleSwapParams: {
            (params: ICheckAndGetOracleSwapParamsParams, options?: TransactionOptions): Promise<{
                oracle_: string;
                tradeFee_: BigNumber;
                protocolFee_: BigNumber;
            }>;
        };
        createPair: {
            (params: ICreatePairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
            txData: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
        };
        feePerDelegator: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getPair: {
            (params: IGetPairParams, options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        isOracle: {
            (param1: string, options?: TransactionOptions): Promise<boolean>;
        };
        isWhitelisted: {
            (param1: string, options?: TransactionOptions): Promise<boolean>;
        };
        minLotSize: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        minOracleScore: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        oracleLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        oracleScores: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        oracles: {
            (params: IOraclesParams, options?: TransactionOptions): Promise<string>;
        };
        owner: {
            (options?: TransactionOptions): Promise<string>;
        };
        pairCreator: {
            (options?: TransactionOptions): Promise<string>;
        };
        protocolFee: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeTo: {
            (options?: TransactionOptions): Promise<string>;
        };
        renounceOwnership: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        securityScoreOracle: {
            (options?: TransactionOptions): Promise<string>;
        };
        setFeePerDelegator: {
            (feePerDelegator: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (feePerDelegator: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (feePerDelegator: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setLiveForPair: {
            (params: ISetLiveForPairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<string>;
        };
        setMinLotSize: {
            (params: ISetMinLotSizeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetMinLotSizeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetMinLotSizeParams, options?: TransactionOptions) => Promise<string>;
        };
        setOracle: {
            (params: ISetOracleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetOracleParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetOracleParams, options?: TransactionOptions) => Promise<string>;
        };
        setOracleLiquidityProvider: {
            (params: ISetOracleLiquidityProviderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetOracleLiquidityProviderParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetOracleLiquidityProviderParams, options?: TransactionOptions) => Promise<string>;
        };
        setProtocolFee: {
            (protocolFee: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (protocolFee: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (protocolFee: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        setProtocolFeeTo: {
            (protocolFeeTo: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (protocolFeeTo: string, options?: TransactionOptions) => Promise<void>;
            txData: (protocolFeeTo: string, options?: TransactionOptions) => Promise<string>;
        };
        setSecurityScoreOracle: {
            (params: ISetSecurityScoreOracleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetSecurityScoreOracleParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetSecurityScoreOracleParams, options?: TransactionOptions) => Promise<string>;
        };
        setTradeFee: {
            (tradeFee: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tradeFee: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (tradeFee: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        setWhiteList: {
            (params: ISetWhiteListParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetWhiteListParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetWhiteListParams, options?: TransactionOptions) => Promise<string>;
        };
        tradeFee: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transferOwnership: {
            (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
            txData: (newOwner: string, options?: TransactionOptions) => Promise<string>;
        };
        updateOracleScore: {
            (oracle: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (oracle: string, options?: TransactionOptions) => Promise<void>;
            txData: (oracle: string, options?: TransactionOptions) => Promise<string>;
        };
        whitelisted: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        whitelistedInv: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        whitelistedLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        private assign;
    }
    export module OSWAP_OracleFactory {
        interface OracleAddedEvent {
            token0: string;
            token1: string;
            oracle: string;
            _event: Event;
        }
        interface OracleScoresEvent {
            oracle: string;
            score: BigNumber;
            _event: Event;
        }
        interface OwnershipTransferredEvent {
            previousOwner: string;
            newOwner: string;
            _event: Event;
        }
        interface PairCreatedEvent {
            token0: string;
            token1: string;
            pair: string;
            newSize: BigNumber;
            _event: Event;
        }
        interface PairRestartedEvent {
            pair: string;
            _event: Event;
        }
        interface PairShutdownedEvent {
            pair: string;
            _event: Event;
        }
        interface ParamSetEvent {
            name: string;
            value: string;
            _event: Event;
        }
        interface ParamSet2Event {
            name: string;
            value1: string;
            value2: string;
            _event: Event;
        }
        interface RestartedEvent {
            _event: Event;
        }
        interface ShutdownedEvent {
            _event: Event;
        }
        interface WhitelistedEvent {
            who: string;
            allow: boolean;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleLiquidityProvider.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleLiquidityProvider.json.ts" {
    const _default_18: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_18;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleLiquidityProvider.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleLiquidityProvider.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        factory: string;
        WETH: string;
    }
    export interface IAddLiquidityParams {
        tokenA: string;
        tokenB: string;
        addingTokenA: boolean;
        staked: number | BigNumber;
        afterIndex: number | BigNumber;
        amountIn: number | BigNumber;
        expire: number | BigNumber;
        enable: boolean;
        deadline: number | BigNumber;
    }
    export interface IAddLiquidityETHParams {
        tokenA: string;
        addingTokenA: boolean;
        staked: number | BigNumber;
        afterIndex: number | BigNumber;
        amountAIn: number | BigNumber;
        expire: number | BigNumber;
        enable: boolean;
        deadline: number | BigNumber;
    }
    export interface IRemoveAllLiquidityParams {
        tokenA: string;
        tokenB: string;
        to: string;
        deadline: number | BigNumber;
    }
    export interface IRemoveAllLiquidityETHParams {
        tokenA: string;
        to: string;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityParams {
        tokenA: string;
        tokenB: string;
        removingTokenA: boolean;
        to: string;
        unstake: number | BigNumber;
        afterIndex: number | BigNumber;
        amountOut: number | BigNumber;
        reserveOut: number | BigNumber;
        expire: number | BigNumber;
        enable: boolean;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityETHParams {
        tokenA: string;
        removingTokenA: boolean;
        to: string;
        unstake: number | BigNumber;
        afterIndex: number | BigNumber;
        amountOut: number | BigNumber;
        reserveOut: number | BigNumber;
        expire: number | BigNumber;
        enable: boolean;
        deadline: number | BigNumber;
    }
    export class OSWAP_OracleLiquidityProvider extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        addLiquidityETH: {
            (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<BigNumber>;
            txData: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        removeAllLiquidity: {
            (params: IRemoveAllLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<{
                amountA: BigNumber;
                amountB: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidityETH: {
            (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<{
                amountToken: BigNumber;
                amountETH: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETH: {
            (params: IRemoveLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePair.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePair.json.ts" {
    const _default_19: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_19;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePair.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePair.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAddLiquidityParams {
        provider: string;
        direction: boolean;
        staked: number | BigNumber;
        afterIndex: number | BigNumber;
        expire: number | BigNumber;
        enable: boolean;
    }
    export interface IFindPositionParams {
        direction: boolean;
        staked: number | BigNumber;
        afterIndex: number | BigNumber;
    }
    export interface IGetAmountInParams {
        tokenOut: string;
        amountOut: number | BigNumber;
        data: string;
    }
    export interface IGetAmountOutParams {
        tokenIn: string;
        amountIn: number | BigNumber;
        data: string;
    }
    export interface IGetLatestPriceParams {
        direction: boolean;
        payload: string;
    }
    export interface IGetProviderOfferParams {
        provider: string;
        direction: boolean;
    }
    export interface IGetQueueParams {
        direction: boolean;
        start: number | BigNumber;
        end: number | BigNumber;
    }
    export interface IGetQueueFromIndexParams {
        direction: boolean;
        from: number | BigNumber;
        count: number | BigNumber;
    }
    export interface IInitializeParams {
        token0: string;
        token1: string;
    }
    export interface IOffersParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IPauseOfferParams {
        provider: string;
        direction: boolean;
    }
    export interface IPurgeExpireParams {
        direction: boolean;
        startingIndex: number | BigNumber;
        limit: number | BigNumber;
    }
    export interface IRemoveLiquidityParams {
        provider: string;
        direction: boolean;
        unstake: number | BigNumber;
        afterIndex: number | BigNumber;
        amountOut: number | BigNumber;
        reserveOut: number | BigNumber;
        expire: number | BigNumber;
        enable: boolean;
    }
    export interface IReplenishParams {
        provider: string;
        direction: boolean;
        afterIndex: number | BigNumber;
        amountIn: number | BigNumber;
        expire: number | BigNumber;
    }
    export interface IResumeOfferParams {
        provider: string;
        direction: boolean;
        afterIndex: number | BigNumber;
    }
    export interface ISetDelegatorParams {
        delegator: string;
        fee: number | BigNumber;
    }
    export interface ISwapParams {
        amount0Out: number | BigNumber;
        amount1Out: number | BigNumber;
        to: string;
        data: string;
    }
    export class OSWAP_OraclePair extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseAddLiquidityEvent(receipt: TransactionReceipt): OSWAP_OraclePair.AddLiquidityEvent[];
        decodeAddLiquidityEvent(event: Event): OSWAP_OraclePair.AddLiquidityEvent;
        parseDelegatorPauseOfferEvent(receipt: TransactionReceipt): OSWAP_OraclePair.DelegatorPauseOfferEvent[];
        decodeDelegatorPauseOfferEvent(event: Event): OSWAP_OraclePair.DelegatorPauseOfferEvent;
        parseDelegatorResumeOfferEvent(receipt: TransactionReceipt): OSWAP_OraclePair.DelegatorResumeOfferEvent[];
        decodeDelegatorResumeOfferEvent(event: Event): OSWAP_OraclePair.DelegatorResumeOfferEvent;
        parseNewProviderEvent(receipt: TransactionReceipt): OSWAP_OraclePair.NewProviderEvent[];
        decodeNewProviderEvent(event: Event): OSWAP_OraclePair.NewProviderEvent;
        parseRemoveLiquidityEvent(receipt: TransactionReceipt): OSWAP_OraclePair.RemoveLiquidityEvent[];
        decodeRemoveLiquidityEvent(event: Event): OSWAP_OraclePair.RemoveLiquidityEvent;
        parseReplenishEvent(receipt: TransactionReceipt): OSWAP_OraclePair.ReplenishEvent[];
        decodeReplenishEvent(event: Event): OSWAP_OraclePair.ReplenishEvent;
        parseSetDelegatorEvent(receipt: TransactionReceipt): OSWAP_OraclePair.SetDelegatorEvent[];
        decodeSetDelegatorEvent(event: Event): OSWAP_OraclePair.SetDelegatorEvent;
        parseSwapEvent(receipt: TransactionReceipt): OSWAP_OraclePair.SwapEvent[];
        decodeSwapEvent(event: Event): OSWAP_OraclePair.SwapEvent;
        parseSwappedOneProviderEvent(receipt: TransactionReceipt): OSWAP_OraclePair.SwappedOneProviderEvent[];
        decodeSwappedOneProviderEvent(event: Event): OSWAP_OraclePair.SwappedOneProviderEvent;
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        counter: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        delegator: {
            (param1: string, options?: TransactionOptions): Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        feeBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        findPosition: {
            (params: IFindPositionParams, options?: TransactionOptions): Promise<{
                afterIndex: BigNumber;
                nextIndex: BigNumber;
            }>;
        };
        first: {
            (param1: boolean, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
                param3: BigNumber;
            }>;
        };
        getLastBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
            }>;
        };
        getLatestPrice: {
            (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getProviderOffer: {
            (params: IGetProviderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber;
                staked: BigNumber;
                amount: BigNumber;
                reserve: BigNumber;
                expire: BigNumber;
                privateReplenish: boolean;
            }>;
        };
        getQueue: {
            (params: IGetQueueParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                amount: BigNumber[];
                staked: BigNumber[];
                expire: BigNumber[];
            }>;
        };
        getQueueFromIndex: {
            (params: IGetQueueFromIndexParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                amount: BigNumber[];
                staked: BigNumber[];
                expire: BigNumber[];
            }>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        initialize: {
            (params: IInitializeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IInitializeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IInitializeParams, options?: TransactionOptions) => Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        lastGovBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken0Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken1Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        offers: {
            (params: IOffersParams, options?: TransactionOptions): Promise<{
                provider: string;
                staked: BigNumber;
                amount: BigNumber;
                reserve: BigNumber;
                expire: BigNumber;
                privateReplenish: boolean;
                isActive: boolean;
                enabled: boolean;
                prev: BigNumber;
                next: BigNumber;
            }>;
        };
        oracleLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        pauseOffer: {
            (params: IPauseOfferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IPauseOfferParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IPauseOfferParams, options?: TransactionOptions) => Promise<string>;
        };
        protocolFeeBalance0: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeBalance1: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        providerOfferIndex: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        purgeExpire: {
            (params: IPurgeExpireParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IPurgeExpireParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: IPurgeExpireParams, options?: TransactionOptions) => Promise<string>;
        };
        queueSize: {
            (param1: boolean, options?: TransactionOptions): Promise<BigNumber>;
        };
        redeemProtocolFee: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity: {
            (provider: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (provider: string, options?: TransactionOptions) => Promise<{
                amount0: BigNumber;
                amount1: BigNumber;
                staked: BigNumber;
            }>;
            txData: (provider: string, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        replenish: {
            (params: IReplenishParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IReplenishParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IReplenishParams, options?: TransactionOptions) => Promise<string>;
        };
        resumeOffer: {
            (params: IResumeOfferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IResumeOfferParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IResumeOfferParams, options?: TransactionOptions) => Promise<string>;
        };
        scaleDirection: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        scaler: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        setDelegator: {
            (params: ISetDelegatorParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetDelegatorParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetDelegatorParams, options?: TransactionOptions) => Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setPrivateReplenish: {
            (replenish: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (replenish: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (replenish: boolean, options?: TransactionOptions) => Promise<string>;
        };
        stakeBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        swap: {
            (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapParams, options?: TransactionOptions) => Promise<string>;
        };
        sync: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        token0: {
            (options?: TransactionOptions): Promise<string>;
        };
        token1: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module OSWAP_OraclePair {
        interface AddLiquidityEvent {
            provider: string;
            direction: boolean;
            staked: BigNumber;
            amount: BigNumber;
            newStakeBalance: BigNumber;
            newAmountBalance: BigNumber;
            expire: BigNumber;
            enable: boolean;
            _event: Event;
        }
        interface DelegatorPauseOfferEvent {
            delegator: string;
            provider: string;
            direction: boolean;
            _event: Event;
        }
        interface DelegatorResumeOfferEvent {
            delegator: string;
            provider: string;
            direction: boolean;
            _event: Event;
        }
        interface NewProviderEvent {
            provider: string;
            index: BigNumber;
            _event: Event;
        }
        interface RemoveLiquidityEvent {
            provider: string;
            direction: boolean;
            unstake: BigNumber;
            amountOut: BigNumber;
            reserveOut: BigNumber;
            newStakeBalance: BigNumber;
            newAmountBalance: BigNumber;
            newReserveBalance: BigNumber;
            expire: BigNumber;
            enable: boolean;
            _event: Event;
        }
        interface ReplenishEvent {
            provider: string;
            direction: boolean;
            amountIn: BigNumber;
            newAmountBalance: BigNumber;
            newReserveBalance: BigNumber;
            expire: BigNumber;
            _event: Event;
        }
        interface SetDelegatorEvent {
            provider: string;
            delegator: string;
            _event: Event;
        }
        interface SwapEvent {
            to: string;
            direction: boolean;
            price: BigNumber;
            amountIn: BigNumber;
            amountOut: BigNumber;
            tradeFee: BigNumber;
            protocolFee: BigNumber;
            _event: Event;
        }
        interface SwappedOneProviderEvent {
            provider: string;
            direction: boolean;
            amountOut: BigNumber;
            amountIn: BigNumber;
            newAmountBalance: BigNumber;
            newCounterReserveBalance: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePairCreator.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePairCreator.json.ts" {
    const _default_20: {
        abi: {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        }[];
        bytecode: string;
    };
    export default _default_20;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePairCreator.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePairCreator.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_OraclePairCreator extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        createPair: {
            (salt: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (salt: string, options?: TransactionOptions) => Promise<string>;
            txData: (salt: string, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_VotingExecutor2.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_VotingExecutor2.json.ts" {
    const _default_21: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
        } | {
            inputs: any[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_21;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_VotingExecutor2.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_VotingExecutor2.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_VotingExecutor2 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(factory: string, options?: TransactionOptions): Promise<string>;
        execute: {
            (params: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: string[], options?: TransactionOptions) => Promise<void>;
            txData: (params: string[], options?: TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeFactory.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeFactory.json.ts" {
    const _default_22: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_22;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeFactory.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeFactory.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        governance: string;
        oracleFactory: string;
        pairCreator: string;
        tradeFee: number | BigNumber;
        stakeAmount: (number | BigNumber)[];
        liquidityProviderShare: (number | BigNumber)[];
        protocolFeeTo: string;
    }
    export interface ICreatePairParams {
        tokenA: string;
        tokenB: string;
    }
    export interface IGetPairParams {
        param1: string;
        param2: string;
    }
    export interface ISetLiquidityProviderShareParams {
        stakeAmount: (number | BigNumber)[];
        liquidityProviderShare: (number | BigNumber)[];
    }
    export interface ISetLiveForPairParams {
        pair: string;
        live: boolean;
    }
    export class OSWAP_RangeFactory extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseOwnershipTransferredEvent(receipt: TransactionReceipt): OSWAP_RangeFactory.OwnershipTransferredEvent[];
        decodeOwnershipTransferredEvent(event: Event): OSWAP_RangeFactory.OwnershipTransferredEvent;
        parsePairCreatedEvent(receipt: TransactionReceipt): OSWAP_RangeFactory.PairCreatedEvent[];
        decodePairCreatedEvent(event: Event): OSWAP_RangeFactory.PairCreatedEvent;
        parsePairRestartedEvent(receipt: TransactionReceipt): OSWAP_RangeFactory.PairRestartedEvent[];
        decodePairRestartedEvent(event: Event): OSWAP_RangeFactory.PairRestartedEvent;
        parsePairShutdownedEvent(receipt: TransactionReceipt): OSWAP_RangeFactory.PairShutdownedEvent[];
        decodePairShutdownedEvent(event: Event): OSWAP_RangeFactory.PairShutdownedEvent;
        parseParamSetEvent(receipt: TransactionReceipt): OSWAP_RangeFactory.ParamSetEvent[];
        decodeParamSetEvent(event: Event): OSWAP_RangeFactory.ParamSetEvent;
        parseParamSet2Event(receipt: TransactionReceipt): OSWAP_RangeFactory.ParamSet2Event[];
        decodeParamSet2Event(event: Event): OSWAP_RangeFactory.ParamSet2Event;
        parseRestartedEvent(receipt: TransactionReceipt): OSWAP_RangeFactory.RestartedEvent[];
        decodeRestartedEvent(event: Event): OSWAP_RangeFactory.RestartedEvent;
        parseShutdownedEvent(receipt: TransactionReceipt): OSWAP_RangeFactory.ShutdownedEvent[];
        decodeShutdownedEvent(event: Event): OSWAP_RangeFactory.ShutdownedEvent;
        allPairs: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        allPairsLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        checkAndGetSwapParams: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        createPair: {
            (params: ICreatePairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
            txData: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
        };
        getAllLiquidityProviderShare: {
            (options?: TransactionOptions): Promise<{
                _stakeAmount: BigNumber[];
                _liquidityProviderShare: BigNumber[];
            }>;
        };
        getCreateAddresses: {
            (options?: TransactionOptions): Promise<{
                _governance: string;
                _rangeLiquidityProvider: string;
                _oracleFactory: string;
            }>;
        };
        getLiquidityProviderShare: {
            (stake: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        getPair: {
            (params: IGetPairParams, options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        liquidityProviderShare: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        oracleFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        owner: {
            (options?: TransactionOptions): Promise<string>;
        };
        pairCreator: {
            (options?: TransactionOptions): Promise<string>;
        };
        protocolFeeTo: {
            (options?: TransactionOptions): Promise<string>;
        };
        rangeLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        renounceOwnership: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        setLiquidityProviderShare: {
            (params: ISetLiquidityProviderShareParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetLiquidityProviderShareParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetLiquidityProviderShareParams, options?: TransactionOptions) => Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setLiveForPair: {
            (params: ISetLiveForPairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<string>;
        };
        setProtocolFeeTo: {
            (protocolFeeTo: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (protocolFeeTo: string, options?: TransactionOptions) => Promise<void>;
            txData: (protocolFeeTo: string, options?: TransactionOptions) => Promise<string>;
        };
        setRangeLiquidityProvider: {
            (rangeLiquidityProvider: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (rangeLiquidityProvider: string, options?: TransactionOptions) => Promise<void>;
            txData: (rangeLiquidityProvider: string, options?: TransactionOptions) => Promise<string>;
        };
        setTradeFee: {
            (tradeFee: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tradeFee: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (tradeFee: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        stakeAmount: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<BigNumber>;
        };
        tradeFee: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transferOwnership: {
            (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
            txData: (newOwner: string, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module OSWAP_RangeFactory {
        interface OwnershipTransferredEvent {
            previousOwner: string;
            newOwner: string;
            _event: Event;
        }
        interface PairCreatedEvent {
            token0: string;
            token1: string;
            pair: string;
            newSize: BigNumber;
            _event: Event;
        }
        interface PairRestartedEvent {
            pair: string;
            _event: Event;
        }
        interface PairShutdownedEvent {
            pair: string;
            _event: Event;
        }
        interface ParamSetEvent {
            name: string;
            value: string;
            _event: Event;
        }
        interface ParamSet2Event {
            name: string;
            value1: string;
            value2: string;
            _event: Event;
        }
        interface RestartedEvent {
            _event: Event;
        }
        interface ShutdownedEvent {
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeLiquidityProvider.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeLiquidityProvider.json.ts" {
    const _default_23: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_23;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeLiquidityProvider.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeLiquidityProvider.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        factory: string;
        WETH: string;
    }
    export interface IAddLiquidityParams {
        tokenA: string;
        tokenB: string;
        addingTokenA: boolean;
        staked: number | BigNumber;
        amountIn: number | BigNumber;
        lowerLimit: number | BigNumber;
        upperLimit: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IAddLiquidityETHParams {
        tokenA: string;
        addingTokenA: boolean;
        staked: number | BigNumber;
        amountAIn: number | BigNumber;
        lowerLimit: number | BigNumber;
        upperLimit: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveAllLiquidityParams {
        tokenA: string;
        tokenB: string;
        to: string;
        deadline: number | BigNumber;
    }
    export interface IRemoveAllLiquidityETHParams {
        tokenA: string;
        to: string;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityParams {
        tokenA: string;
        tokenB: string;
        removingTokenA: boolean;
        to: string;
        unstake: number | BigNumber;
        amountOut: number | BigNumber;
        reserveOut: number | BigNumber;
        lowerLimit: number | BigNumber;
        upperLimit: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityETHParams {
        tokenA: string;
        removingTokenA: boolean;
        to: string;
        unstake: number | BigNumber;
        amountOut: number | BigNumber;
        reserveOut: number | BigNumber;
        lowerLimit: number | BigNumber;
        upperLimit: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IUpdateProviderOfferParams {
        tokenA: string;
        tokenB: string;
        replenishAmount: number | BigNumber;
        lowerLimit: number | BigNumber;
        upperLimit: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        privateReplenish: boolean;
        deadline: number | BigNumber;
    }
    export class OSWAP_RangeLiquidityProvider extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        addLiquidityETH: {
            (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<BigNumber>;
            txData: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        removeAllLiquidity: {
            (params: IRemoveAllLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<{
                amountA: BigNumber;
                amountB: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidityETH: {
            (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<{
                amountToken: BigNumber;
                amountETH: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETH: {
            (params: IRemoveLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        updateProviderOffer: {
            (params: IUpdateProviderOfferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IUpdateProviderOfferParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IUpdateProviderOfferParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePair.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePair.json.ts" {
    const _default_24: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_24;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePair.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePair.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAddLiquidityParams {
        provider: string;
        direction: boolean;
        staked: number | BigNumber;
        lowerLimit: number | BigNumber;
        upperLimit: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
    }
    export interface IGetAmountInParams {
        tokenOut: string;
        amountOut: number | BigNumber;
        data: string;
    }
    export interface IGetAmountOutParams {
        tokenIn: string;
        amountIn: number | BigNumber;
        data: string;
    }
    export interface IGetLatestPriceParams {
        direction: boolean;
        payload: string;
    }
    export interface IGetOffersParams {
        direction: boolean;
        start: number | BigNumber;
        end: number | BigNumber;
    }
    export interface IGetProviderOfferParams {
        provider: string;
        direction: boolean;
    }
    export interface IInitializeParams {
        token0: string;
        token1: string;
    }
    export interface IOffersParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IRemoveLiquidityParams {
        provider: string;
        direction: boolean;
        unstake: number | BigNumber;
        amountOut: number | BigNumber;
        reserveOut: number | BigNumber;
        lowerLimit: number | BigNumber;
        upperLimit: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
    }
    export interface IReplenishParams {
        provider: string;
        direction: boolean;
        amountIn: number | BigNumber;
    }
    export interface ISwapParams {
        amount0Out: number | BigNumber;
        amount1Out: number | BigNumber;
        to: string;
        data: string;
    }
    export interface IUpdateProviderOfferParams {
        provider: string;
        direction: boolean;
        replenishAmount: number | BigNumber;
        lowerLimit: number | BigNumber;
        upperLimit: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        privateReplenish: boolean;
    }
    export class OSWAP_RangePair extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseAddLiquidityEvent(receipt: TransactionReceipt): OSWAP_RangePair.AddLiquidityEvent[];
        decodeAddLiquidityEvent(event: Event): OSWAP_RangePair.AddLiquidityEvent;
        parseNewProviderEvent(receipt: TransactionReceipt): OSWAP_RangePair.NewProviderEvent[];
        decodeNewProviderEvent(event: Event): OSWAP_RangePair.NewProviderEvent;
        parseRemoveAllLiquidityEvent(receipt: TransactionReceipt): OSWAP_RangePair.RemoveAllLiquidityEvent[];
        decodeRemoveAllLiquidityEvent(event: Event): OSWAP_RangePair.RemoveAllLiquidityEvent;
        parseRemoveLiquidityEvent(receipt: TransactionReceipt): OSWAP_RangePair.RemoveLiquidityEvent[];
        decodeRemoveLiquidityEvent(event: Event): OSWAP_RangePair.RemoveLiquidityEvent;
        parseReplenishEvent(receipt: TransactionReceipt): OSWAP_RangePair.ReplenishEvent[];
        decodeReplenishEvent(event: Event): OSWAP_RangePair.ReplenishEvent;
        parseSwapEvent(receipt: TransactionReceipt): OSWAP_RangePair.SwapEvent[];
        decodeSwapEvent(event: Event): OSWAP_RangePair.SwapEvent;
        parseSwappedOneProviderEvent(receipt: TransactionReceipt): OSWAP_RangePair.SwappedOneProviderEvent[];
        decodeSwappedOneProviderEvent(event: Event): OSWAP_RangePair.SwappedOneProviderEvent;
        parseUpdateProviderOfferEvent(receipt: TransactionReceipt): OSWAP_RangePair.UpdateProviderOfferEvent[];
        decodeUpdateProviderOfferEvent(event: Event): OSWAP_RangePair.UpdateProviderOfferEvent;
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        counter: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
                param3: BigNumber;
            }>;
        };
        getLastBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
            }>;
        };
        getLatestPrice: {
            (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getOffers: {
            (params: IGetOffersParams, options?: TransactionOptions): Promise<{
                provider: string[];
                amountAndReserve: BigNumber[];
                lowerLimitAndUpperLimit: BigNumber[];
                startDateAndExpire: BigNumber[];
                privateReplenish: boolean[];
            }>;
        };
        getProviderOffer: {
            (params: IGetProviderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber;
                staked: BigNumber;
                amount: BigNumber;
                reserve: BigNumber;
                lowerLimit: BigNumber;
                upperLimit: BigNumber;
                startDate: BigNumber;
                expire: BigNumber;
                privateReplenish: boolean;
            }>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        initialize: {
            (params: IInitializeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IInitializeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IInitializeParams, options?: TransactionOptions) => Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        lastGovBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken0Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken1Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        offers: {
            (params: IOffersParams, options?: TransactionOptions): Promise<{
                provider: string;
                amount: BigNumber;
                reserve: BigNumber;
                lowerLimit: BigNumber;
                upperLimit: BigNumber;
                startDate: BigNumber;
                expire: BigNumber;
                privateReplenish: boolean;
            }>;
        };
        oracleFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        protocolFeeBalance0: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeBalance1: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        providerOfferIndex: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        providerStaking: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        rangeLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        redeemProtocolFee: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity: {
            (provider: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (provider: string, options?: TransactionOptions) => Promise<{
                amount0: BigNumber;
                amount1: BigNumber;
                staked: BigNumber;
            }>;
            txData: (provider: string, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        replenish: {
            (params: IReplenishParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IReplenishParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IReplenishParams, options?: TransactionOptions) => Promise<string>;
        };
        scaleDirection: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        scaler: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        stakeBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        swap: {
            (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapParams, options?: TransactionOptions) => Promise<string>;
        };
        sync: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        token0: {
            (options?: TransactionOptions): Promise<string>;
        };
        token1: {
            (options?: TransactionOptions): Promise<string>;
        };
        updateProviderOffer: {
            (params: IUpdateProviderOfferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IUpdateProviderOfferParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IUpdateProviderOfferParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module OSWAP_RangePair {
        interface AddLiquidityEvent {
            provider: string;
            direction: boolean;
            staked: BigNumber;
            amount: BigNumber;
            newStakeBalance: BigNumber;
            newAmountBalance: BigNumber;
            lowerLimit: BigNumber;
            upperLimit: BigNumber;
            startDate: BigNumber;
            expire: BigNumber;
            _event: Event;
        }
        interface NewProviderEvent {
            provider: string;
            index: BigNumber;
            _event: Event;
        }
        interface RemoveAllLiquidityEvent {
            provider: string;
            unstake: BigNumber;
            amount0Out: BigNumber;
            amount1Out: BigNumber;
            _event: Event;
        }
        interface RemoveLiquidityEvent {
            provider: string;
            direction: boolean;
            unstake: BigNumber;
            amountOut: BigNumber;
            reserveOut: BigNumber;
            newStakeBalance: BigNumber;
            newAmountBalance: BigNumber;
            newReserveBalance: BigNumber;
            lowerLimit: BigNumber;
            upperLimit: BigNumber;
            startDate: BigNumber;
            expire: BigNumber;
            _event: Event;
        }
        interface ReplenishEvent {
            provider: string;
            direction: boolean;
            amountIn: BigNumber;
            newAmountBalance: BigNumber;
            newReserveBalance: BigNumber;
            _event: Event;
        }
        interface SwapEvent {
            to: string;
            direction: boolean;
            price: BigNumber;
            amountIn: BigNumber;
            amountOut: BigNumber;
            tradeFee: BigNumber;
            protocolFee: BigNumber;
            _event: Event;
        }
        interface SwappedOneProviderEvent {
            provider: string;
            direction: boolean;
            amountOut: BigNumber;
            amountIn: BigNumber;
            newAmountBalance: BigNumber;
            newCounterReserveBalance: BigNumber;
            _event: Event;
        }
        interface UpdateProviderOfferEvent {
            provider: string;
            direction: boolean;
            replenish: BigNumber;
            newAmountBalance: BigNumber;
            newReserveBalance: BigNumber;
            lowerLimit: BigNumber;
            upperLimit: BigNumber;
            startDate: BigNumber;
            expire: BigNumber;
            privateReplenish: boolean;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePairCreator.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePairCreator.json.ts" {
    const _default_25: {
        abi: {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        }[];
        bytecode: string;
    };
    export default _default_25;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePairCreator.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePairCreator.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_RangePairCreator extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        createPair: {
            (salt: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (salt: string, options?: TransactionOptions) => Promise<string>;
            txData: (salt: string, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_VotingExecutor3.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_VotingExecutor3.json.ts" {
    const _default_26: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
        } | {
            inputs: any[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_26;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_VotingExecutor3.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_VotingExecutor3.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        governance: string;
        factory: string;
        hybridRegistry: string;
    }
    export class OSWAP_VotingExecutor3 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        execute: {
            (params: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: string[], options?: TransactionOptions) => Promise<void>;
            txData: (params: string[], options?: TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        hybridRegistry: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_ConfigStore.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_ConfigStore.json.ts" {
    const _default_27: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_27;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_ConfigStore.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_ConfigStore.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface ISetCustomParamParams {
        paramName: string;
        paramValue: string;
    }
    export interface ISetMultiCustomParamParams {
        paramName: string[];
        paramValue: string[];
    }
    export class OSWAP_ConfigStore extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(governance: string, options?: TransactionOptions): Promise<string>;
        parseParamSetEvent(receipt: TransactionReceipt): OSWAP_ConfigStore.ParamSetEvent[];
        decodeParamSetEvent(event: Event): OSWAP_ConfigStore.ParamSetEvent;
        customParam: {
            (param1: string, options?: TransactionOptions): Promise<string>;
        };
        customParamNames: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        customParamNamesIdx: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        customParamNamesLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        setCustomParam: {
            (params: ISetCustomParamParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetCustomParamParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetCustomParamParams, options?: TransactionOptions) => Promise<string>;
        };
        setMultiCustomParam: {
            (params: ISetMultiCustomParamParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetMultiCustomParamParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetMultiCustomParamParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module OSWAP_ConfigStore {
        interface ParamSetEvent {
            name: string;
            value: string;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcLiquidityProvider.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcLiquidityProvider.json.ts" {
    const _default_28: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_28;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcLiquidityProvider.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcLiquidityProvider.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        factory: string;
        WETH: string;
    }
    export interface IAddLiquidityParams {
        tokenA: string;
        tokenB: string;
        addingTokenA: boolean;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountIn: number | BigNumber;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IAddLiquidityAndTraderParams {
        param: (number | BigNumber)[];
        trader: string[];
        allocation: (number | BigNumber)[];
    }
    export interface IAddLiquidityETHParams {
        tokenA: string;
        addingTokenA: boolean;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountAIn: number | BigNumber;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IAddLiquidityETHAndTraderParams {
        param: (number | BigNumber)[];
        trader: string[];
        allocation: (number | BigNumber)[];
    }
    export interface IRemoveAllLiquidityParams {
        tokenA: string;
        tokenB: string;
        to: string;
        pairIndex: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveAllLiquidityETHParams {
        tokenA: string;
        to: string;
        pairIndex: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityParams {
        tokenA: string;
        tokenB: string;
        removingTokenA: boolean;
        to: string;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityETHParams {
        tokenA: string;
        removingTokenA: boolean;
        to: string;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        deadline: number | BigNumber;
    }
    export class OSWAP_OtcLiquidityProvider extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<{
                pair: string;
                _offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        addLiquidityAndTrader: {
            (params: IAddLiquidityAndTraderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityAndTraderParams, options?: TransactionOptions) => Promise<{
                pair: string;
                offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityAndTraderParams, options?: TransactionOptions) => Promise<string>;
        };
        addLiquidityETH: {
            (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                pair: string;
                _offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        addLiquidityETHAndTrader: {
            (params: IAddLiquidityETHAndTraderParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityETHAndTraderParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                pair: string;
                offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityETHAndTraderParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        removeAllLiquidity: {
            (params: IRemoveAllLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<{
                amountA: BigNumber;
                amountB: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidityETH: {
            (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<{
                amountToken: BigNumber;
                amountETH: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETH: {
            (params: IRemoveLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairOracle.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairOracle.json.ts" {
    const _default_29: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_29;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairOracle.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairOracle.ts" {
    import { IWallet, Contract as _Contract, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IGetLatestPriceParams {
        from: string;
        to: string;
        payload: string;
    }
    export interface IGetRatioParams {
        from: string;
        to: string;
        param3: number | BigNumber;
        param4: number | BigNumber;
        param5: string;
        payload: string;
    }
    export interface IIsSupportedParams {
        param1: string;
        param2: string;
    }
    export class OSWAP_OtcPairOracle extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        WEI: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getLatestPrice: {
            (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getRatio: {
            (params: IGetRatioParams, options?: TransactionOptions): Promise<{
                numerator: BigNumber;
                denominator: BigNumber;
            }>;
        };
        isSupported: {
            (params: IIsSupportedParams, options?: TransactionOptions): Promise<boolean>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedFactory.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedFactory.json.ts" {
    const _default_30: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_30;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedFactory.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedFactory.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        governance: string;
        whitelistFactory: string;
        pairCreator: string;
        configStore: string;
        tradeFee: number | BigNumber;
        protocolFee: number | BigNumber;
        protocolFeeTo: string;
    }
    export interface IAddOldOracleToNewPairParams {
        tokenA: string;
        tokenB: string;
        oracle: string;
    }
    export interface ICheckAndGetOracleParams {
        tokenA: string;
        tokenB: string;
    }
    export interface ICheckAndGetOracleSwapParamsParams {
        tokenA: string;
        tokenB: string;
    }
    export interface ICreatePairParams {
        tokenA: string;
        tokenB: string;
    }
    export interface IGetPairParams {
        param1: string;
        param2: string;
        param3: number | BigNumber;
    }
    export interface IOraclesParams {
        param1: string;
        param2: string;
    }
    export interface IPairLengthParams {
        tokenA: string;
        tokenB: string;
    }
    export interface ISetLiveForPairParams {
        pair: string;
        live: boolean;
    }
    export interface ISetOracleParams {
        tokenA: string;
        tokenB: string;
        oracle: string;
    }
    export class OSWAP_RestrictedFactory extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        parseOracleAddedEvent(receipt: TransactionReceipt): OSWAP_RestrictedFactory.OracleAddedEvent[];
        decodeOracleAddedEvent(event: Event): OSWAP_RestrictedFactory.OracleAddedEvent;
        parseOwnershipTransferredEvent(receipt: TransactionReceipt): OSWAP_RestrictedFactory.OwnershipTransferredEvent[];
        decodeOwnershipTransferredEvent(event: Event): OSWAP_RestrictedFactory.OwnershipTransferredEvent;
        parsePairCreatedEvent(receipt: TransactionReceipt): OSWAP_RestrictedFactory.PairCreatedEvent[];
        decodePairCreatedEvent(event: Event): OSWAP_RestrictedFactory.PairCreatedEvent;
        parsePairRestartedEvent(receipt: TransactionReceipt): OSWAP_RestrictedFactory.PairRestartedEvent[];
        decodePairRestartedEvent(event: Event): OSWAP_RestrictedFactory.PairRestartedEvent;
        parsePairShutdownedEvent(receipt: TransactionReceipt): OSWAP_RestrictedFactory.PairShutdownedEvent[];
        decodePairShutdownedEvent(event: Event): OSWAP_RestrictedFactory.PairShutdownedEvent;
        parseParamSetEvent(receipt: TransactionReceipt): OSWAP_RestrictedFactory.ParamSetEvent[];
        decodeParamSetEvent(event: Event): OSWAP_RestrictedFactory.ParamSetEvent;
        parseParamSet2Event(receipt: TransactionReceipt): OSWAP_RestrictedFactory.ParamSet2Event[];
        decodeParamSet2Event(event: Event): OSWAP_RestrictedFactory.ParamSet2Event;
        parseRestartedEvent(receipt: TransactionReceipt): OSWAP_RestrictedFactory.RestartedEvent[];
        decodeRestartedEvent(event: Event): OSWAP_RestrictedFactory.RestartedEvent;
        parseShutdownedEvent(receipt: TransactionReceipt): OSWAP_RestrictedFactory.ShutdownedEvent[];
        decodeShutdownedEvent(event: Event): OSWAP_RestrictedFactory.ShutdownedEvent;
        addOldOracleToNewPair: {
            (params: IAddOldOracleToNewPairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddOldOracleToNewPairParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IAddOldOracleToNewPairParams, options?: TransactionOptions) => Promise<string>;
        };
        allPairs: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        allPairsLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        checkAndGetOracle: {
            (params: ICheckAndGetOracleParams, options?: TransactionOptions): Promise<string>;
        };
        checkAndGetOracleSwapParams: {
            (params: ICheckAndGetOracleSwapParamsParams, options?: TransactionOptions): Promise<{
                oracle_: string;
                tradeFee_: BigNumber;
                protocolFee_: BigNumber;
            }>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        createPair: {
            (params: ICreatePairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
            txData: (params: ICreatePairParams, options?: TransactionOptions) => Promise<string>;
        };
        getCreateAddresses: {
            (options?: TransactionOptions): Promise<{
                _governance: string;
                _whitelistFactory: string;
                _restrictedLiquidityProvider: string;
                _configStore: string;
            }>;
        };
        getPair: {
            (params: IGetPairParams, options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        init: {
            (restrictedLiquidityProvider: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (restrictedLiquidityProvider: string, options?: TransactionOptions) => Promise<void>;
            txData: (restrictedLiquidityProvider: string, options?: TransactionOptions) => Promise<string>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        isOracle: {
            (param1: string, options?: TransactionOptions): Promise<boolean>;
        };
        isPair: {
            (pair: string, options?: TransactionOptions): Promise<boolean>;
        };
        oracles: {
            (params: IOraclesParams, options?: TransactionOptions): Promise<string>;
        };
        owner: {
            (options?: TransactionOptions): Promise<string>;
        };
        pairCreator: {
            (options?: TransactionOptions): Promise<string>;
        };
        pairIdx: {
            (param1: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        pairLength: {
            (params: IPairLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFee: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeTo: {
            (options?: TransactionOptions): Promise<string>;
        };
        renounceOwnership: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        restrictedLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setLiveForPair: {
            (params: ISetLiveForPairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetLiveForPairParams, options?: TransactionOptions) => Promise<string>;
        };
        setOracle: {
            (params: ISetOracleParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetOracleParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetOracleParams, options?: TransactionOptions) => Promise<string>;
        };
        setProtocolFee: {
            (protocolFee: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (protocolFee: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (protocolFee: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        setProtocolFeeTo: {
            (protocolFeeTo: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (protocolFeeTo: string, options?: TransactionOptions) => Promise<void>;
            txData: (protocolFeeTo: string, options?: TransactionOptions) => Promise<string>;
        };
        setTradeFee: {
            (tradeFee: number | BigNumber, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (tradeFee: number | BigNumber, options?: TransactionOptions) => Promise<void>;
            txData: (tradeFee: number | BigNumber, options?: TransactionOptions) => Promise<string>;
        };
        tradeFee: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        transferOwnership: {
            (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
            txData: (newOwner: string, options?: TransactionOptions) => Promise<string>;
        };
        whitelistFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module OSWAP_RestrictedFactory {
        interface OracleAddedEvent {
            token0: string;
            token1: string;
            oracle: string;
            _event: Event;
        }
        interface OwnershipTransferredEvent {
            previousOwner: string;
            newOwner: string;
            _event: Event;
        }
        interface PairCreatedEvent {
            token0: string;
            token1: string;
            pair: string;
            newPairSize: BigNumber;
            newSize: BigNumber;
            _event: Event;
        }
        interface PairRestartedEvent {
            pair: string;
            _event: Event;
        }
        interface PairShutdownedEvent {
            pair: string;
            _event: Event;
        }
        interface ParamSetEvent {
            name: string;
            value: string;
            _event: Event;
        }
        interface ParamSet2Event {
            name: string;
            value1: string;
            value2: string;
            _event: Event;
        }
        interface RestartedEvent {
            _event: Event;
        }
        interface ShutdownedEvent {
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider1.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider1.json.ts" {
    const _default_31: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_31;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider1.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider1.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        factory: string;
        WETH: string;
    }
    export interface IAddLiquidityParams {
        tokenA: string;
        tokenB: string;
        addingTokenA: boolean;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountIn: number | BigNumber;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IAddLiquidityAndTraderParams {
        param: (number | BigNumber)[];
        trader: string[];
        allocation: (number | BigNumber)[];
    }
    export interface IAddLiquidityETHParams {
        tokenA: string;
        addingTokenA: boolean;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountAIn: number | BigNumber;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IAddLiquidityETHAndTraderParams {
        param: (number | BigNumber)[];
        trader: string[];
        allocation: (number | BigNumber)[];
    }
    export interface IRemoveAllLiquidityParams {
        tokenA: string;
        tokenB: string;
        to: string;
        pairIndex: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveAllLiquidityETHParams {
        tokenA: string;
        to: string;
        pairIndex: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityParams {
        tokenA: string;
        tokenB: string;
        removingTokenA: boolean;
        to: string;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityETHParams {
        tokenA: string;
        removingTokenA: boolean;
        to: string;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        deadline: number | BigNumber;
    }
    export class OSWAP_RestrictedLiquidityProvider1 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<{
                pair: string;
                _offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        addLiquidityAndTrader: {
            (params: IAddLiquidityAndTraderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityAndTraderParams, options?: TransactionOptions) => Promise<{
                pair: string;
                offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityAndTraderParams, options?: TransactionOptions) => Promise<string>;
        };
        addLiquidityETH: {
            (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                pair: string;
                _offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        addLiquidityETHAndTrader: {
            (params: IAddLiquidityETHAndTraderParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityETHAndTraderParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                pair: string;
                offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityETHAndTraderParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        removeAllLiquidity: {
            (params: IRemoveAllLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<{
                amountA: BigNumber;
                amountB: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidityETH: {
            (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<{
                amountToken: BigNumber;
                amountETH: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETH: {
            (params: IRemoveLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider3.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider3.json.ts" {
    const _default_32: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_32;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider3.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider3.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        factory: string;
        WETH: string;
    }
    export interface IAddLiquidityParams {
        tokenA: string;
        tokenB: string;
        addingTokenA: boolean;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountIn: number | BigNumber;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDateAndExpire: number | BigNumber;
        feeIn: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IAddLiquidityETHParams {
        tokenA: string;
        addingTokenA: boolean;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountAIn: number | BigNumber;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDateAndExpire: number | BigNumber;
        feeIn: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveAllLiquidityParams {
        tokenA: string;
        tokenB: string;
        to: string;
        pairIndex: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveAllLiquidityETHParams {
        tokenA: string;
        to: string;
        pairIndex: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityParams {
        tokenA: string;
        tokenB: string;
        removingTokenA: boolean;
        to: string;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        feeOut: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityETHParams {
        tokenA: string;
        removingTokenA: boolean;
        to: string;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        feeOut: number | BigNumber;
        deadline: number | BigNumber;
    }
    export class OSWAP_RestrictedLiquidityProvider3 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<{
                pair: string;
                _offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        addLiquidityETH: {
            (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                pair: string;
                _offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        removeAllLiquidity: {
            (params: IRemoveAllLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<{
                amountA: BigNumber;
                amountB: BigNumber;
                feeOut: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidityETH: {
            (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<{
                amountToken: BigNumber;
                amountETH: BigNumber;
                feeOut: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETH: {
            (params: IRemoveLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider4.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider4.json.ts" {
    const _default_33: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_33;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider4.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider4.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        factory: string;
        WETH: string;
    }
    export interface IAddLiquidityParams {
        tokenA: string;
        tokenB: string;
        addingTokenA: boolean;
        params: (number | BigNumber)[];
        merkleRoot: string;
        allowlistIpfsCid: string;
    }
    export interface IAddLiquidityETHParams {
        tokenA: string;
        addingTokenA: boolean;
        params: (number | BigNumber)[];
        merkleRoot: string;
        allowlistIpfsCid: string;
    }
    export interface IRemoveAllLiquidityParams {
        tokenA: string;
        tokenB: string;
        to: string;
        pairIndex: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveAllLiquidityETHParams {
        tokenA: string;
        to: string;
        pairIndex: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityParams {
        tokenA: string;
        tokenB: string;
        removingTokenA: boolean;
        to: string;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        feeOut: number | BigNumber;
        deadline: number | BigNumber;
    }
    export interface IRemoveLiquidityETHParams {
        tokenA: string;
        removingTokenA: boolean;
        to: string;
        pairIndex: number | BigNumber;
        offerIndex: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        feeOut: number | BigNumber;
        deadline: number | BigNumber;
    }
    export class OSWAP_RestrictedLiquidityProvider4 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<{
                pair: string;
                _offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        addLiquidityETH: {
            (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                pair: string;
                _offerIndex: BigNumber;
            }>;
            txData: (params: IAddLiquidityETHParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        removeAllLiquidity: {
            (params: IRemoveAllLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<{
                amountA: BigNumber;
                amountB: BigNumber;
                feeOut: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidityETH: {
            (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<{
                amountToken: BigNumber;
                amountETH: BigNumber;
                feeOut: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidityETH: {
            (params: IRemoveLiquidityETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityETHParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair.json.ts" {
    const _default_34: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_34;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: number | BigNumber;
    }
    export interface ICreateOrderParams {
        provider: string;
        direction: boolean;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
    }
    export interface IGetAmountInParams {
        param1: string;
        param2: number | BigNumber;
        param3: string;
        param4: string;
    }
    export interface IGetAmountOutParams {
        tokenIn: string;
        amountIn: number | BigNumber;
        trader: string;
        param4: string;
    }
    export interface IGetApprovedTraderParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetApprovedTraderLengthParams {
        direction: boolean;
        offerIndex: number | BigNumber;
    }
    export interface IGetOffersParams {
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferParams {
        provider: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferIndexLengthParams {
        provider: string;
        direction: boolean;
    }
    export interface IGetTraderOfferParams {
        trader: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IInitializeParams {
        token0: string;
        token1: string;
    }
    export interface IIsApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ILockOfferParams {
        direction: boolean;
        index: number | BigNumber;
    }
    export interface IOffersParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IProviderOfferIndexParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export interface ISwapParams {
        amount0Out: number | BigNumber;
        amount1Out: number | BigNumber;
        to: string;
        trader: string;
        param5: string;
    }
    export interface ITraderAllocationParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ITraderOfferParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export class OSWAP_RestrictedPair extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseApprovedTraderEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair.ApprovedTraderEvent[];
        decodeApprovedTraderEvent(event: Event): OSWAP_RestrictedPair.ApprovedTraderEvent;
        parseLockEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair.LockEvent[];
        decodeLockEvent(event: Event): OSWAP_RestrictedPair.LockEvent;
        parseNewProviderOfferEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair.NewProviderOfferEvent[];
        decodeNewProviderOfferEvent(event: Event): OSWAP_RestrictedPair.NewProviderOfferEvent;
        parseSwapEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair.SwapEvent[];
        decodeSwapEvent(event: Event): OSWAP_RestrictedPair.SwapEvent;
        parseSwappedOneOfferEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair.SwappedOneOfferEvent[];
        decodeSwappedOneOfferEvent(event: Event): OSWAP_RestrictedPair.SwappedOneOfferEvent;
        approvedTrader: {
            (params: IApprovedTraderParams, options?: TransactionOptions): Promise<string>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        counter: {
            (param1: boolean, options?: TransactionOptions): Promise<BigNumber>;
        };
        createOrder: {
            (params: ICreateOrderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        feeBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getApprovedTrader: {
            (params: IGetApprovedTraderParams, options?: TransactionOptions): Promise<{
                trader: string[];
                allocation: BigNumber[];
            }>;
        };
        getApprovedTraderLength: {
            (params: IGetApprovedTraderLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
                param3: BigNumber;
            }>;
        };
        getLastBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
            }>;
        };
        getOffers: {
            (params: IGetOffersParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOffer: {
            (params: IGetProviderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOfferIndexLength: {
            (params: IGetProviderOfferIndexLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getTraderOffer: {
            (params: IGetTraderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        initialize: {
            (params: IInitializeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IInitializeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IInitializeParams, options?: TransactionOptions) => Promise<string>;
        };
        isApprovedTrader: {
            (params: IIsApprovedTraderParams, options?: TransactionOptions): Promise<boolean>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        lastGovBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken0Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken1Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lockOffer: {
            (params: ILockOfferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ILockOfferParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ILockOfferParams, options?: TransactionOptions) => Promise<string>;
        };
        offers: {
            (params: IOffersParams, options?: TransactionOptions): Promise<{
                provider: string;
                locked: boolean;
                allowAll: boolean;
                amount: BigNumber;
                receiving: BigNumber;
                restrictedPrice: BigNumber;
                startDate: BigNumber;
                expire: BigNumber;
            }>;
        };
        protocolFeeBalance0: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeBalance1: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        providerOfferIndex: {
            (params: IProviderOfferIndexParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        redeemProtocolFee: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        restrictedLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        scaleDirection: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        scaler: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        swap: {
            (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapParams, options?: TransactionOptions) => Promise<string>;
        };
        sync: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        token0: {
            (options?: TransactionOptions): Promise<string>;
        };
        token1: {
            (options?: TransactionOptions): Promise<string>;
        };
        traderAllocation: {
            (params: ITraderAllocationParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        traderOffer: {
            (params: ITraderOfferParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        whitelistFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module OSWAP_RestrictedPair {
        interface ApprovedTraderEvent {
            direction: boolean;
            offerIndex: BigNumber;
            trader: string;
            allocation: BigNumber;
            _event: Event;
        }
        interface LockEvent {
            direction: boolean;
            index: BigNumber;
            _event: Event;
        }
        interface NewProviderOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            allowAll: boolean;
            restrictedPrice: BigNumber;
            startDate: BigNumber;
            expire: BigNumber;
            _event: Event;
        }
        interface SwapEvent {
            to: string;
            direction: boolean;
            amountIn: BigNumber;
            amountOut: BigNumber;
            tradeFee: BigNumber;
            protocolFee: BigNumber;
            _event: Event;
        }
        interface SwappedOneOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            price: BigNumber;
            amountOut: BigNumber;
            amountIn: BigNumber;
            newAmountBalance: BigNumber;
            newReceivingBalance: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairOracle.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairOracle.json.ts" {
    const _default_35: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_35;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairOracle.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairOracle.ts" {
    import { IWallet, Contract as _Contract, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IGetLatestPriceParams {
        from: string;
        to: string;
        payload: string;
    }
    export interface IGetRatioParams {
        from: string;
        to: string;
        param3: number | BigNumber;
        param4: number | BigNumber;
        param5: string;
        payload: string;
    }
    export interface IIsSupportedParams {
        param1: string;
        param2: string;
    }
    export class OSWAP_RestrictedPairOracle extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        WEI: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        decimals: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getLatestPrice: {
            (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getRatio: {
            (params: IGetRatioParams, options?: TransactionOptions): Promise<{
                numerator: BigNumber;
                denominator: BigNumber;
            }>;
        };
        isSupported: {
            (params: IIsSupportedParams, options?: TransactionOptions): Promise<boolean>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_VotingExecutor4.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_VotingExecutor4.json.ts" {
    const _default_36: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: any[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: any[];
            stateMutability: string;
            type: string;
        })[];
        bytecode: string;
    };
    export default _default_36;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_VotingExecutor4.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_VotingExecutor4.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        governance: string;
        factory: string;
        configStore: string;
    }
    export class OSWAP_VotingExecutor4 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        execute: {
            (params: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: string[], options?: TransactionOptions) => Promise<void>;
            txData: (params: string[], options?: TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter.json.ts" {
    const _default_37: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_37;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        oracleFactory: string;
        WETH: string;
    }
    export interface IGetAmountsInParams {
        amountOut: number | BigNumber;
        path: string[];
        pair: string[];
        fee: (number | BigNumber)[];
        data: string;
    }
    export interface IGetAmountsOutParams {
        amountIn: number | BigNumber;
        path: string[];
        pair: string[];
        fee: (number | BigNumber)[];
        data: string;
    }
    export interface IPairForParams {
        tokenA: string;
        tokenB: string;
    }
    export interface ISwapETHForExactTokensParams {
        amountOut: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        pair: string[];
        fee: (number | BigNumber)[];
        data: string;
    }
    export interface ISwapExactETHForTokensParams {
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        pair: string[];
        fee: (number | BigNumber)[];
        data: string;
    }
    export interface ISwapExactETHForTokensSupportingFeeOnTransferTokensParams {
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        pair: string[];
        fee: (number | BigNumber)[];
    }
    export interface ISwapExactTokensForETHParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        pair: string[];
        fee: (number | BigNumber)[];
        data: string;
    }
    export interface ISwapExactTokensForETHSupportingFeeOnTransferTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        pair: string[];
        fee: (number | BigNumber)[];
    }
    export interface ISwapExactTokensForTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        pair: string[];
        fee: (number | BigNumber)[];
        data: string;
    }
    export interface ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        pair: string[];
        fee: (number | BigNumber)[];
    }
    export interface ISwapTokensForExactETHParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        pair: string[];
        fee: (number | BigNumber)[];
        data: string;
    }
    export interface ISwapTokensForExactTokensParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        pair: string[];
        fee: (number | BigNumber)[];
        data: string;
    }
    export class OSWAP_HybridRouter extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        getAmountsIn: {
            (params: IGetAmountsInParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        getAmountsOut: {
            (params: IGetAmountsOutParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        oracleFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        pairFor: {
            (params: IPairForParams, options?: TransactionOptions): Promise<string>;
        };
        swapETHForExactTokens: {
            (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactETHForTokens: {
            (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactETHForTokensSupportingFeeOnTransferTokens: {
            (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactTokensForETH: {
            (params: ISwapExactTokensForETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForETHSupportingFeeOnTransferTokens: {
            (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForTokens: {
            (params: ISwapExactTokensForTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForTokensSupportingFeeOnTransferTokens: {
            (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapTokensForExactETH: {
            (params: ISwapTokensForExactETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<string>;
        };
        swapTokensForExactTokens: {
            (params: ISwapTokensForExactTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouterRegistry.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouterRegistry.json.ts" {
    const _default_38: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_38;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouterRegistry.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouterRegistry.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IInitParams {
        name: string[];
        factory: string[];
        fee: (number | BigNumber)[];
        feeBase: (number | BigNumber)[];
        typeCode: (number | BigNumber)[];
    }
    export interface IRegisterPairParams {
        token0: string;
        token1: string;
        pairAddress: string;
        fee: number | BigNumber;
        feeBase: number | BigNumber;
        typeCode: number | BigNumber;
    }
    export interface IRegisterPairByAddressParams {
        factory: string;
        pairAddress: string;
    }
    export interface IRegisterPairByIndexParams {
        factory: string;
        index: number | BigNumber;
    }
    export interface IRegisterPairByTokensParams {
        factory: string;
        token0: string;
        token1: string;
    }
    export interface IRegisterPairByTokensV3Params {
        factory: string;
        token0: string;
        token1: string;
        pairIndex: number | BigNumber;
    }
    export interface IRegisterPairsByAddressParams {
        factory: string;
        pairAddress: string[];
    }
    export interface IRegisterPairsByAddress2Params {
        factory: string[];
        pairAddress: string[];
    }
    export interface IRegisterPairsByIndexParams {
        factory: string;
        index: (number | BigNumber)[];
    }
    export interface IRegisterPairsByTokensParams {
        factory: string;
        token0: string[];
        token1: string[];
    }
    export interface IRegisterPairsByTokensV3Params {
        factory: string;
        token0: string[];
        token1: string[];
        pairIndex: (number | BigNumber)[];
    }
    export interface IRegisterProtocolParams {
        name: string;
        factory: string;
        fee: number | BigNumber;
        feeBase: number | BigNumber;
        typeCode: number | BigNumber;
    }
    export class OSWAP_HybridRouterRegistry extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(governance: string, options?: TransactionOptions): Promise<string>;
        parseCustomPairRegisterEvent(receipt: TransactionReceipt): OSWAP_HybridRouterRegistry.CustomPairRegisterEvent[];
        decodeCustomPairRegisterEvent(event: Event): OSWAP_HybridRouterRegistry.CustomPairRegisterEvent;
        parseOwnershipTransferredEvent(receipt: TransactionReceipt): OSWAP_HybridRouterRegistry.OwnershipTransferredEvent[];
        decodeOwnershipTransferredEvent(event: Event): OSWAP_HybridRouterRegistry.OwnershipTransferredEvent;
        parsePairRegisterEvent(receipt: TransactionReceipt): OSWAP_HybridRouterRegistry.PairRegisterEvent[];
        decodePairRegisterEvent(event: Event): OSWAP_HybridRouterRegistry.PairRegisterEvent;
        parseProtocolRegisterEvent(receipt: TransactionReceipt): OSWAP_HybridRouterRegistry.ProtocolRegisterEvent[];
        decodeProtocolRegisterEvent(event: Event): OSWAP_HybridRouterRegistry.ProtocolRegisterEvent;
        customPairs: {
            (param1: string, options?: TransactionOptions): Promise<{
                fee: BigNumber;
                feeBase: BigNumber;
                typeCode: BigNumber;
            }>;
        };
        execute: {
            (params: string[], options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: string[], options?: TransactionOptions) => Promise<void>;
            txData: (params: string[], options?: TransactionOptions) => Promise<string>;
        };
        getFee: {
            (pairAddress: string, options?: TransactionOptions): Promise<{
                fee: BigNumber;
                feeBase: BigNumber;
            }>;
        };
        getPairTokens: {
            (pairAddress: string[], options?: TransactionOptions): Promise<{
                token0: string[];
                token1: string[];
            }>;
        };
        getTypeCode: {
            (pairAddress: string, options?: TransactionOptions): Promise<BigNumber>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        init: {
            (params: IInitParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IInitParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IInitParams, options?: TransactionOptions) => Promise<string>;
        };
        owner: {
            (options?: TransactionOptions): Promise<string>;
        };
        pairs: {
            (param1: string, options?: TransactionOptions): Promise<{
                factory: string;
                token0: string;
                token1: string;
            }>;
        };
        protocolList: {
            (param1: number | BigNumber, options?: TransactionOptions): Promise<string>;
        };
        protocolListLength: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocols: {
            (param1: string, options?: TransactionOptions): Promise<{
                name: string;
                fee: BigNumber;
                feeBase: BigNumber;
                typeCode: BigNumber;
            }>;
        };
        registerPair: {
            (params: IRegisterPairParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairParams, options?: TransactionOptions) => Promise<string>;
        };
        registerPairByAddress: {
            (params: IRegisterPairByAddressParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairByAddressParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairByAddressParams, options?: TransactionOptions) => Promise<string>;
        };
        registerPairByIndex: {
            (params: IRegisterPairByIndexParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairByIndexParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairByIndexParams, options?: TransactionOptions) => Promise<string>;
        };
        registerPairByTokens: {
            (params: IRegisterPairByTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairByTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairByTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        registerPairByTokensV3: {
            (params: IRegisterPairByTokensV3Params, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairByTokensV3Params, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairByTokensV3Params, options?: TransactionOptions) => Promise<string>;
        };
        registerPairsByAddress: {
            (params: IRegisterPairsByAddressParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairsByAddressParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairsByAddressParams, options?: TransactionOptions) => Promise<string>;
        };
        registerPairsByAddress2: {
            (params: IRegisterPairsByAddress2Params, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairsByAddress2Params, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairsByAddress2Params, options?: TransactionOptions) => Promise<string>;
        };
        registerPairsByIndex: {
            (params: IRegisterPairsByIndexParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairsByIndexParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairsByIndexParams, options?: TransactionOptions) => Promise<string>;
        };
        registerPairsByTokens: {
            (params: IRegisterPairsByTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairsByTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairsByTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        registerPairsByTokensV3: {
            (params: IRegisterPairsByTokensV3Params, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterPairsByTokensV3Params, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterPairsByTokensV3Params, options?: TransactionOptions) => Promise<string>;
        };
        registerProtocol: {
            (params: IRegisterProtocolParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRegisterProtocolParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRegisterProtocolParams, options?: TransactionOptions) => Promise<string>;
        };
        renounceOwnership: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        transferOwnership: {
            (newOwner: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (newOwner: string, options?: TransactionOptions) => Promise<void>;
            txData: (newOwner: string, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
    export module OSWAP_HybridRouterRegistry {
        interface CustomPairRegisterEvent {
            pair: string;
            fee: BigNumber;
            feeBase: BigNumber;
            typeCode: BigNumber;
            _event: Event;
        }
        interface OwnershipTransferredEvent {
            previousOwner: string;
            newOwner: string;
            _event: Event;
        }
        interface PairRegisterEvent {
            factory: string;
            pair: string;
            token0: string;
            token1: string;
            _event: Event;
        }
        interface ProtocolRegisterEvent {
            factory: string;
            name: string;
            fee: BigNumber;
            feeBase: BigNumber;
            typeCode: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_OracleRouter.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_OracleRouter.json.ts" {
    const _default_39: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_39;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_OracleRouter.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_OracleRouter.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        ammFactory: string;
        oracleFactory: string;
        WETH: string;
    }
    export interface IGetAmountInParams {
        amountOut: number | BigNumber;
        tokenIn: string;
        tokenOut: string;
        data: string;
    }
    export interface IGetAmountOutParams {
        amountIn: number | BigNumber;
        tokenIn: string;
        tokenOut: string;
        data: string;
    }
    export interface IGetAmountsInParams {
        amountOut: number | BigNumber;
        path: string[];
        useOracle: boolean[];
        data: string;
    }
    export interface IGetAmountsOutParams {
        amountIn: number | BigNumber;
        path: string[];
        useOracle: boolean[];
        data: string;
    }
    export interface IGetLatestPriceParams {
        tokenIn: string;
        tokenOut: string;
        data: string;
    }
    export interface ISwapETHForExactTokensParams {
        amountOut: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        useOracle: boolean[];
        data: string;
    }
    export interface ISwapExactETHForTokensParams {
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        useOracle: boolean[];
        data: string;
    }
    export interface ISwapExactETHForTokensSupportingFeeOnTransferTokensParams {
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        useOracle: boolean[];
        data: string;
    }
    export interface ISwapExactTokensForETHParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        useOracle: boolean[];
        data: string;
    }
    export interface ISwapExactTokensForETHSupportingFeeOnTransferTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        useOracle: boolean[];
        data: string;
    }
    export interface ISwapExactTokensForTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        useOracle: boolean[];
        data: string;
    }
    export interface ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        useOracle: boolean[];
        data: string;
    }
    export interface ISwapTokensForExactETHParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        useOracle: boolean[];
        data: string;
    }
    export interface ISwapTokensForExactTokensParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        path: string[];
        to: string;
        deadline: number | BigNumber;
        useOracle: boolean[];
        data: string;
    }
    export class OSWAP_OracleRouter extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        ammFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountsIn: {
            (params: IGetAmountsInParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        getAmountsOut: {
            (params: IGetAmountsOutParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        getLatestPrice: {
            (params: IGetLatestPriceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        oracleFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        swapETHForExactTokens: {
            (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactETHForTokens: {
            (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactETHForTokensSupportingFeeOnTransferTokens: {
            (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactTokensForETH: {
            (params: ISwapExactTokensForETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForETHSupportingFeeOnTransferTokens: {
            (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForTokens: {
            (params: ISwapExactTokensForTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForTokensSupportingFeeOnTransferTokens: {
            (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapTokensForExactETH: {
            (params: ISwapTokensForExactETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<string>;
        };
        swapTokensForExactTokens: {
            (params: ISwapTokensForExactTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<BigNumber[]>;
            txData: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPair.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPair.json.ts" {
    const _default_40: {
        abi: ({
            inputs: any[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
            name?: undefined;
            outputs?: undefined;
        } | {
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            stateMutability?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_40;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPair.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPair.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAddLiquidityParams {
        direction: boolean;
        index: number | BigNumber;
    }
    export interface IApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: number | BigNumber;
    }
    export interface ICreateOrderParams {
        provider: string;
        direction: boolean;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
    }
    export interface IGetAmountInParams {
        param1: string;
        param2: number | BigNumber;
        param3: string;
        param4: string;
    }
    export interface IGetAmountOutParams {
        tokenIn: string;
        amountIn: number | BigNumber;
        trader: string;
        param4: string;
    }
    export interface IGetApprovedTraderParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetApprovedTraderLengthParams {
        direction: boolean;
        offerIndex: number | BigNumber;
    }
    export interface IGetOffersParams {
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferParams {
        provider: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferIndexLengthParams {
        provider: string;
        direction: boolean;
    }
    export interface IGetTraderOfferParams {
        trader: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IInitializeParams {
        token0: string;
        token1: string;
    }
    export interface IIsApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ILockOfferParams {
        direction: boolean;
        index: number | BigNumber;
    }
    export interface IOffersParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IProviderOfferIndexParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export interface IRemoveAllLiquidity1DParams {
        provider: string;
        direction: boolean;
    }
    export interface IRemoveLiquidityParams {
        provider: string;
        direction: boolean;
        index: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
    }
    export interface ISetApprovedTraderParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        trader: string;
        allocation: number | BigNumber;
    }
    export interface ISetMultipleApprovedTradersParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        trader: string[];
        allocation: (number | BigNumber)[];
    }
    export interface ISwapParams {
        amount0Out: number | BigNumber;
        amount1Out: number | BigNumber;
        to: string;
        trader: string;
        param5: string;
    }
    export interface ITraderAllocationParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ITraderOfferParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export class OSWAP_OtcPair extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: TransactionOptions): Promise<string>;
        parseAddLiquidityEvent(receipt: TransactionReceipt): OSWAP_OtcPair.AddLiquidityEvent[];
        decodeAddLiquidityEvent(event: Event): OSWAP_OtcPair.AddLiquidityEvent;
        parseApprovedTraderEvent(receipt: TransactionReceipt): OSWAP_OtcPair.ApprovedTraderEvent[];
        decodeApprovedTraderEvent(event: Event): OSWAP_OtcPair.ApprovedTraderEvent;
        parseLockEvent(receipt: TransactionReceipt): OSWAP_OtcPair.LockEvent[];
        decodeLockEvent(event: Event): OSWAP_OtcPair.LockEvent;
        parseNewProviderOfferEvent(receipt: TransactionReceipt): OSWAP_OtcPair.NewProviderOfferEvent[];
        decodeNewProviderOfferEvent(event: Event): OSWAP_OtcPair.NewProviderOfferEvent;
        parseRemoveLiquidityEvent(receipt: TransactionReceipt): OSWAP_OtcPair.RemoveLiquidityEvent[];
        decodeRemoveLiquidityEvent(event: Event): OSWAP_OtcPair.RemoveLiquidityEvent;
        parseSwapEvent(receipt: TransactionReceipt): OSWAP_OtcPair.SwapEvent[];
        decodeSwapEvent(event: Event): OSWAP_OtcPair.SwapEvent;
        parseSwappedOneOfferEvent(receipt: TransactionReceipt): OSWAP_OtcPair.SwappedOneOfferEvent[];
        decodeSwappedOneOfferEvent(event: Event): OSWAP_OtcPair.SwappedOneOfferEvent;
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        approvedTrader: {
            (params: IApprovedTraderParams, options?: TransactionOptions): Promise<string>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        counter: {
            (param1: boolean, options?: TransactionOptions): Promise<BigNumber>;
        };
        createOrder: {
            (params: ICreateOrderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        feeBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getApprovedTrader: {
            (params: IGetApprovedTraderParams, options?: TransactionOptions): Promise<{
                trader: string[];
                allocation: BigNumber[];
            }>;
        };
        getApprovedTraderLength: {
            (params: IGetApprovedTraderLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
                param3: BigNumber;
            }>;
        };
        getLastBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
            }>;
        };
        getOffers: {
            (params: IGetOffersParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOffer: {
            (params: IGetProviderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOfferIndexLength: {
            (params: IGetProviderOfferIndexLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getTraderOffer: {
            (params: IGetTraderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        initialize: {
            (params: IInitializeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IInitializeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IInitializeParams, options?: TransactionOptions) => Promise<string>;
        };
        isApprovedTrader: {
            (params: IIsApprovedTraderParams, options?: TransactionOptions): Promise<boolean>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        lastGovBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken0Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken1Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lockOffer: {
            (params: ILockOfferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ILockOfferParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ILockOfferParams, options?: TransactionOptions) => Promise<string>;
        };
        offers: {
            (params: IOffersParams, options?: TransactionOptions): Promise<{
                provider: string;
                locked: boolean;
                allowAll: boolean;
                originalAmount: BigNumber;
                amount: BigNumber;
                swappedAmount: BigNumber;
                receiving: BigNumber;
                restrictedPrice: BigNumber;
                startDate: BigNumber;
                expire: BigNumber;
            }>;
        };
        protocolFeeBalance0: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeBalance1: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        providerOfferIndex: {
            (params: IProviderOfferIndexParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        redeemProtocolFee: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity: {
            (provider: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (provider: string, options?: TransactionOptions) => Promise<{
                amount0: BigNumber;
                amount1: BigNumber;
            }>;
            txData: (provider: string, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity1D: {
            (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions) => Promise<{
                totalAmount: BigNumber;
                totalReceiving: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        restrictedLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        scaleDirection: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        scaler: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        setApprovedTrader: {
            (params: ISetApprovedTraderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovedTraderParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetApprovedTraderParams, options?: TransactionOptions) => Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setMultipleApprovedTraders: {
            (params: ISetMultipleApprovedTradersParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetMultipleApprovedTradersParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetMultipleApprovedTradersParams, options?: TransactionOptions) => Promise<string>;
        };
        swap: {
            (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapParams, options?: TransactionOptions) => Promise<string>;
        };
        sync: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        token0: {
            (options?: TransactionOptions): Promise<string>;
        };
        token1: {
            (options?: TransactionOptions): Promise<string>;
        };
        traderAllocation: {
            (params: ITraderAllocationParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        traderOffer: {
            (params: ITraderOfferParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        whitelistFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module OSWAP_OtcPair {
        interface AddLiquidityEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            originalAmount: BigNumber;
            amount: BigNumber;
            newAmountBalance: BigNumber;
            _event: Event;
        }
        interface ApprovedTraderEvent {
            direction: boolean;
            offerIndex: BigNumber;
            trader: string;
            allocation: BigNumber;
            _event: Event;
        }
        interface LockEvent {
            direction: boolean;
            index: BigNumber;
            _event: Event;
        }
        interface NewProviderOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            allowAll: boolean;
            restrictedPrice: BigNumber;
            startDate: BigNumber;
            expire: BigNumber;
            _event: Event;
        }
        interface RemoveLiquidityEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            amountOut: BigNumber;
            receivingOut: BigNumber;
            newAmountBalance: BigNumber;
            newReceivingBalance: BigNumber;
            _event: Event;
        }
        interface SwapEvent {
            to: string;
            direction: boolean;
            amountIn: BigNumber;
            amountOut: BigNumber;
            tradeFee: BigNumber;
            protocolFee: BigNumber;
            _event: Event;
        }
        interface SwappedOneOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            price: BigNumber;
            amountOut: BigNumber;
            amountIn: BigNumber;
            newAmountBalance: BigNumber;
            newReceivingBalance: BigNumber;
            swappedAmountBalance: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairCreator.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairCreator.json.ts" {
    const _default_41: {
        abi: {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        }[];
        bytecode: string;
    };
    export default _default_41;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairCreator.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairCreator.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_OtcPairCreator extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        createPair: {
            (salt: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (salt: string, options?: TransactionOptions) => Promise<string>;
            txData: (salt: string, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair1.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair1.json.ts" {
    const _default_42: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_42;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair1.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair1.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAddLiquidityParams {
        direction: boolean;
        index: number | BigNumber;
    }
    export interface IApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: number | BigNumber;
    }
    export interface ICreateOrderParams {
        provider: string;
        direction: boolean;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
    }
    export interface IGetAmountInParams {
        param1: string;
        param2: number | BigNumber;
        param3: string;
        param4: string;
    }
    export interface IGetAmountOutParams {
        tokenIn: string;
        amountIn: number | BigNumber;
        trader: string;
        param4: string;
    }
    export interface IGetApprovedTraderParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetApprovedTraderLengthParams {
        direction: boolean;
        offerIndex: number | BigNumber;
    }
    export interface IGetOffersParams {
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferParams {
        provider: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferIndexLengthParams {
        provider: string;
        direction: boolean;
    }
    export interface IGetTraderOfferParams {
        trader: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IInitializeParams {
        token0: string;
        token1: string;
    }
    export interface IIsApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ILockOfferParams {
        direction: boolean;
        index: number | BigNumber;
    }
    export interface IOffersParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IProviderOfferIndexParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export interface IRemoveAllLiquidity1DParams {
        provider: string;
        direction: boolean;
    }
    export interface IRemoveLiquidityParams {
        provider: string;
        direction: boolean;
        index: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
    }
    export interface ISetApprovedTraderParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        trader: string;
        allocation: number | BigNumber;
    }
    export interface ISetMultipleApprovedTradersParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        trader: string[];
        allocation: (number | BigNumber)[];
    }
    export interface ISwapParams {
        amount0Out: number | BigNumber;
        amount1Out: number | BigNumber;
        to: string;
        trader: string;
        param5: string;
    }
    export interface ITraderAllocationParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ITraderOfferParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export class OSWAP_RestrictedPair1 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        parseAddLiquidityEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair1.AddLiquidityEvent[];
        decodeAddLiquidityEvent(event: Event): OSWAP_RestrictedPair1.AddLiquidityEvent;
        parseApprovedTraderEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair1.ApprovedTraderEvent[];
        decodeApprovedTraderEvent(event: Event): OSWAP_RestrictedPair1.ApprovedTraderEvent;
        parseLockEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair1.LockEvent[];
        decodeLockEvent(event: Event): OSWAP_RestrictedPair1.LockEvent;
        parseNewProviderOfferEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair1.NewProviderOfferEvent[];
        decodeNewProviderOfferEvent(event: Event): OSWAP_RestrictedPair1.NewProviderOfferEvent;
        parseRemoveLiquidityEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair1.RemoveLiquidityEvent[];
        decodeRemoveLiquidityEvent(event: Event): OSWAP_RestrictedPair1.RemoveLiquidityEvent;
        parseSwapEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair1.SwapEvent[];
        decodeSwapEvent(event: Event): OSWAP_RestrictedPair1.SwapEvent;
        parseSwappedOneOfferEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair1.SwappedOneOfferEvent[];
        decodeSwappedOneOfferEvent(event: Event): OSWAP_RestrictedPair1.SwappedOneOfferEvent;
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        approvedTrader: {
            (params: IApprovedTraderParams, options?: TransactionOptions): Promise<string>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        counter: {
            (param1: boolean, options?: TransactionOptions): Promise<BigNumber>;
        };
        createOrder: {
            (params: ICreateOrderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        feeBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getApprovedTrader: {
            (params: IGetApprovedTraderParams, options?: TransactionOptions): Promise<{
                trader: string[];
                allocation: BigNumber[];
            }>;
        };
        getApprovedTraderLength: {
            (params: IGetApprovedTraderLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
                param3: BigNumber;
            }>;
        };
        getLastBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
            }>;
        };
        getOffers: {
            (params: IGetOffersParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOffer: {
            (params: IGetProviderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOfferIndexLength: {
            (params: IGetProviderOfferIndexLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getTraderOffer: {
            (params: IGetTraderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        initialize: {
            (params: IInitializeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IInitializeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IInitializeParams, options?: TransactionOptions) => Promise<string>;
        };
        isApprovedTrader: {
            (params: IIsApprovedTraderParams, options?: TransactionOptions): Promise<boolean>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        lastGovBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken0Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken1Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lockOffer: {
            (params: ILockOfferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ILockOfferParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ILockOfferParams, options?: TransactionOptions) => Promise<string>;
        };
        offers: {
            (params: IOffersParams, options?: TransactionOptions): Promise<{
                provider: string;
                locked: boolean;
                allowAll: boolean;
                amount: BigNumber;
                receiving: BigNumber;
                restrictedPrice: BigNumber;
                startDate: BigNumber;
                expire: BigNumber;
            }>;
        };
        protocolFeeBalance0: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeBalance1: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        providerOfferIndex: {
            (params: IProviderOfferIndexParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        redeemProtocolFee: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity: {
            (provider: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (provider: string, options?: TransactionOptions) => Promise<{
                amount0: BigNumber;
                amount1: BigNumber;
            }>;
            txData: (provider: string, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity1D: {
            (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions) => Promise<{
                totalAmount: BigNumber;
                totalReceiving: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        restrictedLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        scaleDirection: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        scaler: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        setApprovedTrader: {
            (params: ISetApprovedTraderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovedTraderParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetApprovedTraderParams, options?: TransactionOptions) => Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setMultipleApprovedTraders: {
            (params: ISetMultipleApprovedTradersParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetMultipleApprovedTradersParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetMultipleApprovedTradersParams, options?: TransactionOptions) => Promise<string>;
        };
        swap: {
            (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapParams, options?: TransactionOptions) => Promise<string>;
        };
        sync: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        token0: {
            (options?: TransactionOptions): Promise<string>;
        };
        token1: {
            (options?: TransactionOptions): Promise<string>;
        };
        traderAllocation: {
            (params: ITraderAllocationParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        traderOffer: {
            (params: ITraderOfferParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        whitelistFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module OSWAP_RestrictedPair1 {
        interface AddLiquidityEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            amount: BigNumber;
            newAmountBalance: BigNumber;
            _event: Event;
        }
        interface ApprovedTraderEvent {
            direction: boolean;
            offerIndex: BigNumber;
            trader: string;
            allocation: BigNumber;
            _event: Event;
        }
        interface LockEvent {
            direction: boolean;
            index: BigNumber;
            _event: Event;
        }
        interface NewProviderOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            allowAll: boolean;
            restrictedPrice: BigNumber;
            startDate: BigNumber;
            expire: BigNumber;
            _event: Event;
        }
        interface RemoveLiquidityEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            amountOut: BigNumber;
            receivingOut: BigNumber;
            newAmountBalance: BigNumber;
            newReceivingBalance: BigNumber;
            _event: Event;
        }
        interface SwapEvent {
            to: string;
            direction: boolean;
            amountIn: BigNumber;
            amountOut: BigNumber;
            tradeFee: BigNumber;
            protocolFee: BigNumber;
            _event: Event;
        }
        interface SwappedOneOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            price: BigNumber;
            amountOut: BigNumber;
            amountIn: BigNumber;
            newAmountBalance: BigNumber;
            newReceivingBalance: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair3.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair3.json.ts" {
    const _default_43: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_43;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair3.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair3.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAddLiquidityParams {
        direction: boolean;
        index: number | BigNumber;
        feeIn: number | BigNumber;
    }
    export interface IAllocationSetParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface IApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: number | BigNumber;
    }
    export interface ICreateOrderParams {
        provider: string;
        direction: boolean;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
    }
    export interface IGetAmountInParams {
        param1: string;
        param2: number | BigNumber;
        param3: string;
        param4: string;
    }
    export interface IGetAmountOutParams {
        tokenIn: string;
        amountIn: number | BigNumber;
        trader: string;
        param4: string;
    }
    export interface IGetApprovedTraderParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetApprovedTraderLengthParams {
        direction: boolean;
        offerIndex: number | BigNumber;
    }
    export interface IGetOffersParams {
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferParams {
        provider: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferIndexLengthParams {
        provider: string;
        direction: boolean;
    }
    export interface IGetTraderOfferParams {
        trader: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IInitializeParams {
        token0: string;
        token1: string;
    }
    export interface IIsApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ILockOfferParams {
        direction: boolean;
        index: number | BigNumber;
    }
    export interface IOffersParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IPrepaidFeeBalanceParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IProviderOfferIndexParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export interface IRemoveAllLiquidity1DParams {
        provider: string;
        direction: boolean;
    }
    export interface IRemoveLiquidityParams {
        provider: string;
        direction: boolean;
        index: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        feeOut: number | BigNumber;
    }
    export interface ISetApprovedTraderBySignatureParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        trader: string;
        allocation: number | BigNumber;
        signature: string;
    }
    export interface ISwapParams {
        amount0Out: number | BigNumber;
        amount1Out: number | BigNumber;
        to: string;
        trader: string;
        param5: string;
    }
    export interface ITraderAllocationParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ITraderOfferParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export class OSWAP_RestrictedPair3 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        parseAddLiquidityEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair3.AddLiquidityEvent[];
        decodeAddLiquidityEvent(event: Event): OSWAP_RestrictedPair3.AddLiquidityEvent;
        parseApprovedTraderEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair3.ApprovedTraderEvent[];
        decodeApprovedTraderEvent(event: Event): OSWAP_RestrictedPair3.ApprovedTraderEvent;
        parseLockEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair3.LockEvent[];
        decodeLockEvent(event: Event): OSWAP_RestrictedPair3.LockEvent;
        parseNewProviderOfferEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair3.NewProviderOfferEvent[];
        decodeNewProviderOfferEvent(event: Event): OSWAP_RestrictedPair3.NewProviderOfferEvent;
        parseRemoveLiquidityEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair3.RemoveLiquidityEvent[];
        decodeRemoveLiquidityEvent(event: Event): OSWAP_RestrictedPair3.RemoveLiquidityEvent;
        parseSwapEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair3.SwapEvent[];
        decodeSwapEvent(event: Event): OSWAP_RestrictedPair3.SwapEvent;
        parseSwappedOneOfferEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair3.SwappedOneOfferEvent[];
        decodeSwappedOneOfferEvent(event: Event): OSWAP_RestrictedPair3.SwappedOneOfferEvent;
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        allocationSet: {
            (params: IAllocationSetParams, options?: TransactionOptions): Promise<boolean>;
        };
        approvedTrader: {
            (params: IApprovedTraderParams, options?: TransactionOptions): Promise<string>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        counter: {
            (param1: boolean, options?: TransactionOptions): Promise<BigNumber>;
        };
        createOrder: {
            (params: ICreateOrderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        feeBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getApprovedTrader: {
            (params: IGetApprovedTraderParams, options?: TransactionOptions): Promise<{
                trader: string[];
                allocation: BigNumber[];
            }>;
        };
        getApprovedTraderLength: {
            (params: IGetApprovedTraderLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
                param3: BigNumber;
            }>;
        };
        getLastBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
            }>;
        };
        getOffers: {
            (params: IGetOffersParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOffer: {
            (params: IGetProviderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOfferIndexLength: {
            (params: IGetProviderOfferIndexLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getTraderOffer: {
            (params: IGetTraderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        initialize: {
            (params: IInitializeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IInitializeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IInitializeParams, options?: TransactionOptions) => Promise<string>;
        };
        isApprovedTrader: {
            (params: IIsApprovedTraderParams, options?: TransactionOptions): Promise<boolean>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        lastGovBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken0Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken1Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lockOffer: {
            (params: ILockOfferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ILockOfferParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ILockOfferParams, options?: TransactionOptions) => Promise<string>;
        };
        offers: {
            (params: IOffersParams, options?: TransactionOptions): Promise<{
                provider: string;
                locked: boolean;
                allowAll: boolean;
                amount: BigNumber;
                receiving: BigNumber;
                restrictedPrice: BigNumber;
                startDate: BigNumber;
                expire: BigNumber;
            }>;
        };
        prepaidFeeBalance: {
            (params: IPrepaidFeeBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeBalance0: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeBalance1: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        providerOfferIndex: {
            (params: IProviderOfferIndexParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        redeemProtocolFee: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity: {
            (provider: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (provider: string, options?: TransactionOptions) => Promise<{
                amount0: BigNumber;
                amount1: BigNumber;
                feeOut: BigNumber;
            }>;
            txData: (provider: string, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity1D: {
            (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions) => Promise<{
                totalAmount: BigNumber;
                totalReceiving: BigNumber;
                totalRemainingFee: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        restrictedLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        scaleDirection: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        scaler: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        setApprovedTraderBySignature: {
            (params: ISetApprovedTraderBySignatureParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovedTraderBySignatureParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetApprovedTraderBySignatureParams, options?: TransactionOptions) => Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        swap: {
            (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapParams, options?: TransactionOptions) => Promise<string>;
        };
        sync: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        token0: {
            (options?: TransactionOptions): Promise<string>;
        };
        token1: {
            (options?: TransactionOptions): Promise<string>;
        };
        traderAllocation: {
            (params: ITraderAllocationParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        traderOffer: {
            (params: ITraderOfferParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        whitelistFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module OSWAP_RestrictedPair3 {
        interface AddLiquidityEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            amount: BigNumber;
            newAmountBalance: BigNumber;
            feeIn: BigNumber;
            newFeeBalance: BigNumber;
            _event: Event;
        }
        interface ApprovedTraderEvent {
            direction: boolean;
            offerIndex: BigNumber;
            trader: string;
            allocation: BigNumber;
            _event: Event;
        }
        interface LockEvent {
            direction: boolean;
            index: BigNumber;
            _event: Event;
        }
        interface NewProviderOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            allowAll: boolean;
            restrictedPrice: BigNumber;
            startDate: BigNumber;
            expire: BigNumber;
            _event: Event;
        }
        interface RemoveLiquidityEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            amountOut: BigNumber;
            receivingOut: BigNumber;
            feeOut: BigNumber;
            newAmountBalance: BigNumber;
            newReceivingBalance: BigNumber;
            newFeeBalance: BigNumber;
            _event: Event;
        }
        interface SwapEvent {
            to: string;
            direction: boolean;
            amountIn: BigNumber;
            amountOut: BigNumber;
            tradeFee: BigNumber;
            protocolFee: BigNumber;
            _event: Event;
        }
        interface SwappedOneOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            price: BigNumber;
            amountOut: BigNumber;
            amountIn: BigNumber;
            newAmountBalance: BigNumber;
            newReceivingBalance: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair4.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair4.json.ts" {
    const _default_44: {
        abi: ({
            anonymous: boolean;
            inputs: {
                indexed: boolean;
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            type: string;
            outputs?: undefined;
            stateMutability?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            anonymous?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_44;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair4.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair4.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, Event, TransactionOptions } from "@ijstech/eth-contract";
    export interface IAddLiquidityParams {
        direction: boolean;
        index: number | BigNumber;
        feeIn: number | BigNumber;
    }
    export interface IApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: number | BigNumber;
    }
    export interface ICreateOrderParams {
        provider: string;
        direction: boolean;
        allowAll: boolean;
        restrictedPrice: number | BigNumber;
        startDate: number | BigNumber;
        expire: number | BigNumber;
    }
    export interface IGetAmountInParams {
        param1: string;
        param2: number | BigNumber;
        param3: string;
        param4: string;
    }
    export interface IGetAmountOutParams {
        tokenIn: string;
        amountIn: number | BigNumber;
        trader: string;
        param4: string;
    }
    export interface IGetApprovedTraderParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetApprovedTraderLengthParams {
        direction: boolean;
        offerIndex: number | BigNumber;
    }
    export interface IGetOffersParams {
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferParams {
        provider: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IGetProviderOfferIndexLengthParams {
        provider: string;
        direction: boolean;
    }
    export interface IGetTraderOfferParams {
        trader: string;
        direction: boolean;
        start: number | BigNumber;
        length: number | BigNumber;
    }
    export interface IInitializeParams {
        token0: string;
        token1: string;
    }
    export interface IIsApprovedTraderParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ILastTraderAllocationParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ILockOfferParams {
        direction: boolean;
        index: number | BigNumber;
    }
    export interface IOfferAllowlistIpfsCidParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IOfferMerkleRootParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IOffersParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IPrepaidFeeBalanceParams {
        param1: boolean;
        param2: number | BigNumber;
    }
    export interface IProviderOfferIndexParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export interface IRemoveAllLiquidity1DParams {
        provider: string;
        direction: boolean;
    }
    export interface IRemoveLiquidityParams {
        provider: string;
        direction: boolean;
        index: number | BigNumber;
        amountOut: number | BigNumber;
        receivingOut: number | BigNumber;
        feeOut: number | BigNumber;
    }
    export interface ISetApprovedTraderByMerkleProofParams {
        direction: boolean;
        offerIndex: number | BigNumber;
        trader: string;
        allocation: number | BigNumber;
        proof: string[];
    }
    export interface ISetMerkleRootParams {
        direction: boolean;
        index: number | BigNumber;
        merkleRoot: string;
        ipfsCid: string;
    }
    export interface ISwapParams {
        amount0Out: number | BigNumber;
        amount1Out: number | BigNumber;
        to: string;
        trader: string;
        param5: string;
    }
    export interface ITraderAllocationParams {
        param1: boolean;
        param2: number | BigNumber;
        param3: string;
    }
    export interface ITraderOfferParams {
        param1: boolean;
        param2: string;
        param3: number | BigNumber;
    }
    export class OSWAP_RestrictedPair4 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        parseAddLiquidityEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair4.AddLiquidityEvent[];
        decodeAddLiquidityEvent(event: Event): OSWAP_RestrictedPair4.AddLiquidityEvent;
        parseApprovedTraderEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair4.ApprovedTraderEvent[];
        decodeApprovedTraderEvent(event: Event): OSWAP_RestrictedPair4.ApprovedTraderEvent;
        parseLockEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair4.LockEvent[];
        decodeLockEvent(event: Event): OSWAP_RestrictedPair4.LockEvent;
        parseMerkleRootEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair4.MerkleRootEvent[];
        decodeMerkleRootEvent(event: Event): OSWAP_RestrictedPair4.MerkleRootEvent;
        parseNewProviderOfferEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair4.NewProviderOfferEvent[];
        decodeNewProviderOfferEvent(event: Event): OSWAP_RestrictedPair4.NewProviderOfferEvent;
        parseRemoveLiquidityEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair4.RemoveLiquidityEvent[];
        decodeRemoveLiquidityEvent(event: Event): OSWAP_RestrictedPair4.RemoveLiquidityEvent;
        parseSwapEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair4.SwapEvent[];
        decodeSwapEvent(event: Event): OSWAP_RestrictedPair4.SwapEvent;
        parseSwappedOneOfferEvent(receipt: TransactionReceipt): OSWAP_RestrictedPair4.SwappedOneOfferEvent[];
        decodeSwappedOneOfferEvent(event: Event): OSWAP_RestrictedPair4.SwappedOneOfferEvent;
        addLiquidity: {
            (params: IAddLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IAddLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        approvedTrader: {
            (params: IApprovedTraderParams, options?: TransactionOptions): Promise<string>;
        };
        configStore: {
            (options?: TransactionOptions): Promise<string>;
        };
        counter: {
            (param1: boolean, options?: TransactionOptions): Promise<BigNumber>;
        };
        createOrder: {
            (params: ICreateOrderParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<BigNumber>;
            txData: (params: ICreateOrderParams, options?: TransactionOptions) => Promise<string>;
        };
        factory: {
            (options?: TransactionOptions): Promise<string>;
        };
        feeBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountIn: {
            (params: IGetAmountInParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getAmountOut: {
            (params: IGetAmountOutParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getApprovedTrader: {
            (params: IGetApprovedTraderParams, options?: TransactionOptions): Promise<{
                trader: string[];
                allocation: BigNumber[];
            }>;
        };
        getApprovedTraderLength: {
            (params: IGetApprovedTraderLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
                param3: BigNumber;
            }>;
        };
        getLastBalances: {
            (options?: TransactionOptions): Promise<{
                param1: BigNumber;
                param2: BigNumber;
            }>;
        };
        getOffers: {
            (params: IGetOffersParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOffer: {
            (params: IGetProviderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        getProviderOfferIndexLength: {
            (params: IGetProviderOfferIndexLengthParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        getTraderOffer: {
            (params: IGetTraderOfferParams, options?: TransactionOptions): Promise<{
                index: BigNumber[];
                provider: string[];
                lockedAndAllowAll: boolean[];
                receiving: BigNumber[];
                amountAndPrice: BigNumber[];
                startDateAndExpire: BigNumber[];
            }>;
        };
        govToken: {
            (options?: TransactionOptions): Promise<string>;
        };
        governance: {
            (options?: TransactionOptions): Promise<string>;
        };
        initialize: {
            (params: IInitializeParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IInitializeParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IInitializeParams, options?: TransactionOptions) => Promise<string>;
        };
        isApprovedTrader: {
            (params: IIsApprovedTraderParams, options?: TransactionOptions): Promise<boolean>;
        };
        isLive: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        lastGovBalance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken0Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastToken1Balance: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        lastTraderAllocation: {
            (params: ILastTraderAllocationParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        lockOffer: {
            (params: ILockOfferParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ILockOfferParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ILockOfferParams, options?: TransactionOptions) => Promise<string>;
        };
        offerAllowlistIpfsCid: {
            (params: IOfferAllowlistIpfsCidParams, options?: TransactionOptions): Promise<string>;
        };
        offerMerkleRoot: {
            (params: IOfferMerkleRootParams, options?: TransactionOptions): Promise<string>;
        };
        offers: {
            (params: IOffersParams, options?: TransactionOptions): Promise<{
                provider: string;
                locked: boolean;
                allowAll: boolean;
                amount: BigNumber;
                receiving: BigNumber;
                restrictedPrice: BigNumber;
                startDate: BigNumber;
                expire: BigNumber;
            }>;
        };
        prepaidFeeBalance: {
            (params: IPrepaidFeeBalanceParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeBalance0: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        protocolFeeBalance1: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        providerOfferIndex: {
            (params: IProviderOfferIndexParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        redeemProtocolFee: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity: {
            (provider: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (provider: string, options?: TransactionOptions) => Promise<{
                amount0: BigNumber;
                amount1: BigNumber;
                feeOut: BigNumber;
            }>;
            txData: (provider: string, options?: TransactionOptions) => Promise<string>;
        };
        removeAllLiquidity1D: {
            (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions) => Promise<{
                totalAmount: BigNumber;
                totalReceiving: BigNumber;
                totalRemainingFee: BigNumber;
            }>;
            txData: (params: IRemoveAllLiquidity1DParams, options?: TransactionOptions) => Promise<string>;
        };
        removeLiquidity: {
            (params: IRemoveLiquidityParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: IRemoveLiquidityParams, options?: TransactionOptions) => Promise<string>;
        };
        restrictedLiquidityProvider: {
            (options?: TransactionOptions): Promise<string>;
        };
        scaleDirection: {
            (options?: TransactionOptions): Promise<boolean>;
        };
        scaler: {
            (options?: TransactionOptions): Promise<BigNumber>;
        };
        setApprovedTraderByMerkleProof: {
            (params: ISetApprovedTraderByMerkleProofParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetApprovedTraderByMerkleProofParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetApprovedTraderByMerkleProofParams, options?: TransactionOptions) => Promise<string>;
        };
        setLive: {
            (isLive: boolean, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (isLive: boolean, options?: TransactionOptions) => Promise<void>;
            txData: (isLive: boolean, options?: TransactionOptions) => Promise<string>;
        };
        setMerkleRoot: {
            (params: ISetMerkleRootParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISetMerkleRootParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISetMerkleRootParams, options?: TransactionOptions) => Promise<string>;
        };
        swap: {
            (params: ISwapParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapParams, options?: TransactionOptions) => Promise<string>;
        };
        sync: {
            (options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (options?: TransactionOptions) => Promise<void>;
            txData: (options?: TransactionOptions) => Promise<string>;
        };
        token0: {
            (options?: TransactionOptions): Promise<string>;
        };
        token1: {
            (options?: TransactionOptions): Promise<string>;
        };
        traderAllocation: {
            (params: ITraderAllocationParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        traderOffer: {
            (params: ITraderOfferParams, options?: TransactionOptions): Promise<BigNumber>;
        };
        whitelistFactory: {
            (options?: TransactionOptions): Promise<string>;
        };
        private assign;
    }
    export module OSWAP_RestrictedPair4 {
        interface AddLiquidityEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            amount: BigNumber;
            newAmountBalance: BigNumber;
            feeIn: BigNumber;
            newFeeBalance: BigNumber;
            _event: Event;
        }
        interface ApprovedTraderEvent {
            direction: boolean;
            offerIndex: BigNumber;
            trader: string;
            allocation: BigNumber;
            _event: Event;
        }
        interface LockEvent {
            direction: boolean;
            index: BigNumber;
            _event: Event;
        }
        interface MerkleRootEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            merkleRoot: string;
            ipfsCid: string;
            _event: Event;
        }
        interface NewProviderOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            allowAll: boolean;
            restrictedPrice: BigNumber;
            startDate: BigNumber;
            expire: BigNumber;
            _event: Event;
        }
        interface RemoveLiquidityEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            amountOut: BigNumber;
            receivingOut: BigNumber;
            feeOut: BigNumber;
            newAmountBalance: BigNumber;
            newReceivingBalance: BigNumber;
            newFeeBalance: BigNumber;
            _event: Event;
        }
        interface SwapEvent {
            to: string;
            direction: boolean;
            amountIn: BigNumber;
            amountOut: BigNumber;
            tradeFee: BigNumber;
            protocolFee: BigNumber;
            _event: Event;
        }
        interface SwappedOneOfferEvent {
            provider: string;
            direction: boolean;
            index: BigNumber;
            price: BigNumber;
            amountOut: BigNumber;
            amountIn: BigNumber;
            newAmountBalance: BigNumber;
            newReceivingBalance: BigNumber;
            _event: Event;
        }
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator1.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator1.json.ts" {
    const _default_45: {
        abi: {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        }[];
        bytecode: string;
    };
    export default _default_45;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator1.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator1.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_RestrictedPairCreator1 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        createPair: {
            (salt: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (salt: string, options?: TransactionOptions) => Promise<string>;
            txData: (salt: string, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator4.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator4.json.ts" {
    const _default_46: {
        abi: {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        }[];
        bytecode: string;
    };
    export default _default_46;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator4.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator4.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export class OSWAP_RestrictedPairCreator4 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(options?: number | BigNumber | TransactionOptions): Promise<string>;
        createPair: {
            (salt: string, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (salt: string, options?: TransactionOptions) => Promise<string>;
            txData: (salt: string, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter2.json.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter2.json.ts" {
    const _default_47: {
        abi: ({
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
            name?: undefined;
            outputs?: undefined;
        } | {
            inputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            name: string;
            outputs: {
                internalType: string;
                name: string;
                type: string;
            }[];
            stateMutability: string;
            type: string;
        } | {
            stateMutability: string;
            type: string;
            inputs?: undefined;
            name?: undefined;
            outputs?: undefined;
        })[];
        bytecode: string;
    };
    export default _default_47;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter2.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter2.ts" {
    import { IWallet, Contract as _Contract, TransactionReceipt, BigNumber, TransactionOptions } from "@ijstech/eth-contract";
    export interface IDeployParams {
        registry: string;
        WETH: string;
    }
    export interface IGetAmountsInEndsWithParams {
        amountOut: number | BigNumber;
        pair: string[];
        tokenOut: string;
        data: string;
    }
    export interface IGetAmountsInStartsWithParams {
        amountOut: number | BigNumber;
        pair: string[];
        tokenIn: string;
        data: string;
    }
    export interface IGetAmountsOutEndsWithParams {
        amountIn: number | BigNumber;
        pair: string[];
        tokenOut: string;
        data: string;
    }
    export interface IGetAmountsOutStartsWithParams {
        amountIn: number | BigNumber;
        pair: string[];
        tokenIn: string;
        data: string;
    }
    export interface IGetPathInParams {
        pair: string[];
        tokenIn: string;
    }
    export interface IGetPathOutParams {
        pair: string[];
        tokenOut: string;
    }
    export interface ISwapETHForExactTokensParams {
        amountOut: number | BigNumber;
        pair: string[];
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapExactETHForTokensParams {
        amountOutMin: number | BigNumber;
        pair: string[];
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapExactETHForTokensSupportingFeeOnTransferTokensParams {
        amountOutMin: number | BigNumber;
        pair: string[];
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapExactTokensForETHParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        pair: string[];
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapExactTokensForETHSupportingFeeOnTransferTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        pair: string[];
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapExactTokensForTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        pair: string[];
        tokenIn: string;
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams {
        amountIn: number | BigNumber;
        amountOutMin: number | BigNumber;
        pair: string[];
        tokenIn: string;
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapTokensForExactETHParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        pair: string[];
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export interface ISwapTokensForExactTokensParams {
        amountOut: number | BigNumber;
        amountInMax: number | BigNumber;
        pair: string[];
        tokenOut: string;
        to: string;
        deadline: number | BigNumber;
        data: string;
    }
    export class OSWAP_HybridRouter2 extends _Contract {
        static _abi: any;
        constructor(wallet: IWallet, address?: string);
        deploy(params: IDeployParams, options?: TransactionOptions): Promise<string>;
        WETH: {
            (options?: TransactionOptions): Promise<string>;
        };
        getAmountsInEndsWith: {
            (params: IGetAmountsInEndsWithParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        getAmountsInStartsWith: {
            (params: IGetAmountsInStartsWithParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        getAmountsOutEndsWith: {
            (params: IGetAmountsOutEndsWithParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        getAmountsOutStartsWith: {
            (params: IGetAmountsOutStartsWithParams, options?: TransactionOptions): Promise<BigNumber[]>;
        };
        getPathIn: {
            (params: IGetPathInParams, options?: TransactionOptions): Promise<string[]>;
        };
        getPathOut: {
            (params: IGetPathOutParams, options?: TransactionOptions): Promise<string[]>;
        };
        registry: {
            (options?: TransactionOptions): Promise<string>;
        };
        swapETHForExactTokens: {
            (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
            txData: (params: ISwapETHForExactTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactETHForTokens: {
            (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
            txData: (params: ISwapExactETHForTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactETHForTokensSupportingFeeOnTransferTokens: {
            (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactETHForTokensSupportingFeeOnTransferTokensParams, options?: number | BigNumber | TransactionOptions) => Promise<string>;
        };
        swapExactTokensForETH: {
            (params: ISwapExactTokensForETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
            txData: (params: ISwapExactTokensForETHParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForETHSupportingFeeOnTransferTokens: {
            (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactTokensForETHSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForTokens: {
            (params: ISwapExactTokensForTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
            txData: (params: ISwapExactTokensForTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapExactTokensForTokensSupportingFeeOnTransferTokens: {
            (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<void>;
            txData: (params: ISwapExactTokensForTokensSupportingFeeOnTransferTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        swapTokensForExactETH: {
            (params: ISwapTokensForExactETHParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
            txData: (params: ISwapTokensForExactETHParams, options?: TransactionOptions) => Promise<string>;
        };
        swapTokensForExactTokens: {
            (params: ISwapTokensForExactTokensParams, options?: TransactionOptions): Promise<TransactionReceipt>;
            call: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<{
                path: string[];
                amounts: BigNumber[];
            }>;
            txData: (params: ISwapTokensForExactTokensParams, options?: TransactionOptions) => Promise<string>;
        };
        private assign;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/index.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/index.ts" {
    export { OpenSwap } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/OpenSwap.ts";
    export { OSWAP_ERC20 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_ERC20.ts";
    export { OSWAP_Factory } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Factory.ts";
    export { OSWAP_Pair } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Pair.ts";
    export { OSWAP_PairCreator } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_PairCreator.ts";
    export { OSWAP_Router } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_Router.ts";
    export { OSWAP_VotingExecutor1 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/amm/OSWAP_VotingExecutor1.ts";
    export { OSWAP_FactoryBase } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_FactoryBase.ts";
    export { OSWAP_PausableFactory } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausableFactory.ts";
    export { OSWAP_PausablePair } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/commons/OSWAP_PausablePair.ts";
    export { OAXDEX_Administrator } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Administrator.ts";
    export { OAXDEX_Governance } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_Governance.ts";
    export { OAXDEX_VotingContract } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingContract.ts";
    export { OAXDEX_VotingExecutor } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingExecutor.ts";
    export { OAXDEX_VotingRegistry } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/gov/OAXDEX_VotingRegistry.ts";
    export { ERC20 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/libraries/ERC20.ts";
    export { OSWAP_CertiKSecurityOracle } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_CertiKSecurityOracle.ts";
    export { OSWAP_OracleFactory } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleFactory.ts";
    export { OSWAP_OracleLiquidityProvider } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OracleLiquidityProvider.ts";
    export { OSWAP_OraclePair } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePair.ts";
    export { OSWAP_OraclePairCreator } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_OraclePairCreator.ts";
    export { OSWAP_VotingExecutor2 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/oracle/OSWAP_VotingExecutor2.ts";
    export { OSWAP_RangeFactory } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeFactory.ts";
    export { OSWAP_RangeLiquidityProvider } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangeLiquidityProvider.ts";
    export { OSWAP_RangePair } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePair.ts";
    export { OSWAP_RangePairCreator } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_RangePairCreator.ts";
    export { OSWAP_VotingExecutor3 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/range/OSWAP_VotingExecutor3.ts";
    export { OSWAP_ConfigStore } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_ConfigStore.ts";
    export { OSWAP_OtcLiquidityProvider } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcLiquidityProvider.ts";
    export { OSWAP_OtcPairOracle } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairOracle.ts";
    export { OSWAP_RestrictedFactory } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedFactory.ts";
    export { OSWAP_RestrictedLiquidityProvider1 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider1.ts";
    export { OSWAP_RestrictedLiquidityProvider3 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider3.ts";
    export { OSWAP_RestrictedLiquidityProvider4 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedLiquidityProvider4.ts";
    export { OSWAP_RestrictedPair } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair.ts";
    export { OSWAP_RestrictedPairOracle } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairOracle.ts";
    export { OSWAP_VotingExecutor4 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_VotingExecutor4.ts";
    export { OSWAP_HybridRouter } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter.ts";
    export { OSWAP_HybridRouterRegistry } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouterRegistry.ts";
    export { OSWAP_OracleRouter } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_OracleRouter.ts";
    export { OSWAP_OtcPair } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPair.ts";
    export { OSWAP_OtcPairCreator } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_OtcPairCreator.ts";
    export { OSWAP_RestrictedPair1 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair1.ts";
    export { OSWAP_RestrictedPair3 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair3.ts";
    export { OSWAP_RestrictedPair4 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPair4.ts";
    export { OSWAP_RestrictedPairCreator1 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator1.ts";
    export { OSWAP_RestrictedPairCreator4 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/restricted/OSWAP_RestrictedPairCreator4.ts";
    export { OSWAP_HybridRouter2 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/router/OSWAP_HybridRouter2.ts";
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/OpenSwap.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/OpenSwap.ts" {
    import { IWallet, BigNumber } from "@ijstech/eth-contract";
    import { OpenSwap as OpenSwapContract } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/index.ts";
    export class OpenSwap {
        wallet: IWallet;
        address: string;
        _oswap: OpenSwapContract;
        constructor(wallet: IWallet, address?: string);
        deploy(params: {
            minter: string;
            initSupplyTo: string;
            initSupply: number | BigNumber;
            totalSupply: number | BigNumber;
        }): Promise<string>;
        allowance(params: {
            owner: string;
            spender: string;
        }): Promise<BigNumber>;
        approve(params: {
            spender: string;
            amount: number | BigNumber;
        }): Promise<OpenSwapContract.ApprovalEvent>;
        balanceOf(account: string): Promise<BigNumber>;
        get cap(): Promise<BigNumber>;
        get decimals(): Promise<number>;
        decreaseAllowance(params: {
            spender: string;
            subtractedValue: number | BigNumber;
        }): Promise<OpenSwapContract.ApprovalEvent>;
        increaseAllowance(params: {
            spender: string;
            addedValue: number | BigNumber;
        }): Promise<OpenSwapContract.ApprovalEvent>;
        mint(params: {
            address: string;
            amount: number | BigNumber;
        }): Promise<OpenSwapContract.TransferEvent>;
        get minter(): Promise<string>;
        get name(): Promise<string>;
        get symbol(): Promise<string>;
        get totalSupply(): Promise<BigNumber>;
        transfer(params: {
            address: string;
            amount: number | BigNumber;
        }): Promise<OpenSwapContract.TransferEvent>;
        transferFrom(params: {
            sender: string;
            recipient: string;
            amount: number | BigNumber;
        }): Promise<{
            transfer: OpenSwapContract.TransferEvent;
            approval: OpenSwapContract.ApprovalEvent;
        }>;
    }
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/deploy.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/deploy.ts" {
    import { IWallet, BigNumber } from "@ijstech/eth-contract";
    import { OSWAP_Factory, OSWAP_PairCreator, OSWAP_Router, OSWAP_VotingExecutor1, OAXDEX_Governance, OAXDEX_VotingExecutor, OAXDEX_Administrator, OAXDEX_VotingRegistry, OSWAP_OraclePairCreator, OSWAP_VotingExecutor2, OSWAP_OracleFactory, OSWAP_OracleLiquidityProvider, OSWAP_OracleRouter, OSWAP_HybridRouterRegistry, OSWAP_HybridRouter2 } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/index.ts";
    import { OpenSwap } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/OpenSwap.ts";
    export interface ICoreContractsDeploymentResult {
        administrator?: string;
        factory?: string;
        governance?: string;
        oswap?: string;
        votingToken?: string;
        pairCreator?: string;
        router?: string;
        votingRegistry?: string;
        votingExecutor?: string;
        votingExecutor1?: string;
        weth?: string;
    }
    export interface IOracleContractsDeploymentResult {
        oracleFactory?: string;
        oracleLiquidityProvider?: string;
        oraclePairCreator?: string;
        oracleRouter?: string;
        votingExecutor2?: string;
    }
    export interface IRangeContractsDeploymentResult {
        rangeFactory?: string;
        rangeLiquidityProvider?: string;
        rangePairCreator?: string;
        votingExecutor3?: string;
    }
    export interface IRestrictedContractsDeploymentResult {
        restrictedFactory?: string;
        restrictedLiquidityProvider?: string;
        restrictedPairCreator?: string;
        configStore?: string;
        votingExecutor4?: string;
    }
    export interface IHybridRouterDeploymentResult {
        hybridRouter?: string;
        hybridRouterRegistry?: string;
    }
    export interface IDeploymentResult extends ICoreContractsDeploymentResult, IOracleContractsDeploymentResult, IRangeContractsDeploymentResult, IRestrictedContractsDeploymentResult, IHybridRouterDeploymentResult {
    }
    export interface IGovProfile {
        "minExeDelay": number;
        "minVoteDuration": number;
        "maxVoteDuration": number;
        "minGovTokenToCreateVote": number;
        "minQuorum": number;
    }
    export interface IGovOptions {
        minStakePeriod: number;
        tradeFee: number;
        protocolFee: number;
        protocolFeeTo: string;
        profiles: {
            name: string[];
            minExeDelay: number[];
            minVoteDuration: number[];
            maxVoteDuration: number[];
            minGovTokenToCreateVote: string[];
            minQuorum: string[];
        };
    }
    export const DefaultGovOptions: IGovOptions;
    export interface IGovTokenOptions {
        initSupply: number | BigNumber;
        initSupplyTo: string;
        minter: string;
        totalSupply: number | BigNumber;
    }
    export const DefaultGovTokenOptions: IGovTokenOptions;
    export interface IAmmOptions {
        governance?: string;
        pairCreator?: string;
        protocolFee?: number;
        protocolFeeTo?: string;
        tradeFee?: number;
    }
    export interface IOracleFactoryOptions {
        feePerDelegator?: number | BigNumber;
        governance?: string;
        pairCreator?: string;
        protocolFee?: number | BigNumber;
        protocolFeeTo?: string;
        tradeFee?: number | BigNumber;
    }
    export interface IRangeFactoryOptions {
        governance?: string;
        oracleFactory?: string;
        pairCreator?: string;
        tradeFee?: number | BigNumber;
        stakeAmount?: number[] | BigNumber[];
        liquidityProviderShare?: number[] | BigNumber[];
        protocolFeeTo?: string;
    }
    export interface IRestrictedFactoryOptions {
        governance?: string;
        whitelistFactory?: string;
        pairCreator?: string;
        configStore?: string;
        tradeFee?: number | BigNumber;
        protocolFee?: number | BigNumber;
        protocolFeeTo?: string;
        type?: 'Restricted1' | 'Otc';
    }
    export interface IHybridRouterOptions {
        registryAddress?: string;
        weth?: string;
        governance?: string;
        name?: string[];
        factory?: string[];
        fee?: number[] | BigNumber[];
        feeBase?: number[] | BigNumber[];
        typeCode?: number[] | BigNumber[];
    }
    export interface IDeployOptions {
        govTokenOptions?: IGovTokenOptions;
        govOptions?: IGovOptions;
        amm?: IAmmOptions;
        oracle?: IOracleFactoryOptions;
        range?: IRangeFactoryOptions;
        restricted?: IRestrictedFactoryOptions;
        hybridRouter?: IHybridRouterOptions;
        tokens?: {
            oswap?: string;
            weth?: string;
            votingToken?: string;
        };
    }
    export interface IDeploymentContracts {
        openSwap: OpenSwap;
        governance: OAXDEX_Governance;
        administrator: OAXDEX_Administrator;
        registry: OAXDEX_VotingRegistry;
        pairCreator: OSWAP_PairCreator;
        factory: OSWAP_Factory;
        oraclePairCreator: OSWAP_OraclePairCreator;
        router: OSWAP_Router;
        oracleFactory: OSWAP_OracleFactory;
        oracleRouter: OSWAP_OracleRouter;
        oracleLiquidityProvider: OSWAP_OracleLiquidityProvider;
        hybridRouterRegistry: OSWAP_HybridRouterRegistry;
        hybridRouter: OSWAP_HybridRouter2;
        executor: OAXDEX_VotingExecutor;
        executor1: OSWAP_VotingExecutor1;
        executor2: OSWAP_VotingExecutor2;
    }
    export function toDeploymentContracts(wallet: IWallet, result: IDeploymentResult): IDeploymentContracts;
    export function deployCoreContracts(wallet: IWallet, options: IDeployOptions): Promise<ICoreContractsDeploymentResult>;
    export function deployOracleContracts(wallet: IWallet, options: IOracleFactoryOptions, coreContractsResult: ICoreContractsDeploymentResult): Promise<IOracleContractsDeploymentResult>;
    export function deployRangeContracts(wallet: IWallet, options: IRangeFactoryOptions, weth: string, hybridRegistry: string): Promise<IRangeContractsDeploymentResult>;
    export function deployRestrictedContracts(wallet: IWallet, options: IRestrictedFactoryOptions, weth: string): Promise<IRestrictedContractsDeploymentResult>;
    export function deployRestrictedPairOracle(wallet: IWallet, isOtc?: boolean): Promise<any>;
    export function initHybridRouterRegistry(wallet: IWallet, options: IHybridRouterOptions): Promise<void>;
    export function deployHybridRouter(wallet: IWallet, options: IHybridRouterOptions): Promise<IHybridRouterDeploymentResult>;
    export function deploy(wallet: IWallet, options?: IDeployOptions): Promise<IDeploymentResult>;
}
/// <amd-module name="@scom/scom-tip-me/contracts/oswap-openswap-contract/index.ts" />
declare module "@scom/scom-tip-me/contracts/oswap-openswap-contract/index.ts" {
    export * as Contracts from "@scom/scom-tip-me/contracts/oswap-openswap-contract/contracts/index.ts";
    export { deploy, deployCoreContracts, deployOracleContracts, deployRangeContracts, deployRestrictedContracts, deployHybridRouter, initHybridRouterRegistry, deployRestrictedPairOracle, IDeploymentResult, IDeploymentContracts, toDeploymentContracts } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/deploy.ts";
    export { OpenSwap } from "@scom/scom-tip-me/contracts/oswap-openswap-contract/OpenSwap.ts";
}
/// <amd-module name="@scom/scom-tip-me/API.ts" />
declare module "@scom/scom-tip-me/API.ts" {
    import { ITokenObject } from '@scom/scom-token-list';
    const sendToken: (token: ITokenObject, recipient: string, amount: string | number, callback: (error: Error, receipt?: string) => void, confirmationCallBack: () => void) => Promise<void>;
    export { sendToken };
}
/// <amd-module name="@scom/scom-tip-me/data.json.ts" />
declare module "@scom/scom-tip-me/data.json.ts" {
    const _default_48: {
        ipfsGatewayUrl: string;
        defaultBuilderData: {
            logo: string;
            description: string;
            recipient: string;
            tokens: {
                address: string;
                chainId: number;
            }[];
            defaultChainId: number;
            networks: {
                chainId: number;
            }[];
            wallets: {
                name: string;
            }[];
            showHeader: boolean;
            showFooter: boolean;
        };
    };
    export default _default_48;
}
/// <amd-module name="@scom/scom-tip-me/formSchema.json.ts" />
declare module "@scom/scom-tip-me/formSchema.json.ts" {
    const _default_49: {
        general: {
            dataSchema: {
                type: string;
                properties: {
                    logo: {
                        type: string;
                        required: boolean;
                    };
                    description: {
                        type: string;
                        required: boolean;
                    };
                    recipient: {
                        type: string;
                        required: boolean;
                    };
                    tokens: {
                        type: string;
                        required: boolean;
                        items: {
                            type: string;
                            properties: {
                                chainId: {
                                    type: string;
                                    enum: number[];
                                    required: boolean;
                                };
                                address: {
                                    type: string;
                                    required: boolean;
                                };
                            };
                        };
                    };
                };
            };
        };
        theme: {
            dataSchema: {
                type: string;
                properties: {
                    dark: {
                        type: string;
                        properties: {
                            backgroundColor: {
                                type: string;
                                format: string;
                            };
                            fontColor: {
                                type: string;
                                format: string;
                            };
                            inputBackgroundColor: {
                                type: string;
                                format: string;
                            };
                            inputFontColor: {
                                type: string;
                                format: string;
                            };
                        };
                    };
                    light: {
                        type: string;
                        properties: {
                            backgroundColor: {
                                type: string;
                                format: string;
                            };
                            fontColor: {
                                type: string;
                                format: string;
                            };
                            inputBackgroundColor: {
                                type: string;
                                format: string;
                            };
                            inputFontColor: {
                                type: string;
                                format: string;
                            };
                        };
                    };
                };
            };
        };
    };
    export default _default_49;
}
/// <amd-module name="@scom/scom-tip-me" />
declare module "@scom/scom-tip-me" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { ICustomToken, IEmbedData } from "@scom/scom-tip-me/interface.tsx";
    import { INetworkConfig } from '@scom/scom-network-picker';
    import { IWalletPlugin } from '@scom/scom-wallet-modal';
    interface ScomTipMeElement extends ControlElement {
        logo: string;
        description: string;
        tokens: {
            address: string;
            chainId: number;
        }[];
        recipient: string;
        defaultChainId: number;
        wallets: IWalletPlugin[];
        networks: INetworkConfig[];
        showHeader?: boolean;
        lazyLoad?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-tip-me']: ScomTipMeElement;
            }
        }
    }
    export default class ScomTipMe extends Module {
        private imgLogo;
        private lbDescription;
        private tokenInput;
        private btnSend;
        private mdAlert;
        private dappContainer;
        private mdWallet;
        private _data;
        private $eventBus;
        private tokenBalance;
        private tokenObj;
        tag: any;
        defaultEdit: boolean;
        private rpcWalletEvents;
        private clientEvents;
        constructor(parent?: Container, options?: any);
        onHide(): void;
        private registerEvent;
        private onChainChanged;
        static create(options?: ScomTipMeElement, parent?: Container): Promise<ScomTipMe>;
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        get defaultChainId(): number;
        set defaultChainId(value: number);
        get description(): string;
        set description(value: string);
        get logo(): string;
        set logo(value: string);
        get tokens(): ICustomToken[];
        set tokens(value: ICustomToken[]);
        private get tokenList();
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: any;
            getData: any;
            setData: (data: IEmbedData) => Promise<void>;
            setTag: any;
            getTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: any;
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            setTag: any;
            getTag: any;
        })[];
        private getData;
        private setData;
        private getTag;
        private updateTag;
        setTag(value: any): Promise<void>;
        private updateStyle;
        private updateTheme;
        private initializeWidgetConfig;
        private refreshTokenInfo;
        private updateTokenObject;
        private updateTokenInput;
        private updateBtn;
        private onSelectToken;
        private onInputAmountChanged;
        private onSetMaxBalance;
        private sendToken;
        init(): Promise<void>;
        render(): any;
    }
}
