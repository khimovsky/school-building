export interface PaymentDTO {

}

export interface PaymentBody {
  amount: number;
  return_url: string;
  description: string;
  prefix: string;
}
