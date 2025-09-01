export interface PaymentDTO {
  id: string;
  status: string;
  amount: {
    value: string;
    currency: string;
  };
  description: string;
  recipient: {
    account_id: string;
    gateway_id: string;
  };
  payment_method: {
    type: string;
    id: string;
    saved: boolean;
    status: string;
  };
  created_at: string;
  confirmation: {
    type: string;
    confirmation_url: string;
  };
  test: boolean;
  paid: boolean;
  refundable: boolean;
  metadata: {
    orderId: string;
    prefix: string;
  };
}

export interface PaymentBody {
  amount: number;
  return_url: string;
  prefix: string;
}
