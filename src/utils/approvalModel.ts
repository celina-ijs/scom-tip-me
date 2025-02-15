import { BigNumber, Contracts, Wallet } from "@ijstech/eth-wallet";
import { registerSendTxEvents } from "./token";
import { ITokenObject } from "@scom/scom-token-list";

class ERC20ApprovalModel {
  private options: IERC20ApprovalOptions = {
    sender: null,
    spenderAddress: '',
    payAction: async () => { },
    onToBeApproved: async (token: ITokenObject) => { },
    onToBePaid: async (token: ITokenObject) => { },
    onApproving: async (token: ITokenObject, receipt?: string, data?: any) => { },
    onApproved: async (token: ITokenObject, data?: any) => { },
    onPaying: async (receipt?: string, data?: any) => { },
    onPaid: async (data?: any) => { },
    onApprovingError: async (token: ITokenObject, err: Error) => { },
    onPayingError: async (err: Error) => { }
  };

  constructor(options: IERC20ApprovalOptions) {
    this.options = options;
  }

  private setSpenderAddress = (value: string) => {
    this.options.spenderAddress = value
  }

  private checkAllowance = async (token: ITokenObject, inputAmount: string) => {
    let allowance = await getERC20Allowance(token, this.options.spenderAddress);
    if (!allowance) {
      await this.options.onToBePaid.bind(this.options.sender)(token);
    }
    else if (new BigNumber(inputAmount).gt(allowance)) {
      await this.options.onToBeApproved.bind(this.options.sender)(token);
    }
    else {
      await this.options.onToBePaid.bind(this.options.sender)(token);
    }
  }

  private doApproveAction = async (token: ITokenObject, inputAmount: string, data?: any) => {
    const txHashCallback = async (err: Error, receipt?: string) => {
      if (err) {
        await this.options.onApprovingError.bind(this.options.sender)(token, err);
      }
      else {
        await this.options.onApproving.bind(this.options.sender)(token, receipt, data);
      }
    }
    const confirmationCallback = async (receipt: any) => {
      await this.options.onApproved.bind(this.options.sender)(token, data);
      await this.checkAllowance(token, inputAmount);
    }
    approveERC20Max(token, this.options.spenderAddress, txHashCallback, confirmationCallback)
  }

  private doPayAction = async (data?: any) => {
    const txHashCallback = async (err: Error, receipt?: string) => {
      if (err) {
        await this.options.onPayingError.bind(this.options.sender)(err);
      }
      else {
        await this.options.onPaying.bind(this.options.sender)(receipt, data);
      }
    }
    const confirmationCallback = async (receipt: any) => {
      await this.options.onPaid.bind(this.options.sender)(data);
    }
    registerSendTxEvents({
      transactionHash: txHashCallback,
      confirmation: confirmationCallback
    })
    await this.options.payAction.bind(this.options.sender)();
  }

  public getAction = (): IERC20ApprovalAction => {
    return {
      setSpenderAddress: this.setSpenderAddress,
      doApproveAction: this.doApproveAction,
      doPayAction: this.doPayAction,
      checkAllowance: this.checkAllowance
    }
  }
}

export enum ApprovalStatus {
  TO_BE_APPROVED,
  APPROVING,
  NONE,
}

const approveERC20Max = async (token: ITokenObject, spenderAddress: string, callback?: any, confirmationCallback?: any) => {
  let wallet: any = Wallet.getInstance();
  let amount = new BigNumber(2).pow(256).minus(1);
  let erc20 = new Contracts.ERC20(wallet, token.address);
  registerSendTxEvents({
    transactionHash: callback,
    confirmation: confirmationCallback
  })
  let receipt = await erc20.approve({
    spender: spenderAddress,
    amount
  });
  return receipt;
}

export const getERC20Allowance = async (token: ITokenObject, spenderAddress: string) => {
  if (!token.address) return null;
  let wallet: any = Wallet.getInstance();
  let erc20 = new Contracts.ERC20(wallet, token.address);
  let allowance = await erc20.allowance({
    owner: wallet.address,
    spender: spenderAddress
  });
  return allowance;
}

export const getERC20ApprovalModelAction = (spenderAddress: string, options: IERC20ApprovalEventOptions) => {
  const approvalOptions = {
    ...options,
    spenderAddress
  };
  const approvalModel = new ERC20ApprovalModel(approvalOptions);
  const approvalModelAction = approvalModel.getAction();
  return approvalModelAction;
}

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